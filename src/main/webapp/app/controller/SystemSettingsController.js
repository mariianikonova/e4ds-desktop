Ext.define('E4desk.controller.SystemSettingsController', {
	extend: 'Deft.mvc.ViewController',

	control: {
		logLevelCB: {
			change: 'onLogLevelChange'
		},
		view: {
			show: 'onShow'
		},
		okButton: {
			click: 'onOkButtonClick'
		},
		cancelButton: {
			click: 'onCancelButtonClick'
		}
	},

	onShow: function() {
		loggingEventService.getCurrentLevel(function(result) {
			this.getLogLevelCB().suspendEvents(false);
			this.getLogLevelCB().setValue(result);
			this.getLogLevelCB().resumeEvents();
		}, this);
	},

	onLogLevelChange: function(field, newValue, oldValue) {
		loggingEventService.changeLogLevel(newValue, function() {
			Ext.ux.window.Notification.info(i18n.successful, i18n.systemsettings_loglevelchanged);
		});
	},

	onOkButtonClick: function() {
		this.getView().close();
	},

	onCancelButtonClick: function() {
		this.getView().close();
	}

});