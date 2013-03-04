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
Ext.define('E4desk.view.UsersGrid', {
	extend: 'Ext.grid.Panel',

	requires: [ 'Ext.ux.form.field.FilterField' ],

	initComponent: function() {

		var me = this;

		me.columns = [ {
			text: i18n.user_email,
			dataIndex: 'email',
			flex: 1
		}, {
			text: i18n.user_firstname,
			dataIndex: 'firstName',
			flex: 1
		}, {
			text: i18n.user_name,
			dataIndex: 'name',
			flex: 1
		}, {
			text: 'Roles',
			dataIndex: 'roles',
			width: 160,
			renderer: function(value, metadata, record) {
				var roles = record.roles();
				var result = '';
				if (roles) {
					roles.each(function(item, index, count) {
						result += item.get('name');
						if (index + 1 < count) {
							result += ', ';
						}
					});
				}
				return result;
			}
		}, {
			text: i18n.user_active,
			dataIndex: 'enabled',
			width: 70,
			renderer: function(value) {
				if (value === true) {
					return i18n.yes;
				}
				return i18n.no;
			}
		} ];

		me.dockedItems = [ {
			xtype: 'toolbar',
			dock: 'top',
			items: [ {
				text: i18n.user_new,
				disabled: false,
				itemId: 'addButton',
				icon: app_context_path + '/resources/images/add.png'
			}, {
				text: i18n.user_edit,
				disabled: true,
				itemId: 'editButton',
				icon: app_context_path + '/resources/images/edit.png'
			}, {
				text: i18n.user_delete,
				disabled: true,
				itemId: 'deleteButton',
				icon: app_context_path + '/resources/images/eraser.png'
			}, '-', {
				text: i18n.user_export,
				itemId: 'exportButton',
				icon: app_context_path + '/resources/images/excel.gif',
				href: 'usersExport.xls',
				hrefTarget: '_self'
			}, {
				xtype: 'tbseparator'
			}, {
				text: i18n.user_switchto,
				itemId: 'switchButton',
				icon: app_context_path + '/resources/images/spy.png',
				disabled: true
			}, '->', {
				itemId: 'filterField',
				fieldLabel: i18n.user_filter,
				labelWidth: 40,
				xtype: 'filterfield'
			} ]
		}, {
			xtype: 'pagingtoolbar',
			itemId: 'pagingtoolbar',
			dock: 'bottom',
			store: me.store,
			displayInfo: true,
			displayMsg: i18n.user_display,
			emptyMsg: i18n.user_nodata
		} ];

		me.callParent(arguments);

	}

});