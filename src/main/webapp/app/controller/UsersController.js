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
Ext.define('E4desk.controller.UsersController', {
	extend: 'Deft.mvc.ViewController',

	store: Ext.create('E4desk.store.Users'),

	observe: {
		store: {
			load: 'onStoreLoad'
		}
	},

	control: {
		view: {
			show: 'onShow'
		},
		grid: {
			itemdblclick: 'onGridItemDblClick',
			itemclick: 'onGridItemClick',
			selectionchange: 'onSelectionChange'
		},
		addButton: {
			click: 'onAddButtonClick'
		},
		editButton: {
			click: 'onEditButtonClick'
		},
		deleteButton: {
			click: 'onDeleteButtonClick'
		},
		switchButton: {
			click: 'onSwitchButtonClick'
		},
		filterField: {
			filter: 'handleFilter'
		},
		pagingtoolbar: true,
		exportButton: true,
		form: {
			show: 'onFormShow'
		},
		cancelButton: {
			click: 'onCancelButtonClick'
		},
		saveButton: {
			click: 'onSaveButtonClick'
		}
	},

	handleFilter: function(field, newValue) {
		var myStore = this.getGrid().getStore();
		if (newValue) {
			myStore.remoteFilter = false;
			myStore.clearFilter(true);
			myStore.remoteFilter = true;
			myStore.filter('filter', newValue);

			this.getExportButton().setParams({
				filter: newValue
			});
		} else {
			myStore.clearFilter();
			this.getExportButton().setParams();
		}
	},

	onGridItemDblClick: function(grid, record) {
		this.edit(record);
	},

	onSelectionChange: function() {
		if (this.getGrid().getSelectionModel().hasSelection()) {
			this.getDeleteButton().enable();
			this.getEditButton().enable();
			this.getSwitchButton().enable();
		} else {
			this.getDeleteButton().disable();
			this.getEditButton().disable();
			this.getSwitchButton().disable();			
		}
	},

	onFormShow: function(panel) {
		panel.getComponent('email').focus();
	},

	onGridItemClick: function(grid, record) {
		if (this.getForm().isVisible()) {
			this.edit(record);
		}
	},

	onEditButtonClick: function() {
		this.edit(this.getGrid().getSelectionModel().getSelection()[0]);
	},

	onCancelButtonClick: function() {
		this.getForm().setVisible(false);
	},

	edit: function(record) {
		var editPanel = this.getForm();
		editPanel.setVisible(true);

		var form = editPanel.getForm();
		form.loadRecord(record);
	},

	onAddButtonClick: function() {
		this.getGrid().getSelectionModel().deselectAll();
		var editPanel = this.getForm();
		editPanel.setVisible(true);
		editPanel.getForm().reset(true);
		editPanel.getForm().isValid();
	},

	onDeleteButtonClick: function(button) {
		var record = this.getGrid().getSelectionModel().getSelection()[0];
		if (record) {
			Ext.Msg.confirm(i18n.user_deleteuserquestion, 
				i18n.user_deleteuserconfirm + ' ' + record.data.name, 
				this.afterConfirmDelete, this);
		}
	},

	onSwitchButtonClick: function() {
		var record = this.getGrid().getSelectionModel().getSelection()[0];
		if (record) {
			infrastructureService.switchUser(record.data.id, function(ok) {
				if (ok) {
					window.location.reload();
				}
			}, this);
		}
	},
	
	afterConfirmDelete: function(btn) {
		if (btn === 'yes') {
			var record = this.getGrid().getSelectionModel().getSelection()[0];
			if (record) {
				record.destroy();
				this.getPagingtoolbar().doRefresh();
				Ext.ux.window.Notification.info(i18n.successful, i18n.user_deleted);
			}
		}
	},

	onShow: function() {
		this.getPagingtoolbar().doRefresh();
	},

	onStoreLoad: function() {
		if (this.getForm().isVisible()) {
			this.getForm().setVisible(false);
		}
	},

	onSaveButtonClick: function() {
		var form = this.getForm().getForm(), record = form.getRecord();

		form.submit({
			params: {
				id: record ? record.data.id : ''
			},
			scope: this,
			success: function() {
				this.getPagingtoolbar().doRefresh();
				Ext.ux.window.Notification.info(i18n.successful, i18n.user_saved);
			}
		});

	}

});