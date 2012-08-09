package ch.rasc.e4desk.service;

public class UserSettings {

	private final String wallpaper;

	private final boolean stretch;

	public UserSettings(String wallpaper, boolean stretch) {
		this.wallpaper = wallpaper;
		this.stretch = stretch;
	}

	public String getWallpaper() {
		return wallpaper;
	}

	public boolean isStretch() {
		return stretch;
	}

}
