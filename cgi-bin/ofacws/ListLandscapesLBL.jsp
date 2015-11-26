<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>

<%@ include file="isnumeric.jsp" %>
<%@ include file="../databaseConnection.jsp" %>

<%

String myQuery = "select name , ST_AsText(ST_PointOnSurface(geom)) as centroid from \"KnowledgeBase\".\"DBGEO_landscapes\";";

	boolean islist=true;
%>
<%@ include file="query.jsp" %>


