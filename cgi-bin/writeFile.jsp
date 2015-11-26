<%@page session="false"%>
<%@page import="java.net.*,java.io.*" %>
<%
try {
       response.addHeader("content-disposition", "attachment; filename=wmc.xml");
       response.setContentType("text/xml");
	String info = request.getParameter("body");
	info= URLDecoder.decode(info);
	PrintWriter w = response.getWriter();  
	w.print(info);  
} catch(Exception e) {
	response.setStatus(500);
%><%=e%><%
}
%>