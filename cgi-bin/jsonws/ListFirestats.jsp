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

String myQuery = "SELECT c1.decade,c1.n, SUM(SUM(n)) OVER";
myQuery += "       (ORDER BY c1.decade ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)";
myQuery += "      AS ncum";
myQuery += " FROM";
myQuery += " (SELECT decade, count(*) as n";
myQuery += " FROM fires.mrr as f";
myQuery += " WHERE ST_Contains(ST_GeometryFromText('"+strjson1+"',4326),f.geom) AND decade <= " +decadeend+ " AND decade >= " +decadestart+ " ";
myQuery += " GROUP BY decade";
myQuery += " ORDER BY decade) as c1";
myQuery += " GROUP BY c1.decade,c1.n";

//	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
//	String username = "appuser";
//	String password = "5Ti5k9";
//	String url = "jdbc:postgresql://durga.jrc.org:5432/dbmfires";
//	String username = "romfires";
//	String password = "proc-data";
	String url = "jdbc:postgresql://damon.jrc.it:5432/monde";
	String username = "postgres";
	String password = "superman08";

	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);
	out.print(strjson);
%>
