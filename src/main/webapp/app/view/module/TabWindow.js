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
Ext.define('E4desk.view.module.TabWindow', {
	extend: 'Ext.window.Window',

	title: 'Tab Window',
	width: 740,
	height: 480,
	iconCls: 'tabs-icon',
	layout: 'fit',

	initComponent: function() {

		this.items = [ {
			xtype: 'tabpanel',
			activeTab: 0,
			bodyStyle: 'padding: 5px;',

			items: [ {
				title: 'Tab Text 1',
				header: false,
				html: '<p>Tab1: Something useful would be in here.</p>',
				border: false
			}, {
				title: 'Tab Text 2',
				header: false,
				html: '<p>Tab2: Something useful would be in here.</p>',
				border: false
			}, {
				title: 'Tab Text 3',
				header: false,
				html: '<p>Tab3: Something useful would be in here.</p>',
				border: false
			}, {
				title: 'Tab Text 4',
				header: false,
				html: '<p>Tab4: Something useful would be in here.</p>',
				border: false
			} ]
		} ];

		this.callParent(arguments);
	}

});
