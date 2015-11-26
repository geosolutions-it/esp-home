<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%
try {
	String id= request.getParameter("id");
	

	String driver = "org.postgresql.Driver";
	String url = "jdbc:postgresql://species.jrc.org:5432/dopa";
	String username = "appuser";
	String password = "5Ti5k9";
	String myDataField = null;

	//String myQuery = "SELECT id,country_id, parent_id, name, ST_AsText(ST_Envelope(geom_generalized)) as extent ,ST_AsText(ST_PointOnSurface(geom_generalized)) as centroid,ST_AsText(geom_generalized) as geom FROM administrative_units.adminunit_gaul2008 where country_id = " + id +" AND admin_level = 0;";
	String myQuery = "SELECT administrative_units.adminunit_gaul2008.id,country_id, isoa2_id, isoa3_id,parent_id, administrative_units.adminunit_gaul2008.name, ST_AsText(ST_Envelope(geom_generalized)) as extent ,ST_AsText(ST_PointOnSurface(geom_generalized)) as centroid,ST_AsText(geom_generalized) as geom FROM administrative_units.adminunit_gaul2008, administrative_units.country where administrative_units.country.id = administrative_units.adminunit_gaul2008.country_id AND admin_level = 0 AND administrative_units.adminunit_gaul2008.country_id = " + id;
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