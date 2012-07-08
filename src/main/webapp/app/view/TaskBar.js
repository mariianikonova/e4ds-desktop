Ext.define('E4dsDesk.view.TaskBar', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.taskbar',

	cls: 'ux-taskbar',
	height: 25,

	requires: [ 'E4dsDesk.view.TrayClock' ],

	initComponent: function() {
		var me = this;

		this.items = [ {
			xtype: 'toolbar',
			flex: 1,
			cls: 'ux-desktop-windowbar',
			itemId: 'ux-desktop-windowbar',
			items: [],
			layout: {
				overflowHandler: 'Scroller'
			},
			listeners: {
				contextmenu: {
					element: 'el',
					fn: function(e) {
						e.stopEvent();
						me.fireEvent("contextmenu", e.getTarget());
					}
				}
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
			})
		}, '-', {
			xtype: 'toolbar',
			cls: 'ux-desktop-systemtray',
			itemId: 'ux-desktop-systemtray',
			items: [ {
				xtype: 'trayclock'
			} ]
		} ];

		this.callParent(arguments);
	}
});
