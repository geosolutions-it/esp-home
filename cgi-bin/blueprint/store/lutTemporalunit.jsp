<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="query.jsp" %>
<%@ include file="init.jsp" %>


<%
String myQuery = "SELECT * FROM blueprint.temporal_unit order by id;";

        


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

%>
