Ext.define('E4dsDesk.controller.Desktop', {
	extend: 'Ext.app.Controller',

	stores: [ 'Modules' ],
	views: [ 'Desktop' ],

	refs: [ {
		ref: 'desktop',
		selector: 'desktop'
	}, {
		ref: 'windowBar',
		selector: 'windowbar'
	}, {
		ref: 'windowBarContextMenu',
		selector: '#windowbar-contextmenu'
	}, {
		ref: 'viewport',
		selector: 'viewport'
	}, {
		ref: 'wallpaper',
		selector: 'wallpaper'
	}, {
		ref: 'shortcutsView',
		selector: 'desktop dataview[itemId=ux-shortcut]'
	} ],

	activeWindowCls: 'ux-desktop-active-win',
	inactiveWindowCls: 'ux-desktop-inactive-win',

	init: function() {
		var me = this;

		me.windows = new Ext.util.MixedCollection();

		me.control({
			'desktop': {
				contextmenu: me.onDesktopContextmenu
			},
			'#desktop-contextmenu': {
				beforeshow: me.onDesktopContextmenuBeforeShow
			},
			'#desktop-contextmenu > menuitem[actionType=tile]': {
				click: me.onDesktopContextmenuTile
			},
			'#desktop-contextmenu > menuitem[actionType=cascade]': {
				click: me.onDesktopContextmenuCascade
			},

			'windowbar': {
				contextmenu: me.onWindowContextmenu
			},
			'#windowbar-contextmenu': {
				beforeshow: me.onWindowMenuBeforeShow,
				hide: me.onWindowMenuHide
			},
			'#windowbar-contextmenu > menuitem[actionType=restore]': {
				click: me.onWindowMenuRestore
			},
			'#windowbar-contextmenu > menuitem[actionType=minimize]': {
				click: me.onWindowMenuMinimize
			},
			'#windowbar-contextmenu > menuitem[actionType=maximize]': {
				click: me.onWindowMenuMaximize
			},
			'#windowbar-contextmenu > menuitem[actionType=close]': {
				click: me.onWindowMenuClose
			},
			'desktop dataview[itemId=ux-shortcut]': {
				itemclick: me.onShortcutItemClick
			}
		});

	},

	// ------------------------------------------------------
	// Window contextmenu handlers

	onWindowContextmenu: function(target) {
		var btn = this.getWindowBar().getChildByElement(target) || null;
		var contextMenu = this.getWindowBar().contextMenu;

		if (btn) {
			contextMenu.currentWindow = btn.win;
			contextMenu.showBy(target);
		}
	},

	onWindowMenuBeforeShow: function(menu) {
		var items = menu.items.items, win = menu.currentWindow;
		items[0].setDisabled(win.maximized !== true && win.hidden !== true); // Restore
		items[1].setDisabled(win.minimized === true); // Minimize
		items[2].setDisabled(win.maximized === true || win.hidden === true); // Maximize
	},

	onWindowMenuHide: function() {
		this.getWindowBar().contextMenu.currentWindow = null;
	},

	onWindowMenuRestore: function() {
		this.restoreWindow(this.getWindowBarContextMenu().currentWindow);
	},

	onWindowMenuMinimize: function() {
		this.getWindowBarContextMenu().currentWindow.minimize();
	},

	onWindowMenuMaximize: function() {
		this.getWindowBarContextMenu().currentWindow.maximize();
	},

	onWindowMenuClose: function() {
		this.getWindowBarContextMenu().currentWindow.close();
	},

	onShortcutItemClick: function(view, record) {
		var data = record.getData();
		var controller = this.application.getController(data.id);

		if (!controller.isInit) {
			controller.init(this.application);
			controller.isInit = true
		}
		this.addWindow(data.id, controller['get' + data.view + 'View']());
	},

	addTaskButton: function(win) {
		var config = {
			iconCls: win.iconCls,
			enableToggle: true,
			toggleGroup: 'all',
			width: 140,
			margins: '0 2 0 3',
			text: Ext.util.Format.ellipsis(win.title, 20),
			listeners: {
				click: this.onWindowBtnClick,
				scope: this
			},
			win: win
		};

		var cmp = this.getWindowBar().add(config);
		cmp.toggle(true);
		return cmp;
	},

	removeTaskButton: function(btn) {
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

	setActiveButton: function(btn) {
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

	onWindowBtnClick: function(btn) {
		var win = btn.win;
		if (win.minimized || win.hidden) {
			win.show();
		} else if (win.active) {
			win.minimize();
		} else {
			win.toFront();
		}
	},

	onDesktopContextmenu: function(e) {
		this.getDesktop().contextMenu.showAt(e.getXY());
	},

	onDesktopContextmenuBeforeShow: function(menu) {
		var count = this.windows.getCount();

		menu.items.each(function(item) {
			var min = item.minWindows || 0;
			item.setDisabled(count < min);
		});
	},

	// ------------------------------------------------------
	// Window management methods

	addWindow: function(winId, viewClass) {

		var me = this;
		var exWin = me.windows.get(winId);

		if (exWin) {
			me.restoreWindow(exWin);
			return exWin;
		}

		var win = new viewClass({
			windowId: winId,
			stateful: false,
			constrainHeader: true,
			minimizable: true,
			maximizable: true
		});

		me.getDesktop().add(win);
		me.windows.add(winId, win);

		win.taskButton = me.addTaskButton(win);
		win.animateTarget = win.taskButton.el;

		win.on({
			activate: me.updateActiveWindow,
			beforeshow: me.updateActiveWindow,
			deactivate: me.updateActiveWindow,
			minimize: me.minimizeWindow,
			destroy: me.onWindowClose,
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

		me.restoreWindow(win);
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

	onDesktopContextmenuTile: function() {
		var me = this, availWidth = me.getDesktop().getWidth(true);

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

	minimizeWindow: function(win) {
		win.minimized = true;
		win.hide();
	},

	onWindowClose: function(win) {
		this.getDesktop().remove(win);
		this.windows.removeAtKey(win.windowId);
		this.removeTaskButton(win.taskButton);
		this.updateActiveWindow();
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

		this.setActiveButton(activeWindow && activeWindow.taskButton);
	}

});