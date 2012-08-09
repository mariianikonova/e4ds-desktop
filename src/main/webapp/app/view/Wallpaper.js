Ext.define('E4desk.view.Wallpaper', {
	extend: 'Ext.Component',
	cls: 'wallpaper',
	html: '<img src="' + Ext.BLANK_IMAGE_URL + '">',

	stretch: false,
	wallpaper: '',

	afterRender: function() {
		var me = this;
		me.callParent();
		me.setWallpaper(me.wallpaper, me.stretch);
	},

	setWallpaper: function(wallpaper, stretch) {
		var me = this, imgEl, bkgnd;

		me.stretch = (stretch !== false);
		me.wallpaper = wallpaper;

		if (me.rendered) {
			imgEl = me.el.dom.firstChild;

			if (!wallpaper || wallpaper == Ext.BLANK_IMAGE_URL) {
				Ext.fly(imgEl).hide();
			} else if (me.stretch) {
				imgEl.src = wallpaper;

				me.el.removeCls('wallpaper-tiled');
				Ext.fly(imgEl).setStyle({
					width: '100%',
					height: '100%'
				}).show();
			} else {
				Ext.fly(imgEl).hide();

				bkgnd = 'url(' + wallpaper + ')';
				me.el.addCls('wallpaper-tiled');
			}

			me.el.setStyle({
				backgroundImage: bkgnd || ''
			});

		}
		return me;
	}
});
