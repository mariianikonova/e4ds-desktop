Ext.define('E4desk.controller.NotepadController', {
	extend: 'Deft.mvc.ViewController',
	inject: [ 'messageBus' ],
	
	config: {
		messageBus: null
	},

	init: function() {		
		console.log('init');
		this.getMessageBus().fireEvent('refresh', {someData: 'from notepad'});
	}
	

});