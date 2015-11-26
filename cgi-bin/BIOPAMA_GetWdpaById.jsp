<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%
try {
	String id = request.getParameter("id");
	String driver = "org.postgresql.Driver";
	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
	String username = "appuser";
	String password = "5Ti5k9";
	String myDataField = null;

	String myQuery = "SELECT  country, name, desig, iucn_cat, marine, status, status_yr, ST_Area((ST_GeographyFromText(ST_AsText(geom))))/10000 as area,ST_Area(ST_Buffer(ST_GeographyFromText(ST_AsText(geom)),25000))/10000 as area25, ST_AsText(ST_Envelope(geom)) as extent, ST_AsText(ST_PointOnSurface(geom)) as centroid, ST_AsText(geom) as geom FROM protected_sites.wdpa_latest WHERE wdpa_id = "+id+";";
//ST_Buffer
	Connection myConnection = null;
	PreparedStatement myPreparedStatement = null;
	ResultSet myResultSet = null;
	Class.forName(driver).newInstance();
	myConnection = DriverManager.getConnection(url,username,password);
	myPreparedStatement = myConnection.prepareStatement(myQuery);
	myResultSet = myPreparedStatement.executeQuery();

	String myjson="{\"Result\":[";
	boolean isfirst=true;

	ResultSetMetaData md;
	md = myResultSet.getMetaData();
	int count = md.getColumnCount();

	while(myResultSet.next()){
		if(isfirst == true)
			isfirst=false;
		else
			myjson=myjson+",";
		myjson=myjson+"{";
		for (int i=1; i<=count; i++) {
			
			myDataField = myResultSet.getString(md.getColumnName(i));
			myjson = myjson +"\"" + md.getColumnName(i) + "\":";
			myjson = myjson + "\""+myDataField +"\"";
			if(i<count)
				myjson = myjson + ",";
			else
				myjson=myjson+"}";
		}
	}
	myjson=myjson+"]}";
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