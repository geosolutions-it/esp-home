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

String myQuery = "SELECT * FROM blueprint.ecosystem_service_indicator where study_id = "+id+" order by id;";

        


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

%>
