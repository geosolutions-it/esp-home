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



boolean isfirst=true;
String myQuery = "SELECT DISTINCT blueprint.study.id as studyId,ecosystem_service_indicator.id as ecosystemserviceindicatorId,blueprint.indicator.label as indicator,'somewhere' as location ,blueprint.study.study_name,ecosystem_service_indicator.start_year as year, blueprint.study_purpose.label as study_purpose";
myQuery += " FROM";
myQuery += "   blueprint.study ";
myQuery += ", blueprint.indicator";
myQuery += ",  blueprint.ecosystem_service_indicator";
myQuery += ",  blueprint.study_purpose";
myQuery += " WHERE";
myQuery += "   study.id = ecosystem_service_indicator.study_id";
myQuery += " AND study.study_purpose_id = study_purpose.id";
myQuery += " AND blueprint.indicator.id = ecosystem_service_indicator.indicator_id";
myQuery += " AND blueprint.study.id = " + id;

myQuery += ";";

        String url = "jdbc:postgresql://ies-pgsql.jrc.org:5432/H05-esp";
        String username = "h05esp-ro";
        String password = "5espr1";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);
//out.print(myQuery);
%>
