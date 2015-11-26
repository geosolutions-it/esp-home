<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="query.jsp" %>
<%@ include file="init.jsp" %>


<%
String action = request.getParameter("action");
String wkt = request.getParameter("wkt");
String buffer = request.getParameter("buffer");



//if(action.equals("buffer")){
	String myQuery = "Select ST_AsText(ST_Buffer(ST_GeographyFromText('"+wkt+"'),"+buffer+")) as geometry,  ST_Area(ST_Buffer(ST_GeographyFromText('"+wkt+"'),"+buffer+")) as area";

//}



	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
	String username = "appuser";
	String password = "5Ti5k9";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,false,debg);
	out.print(strjson);

%>
