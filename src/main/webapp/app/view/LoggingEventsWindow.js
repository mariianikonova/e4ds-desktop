Ext.define('E4desk.view.LoggingEventsWindow', {
	extend: 'Ext.window.Window',
	requires: ['E4desk.view.LoggingEventsGrid'],
	controller: 'E4desk.controller.LoggingEventsController',
	stateId: 'E4desk.view.LoggingEventsWindow',
	title: i18n.logevents,
	width: 800,
	height: 600,
	iconCls: 'loggingevents-icon',
	layout: 'fit',

	initComponent: function() {
		this.items = Ext.create('E4desk.view.LoggingEventsGrid', {
			itemId: 'grid'
		});

		this.callParent(arguments);
	}

});
