Ext.define('E4desk.view.SystemSettings', {
	extend: 'Ext.window.Window',
	controller: 'E4desk.controller.SystemSettingsController',
	stateId: 'E4desk.view.SystemSettings',
	stateful: true,
	layout: 'fit',
	title: i18n.systemsettings,
	width: 500,
	height: 300,
	border: false,
	constrain: true,
	iconCls: 'systemsettings-icon',

	initComponent: function() {

		this.buttons = [ {
			text: i18n.save,
			itemId: 'okButton'
		}, {
			text: i18n.cancel,
			itemId: 'cancelButton'
		} ];

		this.items = Ext.create('Ext.tab.Panel', {

			items: [ Ext.create('Ext.form.Panel', {
				title: i18n.systemsettings_loglevel,

				fieldDefaults: {
					msgTarget: 'side'
				},

				bodyPadding: 5,

				items: [ {
					xtype: 'combobox',
					itemId: 'logLevelCB',
					fieldLabel: i18n.systemsettings_loglevel,
					name: 'logLevel',
					labelWidth: 110,
					store: Ext.create('E4desk.store.LogLevels'),
					valueField: 'level',
					displayField: 'level',
					queryMode: 'local',
					forceSelection: true,
					value: 'ERROR'
				} ]
			}) ]
		});

		this.callParent();
	}
});
