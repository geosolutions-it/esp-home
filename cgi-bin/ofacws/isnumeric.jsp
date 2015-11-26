<%!
   boolean IsNumeric(String strString) {
	if(strString == null) return true;
   String strValidChars = "0123456789.-";
   char strChar;
   boolean blnResult = true;
   if (strString.length() == 0) {
     return false;
   }
   for (int i = 0; i < strString.length() && blnResult == true; i++) {
     strChar = strString.charAt(i);
     if (strValidChars.indexOf(strChar) == -1) {
      blnResult = false;
     }
   }
   return blnResult;
}


%>
