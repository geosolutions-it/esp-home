<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>

<%@ include file="isnumeric.jsp" %>
<%@ include file="../databaseConnection.jsp" %>

<%

	String parent= request.getParameter("parent");
	String level= request.getParameter("level");

	String myQuery = "SELECT name, ST_AsText(ST_PointOnSurface(geom)) as centroid from \"KnowledgeBase\".\"DBGEO_adminunit_gaul2008\" WHERE admin_level = '1' order by name;";

	boolean islist=true;

%>
<%@ include file="query.jsp" %>
