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
islist = false;
String myQuery = "SELECT DISTINCT g.id,administrative_units.country.id as country_id, isoa2_id as iso2, isoa3_id as iso3, name,c.grouping_id ";
myQuery += "FROM administrative_units.country, ";
myQuery += "(SELECT country_id, grouping_id FROM administrative_units.country_grouping ) as c, ";
myQuery += "(SELECT country_id, id,geom FROM administrative_units.adminunit_gaul2008 WHERE admin_level=0) as g ";
myQuery += "WHERE (administrative_units.country.id = c.country_id) and c.country_id=g.country_id and (ST_Contains(g.geom,ST_GeometryFromText('POINT("+x+" "+y+")',4326))) and c.grouping_id = 'ACP'";

	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
	String username = "appuser";
	String password = "5Ti5k9";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

%>
