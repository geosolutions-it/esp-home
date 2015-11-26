<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="query.jsp" %>
<%@ include file="init.jsp" %>


<%
String id = request.getParameter("id");
if(id == null){
		out.print("{\"result\":\"id is necessary\"}");
		return;
}
if(!isInteger(id)){
		out.print("{\"result\":\"id should be integer\"}");
		return;
}

String myQuery = "SELECT ctry.country_id,ctry.name, iucn_cat, Count(*) as n, ROUND(SUM(area)/10000) as area, ctry.centroid ";
myQuery += "FROM protected_sites.wdpa_latest as w,protected_sites.site_country as psc, ";
myQuery += "(SELECT DISTINCT administrative_units.country.id as country_id, isoa3_id as iso3, name, centroid ";
myQuery += "FROM administrative_units.country, ";
myQuery += "(SELECT country_id, grouping_id FROM administrative_units.country_grouping WHERE grouping_id = 'ACP') as c, ";
myQuery += "(SELECT country_id, id ,ST_AsText(ST_PointOnSurface(geom)) as centroid FROM administrative_units.adminunit_gaul2008 WHERE admin_level=0) as g ";
myQuery += "WHERE administrative_units.country.id = c.country_id and c.country_id=g.country_id) as ctry ";
myQuery += "WHERE w.id=psc.site_id and psc.country_id = ctry.country_id AND is_point = false AND ctry.country_id = " + id + " ";
myQuery += "GROUP BY ctry.country_id,ctry.name, iucn_cat, ctry.centroid ";
myQuery += "ORDER BY ctry.name, iucn_cat ";


	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
	String username = "appuser";
	String password = "5Ti5k9";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

%>
