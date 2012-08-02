Ext.define('E4desk.view.TopBar', {
	extend: 'Ext.toolbar.Toolbar',
	itemId: 'topBar',

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
			text: 'Settings',
			action: 'settings',
			itemId: 'topBarSettings'
		}, '-', {
			text: 'Logout'
		} ];

		this.callParent(arguments);

	}
});
