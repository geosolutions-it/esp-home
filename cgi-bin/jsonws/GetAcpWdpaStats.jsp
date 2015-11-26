<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="query.jsp" %>
<%@ include file="init.jsp" %>


<%
String myQuery = "Select Distinct acpcountries.grouping_id, w.iucn_cat, Count(*) as n, ROUND(SUM(area)/10000) as area ";
myQuery += "FROM protected_sites.wdpa_latest as w,protected_sites.site_country as psc, ";
myQuery += "(SELECT grouping_id,country_id FROM administrative_units.country_grouping WHERE grouping_id = 'ACP' OR grouping_id = 'ACP - Africa' OR grouping_id = 'ACP - Caribbean' OR grouping_id = 'ACP - Pacific' ) as acpcountries, ";
myQuery += "(SELECT country_id, id  FROM administrative_units.adminunit_gaul2008 WHERE admin_level=0) as gaulcountries ";
myQuery += "where acpcountries.country_id = gaulcountries.country_id and w.id=psc.site_id and psc.country_id = acpcountries.country_id AND is_point = false ";
myQuery += "Group BY acpcountries.grouping_id,w.iucn_cat ";
myQuery += "order by acpcountries.grouping_id,w.iucn_cat ";


	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
	String username = "appuser";
	String password = "5Ti5k9";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);

%>
