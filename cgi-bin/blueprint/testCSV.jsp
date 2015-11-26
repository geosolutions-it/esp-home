<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>
<%@ include file="querycsv.jsp" %>
<%@ include file="init.jsp" %>


<%
String myQuery = "SELECT * FROM blueprint.ecosystem_service;";

        String url = "jdbc:postgresql://ies-pgsql.jrc.org:5432/H05-esp";
        String username = "h05esp-ro";
        String password = "5espr1";


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
