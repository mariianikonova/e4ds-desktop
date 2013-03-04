/*
 * Copyright 2013 Ralph Schaer <ralphschaer@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Ext.define('E4desk.view.Desktop', {
	extend: 'Ext.panel.Panel',
	controller: 'E4desk.controller.DesktopController',

	border: false,
	html: '&#160;',
	layout: 'fit',

	contextMenu: Ext.create('Ext.menu.Menu', {
		items: [ {
			text: i18n.desktop_closeall,
			action: 'closeall',
			minWindows: 1
		}, '-', {
			text: i18n.desktop_minimizeall,
			action: 'minimizeall',
			minWindows: 1
		}, '-', {
			text: i18n.desktop_tile,
			action: 'tile',
			minWindows: 2
		}, {
			text: i18n.desktop_cascade,
			action: 'cascade',
			minWindows: 2
		}, {
			text: i18n.desktop_fithorizontal,
			action: 'fithorizontal',
			minWindows: 1
		}, {
			text: i18n.desktop_fitvertical,
			action: 'fitvertical',
			minWindows: 1
		} ]
	}),

	initComponent: function() {
		this.dockedItems = [ Ext.create('E4desk.view.WindowBar', {
			dock: 'bottom'
		}), Ext.create('E4desk.view.TopBar', {
			dock: 'top'
		}) ];

		this.wallpaper = Ext.create('E4desk.view.Wallpaper');

		this.items = [
				this.wallpaper,
				{
					xtype: 'dataview',
					itemId: 'shortcutView',
					overItemCls: 'view-over',
					itemSelector: 'div.desktop-shortcut',
					trackOver: true,
					store: Ext.create('E4desk.store.DesktopStore'),
					style: {
						position: 'absolute'
					},
					tpl: [ '<tpl for=".">', '<div class="desktop-shortcut" id="{name}-shortcut">',
							'<div class="desktop-shortcut-icon {iconCls}-shortcut">', '<img src="', Ext.BLANK_IMAGE_URL,
							'" title="{name}">', '</div>', '<span class="desktop-shortcut-text">{name}</span>', '</div>', '</tpl>',
							'<div class="x-clear"></div>' ]
				} ];

		this.callParent(arguments);
	}
});