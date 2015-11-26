<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="query.jsp" %>
<%@ include file="init.jsp" %>


<%
String id = request.getParameter("id");
if(id != null)if(!isIntegerList(id )){out.print("{\"result\":\"id should be integer list\"}");return;}

boolean isfirst=true;
String myQuery = "SELECT DISTINCT blueprint.study.id as studyId,ecosystem_service_indicator.id as ecosystemserviceindicatorId,blueprint.indicator.label as indicator,blueprint.study.study_location as location ,blueprint.study.study_duration as duration ,blueprint.study.study_name,ecosystem_service_indicator.start_year as year, blueprint.study_purpose.label as study_purpose, blueprint.indicator_surface.spatial_data_type_id";
myQuery += " FROM";
myQuery += "   blueprint.study ";
myQuery += ", blueprint.indicator";
myQuery += ",  blueprint.ecosystem_service_indicator left outer join blueprint.indicator_surface on ecosystem_service_indicator.id = blueprint.indicator_surface.ecosystem_service_indicator_id";
myQuery += ",  blueprint.study_purpose";
myQuery += " WHERE";
myQuery += "   study.id = ecosystem_service_indicator.study_id";
myQuery += " AND study.study_purpose_id = study_purpose.id";
myQuery += " AND blueprint.indicator.id = ecosystem_service_indicator.indicator_id";
myQuery += "   AND blueprint.ecosystem_service_indicator.id  IN (" + id +")";
myQuery += ";";

        String url = "jdbc:postgresql://ies-pgsql.jrc.org:5432/H05-esp";
        String username = "h05esp-ro";
        String password = "5espr1";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);
//out.print(myQuery);
%>
