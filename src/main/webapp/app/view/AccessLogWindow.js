Ext.define('E4desk.view.AccessLogWindow', {
	extend: 'Ext.window.Window',
	controller: 'E4desk.controller.AccessLogController',
	stateId: 'E4desk.view.AccessLogWindow',

	title: i18n.accesslog,
	width: 840,
	height: 560,
	iconCls: 'accesslog-icon',
	layout: 'fit',

	initComponent: function() {
		this.items = Ext.create('E4desk.view.AccessLogGrid', {
			itemId: 'grid'
		});

		this.callParent(arguments);
	}

});
