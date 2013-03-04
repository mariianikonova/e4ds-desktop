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
Ext.define('E4desk.view.UsersWindow', {
	extend: 'Ext.window.Window',
	controller: 'E4desk.controller.UsersController',
	stateId: 'E4desk.view.UsersWindow',
	title: i18n.user,
	width: 1070,
	height: 500,
	iconCls: 'users-icon',

	layout: {
		type: 'border'
	},

	defaults: {
		split: true
	},

	initComponent: function() {
		this.items = [ Ext.create('E4desk.view.UsersGrid', {
			itemId: 'grid',
			region: 'center',
			store: this.getController().store
		}), Ext.create('E4desk.view.UserEdit', {
			itemId: 'form',
			hidden: true,
			region: 'east'
		}) ];

		this.callParent(arguments);
	}

});
