<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%
try {
	String site = request.getParameter("site");
	String driver = "org.postgresql.Driver";
	String urlFires = "jdbc:postgresql://durga.jrc.org:5432/dbmfires";
	String usernameFires = "romfires";
	String passwordFires = "proc-data";
	String myDataFieldFires = null;

//	String myQueryFires = "SELECT site_code, areaname, designate, iso3, country, iucncat, status, gisarea_ha, ST_AsText(ST_Envelope(the_geom)) as extent ,ST_AsText(ST_PointOnSurface(the_geom)) as centroid FROM pa.np0km WHERE site_code = " + site;

String myQueryFires = "SELECT DISTINCT pa.np0km.site_code, areaname, designate, iso3, country,";
myQueryFires  += "iucncat, status, gisarea_ha,";
myQueryFires  += "ST_AsText(ST_Envelope(pa.np0km.the_geom)) as extent0 ,";
myQueryFires  += "ST_AsText(ST_PointOnSurface(pa.np0km.the_geom)) as centroid0, ";
myQueryFires  += "ST_Area((ST_GeographyFromText(ST_AsText(pa.np0km.the_geom))))/10000 as calcarea0,";
myQueryFires  += "ST_AsText(ST_Envelope(pa.np25km.the_geom)) as extent25 ,";
myQueryFires  += "ST_AsText(ST_PointOnSurface(pa.np25km.the_geom)) as centroid25,";
myQueryFires  += "ST_Area((ST_GeographyFromText(ST_AsText(pa.np25km.the_geom))))/10000 as calcarea25 ";
myQueryFires  += " FROM pa.np0km JOIN pa.np25km";
myQueryFires  += " ON pa.np0km.site_code = pa.np25km.site_code";
myQueryFires  += " WHERE   pa.np0km.site_code = "+ site;

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
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("iso3");
		myjson = myjson +"\"iso3\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("country");
		myjson = myjson +"\"country\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("iucncat");
		myjson = myjson +"\"iucncat\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("status");
		myjson = myjson +"\"status\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("gisarea_ha");
		myjson = myjson +"\"gisarea_ha\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("extent0");
		myjson = myjson +"\"extent0\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("centroid0");
		myjson = myjson +"\"centroid0\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("calcarea0");
		myjson = myjson +"\"calcarea0\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("extent25");
		myjson = myjson +"\"extent25\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("centroid25");
		myjson = myjson +"\"centroid25\":";
		myjson = myjson + "\""+myDataFieldFires +"\"";
		myjson = myjson + ",";

		myDataFieldFires = myResultSetFires.getString("calcarea25");
		myjson = myjson +"\"calcarea25\":";
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