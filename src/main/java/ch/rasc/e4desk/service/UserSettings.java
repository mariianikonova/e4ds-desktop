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

import java.io.Serializable;

public class UserSettings implements Serializable {

	private static final long serialVersionUID = 1L;

	private String wallpaper;

	private String picturePos;

	private String backgroundColor;

	private Integer imageWidth;

	private Integer imageHeight;

	public UserSettings() {
		// default constructor
	}

	public UserSettings(String wallpaper, Integer width, Integer height, String picturePos, String backgroundColor) {
		this.wallpaper = wallpaper;
		this.imageWidth = width;
		this.imageHeight = height;
		this.picturePos = picturePos;
		this.backgroundColor = backgroundColor;
	}

	public String getWallpaper() {
		return wallpaper;
	}

	public String getPicturePos() {
		return picturePos;
	}

	public String getBackgroundColor() {
		return backgroundColor;
	}

	public Integer getImageWidth() {
		return imageWidth;
	}

	public Integer getImageHeight() {
		return imageHeight;
	}

	public void setWallpaper(String wallpaper) {
		this.wallpaper = wallpaper;
	}

	public void setPicturePos(String picturePos) {
		this.picturePos = picturePos;
	}

	public void setBackgroundColor(String backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	public void setImageWidth(Integer imageWidth) {
		this.imageWidth = imageWidth;
	}

	public void setImageHeight(Integer imageHeight) {
		this.imageHeight = imageHeight;
	}

	@Override
	public String toString() {
		return "UserSettings [wallpaper=" + wallpaper + ", picturePos=" + picturePos + ", backgroundColor="
				+ backgroundColor + ", imageWidth=" + imageWidth + ", imageHeight=" + imageHeight + "]";
	}

}
