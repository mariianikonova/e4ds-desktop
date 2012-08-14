package ch.rasc.e4desk.service;

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
