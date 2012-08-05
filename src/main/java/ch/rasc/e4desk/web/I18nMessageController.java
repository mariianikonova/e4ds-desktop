package ch.rasc.e4desk.web;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Enumeration;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.joda.time.DateTime;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import ch.ralscha.extdirectspring.util.JsonHandler;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.google.common.collect.Maps;

@Controller
public class I18nMessageController implements InitializingBean {

	private static final String JS_CONTENT_TYPE = "application/javascript;charset=UTF-8";

	@Autowired(required = false)
	private JsonHandler jsonHandler;

	private final static String prefix = "var i18n = ";

	private final static String postfix = ";";

	private final static long sixMonthFromNow = DateTime.now().plusMonths(6).getMillis();

	@Override
	public void afterPropertiesSet() throws Exception {
		if (jsonHandler == null) {
			jsonHandler = new JsonHandler();
		}
	}

	@RequestMapping(value = "/i18n.js", method = RequestMethod.GET)
	public void i18n(HttpServletResponse response, Locale locale) throws JsonGenerationException, JsonMappingException,
			IOException {

		response.setContentType(JS_CONTENT_TYPE);

		byte[] output = buildResponse(locale);
		response.setContentLength(output.length);

		ServletOutputStream out = response.getOutputStream();
		out.write(output);
		out.flush();
	}

	@RequestMapping(value = "/i18n-{version}.js", method = RequestMethod.GET)
	public void i18n(HttpServletRequest request, HttpServletResponse response, Locale locale)
			throws JsonGenerationException, JsonMappingException, IOException {

		String ifNoneMatch = request.getHeader("If-None-Match");

		byte[] output = buildResponse(locale);
		String etag = "\"" + DigestUtils.md5DigestAsHex(output) + "\"";

		if (etag.equals(ifNoneMatch)) {
			response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
			return;
		}

		response.setContentType(JS_CONTENT_TYPE);

		response.setContentLength(output.length);
		response.setHeader("Vary", "Accept-Encoding");
		response.setDateHeader("Expires", sixMonthFromNow);
		response.setHeader("ETag", etag);
		response.setHeader("Cache-control", "public, max-age=15552000");

		ServletOutputStream out = response.getOutputStream();
		out.write(output);
		out.flush();
	}

	private byte[] buildResponse(Locale locale) {
		ResourceBundle rb = ResourceBundle.getBundle("messages", locale);

		Map<String, String> messages = Maps.newHashMap();
		Enumeration<String> e = rb.getKeys();
		while (e.hasMoreElements()) {
			String key = e.nextElement();
			messages.put(key, rb.getString(key));
		}

		String output = prefix + jsonHandler.writeValueAsString(messages) + postfix;
		return output.getBytes(StandardCharsets.UTF_8);
	}

}
