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
Ext.define('E4desk.view.UserEdit', {
	extend: 'Ext.form.Panel',

	requires: 'Ext.ux.form.field.BoxSelect',

	width: 400,

	defaultType: 'textfield',
	defaults: {
		anchor: '100%'
	},

	api: {
		submit: userService.userFormPost
	},

	fieldDefaults: {
		msgTarget: 'side'
	},

	bodyPadding: 10,

	initComponent: function() {

		var me = this;

		me.items = [ {
			itemId: 'email',
			name: 'email',
			fieldLabel: i18n.user_email,
			vtype: 'email',
			allowBlank: false,
			maxLength: 255,
			enforceMaxLength: true
		}, {
			name: 'firstName',
			fieldLabel: i18n.user_firstname,
			allowBlank: true,
			maxLength: 255,
			enforceMaxLength: true
		}, {
			name: 'name',
			fieldLabel: i18n.user_name,
			allowBlank: true,
			maxLength: 255,
			enforceMaxLength: true
		}, {
			name: 'passwordHash',
			fieldLabel: i18n.user_password,
			inputType: 'password',
			itemId: 'pass'
		}, {
			name: 'password-confirm',
			fieldLabel: i18n.user_confirmpassword,
			vtype: 'password',
			inputType: 'password',
			initialPassField: 'pass'
		}, {
			xtype: 'combobox',
			fieldLabel: i18n.user_language,
			name: 'locale',
			store: Ext.create('Ext.data.ArrayStore', {
				fields: [ 'code', 'language' ],
				data: [ [ 'de', i18n.user_language_german ], [ 'en', i18n.user_language_english ] ]
			}),
			valueField: 'code',
			displayField: 'language',
			queryMode: 'local',
			emptyText: i18n.user_selectlanguage,
			allowBlank: false,
			forceSelection: true
		}, {
			fieldLabel: i18n.user_active,
			name: 'enabled',
			xtype: 'checkboxfield',
			inputValue: 'true',
			uncheckedValue: 'false'
		}, {
			xtype: 'comboboxselect',
			name: 'roleIds',
			queryMode: 'local',
			pinList: false,
			fieldLabel: i18n.user_roles,
			store: Ext.create('E4desk.store.Roles'),
			displayField: 'name',
			valueField: 'id',
			allowBlank: false
		} ];

		me.buttons = [ {
			xtype: 'button',
			itemId: 'saveButton',
			text: i18n.save,
			icon: app_context_path + '/resources/images/save.png',
			disabled: true,
			formBind: true
		}, {
			text: i18n.cancel,
			itemId: 'cancelButton',
			icon: app_context_path + '/resources/images/cancel.png'
		} ];

		me.callParent(arguments);

	}

});