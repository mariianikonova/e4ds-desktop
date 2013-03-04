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
Ext.define('E4desk.App', {
	extend: 'Deft.mvc.Application',
	requires: [ 'Ext.ux.window.Notification', 'E4desk.view.Viewport' ],

	init: function() {
		Ext.fly('circularG').destroy();

		Ext.tip.QuickTipManager.init();

		if (this.hasLocalstorage()) {
			Ext.state.Manager.setProvider(Ext.create('Ext.state.LocalStorageProvider'));
		} else {
			Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
		}

		if (Ext.view.AbstractView) {
			Ext.view.AbstractView.prototype.loadingText = i18n.loading;
		}

		this.setupGlobalErrorHandler();

		Ext.direct.Manager.on('event', function(e) {
			if (e.code && e.code === 'parse') {
				window.location.reload();
			}
		});

		Ext.direct.Manager.on('exception', function(e) {
			if (e.message === 'accessdenied') {
				Ext.ux.window.Notification.error(i18n.error, i18n.error_accessdenied);
			} else {
				Ext.ux.window.Notification.error(i18n.error, e.message);
			}
		});

		var prov = Ext.direct.Manager.getProvider('remoting');
		prov.on({
			call: function() {
				Ext.getCmp('server_connect_status').setSrc(app_context_path + '/resources/images/connect-on.gif');
			},
			data: function() {
				Ext.getCmp('server_connect_status').setSrc(app_context_path + '/resources/images/connect-off.gif');
			}
		});

		Ext.apply(Ext.form.field.VTypes, {
			password: function(val, field) {
				if (field.initialPassField) {
					var pwd = field.up('form').down('#' + field.initialPassField);
					return (val === pwd.getValue());
				}
				return true;
			},

			passwordText: i18n.user_passworddonotmatch
		});

		Deft.Injector.configure({
			messageBus: 'Ext.util.Observable'
		});

		Ext.create('E4desk.view.Viewport');
	},

	setupGlobalErrorHandler: function() {
		var existingFn = window.onerror;
		if (typeof existingFn === 'function') {
			window.onerror = Ext.Function.createSequence(existingFn, this.globalErrorHandler);
		} else {
			window.onerror = this.globalErrorHandler;
		}
	},

	globalErrorHandler: function(msg, url, line) {
		var message = msg + "-->" + url + "::" + line;
		logService.error(message);
	},

	hasLocalstorage: function() {
		try {
			return !!localStorage.getItem;
		} catch (e) {
			return false;
		}
	}
});

Ext.onReady(function() {
	Ext.create('E4desk.App');
});