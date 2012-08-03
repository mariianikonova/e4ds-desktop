package ch.rasc.e4desk.service;

public class Wallpaper {

	private final String text;

	private final String img;

	public Wallpaper(String text, String img) {
		this.text = text;
		this.img = img;
	}

	public String getText() {
		return text;
	}

	public String getImg() {
		return img;
	}

}
