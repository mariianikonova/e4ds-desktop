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
	iconCls: 'settings',

	initComponent: function() {

		this.preview = Ext.create('E4desk.view.Wallpaper', {
			itemId: 'previewWallpaper'
		});

		this.buttons = [ {
			text: 'OK',
			itemId: 'okButton'
		}, {
			text: 'Cancel',
			itemId: 'cancelButton'
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
				itemSelector: 'div.settings-wallpaper-item',
				selectedItemCls: 'settings-wallpaper-item-selected',
				overItemCls: 'view-over',
				trackOver: true,
				tpl: [ '<tpl for=".">', '<div class="settings-wallpaper-item">', '{text}', '</div>', '</tpl>' ]
			} ]
		}, {
			xtype: 'panel',
			title: 'Preview',
			region: 'center',
			layout: 'fit',
			items: [ this.preview ]
		}, {
			xtype: 'radiogroup',
			itemId: 'picturepos',
			region: 'south',
			fieldLabel: 'Picture Position',
			items: [
				{ boxLabel: 'Original Size, Center', name: 'pos', inputValue: 'center' },
				{ boxLabel: 'Original Size, Tile', name: 'pos', inputValue: 'tile' },
				{ boxLabel: 'Strech', name: 'pos', inputValue: 'stretch' }
			]
		} ];

		this.callParent();
	}
});
