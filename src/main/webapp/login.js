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
Ext.onReady(function() {
	Ext.QuickTips.init();

	var login = Ext.create('Ext.form.Panel', {
		frame: true,
		title: 'e4desk',
		url: 'j_spring_security_check',
		width: 380,
		icon: 'resources/images/key.png',

		standardSubmit: true,

		defaults: {
			anchor: '100%'
		},

		defaultType: 'textfield',

		fieldDefaults: {
			msgTarget: 'side'
		},

		items: [ {
			fieldLabel: i18n.user_email,
			name: 'j_username',
			allowBlank: false,
			listeners: {
				specialkey: function(field, e) {
					if (e.getKey() === e.ENTER) {
						submitForm();
					}
				}
			}
		}, {
			fieldLabel: i18n.user_password,
			name: 'j_password',
			inputType: 'password',
			allowBlank: true,
			listeners: {
				specialkey: function(field, e) {
					if (e.getKey() === e.ENTER) {
						submitForm();
					}
				}
			}
		}, {
			fieldLabel: i18n.login_rememberme,
			name: '_spring_security_remember_me',
			xtype: 'checkbox'
		} ],

		buttons: [ /* <debug> */{
			text: i18n.login_withuser,
			handler: function() {
				var form = this.up('form').getForm();
				form.setValues({
					j_username: 'user@e4desk.ch',
					j_password: 'user'
				});
				form.submit();
			}
		}, {
			text: i18n.login_withadmin,
			handler: function() {
				var form = this.up('form').getForm();
				form.setValues({
					j_username: 'admin@e4desk.ch',
					j_password: 'admin'
				});
				form.submit();
			}
		},/* </debug> */{
			text: i18n.login,
			handler: function() {
				submitForm();
			}
		} ]
	});

	Ext.create('Ext.container.Viewport', {
		layout: 'fit',
		renderTo: Ext.getBody(),

		items: [ {
			xtype: 'panel',
			border: false,
			style: 'background-color: white',
			layout: {
				type: 'vbox',
				align: 'center',
				pack: 'center'
			},
			items: login,
			dockedItems: [ {
				dock: 'top',
				xtype: 'toolbar',
				items: [ {
					xtype: 'image',
					src: app_context_path + '/resources/images/favicon32.png',
					margin: '2px 10px 2px 5px',
					width: 32,
					height: 32
				}, {
					xtype: 'label',
					text: 'e4desk',
					cls: 'appLabel',
					padding: '5 0 0 0',
					height: 30
				} ]
			} ]
		} ]
	});

	function submitForm() {
		var form = login.getForm();
		if (form.isValid()) {
			form.submit();
		}
	}

	login.getForm().findField('j_username').focus();

});