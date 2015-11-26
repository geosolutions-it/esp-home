<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%
try {

	//String reqUrl = request.getQueryString();
	//reqUrl = URLDecoder.decode(reqUrl);
	String gid = request.getParameter("gid");
	String driver = "org.postgresql.Driver";
	String url = "jdbc:postgresql://durga.jrc.org:5432/dbgeo";
	String username = "usrgeo";
	String password = "U5493o";
	String myDataField = null;
	String myQuery = "SELECT gid, country_na as name, ST_AsText(ST_Envelope(geom)) as extent ,ST_AsText(ST_PointOnSurface(geom)) as centroid FROM geodata.level1 WHERE gid = " + gid;
	Connection myConnection = null;
	PreparedStatement myPreparedStatement = null;
	ResultSet myResultSet = null;
	Class.forName(driver).newInstance();
	myConnection = DriverManager.getConnection(url,username,password);
	myPreparedStatement = myConnection.prepareStatement(myQuery);
	myResultSet = myPreparedStatement.executeQuery();
	String myjson="{\"GetCountryResult\":";
	boolean isfirst=true;
	while(myResultSet.next()){
		if(isfirst == true)
			isfirst=false;
		else
			myjson=myjson+",";
		myjson=myjson+"{";

		myDataField = myResultSet.getString("gid");
		myjson = myjson +"\"gid\":";
		myjson = myjson + myDataField;
		myjson = myjson + ",";

		myDataField = myResultSet.getString("name");
		myjson = myjson +"\"name\":";
		myjson = myjson + "\""+myDataField+"\"";
		myjson = myjson + ",";

		myDataField = myResultSet.getString("centroid");
		myjson = myjson +"\"centroid\":";
		myjson = myjson + "\""+myDataField+"\"";
		myjson = myjson + ",";

		myDataField = myResultSet.getString("extent");
		myjson = myjson +"\"extent\":";
		myjson = myjson + "\""+myDataField+"\"";


		myjson=myjson+"}";

	}
	myjson=myjson+"}";
	myResultSet.close();
	myPreparedStatement.close();
	myConnection.close();

	out.print(myjson );
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




