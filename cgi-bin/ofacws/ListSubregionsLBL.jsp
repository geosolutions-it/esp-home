<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>

<%@ include file="isnumeric.jsp" %>
<%@ include file="../databaseConnection.jsp" %>

<%

	String id= request.getParameter("id");

	String myQuery = "SELECT  name, ST_AsText(ST_PointOnSurface(geom_generalized)) as centroid FROM \"KnowledgeBase\".\"DBGEO_adminunit_gaul2008\" where admin_level=2 and parent_id="+id+" order by name;";

	boolean islist=true;

%>
<%@ include file="query.jsp" %>
