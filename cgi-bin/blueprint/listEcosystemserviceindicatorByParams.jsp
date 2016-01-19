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

boolean isfirst=true;
String myQuery = "SELECT blueprint.ecosystem_service_indicator.*";
myQuery += " FROM";
myQuery += "   blueprint.ecosystem_service_indicator ";
if(biomeID != null){
	myQuery += "   ,blueprint.ecosystem_service_indicator_biome ";
}
if(spatialscaleID != null){
	if(isfirst){
		isfirst=false;
		myQuery += " WHERE ";
	}else{
		myQuery += " AND ";
	}
	myQuery += "blueprint.ecosystem_service_indicator.spatial_scale_id IN (" + spatialscaleID +")";
}
if(biomeID != null){
	if(isfirst){
		isfirst=false;
		myQuery += " WHERE ";
	}else{
		myQuery += " AND ";
	}
	myQuery += "blueprint.ecosystem_service_indicator_biome.biome_id IN ( " + biomeID  +")";
	myQuery += " AND   ecosystem_service_indicator.id = ecosystem_service_indicator_biome.ecosystem_service_indicator_id";
}
if(ecosystemserviceID != null){
	if(isfirst){
		isfirst=false;
		myQuery += " WHERE ";
	}else{
		myQuery += " AND ";
	}
	myQuery += "blueprint.ecosystem_service_indicator.ecosystem_service_id IN ( " + ecosystemserviceID +")";
}

 myQuery += ";";

        


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

//out.print(myQuery);

%>
