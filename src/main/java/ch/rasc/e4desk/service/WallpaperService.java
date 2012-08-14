package ch.rasc.e4desk.service;

import org.springframework.stereotype.Service;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.annotation.ExtDirectMethodType;

import com.google.common.collect.ImmutableList;

@Service
public class WallpaperService {

	@ExtDirectMethod(value = ExtDirectMethodType.STORE_READ)
	public ImmutableList<Wallpaper> read() {
		return ImmutableList.<Wallpaper> builder().add(new Wallpaper("None", null, null, null))
				.add(new Wallpaper("Bender", "http://rasc.ch/wallpapers/bender.jpg", 1920, 1080))
				.add(new Wallpaper("Blue", "http://rasc.ch/wallpapers/blue.jpg", 1600, 1143))
				.add(new Wallpaper("Blue Sencha", "http://rasc.ch/wallpapers/Blue-Sencha.jpg", 1440, 900))
				.add(new Wallpaper("Dark Sencha", "http://rasc.ch/wallpapers/Dark-Sencha.jpg", 1440, 900))
				.add(new Wallpaper("Desk", "http://rasc.ch/wallpapers/desk.jpg", 1600, 1200))
				.add(new Wallpaper("Desktop", "http://rasc.ch/wallpapers/desktop.jpg", 1600, 1200))
				.add(new Wallpaper("Desktop2", "http://rasc.ch/wallpapers/desktop2.jpg", 1600, 1200))
				.add(new Wallpaper("Frog", "http://rasc.ch/wallpapers/frog.jpg", 1920, 1200))
				.add(new Wallpaper("Mike Wazowski", "http://rasc.ch/wallpapers/mikewazowski.jpg", 1600, 1200))
				.add(new Wallpaper("Moon", "http://rasc.ch/wallpapers/moon.jpg", 1600, 900))
				.add(new Wallpaper("Pi", "http://rasc.ch/wallpapers/pi.jpg", 1280, 800))
				.add(new Wallpaper("Sky", "http://rasc.ch/wallpapers/sky.jpg", 1488, 977))
				.add(new Wallpaper("Wood Sencha", "http://rasc.ch/wallpapers/Wood-Sencha.jpg", 1440, 900)).build();
	}
}
