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
package ch.rasc.e4desk.web;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.DispatcherType;
import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration;

import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.context.support.GenericWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.servlet.DispatcherServlet;
import org.yaml.snakeyaml.Yaml;

import ch.rasc.e4desk.config.ComponentConfig;
import ch.rasc.e4desk.config.DataConfig;
import ch.rasc.e4desk.config.ScheduleConfig;
import ch.rasc.e4desk.config.SecurityConfig;
import ch.rasc.e4desk.config.WebConfig;
import ch.rasc.e4desk.util.Base62;

import com.google.common.io.ByteStreams;
import com.yahoo.platform.yui.compressor.CssCompressor;
import com.yahoo.platform.yui.compressor.JavaScriptCompressor;

public class WebAppInitializer implements WebApplicationInitializer {

	@SuppressWarnings("resource")
	@Override
	public void onStartup(ServletContext container) {
		AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
		rootContext.setServletContext(container);
		rootContext.getEnvironment().setDefaultProfiles("production");
		rootContext.register(ComponentConfig.class, DataConfig.class, ScheduleConfig.class, SecurityConfig.class,
				WebConfig.class);

		container.addListener(new ContextLoaderListener(rootContext));
		container.addListener(HttpSessionEventPublisher.class);

		CharacterEncodingFilter encFilter = new CharacterEncodingFilter();
		encFilter.setEncoding("UTF-8");
		encFilter.setForceEncoding(true);
		container.addFilter("characterEncodingFilter", encFilter).addMappingForServletNames(
				EnumSet.of(DispatcherType.REQUEST, DispatcherType.FORWARD, DispatcherType.INCLUDE), true, "/*");

		container.addFilter("springSecurityFilterChain",
				new DelegatingFilterProxy("springSecurityFilterChain", rootContext)).addMappingForUrlPatterns(
				EnumSet.of(DispatcherType.REQUEST, DispatcherType.FORWARD), true, "/*");

		container.addFilter("mdcFilter", MdcFilter.class).addMappingForUrlPatterns(
				EnumSet.of(DispatcherType.REQUEST, DispatcherType.FORWARD), true, "/*");

		ServletRegistration.Dynamic dispatcher = container.addServlet("dispatcher", new DispatcherServlet(
				new GenericWebApplicationContext()));
		dispatcher.setLoadOnStartup(1);
		dispatcher.addMapping("/");

		try {
			if (rootContext.getEnvironment().acceptsProfiles("production")) {
				processProdScripts(container);
			} else {
				processDevScripts(container);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

	}

	private void processDevScripts(ServletContext container) throws IOException {

		Properties versionProperties = readVersionProperties();

		try (InputStream is = getClass().getResourceAsStream("/webresources.yaml")) {

			Yaml yaml = new Yaml();
			Map<String, Object> content = (Map<String, Object>) yaml.load(is);

			for (String root : content.keySet()) {
				Map<String, Object> children = (Map<String, Object>) content.get(root);

				StringBuilder js = new StringBuilder();
				for (String line : (List<String>) children.get("js-dev")) {
					js.append("<script src=\"");
					for (Entry<Object, Object> entry : versionProperties.entrySet()) {
						String var = "{" + entry.getKey() + "}";
						line = line.replace(var, (String) entry.getValue());
					}
					js.append(container.getContextPath());
					js.append(line);
					js.append("\"></script>");
					js.append("\n");
				}
				container.setAttribute("js_" + root, js);

				StringBuilder css = new StringBuilder();
				for (String line : (List<String>) children.get("css")) {
					css.append("<link rel=\"stylesheet\" href=\"");
					for (Entry<Object, Object> entry : versionProperties.entrySet()) {
						String var = "{" + entry.getKey() + "}";
						line = line.replace(var, (String) entry.getValue());
					}
					css.append(container.getContextPath());
					css.append(line);
					css.append("\">");
					css.append("\n");
				}
				container.setAttribute("css_" + root, css);

			}
		}

	}

	private final static Pattern DEV_CODE_PATTERN = Pattern.compile("/\\* <debug> \\*/.*?/\\* </debug> \\*/",
			Pattern.DOTALL);

	private void processProdScripts(ServletContext container) throws IOException {

		Properties versionProperties = readVersionProperties();

		try (InputStream is = getClass().getResourceAsStream("/webresources.yaml")) {

			Yaml yaml = new Yaml();
			Map<String, Object> content = (Map<String, Object>) yaml.load(is);

			for (String root : content.keySet()) {
				Map<String, Object> children = (Map<String, Object>) content.get(root);

				byte[] cssContent;
				try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
					for (String line : (List<String>) children.get("css")) {
						byte[] b = ByteStreams.toByteArray(container.getResourceAsStream(line));
						String changedCss = changeImageUrls(new String(b, StandardCharsets.UTF_8), line);
						changedCss = compressCss(changedCss);
						bos.write(changedCss.getBytes(StandardCharsets.UTF_8));
					}
					cssContent = bos.toByteArray();
				}

				String crc = Base62.generateMD5asBase62String(cssContent);
				String servletPath = "/" + root + crc + ".css";
				container.addServlet(root + crc + "css", new ResourceServlet(cssContent, "text/css")).addMapping(
						servletPath);

				StringBuilder css = new StringBuilder();
				css.append("<link rel=\"stylesheet\" href=\"");
				css.append(container.getContextPath());
				css.append(servletPath);
				css.append("\">");
				css.append("\n");
				container.setAttribute("css_" + root, css);

				StringBuilder js = new StringBuilder();
				for (String line : (List<String>) children.get("js-prod-script")) {
					js.append("<script src=\"");
					for (Entry<Object, Object> entry : versionProperties.entrySet()) {
						String var = "{" + entry.getKey() + "}";
						line = line.replace(var, (String) entry.getValue());
					}
					js.append(container.getContextPath());
					js.append(line);
					js.append("\"></script>");
					js.append("\n");
				}

				byte[] jsContent;
				try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
					for (String line : (List<String>) children.get("js-prod-mini")) {
						byte[] b = ByteStreams.toByteArray(container.getResourceAsStream(line.trim()));
						String code = new String(b, StandardCharsets.UTF_8);

						Matcher matcher = DEV_CODE_PATTERN.matcher(code);
						StringBuffer cleanCode = new StringBuffer();
						while (matcher.find()) {
							matcher.appendReplacement(cleanCode, "");
						}
						matcher.appendTail(cleanCode);

						bos.write(minifyJs(cleanCode.toString()).getBytes(StandardCharsets.UTF_8));
						bos.write('\n');

					}
					jsContent = bos.toByteArray();
				}

				crc = Base62.generateMD5asBase62String(jsContent);
				servletPath = "/" + root + crc + ".js";
				container.addServlet(root + crc + "js", new ResourceServlet(jsContent, "application/javascript"))
						.addMapping(servletPath);

				js.append("<script src=\"");
				js.append(container.getContextPath());
				js.append(servletPath);
				js.append("\"></script>");
				js.append("\n");

				container.setAttribute("js_" + root, js);

			}
		}

	}

	private final static Pattern CSS_URL_PATTERN = Pattern.compile("(.*?url.*?\\('*)([^\\)']*)('*\\))",
			Pattern.CASE_INSENSITIVE);

	private static String changeImageUrls(String css, String cssPath) {
		Matcher matcher = CSS_URL_PATTERN.matcher(css);
		StringBuffer sb = new StringBuffer();

		Path basePath = Paths.get(cssPath.substring(1));

		while (matcher.find()) {
			String url = matcher.group(2);
			Path pa = basePath.resolveSibling(url).normalize();
			matcher.appendReplacement(sb, "$1" + pa.toString().replace("\\", "/") + "$3");
		}
		matcher.appendTail(sb);
		return sb.toString();
	}

	private Properties readVersionProperties() throws IOException {
		Properties properties = new Properties();
		try (InputStream is = getClass().getResourceAsStream("/version.properties")) {
			properties.load(is);
		}
		return properties;
	}

	private static String minifyJs(String js) throws EvaluatorException, IOException {

		ErrorReporter e = new ErrorReporter() {

			@Override
			public void warning(String message, String sourceName, int line, String lineSource, int lineOffset) {
				if (line < 0) {
					System.err.println("\n[WARNING] " + message);
				} else {
					System.err.println("\n[WARNING] " + line + ':' + lineOffset + ':' + message);
				}
			}

			@Override
			public void error(String message, String sourceName, int line, String lineSource, int lineOffset) {
				if (line < 0) {
					System.err.println("\n[ERROR] " + message);
				} else {
					System.err.println("\n[ERROR] " + line + ':' + lineOffset + ':' + message);
				}
			}

			@Override
			public EvaluatorException runtimeError(String message, String sourceName, int line, String lineSource,
					int lineOffset) {
				error(message, sourceName, line, lineSource, lineOffset);
				return new EvaluatorException(message);
			}
		};

		JavaScriptCompressor jsc = new JavaScriptCompressor(new StringReader(js), e);

		int linebreak = 120;
		boolean munge = false;
		boolean verbose = false;
		boolean preserveAllSemiColons = true;
		boolean disableOptimizations = true;

		StringWriter sw = new StringWriter();
		jsc.compress(sw, linebreak, munge, verbose, preserveAllSemiColons, disableOptimizations);
		return sw.toString();

	}

	private static String compressCss(String css) throws EvaluatorException, IOException {
		CssCompressor cc = new CssCompressor(new StringReader(css));
		int linebreak = 120;
		StringWriter sw = new StringWriter();
		cc.compress(sw, linebreak);
		return sw.toString();
	}
}