
<%
try {
	java.util.Date startdate = new java.util.Date();
	String myDataField = null;
	Connection myConnection = null;
	PreparedStatement myPreparedStatement = null;
	ResultSet myResultSet = null;
	Class.forName(driver).newInstance();
	myConnection = DriverManager.getConnection(url,username,password);
	myPreparedStatement = myConnection.prepareStatement(myQuery);
	myResultSet = myPreparedStatement.executeQuery();
	ResultSetMetaData md;
	md = myResultSet.getMetaData();
	String myjson="";
	int count = md.getColumnCount();
	int rowcnt=0;
	
	myjson+="{\"result\":";


	boolean isfirst=true;

	
	if(islist)
		myjson+="[";
	isfirst=true;

	while(myResultSet.next()){
		rowcnt++;
		if(isfirst == true)
			isfirst=false;
		else
			myjson=myjson+",";
		myjson=myjson+"{";
		for (int i=1; i<=count; i++) {
			
			myDataField = myResultSet.getString(md.getColumnName(i));
			myjson = myjson +"\"" + md.getColumnName(i) + "\":";
			if(IsNumeric(myDataField ))
				myjson = myjson + ""+myDataField +"";
			else
				myjson = myjson + "\""+myDataField +"\"";
			if(i<count)
				myjson = myjson + ",";
			else
				myjson=myjson+"}";
		}
	}
	if(islist)
		myjson=myjson+"]";
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