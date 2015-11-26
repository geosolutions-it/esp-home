/* FUNCTIONS
function roundcorners(d)
function filteredjson(obj,key,val)
function myParseJSON(data)
function calculateWMSparameters(data)
function thesortcomparer (prop,updown)
function sortdata(data,prop,updown)
function activateDownloadBlueprint(active)
*/

/*
Name:       roundcorners
Goal:       like it says, div with border with rounded corners
Input:      the div
Output:     nothing
Caller:     everywhere
*/
function roundcorners(d) {
    var w = parseInt(d.css("height")) / 10;
    w = (w > 10) ? 10 : Math.round(w);
    w = (w < 6) ? 6 : w;
    d.css("border-radius", w + "px").css("-moz-border-radius", w + "px");
}
/*
Name:       filteredjson
Goal:       filter an array of json objects
Input:      array, attribute,value
Output:     filtered array
Caller:     filtere.js
*/
function filteredjson(obj,key,val) {
    var res = jQuery.grep(obj, function (el, i) {
        return (el[key]==val);
    });
    return res;
}
/*
Name:       myParseJSON
Goal:       clean the response of ajax calls, remove "returns" (remove trailing and tailing returns, replace returns with  <br/>)
Input:      json string
Output:     json object
Caller:     everywhere
*/
function myParseJSON(data) {
    data = data.substr(data.indexOf('{'));
    while (data.substr(data.length-1)=='\n')
        data = data.substr(0, data.length - 1);
    data = data.split("\n").join("<br/>");
    data = data.split("\r").join("");
    
    return jQuery.parseJSON(data);
}

/*
Name:       calculateWMSparameters
Goal:       calculate width,height and bbox vor wms request based on indicator_surface data
Input:      indicator surface record
Output:     string for wns request
Caller:     downloadmap
*/
function calculateWMSparameters(data) {
    var area = data.area;
    var extent = data.extent;
    var pixelX = data.pixel_size_x;
    var pixelY = data.pixel_size_y;

    var points = extent.substr(9, extent.length - 11).split(",");
    var minx = 180;
    var miny = 90;
    var maxx = -180;
    var maxy = -90;
    var point;
    for (var i = 0; i < points.length; i++) {
        point = points[i].split(" ");
        point[0] = parseFloat(point[0])
        point[1] = parseFloat(point[1])
        minx = (minx < point[0]) ? minx : point[0];
        miny = (miny < point[1]) ? miny : point[1];
        maxx = (maxx > point[0]) ? maxx : point[0];
        maxy = (maxy > point[1]) ? maxy : point[1];
    }
    if (minx == (-180) && maxx == 180)
        minx = 180;
    var deltaX = maxx - minx;
    var deltaY = maxy - miny;
    /*
    var delta = deltaY / deltaX;
    var x = Math.sqrt(area / delta);
    var y = delta * x;
    x = x / pixelX;
    y = y / pixelY;
    */
    var x = Math.round(deltaX * 10);
    var y = Math.round(deltaY * 10);
    var str = '&bbox=' + minx + ',' + miny + ',' + maxx + ',' + maxy + '&width=' + x + '&height=' + y + '';
    //var str = '&bbox=' + minx + ',' + miny + ',' + maxx + ',' + maxy ;
    return str;
}

/*
Name:       thesortcomparer
Goal:       help function
Input:      
Output:     
Caller:     sortdata
*/
function thesortcomparer (prop,updown) {
    return function (a, b) {
        var A = a[prop], B = b[prop];
        if(updown)
            return ((A < B) ? -1 : (A > B) ? +1 : 0);
        else
            return ((A < B) ? 1 : (A > B) ? -1 : 0);
    }
}
/*
Name:       sortdata
Goal:       sort array of json objects
Input:      array of json objects, propery to sort on, asc or desc
Output:     sorted array
Caller:     sortservicedata (data.js)
*/
function sortdata(data,prop,updown) {
    data.sort(thesortcomparer(prop,updown));
    return data;
}
/*
Name:       activateDownloadBlueprint
Goal:       make blueprint icons acive or not
Input:      true or false
Output:     nothing
Caller:     getdata,filter,presentation,data
*/
function activateDownloadBlueprint(active) {
    if (active) {
        $("#divshowdownloadblueprint").html('<a href="javascript:showblueprint();"><img src="images/Buttons_Ioanna/png/final-icons_02.png" title="Show Blueprint (html)" onmouseover="showblueprintImg(this,1);" onmouseout="showblueprintImg(this,0);" /></a> &nbsp;&nbsp; <a href="javascript:downloadblueprint();"><img src="images/Buttons_Ioanna/png/final-icons_03.png" title="Download Blueprint (CSV)" onmouseover="downloadblueprintImg(this,1);" onmouseout="downloadblueprintImg(this,0);" /></a>');
    } else {
        $("#divshowdownloadblueprint").html('<img src="images/Buttons_Ioanna/png/final-icons_02.png" title="Show Blueprint (html)" style="opacity:0.4; filter:alpha(opacity=40)" /> &nbsp;&nbsp; <img src="images/Buttons_Ioanna/png/final-icons_03.png" title="Download Blueprint (CSV)" style="opacity:0.4; filter:alpha(opacity=40)" />');
    }
}
