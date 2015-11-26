<%@ page import="java.io.*" %>
<%@ page import="java.net.*" %>
<%        
try{
String contentType = request.getContentType();        
if ((contentType != null) && (contentType.indexOf("multipart/form-data") >= 0)) {                
    DataInputStream in = new DataInputStream(request.getInputStream());                

    int formDataLength = request.getContentLength();                
    byte dataBytes[] = new byte[formDataLength];                
    int byteRead = 0;                
    int totalBytesRead = 0;                

    while (totalBytesRead < formDataLength) {                        
        byteRead = in.read(dataBytes, totalBytesRead, formDataLength);                        
        totalBytesRead += byteRead;                        
    }                                        
    String file = new String(dataBytes);                

    String saveFile = file.substring(file.indexOf("filename=\"") + 10);                
    saveFile = saveFile.substring(0, saveFile.indexOf("\n"));                
    saveFile = saveFile.substring(saveFile.lastIndexOf("\\") + 1,saveFile.indexOf("\""));                
    int lastIndex = contentType.lastIndexOf("=");                
    String boundary = contentType.substring(lastIndex + 1,contentType.length());                
    int pos;                

    //pos = file.indexOf("filename=\"");                
    //pos = file.indexOf("\n", pos) + 1;                
    //pos = file.indexOf("\n", pos) + 1;                
    //pos = file.indexOf("\n", pos) + 1;                
    //int boundaryLocation = file.indexOf(boundary, pos) - 4;                
    //int startPos = ((file.substring(0, pos)).getBytes()).length;                
    //int endPos = ((file.substring(0, boundaryLocation)).getBytes()).length;

int p1 = file.indexOf("ViewContext");
int p2 = file.lastIndexOf("/ViewContext");


                
//String filecontent = file.substring(startPos ,endPos);
//out.println("{success: true, data: { 'wmc':'" + filecontent + "'}}");

String filecontent = file.substring(p1-1 ,p2+13);
//out.println("$" + filecontent + "$");

filecontent = URLEncoder.encode(filecontent ,"UTF-8");


out.println("{success: true, data: { 'wmc':'" + filecontent + "'}}");

}

} catch(Exception e) {

out.println("{success: false, data: { 'wmc':''}}");
	
}






                           
%>