<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%
try {
	String gid = request.getParameter("gid");
	String driver = "org.postgresql.Driver";
	String url = "jdbc:postgresql://durga.jrc.org:5432/dbgeo";
	String username = "usrgeo";
	String password = "U5493o";
	String myDataField = null;
	String myQuery = "SELECT ST_AsText(geom) as geom FROM geodata.level1 WHERE gid = " + gid;
	Connection myConnection = null;
	PreparedStatement myPreparedStatement = null;
	ResultSet myResultSet = null;
	Class.forName(driver).newInstance();
	myConnection = DriverManager.getConnection(url,username,password);
	myPreparedStatement = myConnection.prepareStatement(myQuery);
	myResultSet = myPreparedStatement.executeQuery();
	String myjson="{\"geomGetCountryResult\":";
	boolean isfirst=true;
	while(myResultSet.next()){
		if(isfirst == true)
			isfirst=false;
		else
			myjson=myjson+",";
		myjson=myjson+"{";

		myDataField = myResultSet.getString("geom");
		myjson = myjson +"\"geom\":";
		myjson = myjson + "\""+myDataField+"\"";
		myjson=myjson+"}";
	}
	myjson=myjson+"}";
	myResultSet.close();
	myPreparedStatement.close();
	

//	out.print(myjson );


myQuery = "SELECT nom FROM geodata.cities as c WHERE ST_Contains(ST_GeomFromText('" + myDataField + "',1),c.geom)";
myPreparedStatement = myConnection.prepareStatement(myQuery);
	myResultSet = myPreparedStatement.executeQuery();
	myjson="{\"geomGetCountryResult\":";
	isfirst=true;
	while(myResultSet.next()){
		if(isfirst == true)
			isfirst=false;
		else
			myjson=myjson+",";
		myjson=myjson+"{";

		myDataField = myResultSet.getString("nom");
		myjson = myjson +"\"geom\":";
		myjson = myjson + "\""+myDataField+"\"";
		myjson=myjson+"}";
	}
	myjson=myjson+"}";
	myResultSet.close();
	myPreparedStatement.close();
myConnection.close();


out.print(myjson);
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