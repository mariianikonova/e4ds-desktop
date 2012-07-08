Ext.define('E4dsDesk.view.Desktop', {
    extend : 'Ext.panel.Panel',
    alias  : 'widget.desktop',    
    
    requires: [ 'E4dsDesk.view.Wallpaper', 'E4dsDesk.view.TaskBar' ],
    
    border: false,
    html: '&#160;',
    layout: 'fit',
    
    initComponent: function() {
    	this.dockedItems = [{
            xtype: 'taskbar',
            dock: 'bottom'
        }];
        
    	this.items  = [{
            xtype : 'wallpaper'
        }, {
            xtype        : 'dataview',
            itemId       : 'ux-shortcut',
            overItemCls  : 'x-view-over',
            itemSelector : 'div.ux-desktop-shortcut',
            trackOver    : true,
            store        : Ext.getStore('Modules'), 
            style        : {
                position : 'absolute'  
            },
            tpl: [
                '<tpl for=".">',
                    '<div class="ux-desktop-shortcut" id="{name}-shortcut">',
                        '<div class="ux-desktop-shortcut-icon {iconCls}">',
                            '<img src="',Ext.BLANK_IMAGE_URL,'" title="{name}">',
                        '</div>',
                        '<span class="ux-desktop-shortcut-text">{name}</span>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ]
        }];
        
        this.callParent(arguments);
    }
});
