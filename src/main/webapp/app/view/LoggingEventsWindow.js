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
Ext.define('E4desk.view.LoggingEventsWindow', {
	extend: 'Ext.window.Window',
	controller: 'E4desk.controller.LoggingEventsController',
	stateId: 'E4desk.view.LoggingEventsWindow',
	title: i18n.logevents,
	width: 800,
	height: 700,
	iconCls: 'loggingevents-icon',
	layout: 'fit',

	initComponent: function() {
		this.items = Ext.create('E4desk.view.LoggingEventsGrid', {
			itemId: 'grid'
		});

		this.callParent(arguments);
	}

});
