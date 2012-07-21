Ext.define('E4dsDesk.model.Module', {
	extend: 'Ext.data.Model',

	fields: [ {
		name: 'id',
		type: 'string'
	}, {
		name: 'name',
		type: 'string'
	}, {
		name: 'iconCls',
		type: 'string'
	}, {
		name: 'view',
		type: 'string'
	}],

	proxy: {
		type: 'direct',
		directFn: moduleService.read
	}
});