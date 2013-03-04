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
Ext.define('E4desk.view.WindowBar', {
	extend: 'Ext.toolbar.Toolbar',
	itemId: 'windowBar',

	cls: 'windowbar',
	layout: {
		overflowHandler: 'Scroller'
	},

	contextMenu: Ext.create('Ext.menu.Menu', {
		defaultAlign: 'br-tr',
		items: [ {
			text: i18n.desktop_restore,
			action: 'restore'
		}, {
			text: i18n.desktop_minimize,
			action: 'minimize'
		}, {
			text: i18n.desktop_maximize,
			action: 'maximize'
		}, '-', {
			text: i18n.desktop_close,
			action: 'close'
		} ]
	}),

	initComponent: function() {
		var me = this;

		me.items = [ '->', {
			id: 'server_connect_status',
			xtype: 'image',
			src: app_context_path + '/resources/images/connect-off.gif',
			width: 20,
			height: 16,
			margin: '5 5 7 5'
		} ];

		me.callParent(arguments);
	}

});
