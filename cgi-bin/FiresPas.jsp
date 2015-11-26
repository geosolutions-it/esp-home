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

	String myQueryFires = "SELECT site_code, areaname, designate FROM pa.np0km WHERE iso3 = '" + iso3 + "' ORDER BY areaname";

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

		myDataFieldFires = myResultSetFires.getString("site_code");
		myjson = myjson +"\"site_code\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("areaname");
		myjson = myjson +"\"areaname\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("designate");
		myjson = myjson +"\"designate\":";
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