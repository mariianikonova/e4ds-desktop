Ext.define('E4dsDesk.controller.OnlineUsers', {
	extend: 'E4dsDesk.controller.Module',

	views: [ 'OnlineUsers' ],

	refs: [ {
		ref: 'onlineUsers',
		selector: 'onlineusers'
	} ],

	launch: function() {
		this.getDesktop().addWindow(this.getOnlineUsersView());
	}

});