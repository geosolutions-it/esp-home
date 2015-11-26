<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="query.jsp" %>
<%@ include file="init.jsp" %>


<%
String thegeom = request.getParameter("wkt");
String decadestart= request.getParameter("decadestart");
if(decadestart== null ){
		out.print("{\"result\":\"decadestart is necessary\"}");
		return;
}
if(!isInteger(decadestart)){
		out.print("{\"result\":\"decadestart should be integer\"}");
		return;
}

String decadeend= request.getParameter("decadeend");
if(decadeend== null ){
		out.print("{\"result\":\"decadeend is necessary\"}");
		return;
}
if(!isInteger(decadeend)){
		out.print("{\"result\":\"decadeend should be integer\"}");
		return;
}

String id = request.getParameter("id");
if(id == null){
		out.print("{\"result\":\"id is necessary\"}");
		return;
}
if(!isInteger(id)){
		out.print("{\"result\":\"id should be integer\"}");
		return;
}
String buffer = request.getParameter("buffer");
if(buffer == null){
		
}
else if(!isInteger(buffer)){
		out.print("{\"result\":\"buffer should be integer\"}");
		return;
}


String myQuery1;
if(buffer==null)
	myQuery1 = "SELECT ST_AsText(geom) FROM protected_sites.wdpa_latest WHERE wdpa_id = "+id + ";";
else
	myQuery1 = "SELECT ST_AsText(ST_Buffer(geography(geom),"+buffer+")) FROM protected_sites.wdpa_latest WHERE wdpa_id = "+id + ";";

String url1 = "jdbc:postgresql://species.jrc.org:5432/dopa";
String username1 = "appuser";
String password1 = "5Ti5k9";

String strjson1=get_value(myQuery1 ,url1,username1 ,password1 );

String myQuery = "SELECT c3.decade,c3.a, SUM(SUM(c3.a)) OVER";
myQuery += "(ORDER BY c3.decade ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)";
myQuery += "      AS acum";
myQuery += " FROM";
myQuery += " (SELECT c2.decade,SUM(a)as a";
myQuery += " FROM";
myQuery += " (SELECT c1.decade,ST_area(geography(geom))/10000 as a";
myQuery += " FROM";
myQuery += "(SELECT decade, the_geom as geom";
myQuery += " FROM fires.mcd45a1 as f";
myQuery += " WHERE ST_Intersects(ST_GeometryFromText('"+strjson1+"',4326),f.the_geom) AND decade <= " +decadeend+ " AND decade >= " +decadestart+ " ";
myQuery += " GROUP BY decade,geom";
myQuery += " ORDER BY decade) as c1";
myQuery += " GROUP BY c1.decade,a) as c2";
myQuery += " GROUP BY c2.decade) as c3";
myQuery += " GROUP BY c3.decade,c3.a";

//	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
//	String username = "appuser";
//	String password = "5Ti5k9";
	String url = "jdbc:postgresql://durga.jrc.org:5432/dbmfires";
	String username = "romfires";
	String password = "proc-data";
//	String url = "jdbc:postgresql://damon.jrc.it:5432/monde";
//	String username = "postgres";
//	String password = "superman08";

	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);
%>
