<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%response.setHeader( "Pragma", "no-cache" );   response.setHeader( "Cache-Control", "no-cache" );   response.setDateHeader( "Expires", 0 );%>
<%
try {
	String site = request.getParameter("site");
	String buffer = request.getParameter("buffer");
	if(buffer == null)buffer = "false";
	if(!buffer.equals("true"))buffer = "false";
	String driver = "org.postgresql.Driver";
	String decadestart= request.getParameter("decadestart");
	if(decadestart==null)decadestart="19999999";

	String decadeend= request.getParameter("decadeend");
	if(decadeend==null)decadeend="29999999";

	String urlFires = "jdbc:postgresql://durga.jrc.org:5432/dbmfires";
	String usernameFires = "romfires";
	String passwordFires = "proc-data";
	String myDataFieldFires = null;
String tbl;

if(buffer.equals("false"))
	tbl="pa.np0km";
else
	tbl="pa.np25km";

	String myQueryFires;
myQueryFires = "SELECT c1.decade,c1.n, SUM(SUM(n)) OVER";
myQueryFires +="       (ORDER BY c1.decade ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)";
myQueryFires +="      AS ncum";
myQueryFires +=" FROM";
myQueryFires +=" (SELECT decade, count(*) as n,avg(frp)";
myQueryFires +=" FROM fires.mrr as f,"+tbl+" as p";
myQueryFires +=" WHERE ST_Contains(p.the_geom,f.geom) AND decade <= " + decadeend+ " AND decade >= " +decadestart + " AND p.site_code = " + site;
myQueryFires +=" GROUP BY decade";
myQueryFires +=" ORDER BY decade) as c1";
myQueryFires +=" GROUP BY c1.decade,c1.n";

	
	Connection myConnectionFires = null;
	PreparedStatement myPreparedStatementFires = null;
	ResultSet myResultSetFires = null;
	Class.forName(driver).newInstance();
	myConnectionFires = DriverManager.getConnection(urlFires,usernameFires,passwordFires);
	myPreparedStatementFires = myConnectionFires.prepareStatement(myQueryFires);
	myResultSetFires = myPreparedStatementFires.executeQuery();

	String myjson="{\"firesResult\":[";
	boolean isfirst=true;

	while(myResultSetFires.next()){
		if(isfirst == true)
			isfirst=false;
		else
			myjson=myjson+",";
		myjson=myjson+"{";

		myDataFieldFires = myResultSetFires.getString("decade");
		myjson = myjson +"\"decade\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("n");
		myjson = myjson +"\"n\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("ncum");
		myjson = myjson +"\"ncum\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson=myjson+"}";
	}
	myjson=myjson+"]}";
	myResultSetFires.close();
	myPreparedStatementFires.close();
	myConnectionFires.close();
	out.print(myjson);

//out.print(decadestart);

	}
	catch(ClassNotFoundException e){
		e.printStackTrace();
	}
	catch (SQLException ex){
		out.print("SQLException: "+ex.getMessage());
		out.print("SQLState: " + ex.getSQLState());
		out.print("VendorError: " + ex.getErrorCode());
	}




%>