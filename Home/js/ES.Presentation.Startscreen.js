/* FUNCTIONS
function prepareStartscreen()
*/

/*
Name:       prepareStartscreen
Goal:       prepare about and help div
Input:      
Output:     
Caller:     document ready
*/
function prepareStartscreen() {
    $("#div_content_home").html('<iframe width="100%" height="100%" scrolling="no" allowTransparency="true" frameBorder="0" src="' + htmllinks.about_start + '"></iframe>');
    $("#div_content_help").html('<iframe width="100%" height="100%" scrolling="no" allowTransparency="true" frameBorder="0" src="' + htmllinks.help + '"></iframe>');
}


