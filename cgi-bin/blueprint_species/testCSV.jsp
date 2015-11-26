<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="querycsv.jsp" %>
<%@ include file="init.jsp" %>


<%
String myQuery = "SELECT * FROM blueprint.ecosystem_service;";

	String url = "jdbc:postgresql://species.jrc.org:5432/esp";
	String username = "appuser";
	String password = "5Ti5k9";


	String strjson=do_query(myQuery ,url,username ,password ,includemetadata,includeinfo,islist,debg);



String filename="abc.csv";

		byte requestBytes[] = strjson.getBytes();

                ByteArrayInputStream bis = new ByteArrayInputStream(requestBytes);

                response.reset();

                response.setContentType("application/text");

                response.setHeader("Content-disposition","attachment; filename=" +filename);

                byte[] buf = new byte[1024];

                  int len;

                  while ((len = bis.read(buf)) > 0){

                                  response.getOutputStream().write(buf, 0, len);

                                 }

                bis.close();

                response.getOutputStream().flush(); 
%>
