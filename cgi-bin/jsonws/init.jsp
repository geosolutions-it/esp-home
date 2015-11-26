<%
String driver = "org.postgresql.Driver";
Class.forName(driver).newInstance();
boolean includemetadata=validateBoolean(request.getParameter("includemetadata"),false);
boolean includeinfo=validateBoolean(request.getParameter("includeinfo"),false);
boolean islist=validateBoolean(request.getParameter("islist"),true);
boolean lstextent=validateBoolean(request.getParameter("lstextent"),false);
boolean lstcentroid=validateBoolean(request.getParameter("lstcentroid"),false);
boolean lstgeometry=validateBoolean(request.getParameter("lstgeometry"),false);

boolean lstcalcarea=validateBoolean(request.getParameter("lstcalcarea"),false);

boolean debg=validateBoolean(request.getParameter("debug"),false);
%>