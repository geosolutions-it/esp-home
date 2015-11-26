<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="databaseConnection.jsp" %>
<%
try {

	String myDataField = null;
	String myQuery = "SELECT \"CountryID\" as gid, \"ISO3166_alpha3\" as id, \"CountryNameEN\" as name FROM \"KnowledgeBase\".\"Countries\" WHERE \"FORAFCountry\" = true AND \"CountryID\" <> 1500 order by \"CountryNameEN\"";
	Connection myConnection = null;
	PreparedStatement myPreparedStatement = null;
	ResultSet myResultSet = null;
	Class.forName(driver).newInstance();
	myConnection = DriverManager.getConnection(url,username,password);
	myPreparedStatement = myConnection.prepareStatement(myQuery);
	myResultSet = myPreparedStatement.executeQuery();
	String myjson="{\"ListForafCountriesResult\":[";
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

		myDataField = myResultSet.getString("id");
		myjson = myjson +"\"id\":";
		myjson = myjson + "\"" + myDataField + "\"";
		myjson = myjson + ",";


		myDataField = myResultSet.getString("name");
		myjson = myjson +"\"name\":";
		myjson = myjson + "\""+myDataField+"\"";

		myjson=myjson+"}";

	}
	myjson=myjson+"]}";
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




