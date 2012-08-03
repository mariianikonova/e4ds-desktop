Ext.define('E4desk.controller.DesktopController', {
	extend: 'Deft.mvc.ViewController',
	inject: [ 'moduleStore' ],
	
	activeWindowCls: 'ux-desktop-active-win',
	inactiveWindowCls: 'ux-desktop-inactive-win',
	windowBarCurrentWindow: null,
	lastActiveWindow: null,
	
	control: {
		view: {
			contextmenu: {
				fn: 'onDesktopContextmenu',
				element: 'el',
				preventDefault: true
			}
		},
		shortcutView: {
			itemclick: 'onShortcutViewItemClick'
		},
		windowBar: {
			contextmenu: {
				fn: 'onWindowBarContextmenu',
				element: 'el'
			}
		},
		topBarSettings: {
			click: 'onTopBarSettingsClick'
		},		
		applicationMenu: {
			click: 'onApplicationMenuClick'
		}
	},

	init: function() {
		this.moduleStore.load({
			scope: this,
			callback: function() {
				this.updateApplicationMenu();
			}
		});
		
		this.windows = new Ext.util.MixedCollection();

		var desktopCtxMenu = this.getView().contextMenu;
		desktopCtxMenu.down('menuitem[action=closeall]').on('click', this.onDesktopContextmenuCloseAll);
		desktopCtxMenu.down('menuitem[action=minimizeall]').on('click', this.onDesktopContextmenuMinimizeAll);
		desktopCtxMenu.down('menuitem[action=tile]').on('click', this.onDesktopContextmenuTile, this);
		desktopCtxMenu.down('menuitem[action=cascade]').on('click', this.onDesktopContextmenuCascade);
		
		var windowBarCtxMenu = this.getWindowBar().contextMenu;
		windowBarCtxMenu.on('hide', function() { this.windowBarCurrentWindow = null }, this);
		windowBarCtxMenu.down('menuitem[action=restore]').on('click', this.onWindowBarContextmenuRestore, this);		
		windowBarCtxMenu.down('menuitem[action=minimize]').on('click', this.onWindowBarContextmenuMinimize, this);
		windowBarCtxMenu.down('menuitem[action=maximize]').on('click', this.onWindowBarContextmenuMaximize, this);
		windowBarCtxMenu.down('menuitem[action=close]').on('click', this.onWindowBarContextmenuClose, this);
	},

	updateApplicationMenu: function() {
		var me = this;
		this.moduleStore.each(function(item) {
			me.getApplicationMenu().add({text: item.data.name, winId: item.data.id});
		});
	},

	onApplicationMenuClick: function(menu, item, e) {
		this.addWindow(item.winId);
	},
	
	onTopBarSettingsClick: function() {
    	var settingsWindow = Ext.create('E4desk.view.Settings');
    	settingsWindow.getController().desktopWallpaper = this.getView().wallpaper;
	   	this.getView().add(settingsWindow);
	   	settingsWindow.show();
	},
	
	onDesktopContextmenu: function(e) {
		var count = this.windows.getCount();
		var contextMenu = this.getView().contextMenu;

		contextMenu.items.each(function(item) {
			var min = item.minWindows || 0;
			item.setDisabled(count < min);
		});

		contextMenu.showAt(e.getXY());
	},

	onDesktopContextmenuCloseAll: function() {
		Ext.WindowManager.each(function(win) {
			if (win.isWindow) {
				win.close();
			}
		});
	},

	onDesktopContextmenuMinimizeAll: function() {
		Ext.WindowManager.each(function(win) {
			if (win.isWindow) {
				win.minimize();
			}
		});
	},

	onDesktopContextmenuTile: function() {
		var me = this, availWidth = me.getView().getWidth(true);

		var x = 0, y = 0, nextY = 0;

		me.windows.each(function(win) {
			if (win.isVisible() && !win.maximized) {
				var w = win.el.getWidth();

				if (x + w > availWidth) {
					x = 0;
					y = nextY;
				}

				win.setPosition(x, y);
				x += w + 1;
				nextY = Math.max(nextY, y + win.el.getHeight() + 1);
			}
		});
	},

	onDesktopContextmenuCascade: function() {
		var x = 0, y = 0;

		Ext.WindowManager.eachBottomUp(function(win) {
			if (win.isWindow && win.isVisible() && !win.maximized) {
				win.setPosition(x, y);
				x += 20;
				y += 20;
			}
		});
	},

	onWindowBarContextmenu: function(e) {
		var target = e.getTarget();
		var btn = this.getWindowBar().getChildByElement(target) || null;
		var contextMenu = this.getWindowBar().contextMenu;
		var contextMenuItems = contextMenu.items;

		if (btn) {
			var currentWindow = btn.win;

			contextMenuItems.items[0].setDisabled(currentWindow.maximized !== true && currentWindow.hidden !== true); // Restore
			contextMenuItems.items[1].setDisabled(currentWindow.minimized === true); // Minimize
			contextMenuItems.items[2].setDisabled(currentWindow.maximized === true || currentWindow.hidden === true); // Maximize

			this.windowBarCurrentWindow = currentWindow;
			contextMenu.showBy(target);
		}

		e.stopEvent();
	},
	
	onWindowBarContextmenuRestore: function(e) {
		this.restoreWindow(this.windowBarCurrentWindow);
	},

	onWindowBarContextmenuMinimize: function() {
		this.windowBarCurrentWindow.minimize();
	},

	onWindowBarContextmenuMaximize: function() {
		this.windowBarCurrentWindow.maximize();
	},

	onWindowBarContextmenuClose: function() {
		this.windowBarCurrentWindow.close();
	},
	

	onShortcutViewItemClick: function(view, record) {
		var data = record.getData();
		this.addWindow(data.id);
	},

	// ------------------------------------------------------
	// Window management methods

	addWindow: function(winId) {

		var me = this;
		var exWin = this.windows.get(winId);

		if (exWin) {
			this.restoreWindow(exWin);
			return exWin;
		}

		var win = Ext.create(winId, {
			windowId: winId,
			stateful: false,
			constrainHeader: true,
			minimizable: true,
			maximizable: true
		});

		this.getView().add(win);
		this.windows.add(winId, win);

		win.windowButton = this.addWindowButton(win);
		win.animateTarget = win.windowButton.el;

		win.on({
			activate: this.updateActiveWindow,
			beforeshow: this.updateActiveWindow,
			deactivate: this.updateActiveWindow,
			minimize: this.onWindowMinimize,
			destroy: this.onWindowDestroy,
			scope: me
		});

		win.doClose = function() {
			win.doClose = Ext.emptyFn;
			win.el.disableShadow();
			win.el.fadeOut({
				listeners: {
					afteranimate: function() {
						win.destroy();
					}
				}
			});
		};

		this.restoreWindow(win);
	},

	restoreWindow: function(win) {
		if (win.isVisible()) {
			win.restore();
			win.toFront();
		} else {
			win.show();
		}
		return win;
	},

	onWindowMinimize: function(win) {
		win.minimized = true;
		win.hide();
	},

	onWindowDestroy: function(win) {
		this.getView().remove(win);
		this.windows.removeAtKey(win.windowId);
		this.removeWindowButton(win.windowButton);
		this.updateActiveWindow();
	},

	updateActiveWindow: function() {
		var activeWindow = this.getActiveWindow(), last = this.lastActiveWindow;
		if (activeWindow === last) {
			return;
		}

		if (last) {
			if (last.el.dom) {
				last.addCls(this.inactiveWindowCls);
				last.removeCls(this.activeWindowCls);
			}
			last.active = false;
		}

		this.lastActiveWindow = activeWindow;

		if (activeWindow) {
			activeWindow.addCls(this.activeWindowCls);
			activeWindow.removeCls(this.inactiveWindowCls);
			activeWindow.minimized = false;
			activeWindow.active = true;
		}

		this.setActiveWindowButton(activeWindow && activeWindow.windowButton);
	},

	getActiveWindow: function() {
		var win = null;

		Ext.WindowManager.eachTopDown(function(comp) {
			if (comp.isWindow && !comp.hidden) {
				win = comp;
				return false;
			}
			return true;
		});

		return win;
	},

	// -----------------------------------
	// WindowBar methods

	addWindowButton: function(win) {
		var config = {
			iconCls: win.iconCls,
			enableToggle: true,
			toggleGroup: 'all',
			width: 140,
			margins: '2 2 2 3',
			text: Ext.util.Format.ellipsis(win.title, 20),
			listeners: {
				click: this.onWindowButtonClick,
				scope: this
			},
			win: win
		};

		var cmp = this.getWindowBar().add(config);
		cmp.toggle(true);
		return cmp;
	},

	removeWindowButton: function(btn) {
		var found, me = this;
		me.getWindowBar().items.each(function(item) {
			if (item === btn) {
				found = item;
			}
			return !found;
		});
		if (found) {
			me.getWindowBar().remove(found);
		}
		return found;
	},

	setActiveWindowButton: function(btn) {
		if (btn) {
			btn.toggle(true);
		} else {
			if (this.getWindowBar()) {
				this.getWindowBar().items.each(function(item) {
					if (item.isButton) {
						item.toggle(false);
					}
				});
			}
		}
	},

	onWindowButtonClick: function(btn) {
		var win = btn.win;
		if (win.minimized || win.hidden) {
			win.show();
		} else if (win.active) {
			win.minimize();
		} else {
			win.toFront();
		}
	}

});