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
String level = request.getParameter("level");
if(level== null){
		out.print("{\"result\":\"levelis necessary\"}");
		return;
}
if(!isInteger(level)){
		out.print("{\"result\":\"level should be integer\"}");
		return;
}


String myQuery = "SELECT id, name ";

myQuery = add_extra_select_fields(myQuery,"geom",lstextent,lstcentroid,lstgeometry,lstcalcarea);

myQuery += "FROM administrative_units.adminunit_gaul2008 ";
myQuery += " where parent_id = "+id+" AND admin_level = "+level;
myQuery += " ORDER BY name;";

	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
	String username = "appuser";
	String password = "5Ti5k9";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

%>
