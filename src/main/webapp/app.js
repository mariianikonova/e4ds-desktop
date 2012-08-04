Ext.Loader.setConfig({
	enabled: true,
	paths: {
		'E4desk': 'app'
	}
});

Ext.onReady(function() {
	Ext.fly('floatingCirclesG').destroy();
	
	var heartbeat = new Ext.direct.PollingProvider({
		type: 'polling',
		interval: 5*60*1000, //5 minutes
		url: Ext.app.POLLING_URLS.heartbeat
	});	
	Ext.direct.Manager.addProvider(Ext.app.REMOTING_API, heartbeat);

	Ext.direct.Manager.on('event', function(e) {
		if (e.code && e.code === 'parse') {
			window.location.reload();
		}
	});

	Ext.direct.Manager.on('exception', function(e) {
		if (e.message === 'accessdenied') {
			Ext.ux.window.Notification.error("Error", "Access denied");
		} else {
			Ext.ux.window.Notification.error("Error", e.message);
		}
	});
	
	/*
	Deft.Injector.configure({
		moduleStore: 'E4desk.store.ModuleStore'
	});
	*/
	
	Ext.tip.QuickTipManager.init();
	Ext.create('E4desk.view.Viewport');
});

