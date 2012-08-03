Ext.define('E4desk.view.Desktop', {
	extend: 'Ext.panel.Panel',
	inject: [ 'moduleStore' ],
	controller: 'E4desk.controller.DesktopController',
	
	border: false,
	html: '&#160;',
	layout: 'fit',

	contextMenu: Ext.create('Ext.menu.Menu', {
		items: [ {
			text: 'Close All',
			action: 'closeall',
			minWindows: 1
		}, '-', {
			text: 'Minimize All',
			action: 'minimizeall',
			minWindows: 1
		}, '-', {
			text: 'Tile',
			action: 'tile',
			minWindows: 2
		}, {
			text: 'Cascade',
			action: 'cascade',
			minWindows: 2
		} ]
	}),

	initComponent: function() {
		this.dockedItems = [
		  Ext.create('E4desk.view.WindowBar', {dock: 'bottom'}),		   
		  Ext.create('E4desk.view.TopBar', {dock: 'top'})
		];
		
		this.wallpaper = Ext.create('E4desk.view.Wallpaper');
		
		this.items = [ 
		   this.wallpaper, 
		   {
			xtype: 'dataview',
			itemId: 'shortcutView',
			overItemCls: 'view-over',
			itemSelector: 'div.desktop-shortcut',
			trackOver: true,
			store: this.moduleStore,
			style: {
				position: 'absolute'
			},
			tpl: [ 
			       '<tpl for=".">', 
			          '<div class="desktop-shortcut" id="{name}-shortcut">',
					    '<div class="desktop-shortcut-icon {iconCls}-shortcut">', 
					      '<img src="', Ext.BLANK_IMAGE_URL, '" title="{name}">',
					    '</div>', 
					    '<span class="desktop-shortcut-text">{name}</span>', 
					  '</div>', 
					'</tpl>',
					'<div class="x-clear"></div>' 
				]
		} ];

		this.callParent(arguments);
	}
});