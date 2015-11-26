<%@page session="false"%>
<%@page import="java.net.*,java.io.*" %>
<%@page import="org.apache.commons.httpclient.*,org.apache.commons.httpclient.methods.*" %>

<%
	InputStream reqInputStream = null;
	InputStream resInputStream = null;		
	OutputStream resOutputStream = null;
	
	if(request.getParameter("url") != null && request.getParameter("url") != "") {
		
		String url = request.getParameter("url");			
		PostMethod post = new PostMethod(url);			
		reqInputStream = request.getInputStream();
		RequestEntity entity = new InputStreamRequestEntity(reqInputStream, request.getContentType());
		//RequestEntity entity = new InputStreamRequestEntity(reqInputStream, "text/xml;charset=ISO-8859-1");
		post.setRequestEntity(entity);
		
		HttpClient httpclient = new HttpClient();
		try {
			httpclient.executeMethod(post);
			resInputStream = post.getResponseBodyAsStream();
			
			String contentType = post.getResponseHeader("Content-Type").getValue();		
			response.setContentType(contentType);
			
			// for JSP only
			out.clear();
			out = pageContext.pushBody();
			
			resOutputStream = response.getOutputStream();
			int buffer_length = 4096;
			byte[] buffer = new byte[buffer_length];
			int bytesRead = 0;
			while((bytesRead = resInputStream.read(buffer, 0, buffer_length)) > 0) {
				resOutputStream.write(buffer, 0, bytesRead);
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			post.releaseConnection();
		}
	} else {
		return;
	}
%>