package ch.rasc.e4desk.service;

public class UserSettings {

	private final String wallpaper;

	private final String picturePos;

	private final String backgroundColor;

	private final Integer imageWidth;

	private final Integer imageHeight;

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

}
