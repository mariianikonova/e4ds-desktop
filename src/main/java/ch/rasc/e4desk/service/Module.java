/**
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
package ch.rasc.e4desk.service;

import ch.ralscha.extdirectspring.generator.Model;

@Model(value = "E4desk.model.Module", readMethod = "moduleService.read")
public class Module {

	private final String id;

	private final String name;

	private final String iconCls;

	private final boolean showOnDesktop;

	private final String menuPath;

	public Module(String id, String name, String iconCls, boolean showOnDesktop, String menuPath) {
		this.id = id;
		this.name = name;
		this.iconCls = iconCls;
		this.showOnDesktop = showOnDesktop;
		this.menuPath = menuPath;
	}

	public Module(String id, String name, String iconCls, boolean showOnDesktop) {
		this(id, name, iconCls, showOnDesktop, null);
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getIconCls() {
		return iconCls;
	}

	public boolean isShowOnDesktop() {
		return showOnDesktop;
	}

	public String getMenuPath() {
		return menuPath;
	}

}
