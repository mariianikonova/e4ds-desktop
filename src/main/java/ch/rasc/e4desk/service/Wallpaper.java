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

@Model(value = "E4desk.model.Wallpaper", readMethod = "wallpaperService.read")
public class Wallpaper {

	private final String text;

	private final String img;

	private final Integer width;

	private final Integer height;

	public Wallpaper(String text, String img, Integer width, Integer height) {
		this.text = text;
		this.img = img;
		this.width = width;
		this.height = height;
	}

	public String getText() {
		return text;
	}

	public String getImg() {
		return img;
	}

	public Integer getWidth() {
		return width;
	}

	public Integer getHeight() {
		return height;
	}

}
