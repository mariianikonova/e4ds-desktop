Ext.define('E4desk.view.Viewport', {
	extend: 'Ext.Viewport',
	layout: 'fit',

	initComponent: function() {
		this.items = [ Ext.create('E4desk.view.Desktop') ];
		this.callParent(arguments);
	}

});