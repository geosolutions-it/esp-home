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




String myQuery = "SELECT a.id, a.study_name, a.project_references, a.funding_source, a.keywords, ";
myQuery += "       a.main_investigators, c.label as study_purpose, a.study_location, b.label as project_type,  ";
myQuery += "        a.contact_details, a.study_duration ";
myQuery += "   FROM blueprint.study a,blueprint.study_purpose c ,blueprint.project_type b";
myQuery += "   WHERE";
myQuery += " a.study_purpose_id=c.id";
myQuery += " AND a.project_type_id=b.id";
myQuery += " AND a.id = " + id;

myQuery += ";";

	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);
//out.print(myQuery);
%>
