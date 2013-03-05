Ext.define('E4desk.controller.module.GridWindowController', {
	extend: 'Deft.mvc.ViewController',
	// inject: [ 'messageBus' ],
	//	
	// config: {
	// messageBus: null
	// },

	observe: {
		messageBus: {
			refresh: 'refreshHandler'
		}
	},

	init: function() {
		// console.log('init');
		// console.log(this.getMessageBus());
	},

	refreshHandler: function(e) {
		console.log('refresh: ', e);
		// this.messageBus.fireEvent('refreshed', {someData: 'hello'});
	}

});