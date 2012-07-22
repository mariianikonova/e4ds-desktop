Ext.define('E4dsDesk.view.Notepad', {
	extend: 'Ext.window.Window',
	alias: 'widget.notepad',

	title: 'Notepad',
	width: 600,
	height: 400,
	iconCls: 'notepad',
	bodyBorder: true,
	layout: 'fit',
	border: false,

	initComponent: function() {
		this.items = [ {

			xtype: 'htmleditor',
			id: 'notepad-editor',
			value: [ 
			        'Some <b>rich</b> <font color="red">text</font> goes <u>here</u><br>', 
			        'Give it a try!' 
			].join('')
		} ];

		this.callParent(arguments);

	}

});
