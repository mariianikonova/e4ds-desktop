<!doctype html> 
<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page import="java.util.Locale"%>
<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=utf-8"%>
<html>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta charset="utf-8">
  <link rel="icon" type="image/png" href="resources/images/favicon16.png" sizes="16x16"/>
  <link rel="icon" type="image/png" href="resources/images/favicon32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="resources/images/favicon48.png" sizes="48x48" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">	
  <title>e4desk</title>
  <style>
    <%@ include file="loader.css"%>
  </style>
${applicationScope.css_app}
</head>
<body>
  <div id="circularG">
  <div id="circularG_1" class="circularG">
  </div>
  <div id="circularG_2" class="circularG">
  </div>
  <div id="circularG_3" class="circularG">
  </div>
  <div id="circularG_4" class="circularG">
  </div>
  <div id="circularG_5" class="circularG">
  </div>
  <div id="circularG_6" class="circularG">
  </div>
  <div id="circularG_7" class="circularG">
  </div>
  <div id="circularG_8" class="circularG">
  </div>
  </div>
	
  <script>
    var app_context_path = '<%= request.getContextPath() %>';
  </script>	
	
  ${applicationScope.js_app}
  <% Locale locale = RequestContextUtils.getLocale(request); %>
  <% if (locale != null && locale.getLanguage().toLowerCase().equals("de")) { %>
    <script src="/resources/extjs/<spring:eval expression='@environment["extjs.version"]'/>/locale/ext-lang-de.js"></script>
  <% } %>	
  
  <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDqNmB0Mk6hOBCG1Lx2tmqVgKBUh3l-JFg&sensor=false"></script>
  <script>
	var $buoop = {vs:{i:8,f:12,o:11,s:5,n:9}} 
	$buoop.ol = window.onload; 
	window.onload=function(){ 
	 try {if ($buoop.ol) $buoop.ol();}catch (e) {} 
	 var e = document.createElement("script"); 
	 e.setAttribute("type", "text/javascript"); 
	 e.setAttribute("src", "http://browser-update.org/update.js"); 
	 document.body.appendChild(e); 
	} 
  </script>
</body>
</html>