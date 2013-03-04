package ch.rasc.e4desk.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ch.ralscha.extdirectspring.util.ExtDirectSpringUtil;

public class ResourceServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private final byte[] data;

	private final String contentType;

	public ResourceServlet(byte[] data, String contentType) {
		this.data = data;
		this.contentType = contentType;
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ExtDirectSpringUtil.handleCacheableResponse(request, response, data, contentType);
	}

}
