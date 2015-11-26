<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%
try {
	String id = request.getParameter("id");
	String buffer = request.getParameter("buffer");
	if(buffer == null)buffer = "false";
	if(!buffer.equals("true"))buffer = "false";
	String driver = "org.postgresql.Driver";
	Class.forName(driver).newInstance();

	String decadestart= request.getParameter("decadestart");
	if(decadestart==null)decadestart="19999999";
	String decadeend= request.getParameter("decadeend");
	if(decadeend==null)decadeend="29999999";

	String urlpa = "jdbc:postgresql://species.jrc.it:5432/dopa";
	String unamepa = "appuser";
	String pwordpa = "5Ti5k9";
	String geomfield = null;

	String myQryPa = "SELECT name,";
	if(buffer == "false")
		myQryPa += "ST_AsText(geom) as geom ";
	else
		myQryPa += "ST_AsText(ST_Buffer(ST_GeographyFromText(ST_AsText(geom)),25000)) as geom ";
	myQryPa += " FROM protected_sites.wdpa ";
	myQryPa += " WHERE   protected_sites.wdpa.wdpa_id = "+ id;

	Connection connPa = null;
	PreparedStatement prepstatPa = null;
	ResultSet resultsetPa = null;
	connPa = DriverManager.getConnection(urlpa ,unamepa ,pwordpa );
	prepstatPa = connPa.prepareStatement(myQryPa );
	resultsetPa = prepstatPa.executeQuery();

	resultsetPa.next();
	String mygeom = resultsetPa.getString("geom");
String myjsonx = mygeom;
	resultsetPa.close();
	prepstatPa.close();
	connPa.close();

//to damon: postgres/superman09 

	//String urlFires = "jdbc:postgresql://durga.jrc.org:5432/dbmfires";
	//String usernameFires = "romfires";
	//String passwordFires = "proc-data";
	String urlFires = "jdbc:postgresql://damon.jrc.it:5432/monde";
	String usernameFires = "postgres";
	String passwordFires = "superman08";

	String myDataFieldFires = null;

	String myQueryFires;
myQueryFires = "SELECT c1.decade,c1.n, SUM(SUM(n)) OVER";
myQueryFires +="       (ORDER BY c1.decade ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)";
myQueryFires +="      AS ncum";
myQueryFires +=" FROM";
myQueryFires +=" (SELECT decade, count(*) as n,avg(frp)";
myQueryFires +=" FROM fires.mrr as f";
myQueryFires +=" WHERE ST_Contains(ST_GeometryFromText('"+mygeom+"',4326),f.geom) AND decade <= " + decadeend+ " AND decade >= " +decadestart;
myQueryFires +=" GROUP BY decade";
myQueryFires +=" ORDER BY decade) as c1";
myQueryFires +=" GROUP BY c1.decade,c1.n";

	
	Connection myConnectionFires = null;
	PreparedStatement myPreparedStatementFires = null;
	ResultSet myResultSetFires = null;

	myConnectionFires = DriverManager.getConnection(urlFires,usernameFires,passwordFires);
	myPreparedStatementFires = myConnectionFires.prepareStatement(myQueryFires);
	myResultSetFires = myPreparedStatementFires.executeQuery();
	String myDataField = null;
	String myjson="{\"Result\":[";
	boolean isfirst=true;

	ResultSetMetaData md;
	md = myResultSetFires.getMetaData();
	int count = md.getColumnCount();

	while(myResultSetFires.next()){
		if(isfirst == true)
			isfirst=false;
		else
			myjson=myjson+",";
		myjson=myjson+"{";
		for (int i=1; i<=count; i++) {
			
			myDataField = myResultSetFires.getString(md.getColumnName(i));
			myjson = myjson +"\"" + md.getColumnName(i) + "\":";
			myjson = myjson + "\""+myDataField +"\"";
			if(i<count)
				myjson = myjson + ",";
			else
				myjson=myjson+"}";
		}
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