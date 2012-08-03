Ext.define('E4desk.view.TopBar', {
	extend: 'Ext.toolbar.Toolbar',
	itemId: 'topBar',

	initComponent: function() {
		this.items = [ {
			text: 'Application Menu',			
			menu: {
				xtype: 'menu',
				itemId: 'applicationMenu'				
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
