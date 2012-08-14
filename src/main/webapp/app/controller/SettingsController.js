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

	wallpaperUrl: null,
	imageWidth: null,
	imageHeight: null,
	picturePosition: null,
	backgroundColor: null,

	init: function() {
		this.wallpaperUrl = this.desktopWallpaper.wallpaper;
		this.imageWidth = this.desktopWallpaper.imageWidth;
		this.imageHeight = this.desktopWallpaper.imageHeight;
		this.picturePosition = this.desktopWallpaper.picturePosition;
		this.backgroundColor = this.desktopWallpaper.backgroundColor;

		this.getPicturepos().setValue({
			pos: this.picturePosition
		});
		this.getBackgroundColor().setValue(this.backgroundColor);
		this.getWallpaperDataview().getStore().on('load', this.onStoreLoad, this, {
			single: true
		});
	},

	onStoreLoad: function() {
		var me = this;
		var sitem = null;

		this.getWallpaperDataview().getStore().each(function(item) {
			if (item.data.img === me.wallpaperUrl) {
				sitem = item;
				return false;
			}
		});

		if (sitem) {
			this.getWallpaperDataview().getSelectionModel().select(sitem);
		}
	},

	onWallpaperDataviewSelectionChange: function(model, selected) {
		this.wallpaperUrl = selected[0].data.img;
		this.imageWidth = selected[0].data.width;
		this.imageHeight = selected[0].data.height;
		this.getPreviewWallpaper().setWallpaper(this.wallpaperUrl, this.imageWidth, this.imageHeight, this.picturePosition,
				this.backgroundColor);
	},

	onBackgroundColorChange: function(field, newValue) {
		this.backgroundColor = newValue;
		this.getPreviewWallpaper().setWallpaper(this.wallpaperUrl, this.imageWidth, this.imageHeight, this.picturePosition,
				this.backgroundColor);
	},

	onPictureposChange: function(field, newValue) {
		this.picturePosition = newValue.pos;
		this.getPreviewWallpaper().setWallpaper(this.wallpaperUrl, this.imageWidth, this.imageHeight, this.picturePosition,
				this.backgroundColor);
	},

	onOkButtonClick: function() {
		this.desktopWallpaper
				.setWallpaper(this.wallpaperUrl, this.imageWidth, this.imageHeight, this.picturePosition, this.backgroundColor);
		infrastructureService.saveUserSettings(this.wallpaperUrl, this.imageWidth, this.imageHeight, this.picturePosition,
				this.backgroundColor);
		this.getView().close();
	},

	onCancelButtonClick: function() {
		this.getView().close();
	}

});