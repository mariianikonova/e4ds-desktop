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
		backgroundColor: {
			change: 'onBackgroundColorChange'
		},
		picturepos: {
			change: 'onPictureposChange'
		},
		previewWallpaper: true
	},
	
	oldWallpaperUrl: null,
	oldPicturePosition: null,
	oldBackgroundColor: null,
	newWallpaperUrl: null,
	newPicturePosition: null,
	newBackgroundColor: null,
	
	init: function() {
		this.oldWallpaperUrl = this.desktopWallpaper.wallpaper;
		this.oldPicturePosition = this.desktopWallpaper.picturePosition;
		this.oldBackgroundColor = this.desktopWallpaper.backgroundColor;
		
		this.getPicturepos().setValue({pos: this.oldPicturePosition});
		this.getBackgroundColor().setValue(this.oldBackgroundColor);
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
    	this.getPreviewWallpaper().setWallpaper(this.newWallpaperUrl, 'stretch', this.newBackgroundColor);
    	this.desktopWallpaper.setWallpaper(this.newWallpaperUrl, this.newPicturePosition, this.newBackgroundColor);
	},
	
	onBackgroundColorChange: function(field, newValue) {
		this.newBackgroundColor = newValue;
    	this.getPreviewWallpaper().setWallpaper(this.newWallpaperUrl, 'stretch', this.newBackgroundColor);
    	this.desktopWallpaper.setWallpaper(this.newWallpaperUrl, this.newPicturePosition, this.newBackgroundColor);
	},
	
	onPictureposChange: function(field, newValue) {
		this.newPicturePosition = newValue.pos;
		this.desktopWallpaper.setWallpaper(this.newWallpaperUrl, this.newPicturePosition, this.newBackgroundColor);
	},
	
	onOkButtonClick: function() {
		infrastructureService.saveUserSettings(this.newWallpaperUrl, this.newPicturePosition, this.newBackgroundColor);		
		this.getView().close();
	},
	
	onCancelButtonClick: function() {
		this.desktopWallpaper.setWallpaper(this.oldWallpaperUrl, this.oldPicturePosition, this.oldBackgroundColor);
		this.getView().close();
	}
	
});