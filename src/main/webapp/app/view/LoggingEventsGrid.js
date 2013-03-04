/*
 * Copyright 2013 Ralph Schaer <ralphschaer@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Ext.define('E4desk.view.LoggingEventsGrid', {
	extend: 'Ext.grid.Panel',

	requires: [ 'Ext.ux.RowExpander' ],

	plugins: [ {
		ptype: 'rowexpander',
		expandOnEnter: false,
		expandOnDblClick: false,
		selectRowOnExpand: true,
		rowBodyTpl: [ '<tpl if="stacktrace">', '<p>{stacktrace}</p>', '</tpl>', '<tpl if="!stacktrace">', '<p>{message}</p>', '</tpl>' ]
	} ],

	initComponent: function() {
		var me = this;

		me.store = Ext.create('E4desk.store.LoggingEvents');

		me.columns = [ {
			text: i18n.logevents_timestamp,
			dataIndex: 'dateTime',
			width: 160,
			xtype: 'datecolumn',
			format: 'd.m.Y H:i:s'
		}, {
			text: i18n.logevents_level,
			dataIndex: 'level',
			width: 70
		}, {
			text: i18n.logevents_message,
			dataIndex: 'message',
			width: 200
		}, {
			text: i18n.logevents_callerclass,
			dataIndex: 'callerClass',
			sortable: false,
			flex: 1
		}, {
			text: i18n.logevents_callerline,
			dataIndex: 'callerLine',
			align: 'right',
			sortable: false,
			width: 70
		} ];

		me.dockedItems = [ {
			xtype: 'toolbar',
			dock: 'top',
			items: [ {
				text: 'Export',
				itemId: 'exportButton',
				icon: app_context_path + '/resources/images/document_down.png',
				href: 'loggingEventExport.txt',
				hrefTarget: '_self'
			}, '-', {
				text: i18n.logevents_deleteall,
				itemId: 'deleteAllButton',
				icon: app_context_path + '/resources/images/eraser.png'
			},/* <debug> */'-', {
				text: i18n.logevents_addtest,
				itemId: 'testButton',
				icon: app_context_path + '/resources/images/add.png'
			},/* </debug> */'->', {
				xtype: 'combobox',
				fieldLabel: i18n.logevents_filter,
				labelWidth: 40,
				itemId: 'logLevelFilter',
				name: 'logLevelFilter',
				store: Ext.create('E4desk.store.LogLevels'),
				valueField: 'level',
				displayField: 'level',
				queryMode: 'local',
				forceSelection: true,
				plugins: Ext.create('Ext.ux.form.field.ClearButton', {
					hideClearButtonWhenEmpty: false,
					hideClearButtonWhenMouseOut: false
				})
			} ]
		}, {
			xtype: 'pagingtoolbar',
			itemId: 'pagingtoolbar',
			dock: 'bottom',
			store: me.store,
			displayInfo: true,
			displayMsg: i18n.logevents_display,
			emptyMsg: i18n.logevents_nodata
		} ];

		me.callParent(arguments);

	}

});