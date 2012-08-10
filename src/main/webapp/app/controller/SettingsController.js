Ext.define('E4desk.controller.SettingsController', {
	extend: 'Deft.mvc.ViewController',

	control: {
		wallpaperDataview: {
			selectionchange: 'onWallpaperDataviewSelectionChange'
		},
		okButton: {
			click: 'onOkButtonClick'
		},
		stretchCheckbox: {
			change: 'onStretchCheckboxChange'
		},
		previewWallpaper: true
	},
	
	selectedItem: null,
	stretch: null,
	
	init: function() {
		this.stretch = this.desktopWallpaper.stretch;
		this.getStretchCheckbox().setValue(this.stretch);
		this.getWallpaperDataview().getStore().on('load', this.onStoreLoad, this, {single: true});
	},
	
	onStoreLoad: function() {
		var s = this.desktopWallpaper.wallpaper;
		var me = this;
		
		this.getWallpaperDataview().getStore().each(function(item) {
			if (item.data.img === s) {				
				me.selectedItem = item;
				return false;
			}
		});

		if (this.selectedItem) {
			this.getWallpaperDataview().getSelectionModel().select(this.selectedItem);
		}
	},
	
	onWallpaperDataviewSelectionChange: function(model, selected) {
		this.selectedItem = selected[0].data.img;
    	this.getPreviewWallpaper().setWallpaper(this.selectedItem, true);        
	},
	
	onStretchCheckboxChange: function(field, newValue) {
		this.stretch = newValue;
	},
	
	onOkButtonClick: function() {
		if (this.selectedItem !== null) {
			this.desktopWallpaper.setWallpaper(this.selectedItem, this.stretch);
			infrastructureService.saveUserSettings(this.selectedItem, this.stretch);
		}
		this.getView().close();
	}
	
});