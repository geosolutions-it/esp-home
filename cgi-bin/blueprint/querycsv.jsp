<%!

boolean validateBoolean(String input,boolean dflt)
{
	if(input== null)return dflt;
	if(input.toLowerCase().equals(""+(!dflt)))return !dflt;
	return dflt;
}
String validateStringList(String input, String strlist,String dflt){
	if(input==null) return dflt;
	String[] stArray = strlist.split(",");
	for(int i=0;i<stArray.length;i++)
		if(stArray[i].equals(input.toLowerCase()))return stArray[i];
	return dflt;
}

String[] validateInputStringList(String input){
	if(input==null) return null;
	if(!input.substring(0,1).equals("(") || !input.substring(0,1).equals(")"))
		return null;
	return input.substring(1,input.length()-1).split(","); 
}

boolean  isIntegerList(String input){
	String[] lst = input.split(","); 
	for (int i = 0; i < lst.length; i++){
		if(!isInteger(lst[i]))
			return false;
	}
	return true;
}


boolean isInteger(String s){
	String regexstr = "[0-9]*";
	return s.matches(regexstr);
}
boolean isDecimal(String s){
	String regexstr = "^[0-9]\\d*(\\.\\d+)?$";
	return s.matches(regexstr);
}
boolean isWord(String s){
	String regexstr = "[A-Za-z][A-Za-z_0-9]*";
	return s.matches(regexstr);
}
boolean isWords(String s){
	String regexstr = "^[a-zA-Z0-9_]+([\\s][a-zA-Z0-9_]+)*$";
	return s.matches(regexstr);
}

boolean IsNumeric(String strString) {
	if(strString == null) return true;
	String strValidChars = "0123456789.";
	char strChar;
	boolean blnResult = true;
	if (strString.length() == 0) {
		return false;
	}

	for (int i = 0; i < strString.length() && blnResult == true; i++) {
		strChar = strString.charAt(i);
		if (strValidChars.indexOf(strChar) == -1) {
			blnResult = false;
		}
	}
	return blnResult;
}




String add_extra_select_fields(String myQuery,String geofield,boolean lstextent,boolean lstcentroid,boolean lstgeometry,boolean lstcalcarea)
{
	if(lstextent) myQuery += ",ST_AsText(ST_Envelope("+geofield+")) as extent ";
	if(lstcentroid) myQuery += ",ST_AsText(ST_PointOnSurface("+geofield+")) as centroid ";
	if(lstgeometry) myQuery += ",ST_AsText("+geofield+") as geometry ";
	if(lstcalcarea)  myQuery += ",ST_area(geography("+geofield+"))/1000000 as calcarea ";
	return myQuery;
}


String  do_query(String strquery,String db_url,String db_username,String db_password,boolean includemetadata,boolean includeinfo,boolean islist,boolean debg){
	try {
		java.util.Date startdate = new java.util.Date();
		String myDataField = null;
		Connection myConnection = null;
		PreparedStatement myPreparedStatement = null;
		ResultSet myResultSet = null;
		myConnection = DriverManager.getConnection(db_url,db_username,db_password);
		myPreparedStatement = myConnection.prepareStatement(strquery);
		myResultSet = myPreparedStatement.executeQuery();
		ResultSetMetaData md;
		md = myResultSet.getMetaData();
		String myjson="";
		int count = md.getColumnCount();
		int rowcnt=0;
		boolean isfirst;
		isfirst=true;
		for (int i=1; i<=count; i++) {
				if(isfirst == true)
					isfirst=false;
				else
					myjson=myjson+",";
				myjson +=md.getColumnName(i);
		}
		myjson+="\n";

		while(myResultSet.next()){
			rowcnt++;
			for (int i=1; i<=count; i++) {
				myDataField = myResultSet.getString(md.getColumnName(i));
				myDataField =myDataField +"";
				while(myDataField.indexOf("\r") > 0)
					myDataField=myDataField.replace("\r","");
				while(myDataField.indexOf("\n") > 0)
					myDataField=myDataField.replace("\n"," ");

 				if( md.getColumnTypeName(i) == "varchar")
					myjson = myjson + "\""+myDataField+"\"";
				else
					myjson = myjson + myDataField;
				if(i<count)
					myjson = myjson + ",";
				else
					myjson=myjson+"\n";
			}
		}
	

		
		myResultSet.close();
		myPreparedStatement.close();
		myConnection.close();
		return myjson;
		//out.print(myjson);
	}
	
	catch (SQLException ex){
			if(debg)
				return("SQLException: "+ex.getMessage());
			else
				return("{\"result\":\"server error\"}");
			//
			//return("SQLState: " + ex.getSQLState());
			//return("VendorError: " + ex.getErrorCode());
	}
}

String  get_value(String strquery,String db_url,String db_username,String db_password){
	try {
//		String driver = "org.postgresql.Driver";
		java.util.Date startdate = new java.util.Date();
		String myDataField = null;
		Connection myConnection = null;
		PreparedStatement myPreparedStatement = null;
		ResultSet myResultSet = null;
//		Class.forName(driver).newInstance();
		myConnection = DriverManager.getConnection(db_url,db_username,db_password);
		myPreparedStatement = myConnection.prepareStatement(strquery);
		myResultSet = myPreparedStatement.executeQuery();
		while(myResultSet.next()){
				myDataField = myResultSet.getString(1);
				break;
		}
		myResultSet.close();
		myPreparedStatement.close();
		myConnection.close();
		return myDataField ;
	}
	
	catch (SQLException ex){
			return("SQLException: "+ex.getMessage());
			//
			//return("SQLState: " + ex.getSQLState());
			//return("VendorError: " + ex.getErrorCode());
	}
}
%>