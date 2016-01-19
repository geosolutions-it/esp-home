<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="querycsv.jsp" %>
<%@ include file="init.jsp" %>


<%
String id = request.getParameter("id");
if(id != null)if(!isIntegerList(id )){out.print("{\"result\":\"id should be integer list\"}");return;}

String myQuery = "";
myQuery += " SELECT ";
myQuery += "   ecosystem_service_indicator.id, ";
myQuery += "   ecosystem_service_category.label AS ecosystem_service_category, ";
myQuery += "   ecosystem_service.label AS ecosystem_service, ";
myQuery += "   indicator.label AS indicator, ";
myQuery += "   ecosystem_service_accounting_type.label AS accounting_type, ";
myQuery += "   ecosystem_service_benefit_type.label AS accounting_beneficiary,"; 
myQuery += "   quantification_unit.label AS quantification_unit, ";
myQuery += "   quantification_unit_category.label AS quantification_unit_category, ";
myQuery += "   areal_unit.label AS areal_unit, ";
myQuery += "   temporal_unit.label AS temporal_unit, ";
myQuery += "   blueprint.datasource_label_byesiid(ecosystem_service_indicator.id) AS datasources_label, ";
myQuery += "   blueprint.datasource_url_byesiid(ecosystem_service_indicator.id) AS datasources_url, ";
myQuery += "   quantification_method.label AS quantification_method, ";
myQuery += "   spatial_level.label AS spatial_level, ";
myQuery += "   spatial_data_type.label AS spatial_data_type, ";
myQuery += "   ecosystem_service_indicator.spatial_resolution, ";
myQuery += "   blueprint.areasurface(ecosystem_service_indicator.id) AS area, ";
myQuery += "   ecosystem_service_indicator.minimum_mapping_unit, ";
myQuery += "   ecosystem_service_indicator.start_year, ";
myQuery += "   ecosystem_service_indicator.end_year, ";
myQuery += "   study_objective_met.label AS study_objective_met, ";
myQuery += "   ecosystem_service_indicator.comments";
myQuery += " FROM ";
myQuery += "   blueprint.ecosystem_service_indicator ";
myQuery += "   left outer join blueprint.ecosystem_service on ecosystem_service_indicator.ecosystem_service_id = ecosystem_service.id ";
myQuery += "   left outer join blueprint.ecosystem_service_category on ecosystem_service.ecosystem_service_category_id = ecosystem_service_category.id";
myQuery += "   left outer join blueprint.indicator on ecosystem_service_indicator.indicator_id = indicator.id ";
myQuery += "   left outer join blueprint.ecosystem_service_accounting_type on ecosystem_service_indicator.ecosystem_service_accounting_type_id = ecosystem_service_accounting_type.id ";
myQuery += "   left outer join blueprint.ecosystem_service_benefit_type on ecosystem_service_indicator.ecosystem_service_benefit_type_id = ecosystem_service_benefit_type.id";
myQuery += "   left outer join blueprint.quantification_unit on ecosystem_service_indicator.quantification_unit_id = quantification_unit.id";
myQuery += "   left outer join blueprint.quantification_unit_category  on quantification_unit.quantification_unit_category_id = quantification_unit_category.id";
myQuery += "   left outer join blueprint.areal_unit on ecosystem_service_indicator.areal_unit_id = areal_unit.id";
myQuery += "   left outer join blueprint.temporal_unit on ecosystem_service_indicator.temporal_unit_id = temporal_unit.id ";
myQuery += "   left outer join blueprint.quantification_method on ecosystem_service_indicator.quantification_method_id = quantification_method.id";
myQuery += "   left outer join blueprint.spatial_level on ecosystem_service_indicator.spatial_level_id = spatial_level.id";
myQuery += "   left outer join blueprint.spatial_data_type on ecosystem_service_indicator.spatial_data_type_id = spatial_data_type.id ";
myQuery += "   left outer join blueprint.study_objective_met on ecosystem_service_indicator.study_objective_met_id = study_objective_met.id";
if(id != null)
myQuery += " WHERE ecosystem_service_indicator.id IN ("+id+")";
myQuery += " ORDER BY";
myQuery += "   ecosystem_service_category.id ASC, ";
myQuery += "   ecosystem_service.id ASC, ";
myQuery += "   indicator.id ASC;";

	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	String filename="allservices.csv";

		byte requestBytes[] = strjson.getBytes();

                ByteArrayInputStream bis = new ByteArrayInputStream(requestBytes);

                response.reset();

                response.setContentType("application/text");

                response.setHeader("Content-disposition","attachment; filename=" +filename);

                byte[] buf = new byte[1024];

                  int len;

                  while ((len = bis.read(buf)) > 0){

                                  response.getOutputStream().write(buf, 0, len);

                                 }

                bis.close();

                response.getOutputStream().flush(); 
%>
