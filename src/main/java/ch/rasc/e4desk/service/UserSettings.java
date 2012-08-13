package ch.rasc.e4desk.service;

public class UserSettings {

	private final String wallpaper;

	private final String picturePos;

	public UserSettings(String wallpaper, String picturePos) {
		this.wallpaper = wallpaper;
		this.picturePos = picturePos;
	}

	public String getWallpaper() {
		return wallpaper;
	}

	public String getPicturePos() {
		return picturePos;
	}

}
