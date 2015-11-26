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

//islist=false;
String myQuery = "SELECT wdpa_id, country, name, desig, iucn_cat, marine, rep_m_area, rep_area, status, status_yr, is_point, ST_Area(ST_GeographyFromText(ST_AsText(geom))) as area ";

myQuery = add_extra_select_fields(myQuery,"geom",lstextent,lstcentroid,lstgeometry,lstcalcarea);

myQuery += "FROM protected_sites.wdpa_latest ";
myQuery += " WHERE wdpa_id = "+id;
myQuery += " ORDER BY name;";

	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
	String username = "appuser";
	String password = "5Ti5k9";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

%>
