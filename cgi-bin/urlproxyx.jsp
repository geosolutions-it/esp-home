<%@page session="false"%>
<%@page import="java.net.*,java.io.*" %>
<%
try {
       String qs = request.getQueryString();
	String reqUrl = request.getParameter("url");
%><%=(qs.split("=")[0].equals("url")) %><%
	if(!qs.split("=")[0].equals("url")){
		reqUrl = reqUrl + qs.replace("url="+reqUrl,"");
%>AAA<%
	}
	else{
		reqUrl=qs.replace("url=","");
%>BBB<%

	}

	

	
	reqUrl = URLDecoder.decode(reqUrl);
	URL url = new URL(reqUrl);
	
	HttpURLConnection con = (HttpURLConnection)url.openConnection();
	con.setDoOutput(true);
	con.setRequestMethod(request.getMethod());
	int clength = request.getContentLength();
	if(clength > 0) {
		con.setDoInput(true);
		byte[] idata = new byte[clength];
		request.getInputStream().read(idata, 0, clength);
		con.getOutputStream().write(idata, 0, clength);
	}
	response.setContentType("text/html");

%><%=reqUrl %><%








   








} catch(Exception e) {
	response.setStatus(500);
%><%=e%><%
}
%>