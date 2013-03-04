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

import java.io.IOException;
import java.io.InputStream;
import java.lang.invoke.MethodHandles;
import java.util.List;

import javax.annotation.PostConstruct;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.annotation.ExtDirectMethodType;

import com.google.common.collect.ImmutableList;

@Service
public class WallpaperService {

	private ImmutableList<Wallpaper> wallpapers;

	@PostConstruct
	private void init() {
		Yaml y = new Yaml();
		ImmutableList.Builder<Wallpaper> builder = ImmutableList.builder();
		builder.add(new Wallpaper(" ", null, null, null));
		try (InputStream is = getClass().getResourceAsStream("/wallpapers.yaml")) {
			for (String wp : (List<String>) y.load(is)) {
				String[] splitted = wp.split(",");
				builder.add(new Wallpaper(splitted[0], splitted[1], Integer.valueOf(splitted[2]), Integer
						.valueOf(splitted[3])));
			}
		} catch (IOException e) {
			LoggerFactory.getLogger(MethodHandles.lookup().lookupClass()).error("reading wallpapers.yaml", e);
		}
		wallpapers = builder.build();
	}

	@ExtDirectMethod(value = ExtDirectMethodType.STORE_READ)
	public ImmutableList<Wallpaper> read() {
		return wallpapers;
	}
}
