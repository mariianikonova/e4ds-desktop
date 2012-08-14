Ext.define('E4desk.view.Wallpaper', {
	extend: 'Ext.Component',
	cls: 'wallpaper',
	html: '<img src="' + Ext.BLANK_IMAGE_URL + '">',

	picturePosition: 'center',
	wallpaper: null,
	backgroundColor: '#3d71b8',

	afterRender: function() {
		this.callParent();
		this.setWallpaper(this.wallpaper, this.picturePosition);
	},

	setWallpaper: function(wallpaper, pos, bkgcolor) {
		var me = this, imgEl, bkgnd;

		me.backgroundColor = bkgcolor || '#3d71b8';
		me.picturePosition = pos || 'center';
		me.wallpaper = wallpaper;

		if (me.rendered) {
			imgEl = me.el.dom.firstChild;

			if (!wallpaper || wallpaper == Ext.BLANK_IMAGE_URL) {
				Ext.fly(imgEl).hide();
    			me.el.removeCls('wallpaper-center');
    			me.el.removeCls('wallpaper-tile');				
			} else if (me.picturePosition === 'center') {
				Ext.fly(imgEl).hide();
				bkgnd = 'url(' + wallpaper + ')';
				me.el.removeCls('wallpaper-tile');
				me.el.addCls('wallpaper-center');
			} else if (me.picturePosition === 'tile') {
				Ext.fly(imgEl).hide();
				bkgnd = 'url(' + wallpaper + ')';
				me.el.removeCls('wallpaper-center');
				me.el.addCls('wallpaper-tile');
			} else if (me.picturePosition === 'stretch') {
    			me.el.removeCls('wallpaper-center');
    			me.el.removeCls('wallpaper-tile');
    			
				imgEl.src = wallpaper;				
				Ext.fly(imgEl).setStyle({
					width: '100%',
					height: '100%'
				}).show();			
			}

			me.el.setStyle({
				backgroundImage: bkgnd || '',
				backgroundColor: me.backgroundColor
			});

		}
		return me;
	}
});
