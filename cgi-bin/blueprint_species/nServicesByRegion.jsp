<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="query.jsp" %>
<%@ include file="init.jsp" %>


<%
String myQuery = "SELECT region, Count(a.id) FROM(SELECT DISTINCT g.id as region ,bi.id  FROM blueprint.ecosystem_service_indicator bi, blueprint.ecosystem_service_indicator_country bc, administrative_units.country c, administrative_units.country_grouping cg, administrative_units.grouping g WHERE bi.id = bc.ecosystem_service_indicator_id AND c.id = bc.country_id AND c.id=cg.country_id AND g.id=cg.grouping_id AND g.grouping_type_id = 'Region') a Group by region Order by region;";

	String url = "jdbc:postgresql://species.jrc.org:5432/esp";
	String username = "appuser";
	String password = "5Ti5k9";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

%>
