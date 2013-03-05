Ext.define('E4desk.controller.LoggingEventsController', {
	extend: 'Deft.mvc.ViewController',

	control: {
		view: {
			show: 'onShow'
		},
		grid: true,
		deleteAllButton: {
			click: 'deleteAll'
		},
		/* <debug> */
		testButton: {
			click: 'addTestData'
		},
		/* </debug> */
		logLevelFilter: {
			change: 'filterLogLevel'
		},
		pagingtoolbar: true,
		exportButton: true
	},

	filterLogLevel: function(field, newValue, oldValue) {
		var myStore = this.getGrid().getStore();
		if (newValue) {
			myStore.remoteFilter = false;
			myStore.clearFilter(true);
			myStore.remoteFilter = true;
			myStore.filter('level', newValue);
			this.getExportButton().setParams({
				level: newValue
			});
		} else {
			myStore.clearFilter();
			this.getExportButton().setParams();
		}
	},

	deleteAll: function() {
		var filter = this.getGrid().getStore().filters.get(0);
		loggingEventService.deleteAll(filter && filter.value, function() {
			Ext.ux.window.Notification.info(i18n.successful, i18n.logevents_deleted);
			this.doGridRefresh();
		}, this);
	},

	addTestData: function() {
		loggingEventService.addTestData(function() {
			Ext.ux.window.Notification.info(i18n.successful, i18n.logevents_testinserted);
			this.doGridRefresh();
		}, this);

	},

	onShow: function() {
		this.doGridRefresh();
	},

	doGridRefresh: function() {
		this.getPagingtoolbar().doRefresh();
	}

});