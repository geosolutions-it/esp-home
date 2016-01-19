<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="query.jsp" %>
<%@ include file="init.jsp" %>


<%

String region = request.getParameter("region");
if(region == null){
		out.print("{\"result\":\"region is necessary\"}");
		return;
}
if(!isWords(region)){
		//out.print("{\"result\":\"region should be words\"}");
		//return;
}




String myQuery = "SELECT  ecosystem_service_indicator_id AS id ";
myQuery += "FROM blueprint.ecosystem_service_indicator_grouping ";
myQuery += "WHERE grouping_id='"+region+"';";

        


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);
//out.print(myQuery);
%>
