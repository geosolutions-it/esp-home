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
String myQuery = "SELECT DISTINCT g.id,administrative_units.country.id as country_id, isoa2_id as iso2, isoa3_id as iso3, name ";

myQuery = add_extra_select_fields(myQuery,"geom",lstextent,lstcentroid,lstgeometry,lstcalcarea);



myQuery += "FROM administrative_units.country ";
myQuery += "	,(SELECT country_id, id FROM administrative_units.adminunit_gaul2008 WHERE admin_level=0 and country_id="+id+") as g";

myQuery += " WHERE administrative_units.country.id = "+id+";";


	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
	String username = "appuser";
	String password = "5Ti5k9";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

%>
