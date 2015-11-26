<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="query.jsp" %>
<%@ include file="init.jsp" %>


<%
String x = request.getParameter("x");
if(x == null){
		out.print("{\"result\":\"x is necessary\"}");
		return;
}
String y = request.getParameter("y");
if(y == null){
		out.print("{\"result\":\"y is necessary\"}");
		return;
}

String myQuery = "SELECT wdpa_id, country, name, desig, iucn_cat, marine, rep_m_area, rep_area, status, status_yr, is_point, ST_AsText(geom) as geometry ";
myQuery += "FROM protected_sites.wdpa_latest ";
myQuery += "WHERE ST_Contains(geom,ST_GeometryFromText('POINT("+x+" "+y+")',4326))";

	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
	String username = "appuser";
	String password = "5Ti5k9";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

%>
