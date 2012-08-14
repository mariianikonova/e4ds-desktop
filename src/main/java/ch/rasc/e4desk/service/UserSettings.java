package ch.rasc.e4desk.service;

public class UserSettings {

	private final String wallpaper;

	private final String picturePos;

	private final String backgroundColor;

	public UserSettings(String wallpaper, String picturePos, String backgroundColor) {
		this.wallpaper = wallpaper;
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

}
