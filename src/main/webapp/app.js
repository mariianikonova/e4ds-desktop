Ext.Loader.setConfig({
	enabled: true
});

Ext.require('Ext.direct.*', function() {
	Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
});

Ext.application({
	controllers: [ 'Desktop' ],
	autoCreateViewport: true,
	name: 'E4dsDesk',
	launch: function() {
		Ext.fly('appLoadingIndicator').destroy();
	}
});
