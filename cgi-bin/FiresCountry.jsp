<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%
try {
	String iso3 = request.getParameter("iso3");
	String driver = "org.postgresql.Driver";
	String urlFires = "jdbc:postgresql://durga.jrc.org:5432/dbmfires";
	String usernameFires = "romfires";
	String passwordFires = "proc-data";
	String myDataFieldFires = null;

	String myQueryFires = "SELECT gid, iso_2digit as iso2, iso_3digit as iso3, unshrtnam as name, pop2007, sqkm, ST_AsText(ST_Envelope(the_geom)) as extent ,ST_AsText(ST_PointOnSurface(the_geom)) as centroid FROM pa.country WHERE iso_3digit = '"+iso3+"'";

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

		myDataFieldFires = myResultSetFires.getString("gid");
		myjson = myjson +"\"gid\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("iso2");
		myjson = myjson +"\"iso2\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("iso3");
		myjson = myjson +"\"iso3\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("name");
		myjson = myjson +"\"name\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("pop2007");
		myjson = myjson +"\"pop2007\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("sqkm");
		myjson = myjson +"\"sqkm\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("extent");
		myjson = myjson +"\"extent\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("centroid");
		myjson = myjson +"\"centroid\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson=myjson+"}";
	}
	myjson=myjson+"]}";
	myResultSetFires.close();
	myPreparedStatementFires.close();
	myConnectionFires.close();
	out.print(myjson);
//out.print(myQueryFires );

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