Ext.define('E4desk.view.Settings', {
	extend: 'Ext.window.Window',
	controller: 'E4desk.controller.SettingsController',

	layout: 'border',
	title: 'Change Settings',
	modal: true,
	width: 640,
	height: 480,
	border: false,
	constrain: true,

	initComponent: function() {

		this.preview = Ext.create('E4desk.view.Wallpaper', {
			itemId: 'previewWallpaper'
		});

		this.buttons = [ {
			text: 'OK',
			itemId: 'okButton'
		}, {
			text: 'Cancel',
			handler: function() {
				this.close()
			},
			scope: this
		} ];

		this.items = [ {
			xtype: 'panel',
			region: 'west',
			layout: 'fit',
			title: 'Desktop Background',
			width: 150,
			items: [ {
				itemId: 'wallpaperDataview',
				xtype: 'dataview',
				store: Ext.create('E4desk.store.WallpaperStore'),
				itemSelector: 'div.wallpaper-item',
				selectedItemCls: 'wallpaper-item-selected',
				overItemCls: 'wallpaper-item-over',
				trackOver: true,
				tpl: [ '<tpl for=".">', '<div class="wallpaper-item">', '{text}', '</div>', '</tpl>' ]
			} ]
		}, {
			xtype: 'panel',
			title: 'Preview',
			region: 'center',
			layout: 'fit',
			items: [ this.preview ]
		}, {			
			xtype: 'checkbox',
			region: 'south',
			itemId: 'stretchCheckbox',
			boxLabel: 'Stretch to fit'
		} ];

		this.callParent();
	}
});
