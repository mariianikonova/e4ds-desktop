package ch.rasc.edsd.service;

import org.springframework.stereotype.Service;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.annotation.ExtDirectMethodType;

import com.google.common.collect.ImmutableList;

@Service
public class WallpaperService {

	@ExtDirectMethod(value = ExtDirectMethodType.STORE_READ)
	public ImmutableList<Wallpaper> read() {
		return ImmutableList.<Wallpaper> builder()
				.add(new Wallpaper("Blue Sencha", "http://rasc.ch/wallpapers/Blue-Sencha.jpg"))
				.add(new Wallpaper("Blue", "http://rasc.ch/wallpapers/blue.jpg"))
				.add(new Wallpaper("Dark Sencha", "http://rasc.ch/wallpapers/Dark-Sencha.jpg"))
				.add(new Wallpaper("Desk", "http://rasc.ch/wallpapers/desk.jpg"))
				.add(new Wallpaper("Desktop", "http://rasc.ch/wallpapers/desktop.jpg"))
				.add(new Wallpaper("Desktop2", "http://rasc.ch/wallpapers/desktop2.jpg"))
				.add(new Wallpaper("Moon", "http://rasc.ch/wallpapers/moon.jpg"))
				.add(new Wallpaper("Sky", "http://rasc.ch/wallpapers/sky.jpg"))
				.add(new Wallpaper("Wood Sencha", "http://rasc.ch/wallpapers/Wood-Sencha.jpg")).build();
	}
}
