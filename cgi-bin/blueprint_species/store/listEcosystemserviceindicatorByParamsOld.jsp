<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="query.jsp" %>
<%@ include file="init.jsp" %>


<%
String studyID = request.getParameter("studyID");
if(studyID == null){
		out.print("{\"result\":\"studyID is necessary\"}");
		return;
}

if(!isInteger(studyID )){out.print("{\"result\":\"studyID should be integer\"}");return;}

String biomeID = request.getParameter("biomeID");
if(biomeID != null)if(!isInteger(biomeID )){out.print("{\"result\":\"biomeID should be integer\"}");return;}

String spatialscaleID = request.getParameter("spatialscaleID");
if(spatialscaleID != null)if(!isInteger(spatialscaleID )){out.print("{\"result\":\"spatialscaleID should be integer\"}");return;}

String ecosystemserviceID = request.getParameter("ecosystemserviceID");
if(ecosystemserviceID != null)if(!isInteger(ecosystemserviceID )){out.print("{\"result\":\"ecosystemserviceID should be integer\"}");return;}

String ecosystemservicecategoryID = request.getParameter("ecosystemservicecategoryID");
if(ecosystemservicecategoryID != null)if(!isInteger(ecosystemservicecategoryID )){out.print("{\"result\":\"ecosystemservicecategoryID should be integer\"}");return;}


String myQuery = "SELECT blueprint.ecosystem_service_indicator.*";
myQuery += " FROM";
myQuery += "   blueprint.study, ";
if(biomeID != null)
	myQuery += "   blueprint.ecosystem_service_indicator_biome, ";
if(ecosystemservicecategoryID != null)
	myQuery += "   blueprint.ecosystem_service,";
myQuery += "   blueprint.ecosystem_service_indicator ";

myQuery += " WHERE";
myQuery += "   study.id = ecosystem_service_indicator.study_id";
if(biomeID != null)
	myQuery += " AND   ecosystem_service_indicator.id = ecosystem_service_indicator_biome.ecosystem_service_indicator_id";
if(ecosystemservicecategoryID  !=null)
	myQuery += "   AND ecosystem_service_indicator.ecosystem_service_id = ecosystem_service.id";
myQuery += "   AND blueprint.study.id = " + studyID ;
if(spatialscaleID != null)
	myQuery += "   AND blueprint.ecosystem_service_indicator.spatial_scale_id = " + spatialscaleID ;
if(biomeID != null)
	myQuery += "   AND blueprint.ecosystem_service_indicator_biome.biome_id = " + biomeID ;
if(ecosystemserviceID != null)
	myQuery += "   AND blueprint.ecosystem_service_indicator.ecosystem_service_id = " + ecosystemserviceID;
if(ecosystemservicecategoryID != null)
	myQuery += "   AND blueprint.ecosystem_service.ecosystem_service_category_id = "+ ecosystemservicecategoryID;
myQuery += ";";

	String url = "jdbc:postgresql://species.jrc.org:5432/esp";
	String username = "appuser";
	String password = "5Ti5k9";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

//out.print(myQuery);


%>
