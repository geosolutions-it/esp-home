<%@ page import="java.io.*"  %>
<%
String str = "print me";
//always give the path from root. This way it almost always works.
String nameOfTextFile = "/srv/tomcat6/webapps/cgi-bin/test/test.txt";
try {   
    PrintWriter pw = new PrintWriter(new FileOutputStream(nameOfTextFile));
    pw.println(str);
    //clean up
    pw.close();
} catch(IOException e) {
   out.println(e.getMessage());
}
%>