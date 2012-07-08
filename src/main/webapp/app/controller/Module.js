Ext.define('E4dsDesk.controller.Module', {
	extend: 'Ext.app.Controller',

	init: function(application, desktop) {
		this.desktop = desktop;
		this.isInit = true;
	},

	getDesktop: function() {
		return this.desktop;
	},

	launch: Ext.emptyFn
});