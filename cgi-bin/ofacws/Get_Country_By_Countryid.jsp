<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>

<%@ include file="isnumeric.jsp" %>
<%@ include file="../databaseConnection.jsp" %>

<%

String id = request.getParameter("id");
String extent = request.getParameter("extent");
String centroid = request.getParameter("centroid");
String geom = request.getParameter("geom"); 

if(extent == null)extent="false";
if(centroid == null)centroid ="false";
if(geom == null)geom ="false";


String myQuery = "SELECT id, country_id, iso2 as isoa2_id, iso3 as isoa3_id, parent_id, name";
if(extent.equals("true"))
	myQuery += ", ST_AsText(ST_Envelope(geom_generalized)) as extent";
if(centroid.equals("true"))
	myQuery += ", ST_AsText(ST_PointOnSurface(geom_generalized)) as centroid";
if(geom.equals("true"))
	myQuery += ", ST_AsText(geom_generalized) as geom";
myQuery += " FROM \"KnowledgeBase\".\"DBGEO_adminunit_gaul2008\"";
myQuery += "  where admin_level = 0 AND country_id = " + id;


	boolean islist=false;
%>
<%@ include file="query.jsp" %>


