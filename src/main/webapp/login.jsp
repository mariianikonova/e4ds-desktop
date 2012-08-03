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
	
	<link rel="stylesheet" type="text/css" href="http://cdn.sencha.com/ext-4.1.1-gpl/resources/css/ext-all.css">
	<style>
	  .icon-login { background-image: url(../images/login.png); }
	</style>
	<link rel="stylesheet" type="text/css" href="resources/ux/css/Notification.css">
</head>
<body>
    <%@ include file="loader.jspf"%>
	<script src="http://cdn.sencha.com/ext-4.1.1-gpl/ext-all-debug.js"></script>

	<script src="resources/ux/window/Notification.js"></script>
	<script src="login.js"></script>
    
	<script type="text/javascript">
		Ext.onReady(function() {
			Ext.fly('floatingCirclesG').destroy();
			<c:if test="${not empty sessionScope.SPRING_SECURITY_LAST_EXCEPTION.message}">
			Ext.ux.window.Notification.error("Error", "Login Error");
			</c:if>
		});
	</script>
	
</body>
</html>