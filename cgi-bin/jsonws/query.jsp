<%!

boolean validateBoolean(String input,boolean dflt)
{
	if(input== null)return dflt;
	if(input.toLowerCase().equals(""+(!dflt)))return !dflt;
	return dflt;
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
		ResultSetMetaData md;
		md = myResultSet.getMetaData();
		String myjson="";
		int count = md.getColumnCount();
		int rowcnt=0;
		boolean isfirst;
		myjson+="{\"result\":{";
		if(includemetadata){
			myjson+="\"metadata\":{";
			myjson+="\"recordcount\":$rowcnt$,";
			myjson+="\"fieldcount\":"+count +",";
			myjson+="\"fields\":[";
			isfirst=true;

			for (int i=1; i<=count; i++) {
					if(isfirst == true)
						isfirst=false;
					else
						myjson=myjson+",";

					myjson +="{\"name\":\""+md.getColumnName(i)+"\",";
					myjson +="\"type\":"+md.getColumnType(i)+",";
					myjson +="\"typename\":\""+md.getColumnTypeName(i)+"\",";
					//myjson +="\"length\":\""+md.getLength(i)+"\",";
					myjson +="\"scale\":"+md.getScale(i)+",";

					myjson +="\"precision\":"+md.getPrecision(i)+"}";
			}
			myjson+="]";
			myjson+="}";
		}
		int startlen = myjson.length();
		isfirst=true;

		while(myResultSet.next()){
			rowcnt++;
			if(isfirst == true){
				if(includemetadata)
					myjson+=",";
				if(islist)
					myjson+="\"records\":[";
				else
					myjson+="\"record\":";
				isfirst=false;
			}else
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
			if(!islist)
				break;
		}
		if(islist && rowcnt>0)
			myjson=myjson+"]";
		myjson=myjson+"}";
		if(includeinfo){
			int endlen = myjson.length();	
			myjson+=",\"info\":{";
			myjson+="\"datetime\":\""+new java.util.Date()+"\"";
			myjson+=",\"lapse\":\""+(new java.util.Date().getTime()-startdate.getTime())+"\"";
			myjson+=",\"size\":\""+(endlen-startlen +12)+"\"";

			
//			myjson+=",\"referer\":\""+request.getHeader("referer") +"\"";
//			java.util.Enumeration enumeration = request.getHeaderNames();
//			while (enumeration.hasMoreElements()) {
//				String headername = (String)enumeration.nextElement();
//				myjson+=",\""+headername +"\":\""+request.getHeader(headername ) +"\"";
//			}
			
			myjson+="}";
		}
		myjson=myjson.replace("$rowcnt$",rowcnt+"");
		
		myjson=myjson+"}";
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