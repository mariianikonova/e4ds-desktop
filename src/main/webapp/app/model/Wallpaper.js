Ext.define('E4desk.model.Wallpaper', {
	extend: 'Ext.data.Model',
	fields: [ {
		name: 'text',
		type: 'string'
	}, {
		name: 'img',
		type: 'string'
	} ],
	proxy: {
		type: 'direct',
		directFn: wallpaperService.read
	}
});
