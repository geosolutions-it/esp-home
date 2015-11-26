<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%
try {
	String site = request.getParameter("site");
	String decadestart= request.getParameter("decadestart");
	if(decadestart==null)decadestart="19999999";
	String decadeend= request.getParameter("decadeend");
	if(decadeend==null)decadeend="29999999";
	String buffer = request.getParameter("buffer");
	if(buffer == null)buffer = "false";
	if(!buffer.equals("true"))buffer = "false";

	String driver = "org.postgresql.Driver";

	String urlFires = "jdbc:postgresql://durga.jrc.org:5432/dbmfires";
	String usernameFires = "romfires";
	String passwordFires = "proc-data";
	String myDataFieldFires = null;

	//String myQueryFires = "SELECT ST_AsText(geom) as geom ,stamp,decade,frp FROM fires.mrr as f WHERE ST_Contains(ST_GeomFromText('" + myDataField + "',4326),f.geom) AND decade <= " + decadeend+ " AND decade >= " +decadestart + " ORDER BY stamp";

	String myQueryFires;
	if(buffer.equals("false"))
		myQueryFires = "SELECT ST_AsText(geom) as geom ,stamp,decade,frp FROM fires.mrr as f,pa.np0km as p WHERE ST_Contains(p.the_geom,f.geom) AND decade <= " + decadeend+ " AND decade >= " +decadestart + "AND p.site_code = " + site + " ORDER BY stamp";
	else
		myQueryFires = "SELECT ST_AsText(geom) as geom ,stamp,decade,frp FROM fires.mrr as f,pa.np25km as p WHERE ST_Contains(p.the_geom,f.geom) AND decade <= " + decadeend+ " AND decade >= " +decadestart + "AND p.site_code = " + site + " ORDER BY stamp";




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

		myDataFieldFires = myResultSetFires.getString("geom");
		myjson = myjson +"\"geom\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("stamp");
		myjson = myjson +"\"stamp\":";
		myjson = myjson + "\""+myDataFieldFires + "\"" ;
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("decade");
		myjson = myjson +"\"decade\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("frp");
		myjson = myjson +"\"frp\":";
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