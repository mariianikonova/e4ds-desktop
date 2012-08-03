Ext.Loader.setConfig({
	enabled: true,
	paths: {
		'E4desk': 'app'
	}
});


Ext.onReady(function() {
	Ext.fly('floatingCirclesG').destroy();
	
	Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

	/*
	Deft.Injector.configure({
		moduleStore: 'E4desk.store.ModuleStore'
	});
	*/
	
	Ext.tip.QuickTipManager.init();
	Ext.create('E4desk.view.Viewport');
});

