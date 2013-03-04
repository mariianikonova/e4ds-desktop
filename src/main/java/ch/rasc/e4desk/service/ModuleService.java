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

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.annotation.ExtDirectMethodType;
import ch.rasc.e4desk.security.JpaUserDetails;
import ch.rasc.e4desk.util.Util;

import com.google.common.collect.ImmutableList;

@Service
public class ModuleService {

	@Autowired
	private MessageSource messageSource;

	@ExtDirectMethod(value = ExtDirectMethodType.STORE_READ)
	@PreAuthorize("isAuthenticated()")
	public ImmutableList<Module> read(Locale locale) {
		JpaUserDetails user = Util.getLoggedInUser();
		if (user != null) {
			ImmutableList.Builder<Module> builder = ImmutableList.builder();

			builder.add(new Module("E4desk.view.module.OnlineUsers", "Online Users", "onlineusers", true));
			builder.add(new Module("E4desk.view.module.Notepad", "Notepad", "notepad", false));
			builder.add(new Module("E4desk.view.module.TabWindow", "Tab Window", "tabs", false));
			builder.add(new Module("E4desk.view.module.GridWindow", "Grid Window", "grid", true));
			builder.add(new Module("E4desk.view.module.SystemStatus", "System Status", "systemstatus", true, "system"));

			if (Util.hasRole("ROLE_ADMIN")) {
				builder.add(new Submenu(messageSource.getMessage("system", null, locale), "settings", "system"));
				builder.add(new Module("E4desk.view.UsersWindow", messageSource.getMessage("user", null, locale),
						"users", true, "system"));
				builder.add(new Module("E4desk.view.LoggingEventsWindow", messageSource.getMessage("logevents", null,
						locale), "loggingevents", true, "system"));
				builder.add(new Module("E4desk.view.AccessLogWindow", messageSource.getMessage("accesslog", null,
						locale), "accesslog", true, "system"));
			}

			return builder.build();
		}

		return ImmutableList.of();

	}
}
