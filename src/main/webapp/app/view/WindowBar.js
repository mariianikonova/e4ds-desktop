Ext.define('E4desk.view.WindowBar', {
	extend: 'Ext.toolbar.Toolbar',
	itemId: 'windowBar',

	cls: 'ux-desktop-windowbar',
	layout: {
		overflowHandler: 'Scroller'
	},

	contextMenu: Ext.create('Ext.menu.Menu', {
		defaultAlign: 'br-tr',
		items: [ {
			text: 'Restore',
			action: 'restore'
		}, {
			text: 'Minimize',
			action: 'minimize'
		}, {
			text: 'Maximize',
			action: 'maximize'
		}, '-', {
			text: 'Close',
			action: 'close'
		} ]
	})
});
