Ext.define('E4desk.controller.SettingsController', {
	extend: 'Deft.mvc.ViewController',

	control: {
		wallpaperDataview: {
			selectionchange: 'onWallpaperDataviewSelectionChange'
		},
		okButton: {
			click: 'onOkButtonClick'
		},
		cancelButton: {
			click: 'onCancelButtonClick'
		},
		picturepos: {
			change: 'onPictureposChange'
		},
		previewWallpaper: true
	},
	
	oldWallpaperUrl: null,
	oldPicturePosition: null,
	newWallpaperUrl: null,
	newPicturePosition: null,
	
	init: function() {
		this.oldWallpaperUrl = this.desktopWallpaper.wallpaper;
		this.oldPicturePosition = this.desktopWallpaper.picturePosition;
		
		this.getPicturepos().setValue({pos: this.oldPicturePosition});
		this.getWallpaperDataview().getStore().on('load', this.onStoreLoad, this, {single: true});
	},
	
	onStoreLoad: function() {
		var me = this;
		var sitem = null;
		
		this.getWallpaperDataview().getStore().each(function(item) {
			if (item.data.img === me.oldWallpaperUrl) {				
				sitem = item;
				return false;
			}
		});

		if (sitem) {
			this.getWallpaperDataview().getSelectionModel().select(sitem);
		}
	},
	
	onWallpaperDataviewSelectionChange: function(model, selected) {
		this.newWallpaperUrl = selected[0].data.img;
    	this.getPreviewWallpaper().setWallpaper(this.newWallpaperUrl, 'stretch');
    	this.desktopWallpaper.setWallpaper(this.newWallpaperUrl, this.newPicturePosition);
	},
	
	onPictureposChange: function(field, newValue) {
		this.newPicturePosition = newValue.pos;
		this.desktopWallpaper.setWallpaper(this.newWallpaperUrl, this.newPicturePosition);
	},
	
	onOkButtonClick: function() {
		infrastructureService.saveUserSettings(this.newWallpaperUrl, this.newPicturePosition);		
		this.getView().close();
	},
	
	onCancelButtonClick: function() {
		this.desktopWallpaper.setWallpaper(this.oldWallpaperUrl, this.oldPicturePosition);
		this.getView().close();
	}
	
});