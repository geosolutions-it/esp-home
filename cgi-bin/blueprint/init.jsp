
<%
response.setHeader("Access-Control-Allow-Origin", "*");
String driver = "org.postgresql.Driver";
Class.forName(driver).newInstance();

boolean includemetadata=validateBoolean(request.getParameter("includemetadata"),false);
String format=validateStringList(request.getParameter("format"),"json,xml,array","json"); 
String[] fields = validateInputStringList(request.getParameter("fields"));
String jsoncallback = request.getParameter("jsoncallback");
	

	


boolean includeinfo=validateBoolean(request.getParameter("includeinfo"),false);
boolean islist=validateBoolean(request.getParameter("islist"),true);
boolean lstextent=validateBoolean(request.getParameter("lstextent"),false);
boolean lstcentroid=validateBoolean(request.getParameter("lstcentroid"),false);
boolean lstgeometry=validateBoolean(request.getParameter("lstgeometry"),false);
boolean lstcalcarea=validateBoolean(request.getParameter("lstcalcarea"),false);
boolean debg=validateBoolean(request.getParameter("debug"),false);









%>