Ext.define('E4dsDesk.view.OnlineUsers', {
	extend: 'Ext.window.Window',
	alias: 'widget.onlineusers',	
	
	title: 'Accordion Window',
	width: 250,
	height: 400,
	iconCls: 'accordion',
	animCollapse: false,
	constrainHeader: true,
	bodyBorder: true,
	layout: 'accordion',
	border: false,

	initComponent: function() {
		this.tbar = {
			xtype: 'toolbar',
			ui: 'plain',
			items: [ {
				tooltip: {
					title: 'Rich Tooltips',
					text: 'Let your users know what they can do!'
				},
				iconCls: 'connect'
			}, '-', {
				tooltip: 'Add a new user',
				iconCls: 'user-add'
			}, ' ', {
				tooltip: 'Remove the selected user',
				iconCls: 'user-delete'
			} ]
		};

		this.items = [ {
			xtype: 'treepanel',
			id: 'im-tree',
			title: 'Online Users',
			rootVisible: false,
			lines: false,
			autoScroll: true,
			tools: [ {
				type: 'refresh',
				handler: function(c, t) {
					tree.setLoading(true, tree.body);
					var root = tree.getRootNode();
					root.collapseChildren(true, false);
					Ext.Function.defer(function() { // mimic a server call
						tree.setLoading(false);
						root.expand(true, true);
					}, 1000);
				}
			} ],
			store: Ext.create('Ext.data.TreeStore', {
				root: {
					text: 'Online',
					expanded: true,
					children: [ {
						text: 'Friends',
						expanded: true,
						children: [ {
							text: 'Brian',
							iconCls: 'user',
							leaf: true
						}, {
							text: 'Kevin',
							iconCls: 'user',
							leaf: true
						}, {
							text: 'Mark',
							iconCls: 'user',
							leaf: true
						}, {
							text: 'Matt',
							iconCls: 'user',
							leaf: true
						}, {
							text: 'Michael',
							iconCls: 'user',
							leaf: true
						}, {
							text: 'Mike Jr',
							iconCls: 'user',
							leaf: true
						}, {
							text: 'Mike Sr',
							iconCls: 'user',
							leaf: true
						}, {
							text: 'JR',
							iconCls: 'user',
							leaf: true
						}, {
							text: 'Rich',
							iconCls: 'user',
							leaf: true
						}, {
							text: 'Nige',
							iconCls: 'user',
							leaf: true
						}, {
							text: 'Zac',
							iconCls: 'user',
							leaf: true
						} ]
					}, {
						text: 'Family',
						expanded: true,
						children: [ {
							text: 'Kiana',
							iconCls: 'user-girl',
							leaf: true
						}, {
							text: 'Aubrey',
							iconCls: 'user-girl',
							leaf: true
						}, {
							text: 'Cale',
							iconCls: 'user-kid',
							leaf: true
						} ]
					} ]
				}
			})

		}, {
			title: 'Settings',
			html: '<p>Something useful would be in here.</p>',
			autoScroll: true
		}, {
			title: 'Even More Stuff',
			html: '<p>Something useful would be in here.</p>'
		}, {
			title: 'My Stuff',
			html: '<p>Something useful would be in here.</p>'
		} ];

		this.callParent(arguments);

	}

});
