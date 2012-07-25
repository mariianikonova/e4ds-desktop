Ext.define('E4dsDesk.view.Desktop', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.desktop',

	requires: [ 'E4dsDesk.view.Wallpaper', 'E4dsDesk.view.WindowBar', 'E4dsDesk.view.TopBar' ],

	border: false,
	html: '&#160;',
	layout: 'fit',

	contextMenu: Ext.create('Ext.menu.Menu', {
		itemId: 'desktop-contextmenu',
		items: [ {
			text: 'Close All',
			actionType: 'closeall'
		}, '-', {
			text: 'Minimize All',
			actionType: 'minimizeall'
		}, '-',

		{
			text: 'Tile',
			actionType: 'tile',
			minWindows: 1
		}, {
			text: 'Cascade',
			actionType: 'cascade',
			minWindows: 1
		} ]
	}),

	initComponent: function() {
		this.dockedItems = [ {
			xtype: 'windowbar',
			dock: 'bottom'
		}, {
			xtype: 'topbar',
			dock: 'top'
		} ];

		this.items = [
				{
					xtype: 'wallpaper'
				},
				{
					xtype: 'dataview',
					itemId: 'ux-shortcut',
					overItemCls: 'x-view-over',
					itemSelector: 'div.ux-desktop-shortcut',
					trackOver: true,
					store: Ext.getStore('Modules'),
					style: {
						position: 'absolute'
					},
					tpl: [ '<tpl for=".">', '<div class="ux-desktop-shortcut" id="{name}-shortcut">',
							'<div class="ux-desktop-shortcut-icon {iconCls}">', '<img src="', Ext.BLANK_IMAGE_URL, '" title="{name}">',
							'</div>', '<span class="ux-desktop-shortcut-text">{name}</span>', '</div>', '</tpl>',
							'<div class="x-clear"></div>' ]
				} ];

		this.listeners = {
			el: {
				contextmenu: function(e) {
					this.fireEvent('contextmenu', e);
				},
				scope: this,
				preventDefault: true
			}
		};

		this.callParent(arguments);
	}
});