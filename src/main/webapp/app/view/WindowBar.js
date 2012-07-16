Ext.define('E4dsDesk.view.WindowBar', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.windowbar',

	cls: 'ux-desktop-windowbar',
	layout: {
		overflowHandler: 'Scroller'
	},

	contextMenu: Ext.create('Ext.menu.Menu', {
		defaultAlign: 'br-tr',
		itemId: 'windowbar-contextmenu',
		items: [ {
			text: 'Restore',
			actionType: 'restore'
		}, {
			text: 'Minimize',
			actionType: 'minimize'
		}, {
			text: 'Maximize',
			actionType: 'maximize'
		}, '-', {
			text: 'Close',
			actionType: 'close'
		} ]
	}),

	listeners: {
		contextmenu: {
			element: 'el',
			fn: function(e) {
				e.stopEvent();
				me.fireEvent("contextmenu", e.getTarget());
			}
		}
	}
});
