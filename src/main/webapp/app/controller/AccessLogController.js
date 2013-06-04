Ext.define('E4desk.controller.AccessLogController', {
	extend: 'Deft.mvc.ViewController',

	control: {
		view: {
			show: 'onShow'
		},
		grid: true,
		pagingtoolbar: true,
		deleteAllButton: {
			click: 'deleteAll'
		},
		/* <debug> */
		testButton: {
			click: 'addTestData'
		},
		/* </debug> */
		filterField: {
			filter: 'handleFilter'
		}
	},

	handleFilter: function(field, newValue) {
		var myStore = this.getGrid().getStore();
		if (newValue) {
			myStore.clearFilter(true);
			myStore.filter('filter', newValue);
		} else {
			myStore.clearFilter();
		}
	},

	deleteAll: function() {
		accessLogService.deleteAll(function() {
			Ext.ux.window.Notification.info(i18n.successful, i18n.accesslog_deleted);
			this.doGridRefresh();
		}, this);
	},

	addTestData: function() {
		accessLogService.addTestData(function() {
			Ext.ux.window.Notification.info(i18n.successful, i18n.accesslog_testinserted);
			this.doGridRefresh();
		}, this);
	},

	onShow: function() {
		this.doGridRefresh();
	},

	doGridRefresh: function() {
		this.getGrid().getStore().load();
	}

});