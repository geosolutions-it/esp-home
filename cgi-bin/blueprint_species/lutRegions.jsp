<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="query.jsp" %>
<%@ include file="init.jsp" %>


<%
String myQuery = "Select id, parent_id,n FROM (SELECT id,parent_id  FROM administrative_units.grouping g WHERE grouping_type_id = 'Region' ORDER BY id) g LEFT OUTER JOIN (SELECT grouping_id,Count(*) as n FROM blueprint.ecosystem_service_indicator_grouping GROUP BY grouping_id ) n ON g.id=n.grouping_id ORDER BY id;";

	String url = "jdbc:postgresql://species.jrc.org:5432/esp";
	String username = "appuser";
	String password = "5Ti5k9";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

%>
