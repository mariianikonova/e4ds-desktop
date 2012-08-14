package ch.rasc.e4desk.service;

import static ch.ralscha.extdirectspring.annotation.ExtDirectMethodType.POLL;

import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;

import com.google.common.collect.Maps;

@Service
public class InfrastructureService {

	private final static Map<String, UserSettings> userSettings = Maps.newHashMap();

	static {
		userSettings.put("admin", new UserSettings("http://rasc.ch/wallpapers/Blue-Sencha.jpg", 1440, 900, "center",
				"#3d71b8"));
		userSettings.put("user", new UserSettings("http://rasc.ch/wallpapers/Wood-Sencha.jpg", 1440, 900, "center",
				"#3d71b8"));
	}

	@ExtDirectMethod(value = POLL, event = "heartbeat")
	@PreAuthorize("isAuthenticated()")
	public void heartbeat() {
		// nothing here
	}

	@ExtDirectMethod
	@PreAuthorize("isAuthenticated()")
	public String getLoggedOnUser() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return ((User) principal).getUsername();
	}

	@ExtDirectMethod
	@PreAuthorize("isAuthenticated()")
	public UserSettings getUserSettings() {
		return userSettings.get(getLoggedOnUser());
	}

	@ExtDirectMethod
	@PreAuthorize("isAuthenticated()")
	public void saveUserSettings(String wallpaper, Integer width, Integer height, String picturePos,
			String backgroundColor) {
		userSettings.put(getLoggedOnUser(), new UserSettings(wallpaper, width, height, picturePos, backgroundColor));
	}

}
