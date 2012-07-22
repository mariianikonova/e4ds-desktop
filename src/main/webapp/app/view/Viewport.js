Ext.define('E4dsDesk.view.Viewport', {
	extend: 'Ext.Viewport',

	requires: [ 'E4dsDesk.view.Desktop' ],

	layout: 'fit',

	initComponent: function() {
		this.items = [ {
			xtype: 'desktop'
		} ];

		this.callParent(arguments);
	}

});