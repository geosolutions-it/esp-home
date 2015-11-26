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

String myQuery = "SELECT blueprint.biome.*";
myQuery += " FROM blueprint.ecosystem_service_indicator_biome,blueprint.biome";
myQuery += " where blueprint.ecosystem_service_indicator_biome.ecosystem_service_indicator_id = " + id;
myQuery += " and blueprint.ecosystem_service_indicator_biome.biome_id=blueprint.biome.id;";


        String url = "jdbc:postgresql://ies-pgsql.jrc.org:5432/H05-esp";
        String username = "h05esp-ro";
        String password = "5espr1";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

%>
