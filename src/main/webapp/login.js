Ext.onReady(function() {
	Ext.QuickTips.init();

	var login = Ext.create('Ext.form.Panel', {
		frame: true,
		title: 'Login',
		url: 'j_spring_security_check',
		width: 320,
		iconCls: 'icon-login',

		standardSubmit: true,

		defaults: {
			anchor: '100%'
		},

		defaultType: 'textfield',

		fieldDefaults: {
			msgTarget: 'side'
		},

		items: [ {
			fieldLabel: 'Username',
			name: 'j_username',
			allowBlank: false,
			listeners: {
				specialkey: function(field, e) {
					if (e.getKey() == e.ENTER) {
						submitForm();
					}
				}
			}
		}, {
			fieldLabel: 'Password',
			name: 'j_password',
			inputType: 'password',
			allowBlank: false,
			listeners: {
				specialkey: function(field, e) {
					if (e.getKey() == e.ENTER) {
						submitForm();
					}
				}
			}
		}, {
			fieldLabel: 'Remember Me',
			name: '_spring_security_remember_me',
			xtype: 'checkbox'
		} ],

		buttons: [ {
			text: 'Login with user',
			handler: function() {
				var form = this.up('form').getForm();
				form.setValues({
					j_username: 'user',
					j_password: 'user'
				});
				form.submit();
			}
		}, {
			text: 'Login with admin',
			handler: function() {
				var form = this.up('form').getForm();
				form.setValues({
					j_username: 'admin',
					j_password: 'admin'
				});
				form.submit();
			}
		}, {
			text: 'Login',
			handler: function() {
				submitForm();
			}
		} ]
	});

	Ext.create('Ext.container.Viewport', {
		layout: 'border',
		renderTo: Ext.getBody(),

		items: [ {
			xtype: 'container',
			region: 'center',
			style: 'background-color: white',
			layout: {
				type: 'vbox',
				align: 'center',
				pack: 'center'
			},
			items: login
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