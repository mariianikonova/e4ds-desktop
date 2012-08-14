<!doctype html>
<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta charset="utf-8" />
	<link rel="shortcut icon" href="favicon.ico" />
	<title>e4desk</title>	
    <link rel="stylesheet" type="text/css" href="http://cdn.sencha.com/ext-4.1.1-gpl/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="resources/css/desktop.css" />
    <link rel="stylesheet" type="text/css" href="resources/ux/css/Notification.css">
    <link rel="stylesheet" type="text/css" href="resources/ux/css/colorpicker.css">
</head>
<body>    
    <%@ include file="old.jspf"%>
    <%@ include file="loader.jspf"%>
	<script src="http://cdn.sencha.com/ext-4.1.1-gpl/ext-all-debug.js"></script>
	<script src="resources/ux/window/Notification.js"></script>
	<script src="api.js"></script>
	<script src="deft-debug.js"></script>
	<script src="app.js"></script>
</body>
</html>