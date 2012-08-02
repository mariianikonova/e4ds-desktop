Ext.define('E4desk.controller.SettingsController', {
	extend: 'Deft.mvc.ViewController',

	control: {
		wallpaperDataview: {
			selectionchange: 'onWallpaperDataviewSelectionChange'
		},
		previewWallpaper: true
	},

	init: function() {
		this.getWallpaperDataview().getStore().on('load', this.onStoreLoad, this);
	},
	
	onStoreLoad: function() {
		var s = this.desktopWallpaper.wallpaper;
		var selectedItem = null;

		this.getWallpaperDataview().getStore().each(function(item) {
			if (item.data.img === s) {				
				selectedItem = item;
				return false;
			}
		});

		if (selectedItem) {
			this.getWallpaperDataview().getSelectionModel().select(selectedItem);
		}
	},
	
	onWallpaperDataviewSelectionChange: function(model, selected) {
    	this.getPreviewWallpaper().setWallpaper(selected[0].data.img, true);
        this.desktopWallpaper.setWallpaper(selected[0].data.img, true);
	}
	
});