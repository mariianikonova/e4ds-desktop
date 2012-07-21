Ext.define('E4dsDesk.view.TopBar', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.topbar',

	initComponent: function() {
		this.items = [ {
			text: 'Application Menu',
			menu: {
				xtype: 'menu',
				items: [ {
					text: 'regular item 1'
				}, {
					text: 'regular item 2'
				}, {
					text: 'regular item 3'
				} ]
			}
		},

		'->', 'Logged in as Admin', {
			text: 'Settings'
		}, '-',{
			text: 'Logout'
		} ];

		this.callParent(arguments);

	}
});
