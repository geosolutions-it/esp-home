
<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>

<%@ include file="isnumeric.jsp" %>

<%

String myQuery = "select name , ST_AsText(ST_PointOnSurface(geom)) as centroid from protected_sites.get_sites_for_country_grouping('OFAC') where is_point = false;"; 

	String driver = "org.postgresql.Driver";
	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
	String username = "appuser";
	String password = "5Ti5k9";
	boolean islist=true;
%>
<%@ include file="query.jsp" %>


