<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>

<%@ include file="isnumeric.jsp" %>
<%@ include file="../databaseConnection.jsp" %>

<%

	String parent= request.getParameter("parent");
	String level= request.getParameter("level");

	String myQuery = "SELECT id, name FROM \"KnowledgeBase\".\"DBGEO_adminunit_gaul2008\" where parent_id = "+parent+" AND admin_level = "+level+" ORDER BY name;";

	boolean islist=true;

%>
<%@ include file="query.jsp" %>
