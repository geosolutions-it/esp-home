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




String myQuery = "SELECT blueprint.indicator.label as maptitle,blueprint.indicator_surface.*,blueprint.areal_unit.label as areal_unit,blueprint.quantification_unit.label as quantification_unit,blueprint.temporal_unit.label as temporal_unit,ST_AsText(envelope) as extent,round(ST_Area(geography(envelope))) as area  ";
myQuery += "  FROM blueprint.indicator_surface,blueprint.indicator,blueprint.ecosystem_service_indicator ";
myQuery += " left outer join blueprint.areal_unit on ecosystem_service_indicator.areal_unit_id = blueprint.areal_unit.id ";
myQuery += " left outer join blueprint.quantification_unit on ecosystem_service_indicator.quantification_unit_id = blueprint.quantification_unit.id ";
myQuery += " left outer join blueprint.temporal_unit on ecosystem_service_indicator.temporal_unit_id = blueprint.temporal_unit.id ";




myQuery += "WHERE blueprint.indicator_surface.ecosystem_service_indicator_id=" + id + " AND blueprint.ecosystem_service_indicator.id = "+id+ " AND blueprint.ecosystem_service_indicator.indicator_id = blueprint.indicator.id;";

	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);
//out.print(myQuery);
%>
