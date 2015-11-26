<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>

<%@ include file="isnumeric.jsp" %>
<%@ include file="../databaseConnection.jsp" %>

<%

String myQuery = "select concessi_1 as name , ST_AsText(ST_PointOnSurface(geom)) as centroid from \"KnowledgeBase\".\"DBGEO_concessions\";";

	boolean islist=true;
%>
<%@ include file="query.jsp" %>