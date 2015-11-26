
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


String myQuery = "SELECT  country, name, desig, iucn_cat, marine, status, status_yr"; 
if(extent.equals("true"))
	myQuery += ", ST_AsText(ST_Envelope(geom)) as extent";
if(centroid.equals("true"))
	myQuery += ", ST_AsText(ST_PointOnSurface(geom)) as centroid";
if(geom.equals("true"))
	myQuery += ", ST_AsText(geom) as geom";
myQuery += " FROM \"KnowledgeBase\".\"DBGEO_wdpa\"";
myQuery += "  where wdpa_id = " + id;


	boolean islist=false;
%>
<%@ include file="query.jsp" %>


