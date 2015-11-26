<%@page session="false"%>
<%@page pageEncoding="LATIN1"%>
<%@page import="java.net.*,java.io.*,java.sql.*" %>

<%@ include file="isnumeric.jsp" %>
<%@ include file="../databaseConnection.jsp" %>

<%
String myQuery = "SELECT id, name, country_id FROM \"KnowledgeBase\".\"DBGEO_adminunit_gaul2008\" WHERE admin_level = 0 and (id=43 or id=45 or id=49 or id=50 or id=59 or id=68 or id=76 or id=89 or id=205 or id=214) order by name;";

	boolean islist=true;

%>
<%@ include file="query.jsp" %>
