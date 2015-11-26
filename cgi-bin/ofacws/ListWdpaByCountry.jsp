<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>

<%@ include file="isnumeric.jsp" %>

<%

	String id= request.getParameter("id");

	//String myQuery = "SELECT wdpa_id, country, name FROM protected_sites.wdpa_latest WHERE country_id = "+id+" AND is_point = false ORDER BY name;";
	String myQuery = "SELECT wdpa_id, protected_sites.wdpa_latest.name FROM protected_sites.wdpa_latest,administrative_units.country WHERE administrative_units.country.id = " + id + " AND is_point = false AND protected_sites.wdpa_latest.country=administrative_units.country.isoa3_id ORDER BY name;";
    //String myQuery = "SELECT wdpa_id, name FROM \"KnowledgeBase\".\"DBGEO_wdpa\" WHERE is_point = false AND country=(SELECT DISTINCT iso3 FROM \"KnowledgeBase\".\"DBGEO_adminunit_gaul2008\" WHERE country_id = " + id + ") ORDER BY name;";

	String driver = "org.postgresql.Driver";
	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
	String username = "appuser";
	String password = "5Ti5k9";
	boolean islist=true;

%>
<%@ include file="query.jsp" %>

