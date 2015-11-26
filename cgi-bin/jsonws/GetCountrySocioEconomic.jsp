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
if(!isWord(id)){
		out.print("{\"result\":\"id should be a word (ISO3)\"}");
		return;
}

	String myQuery = "SELECT  * FROM socioeconomic";
	myQuery = myQuery + " WHERE iso3 = '" + id + "'";

	String url = "jdbc:postgresql://durga.jrc.org:5432/dbacpobs";
	String username = "usracpobs";
	String password = "H_gh8QaNc";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	
	out.print(strjson);


%>
