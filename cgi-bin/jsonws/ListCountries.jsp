<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="query.jsp" %>
<%@ include file="init.jsp" %>


<%
//OFAC|ACP|ACP - Caribbean|ACP - Pacific|ACP - Africa
String id = request.getParameter("id");
if(id != null){
	if(id.toLowerCase().equals("ofac"))
		id="OFAC";
	else if(id.toLowerCase().equals("acp"))
		id="ACP";
	else if(id.toLowerCase().equals("acp - caribbean"))
		id="ACP - Caribbean";
	else if(id.toLowerCase().equals("acp - pacific"))
		id="ACP - Pacific";
	else if(id.toLowerCase().equals("acp - pacific"))
		id="ACP - Pacific";
	else if(id.toLowerCase().equals("acp - africa"))
		id="ACP - Africa";
	else{
		out.print("{\"result\":\""+id+" not acceptable\"}");
		return;
	}
}

String myQuery = "SELECT DISTINCT g.id,administrative_units.country.id as country_id, isoa2_id as iso2, isoa3_id as iso3, name ";

myQuery = add_extra_select_fields(myQuery,"geom",lstextent,lstcentroid,lstgeometry,lstcalcarea);


myQuery += "FROM administrative_units.country ";
if(id!=null){
	myQuery += "	,(SELECT country_id, grouping_id FROM administrative_units.country_grouping WHERE grouping_id = '"+id+"') as c";
	myQuery += "	,(SELECT country_id, id FROM administrative_units.adminunit_gaul2008 WHERE admin_level=0) as g";
	myQuery += " WHERE administrative_units.country.id = c.country_id and c.country_id=g.country_id";
}else{
	myQuery += "	,(SELECT country_id, id FROM administrative_units.adminunit_gaul2008 WHERE admin_level=0) as g";
	myQuery += " WHERE administrative_units.country.id=g.country_id";

}
myQuery += " ORDER BY name;";

	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
	String username = "appuser";
	String password = "5Ti5k9";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

%>
