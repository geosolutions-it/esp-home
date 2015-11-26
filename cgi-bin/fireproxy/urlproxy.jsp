<%@page session="false"%>
<%@page import="java.net.*,java.io.*" %>
<%
try {
//String reqUrl = request.getQueryString();
//	String reqUrl = request.getParameter("url");
//	reqUrl=reqUrl.replace("url=","");


	String qs = request.getQueryString();
	String reqUrl = request.getParameter("url");
	if(!qs.split("=")[0].equals("url")){
		reqUrl = reqUrl + qs.replace("url="+reqUrl,"");
	}
	else{
		reqUrl=qs.replace("url=","");
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
	response.setContentType(con.getContentType());

	InputStream rd = con.getInputStream();
       byte[] buf = new byte[32 * 1024]; // 32k buffer
	int nRead = 0;
	OutputStream o = response.getOutputStream();

   	while( (nRead=rd.read(buf)) != -1 ) {
        	o.write(buf, 0, nRead);
    	}
    	o.flush();
    	o.close();// *important* to ensure no more jsp output









   








} catch(Exception e) {
	response.setStatus(500);
%><%=e%><%
}
%>