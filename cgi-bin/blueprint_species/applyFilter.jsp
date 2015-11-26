<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="query.jsp" %>
<%@ include file="init.jsp" %>


<%
String biomeID = request.getParameter("biomeID");
if(biomeID != null)if(!isIntegerList(biomeID )){out.print("{\"result\":\"biomeID should be integer list\"}");return;}

String spatialscaleID = request.getParameter("spatialscaleID");
if(spatialscaleID != null)if(!isIntegerList(spatialscaleID )){out.print("{\"result\":\"spatialscaleID should be integer list\"}");return;}

String ecosystemserviceID = request.getParameter("ecosystemserviceID");
if(ecosystemserviceID != null)if(!isIntegerList(ecosystemserviceID )){out.print("{\"result\":\"ecosystemserviceID should be integer list\"}");return;}

String studypurposeID = request.getParameter("studypurposeID");
if(studypurposeID != null)if(!isIntegerList(studypurposeID )){out.print("{\"result\":\"studypurposeID should be integer list\"}");return;}

boolean isfirst=true;
String myQuery = "SELECT DISTINCT blueprint.study.id as studyId,ecosystem_service_indicator.id as ecosystemserviceindicatorId,blueprint.indicator.label as indicator,blueprint.study.study_location as location ,blueprint.study.study_duration as duration ,blueprint.study.study_name,ecosystem_service_indicator.start_year as year, blueprint.study_purpose.label as study_purpose, blueprint.indicator_surface.spatial_data_type_id";
myQuery += " FROM";
myQuery += "   blueprint.study ";
myQuery += ", blueprint.indicator";
if(biomeID != null)
	myQuery += ", blueprint.ecosystem_service_indicator_biome ";
myQuery += ",  blueprint.ecosystem_service_indicator left outer join blueprint.indicator_surface on ecosystem_service_indicator.id = blueprint.indicator_surface.ecosystem_service_indicator_id";
myQuery += ",  blueprint.study_purpose";
myQuery += " WHERE";
myQuery += "   study.id = ecosystem_service_indicator.study_id";
myQuery += " AND study.study_purpose_id = study_purpose.id";
myQuery += " AND blueprint.indicator.id = ecosystem_service_indicator.indicator_id";
myQuery += " AND ecosystem_service_indicator.status_id = 1";
if(biomeID != null)
	myQuery += "   AND ecosystem_service_indicator.id = ecosystem_service_indicator_biome.ecosystem_service_indicator_id";
if(spatialscaleID != null)
	myQuery += "   AND blueprint.ecosystem_service_indicator.spatial_level_id IN (" + spatialscaleID +")";
if(biomeID != null)
	myQuery += "   AND blueprint.ecosystem_service_indicator_biome.biome_id  IN (" + biomeID +")";
if(studypurposeID != null)
	myQuery += "   AND blueprint.study.study_purpose_id  IN (" + studypurposeID +")";
if(ecosystemserviceID != null)
	myQuery += "   AND blueprint.ecosystem_service_indicator.ecosystem_service_id  IN (" + ecosystemserviceID +")";
myQuery += ";";

	String url = "jdbc:postgresql://species.jrc.org:5432/esp";
	String username = "appuser";
	String password = "5Ti5k9";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);
//out.print(myQuery);
%>
