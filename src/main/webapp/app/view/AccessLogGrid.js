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
Ext.define('E4desk.view.AccessLogGrid', {
	extend: 'Ext.grid.Panel',

	requires: [ 'Ext.ux.form.field.FilterField' ],

	initComponent: function() {
		var me = this;

		me.store = Ext.create('E4desk.store.AccessLogs');

		me.columns = [ {
			text: i18n.accesslog_user,
			dataIndex: 'userName',
			flex: 1
		}, {
			text: i18n.accesslog_browser,
			dataIndex: 'browser',
			width: 180,
			sortable: false
		}, {
			text: i18n.accesslog_login,
			dataIndex: 'logIn',
			width: 150,
			xtype: 'datecolumn',
			format: 'Y-m-d H:i:s'
		}, {
			text: i18n.accesslog_logout,
			dataIndex: 'logOut',
			width: 150,
			xtype: 'datecolumn',
			format: 'Y-m-d H:i:s'
		}, {
			text: i18n.accesslog_duration,
			dataIndex: 'duration',
			width: 200,
			sortable: false
		} ];

		me.dockedItems = [ {
			xtype: 'toolbar',
			dock: 'top',
			items: [ {
				text: i18n.accesslog_deleteall,
				itemId: 'deleteAllButton',
				icon: app_context_path + '/resources/images/eraser.png'
			}, /* <debug> */'-', {
				text: i18n.accesslog_testinsert,
				itemId: 'testButton',
				icon: app_context_path + '/resources/images/add.png'
			}, /* </debug> */'->', {
				fieldLabel: i18n.accesslog_user,
				itemId: 'filterField',
				labelWidth: 40,
				xtype: 'filterfield'
			} ]
		}, {
			xtype: 'pagingtoolbar',
			itemId: 'pagingtoolbar',
			dock: 'bottom',
			store: me.store,
			displayInfo: true,
			displayMsg: i18n.accesslog_display,
			emptyMsg: i18n.accesslog_nodata
		} ];

		me.callParent(arguments);

	}

});