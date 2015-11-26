/* FUNCTIONS
function placeButtons()
function do_button_select(oldbtn, newbtn)
function placeMapButtons()
*/

/* EVENTS
$("#" + divsConfig.buttons.items[i].div).mouseover
$("#" + divsConfig.buttons.items[i].div).mouseout
$("#" + divsConfig.buttons.items[i].div).click
  
baseLayerDiv.click
baseLayerDiv.mouseover
baseLayerDiv.mouseout
regionsDiv.click
regionsDiv.mouseover
regionsDiv.mouseout
  
uploadedmapDiv.mouseover
uploadedmapDiv.mouseout
  
slider.change
slider.slide
*/

/*
Name:       placeButtons
Goal:       preparation of the main buttons
Input:      
Output:     
Caller:     document ready
*/
function placeButtons() {
    var n = divsConfig.buttons.items.length;
    var unit = Math.round(100 / (n+2));
    for (var i=0; i < n; i++) {
        $("#" + divsConfig.buttons.items[i].div).html(divsConfig.buttons.items[i].text);
        $("#" + divsConfig.buttons.items[i].div).css({ "width": (unit - 1) + "%", "left": (i + 1) * unit + "%" });
        roundcorners($("#" + divsConfig.buttons.items[i].div));
        $("#" + divsConfig.buttons.items[i].div).mouseover(function () {
            $("#" + this.id).css({ "border-color": divsConfig.buttons.colorbuttonborderhover });
        });
        $("#" + divsConfig.buttons.items[i].div).mouseout(function () {
            $("#" + this.id).css({ "border-color": divsConfig.buttons.colorbuttonborder });
        });
        $("#" + divsConfig.buttons.items[i].div).click(function () {
            if (appStatus.selectedbutton == this.id && appStatus.selectedbutton != "div_button_map") {
                $("#div_button_map").click();
                return;
            }
            if (this.id != "div_button_upload") {
                do_button_select(appStatus.selectedbutton, this.id);
                if (appStatus.selectedbutton)
                    $("#" + appStatus.selectedbutton).css({ "background": divsConfig.buttons.colorbutton });
                $("#" + this.id).css({ "background": divsConfig.buttons.colorbuttonselected });
                appStatus.selectedbutton = this.id;
            }
            else {
//                alert("Under construction");
                if (appStatus.uploadwindow && !appStatus.uploadwindow.closed)
                    appStatus.uploadwindow.focus();
                else {
                    appStatus.uploadwindow = window.open(htmllinks.upload, "espupload");
                }

            }
        });
    }
}
/*
Name:       do_button_select
Goal:       click action main buttons
Input:      
Output:     
Caller:     placeButtons
*/
function do_button_select(oldbtn, newbtn) {
    switch (oldbtn) {
        case "div_button_home":
            $("#div_content_home").fadeOut(divsConfig.fadeSpeed);
            break;
        case "div_button_map":
            break;
        case "div_button_data": $("#div_content_data").fadeOut(divsConfig.fadeSpeed);
            break;
        case "div_button_upload": 
            window.open(htmllinks.upload, "espupload");
            break;
        case "div_button_contact": $("#div_content_contact").fadeOut(divsConfig.fadeSpeed);
            break;
        case "div_button_help": $("#div_content_help").fadeOut(divsConfig.fadeSpeed);
            break;
    }
    switch (newbtn) {
        case "div_button_home":
            $("#div_content_home").fadeIn(divsConfig.fadeSpeed);
            break;
        case "div_button_map":
            break;
        case "div_button_data":
            $("#div_content_data").fadeIn(divsConfig.fadeSpeed);
            break;
        case "div_button_upload": 
            window.open(htmllinks.upload, "espupload");
            break;
        case "div_button_contact": $("#div_content_contact").fadeIn(divsConfig.fadeSpeed);
            break;
        case "div_button_help": $("#div_content_help").fadeIn(divsConfig.fadeSpeed);
            break;
    }
}
/*
Name:       prepareQueryResult
Goal:       preparation map buttons
Input:      
Output:     
Caller:     document ready
*/
function placeMapButtons() {
   var baseLayerDiv = $("#" + mapTools.baseLayer.div);
   var baseLayerImg = $("#" + mapTools.baseLayer.idimg);
   var regionsDiv = $("#" + mapTools.regions.div);
   var uploadedmapDiv = $("#" + mapTools.uploadedmap.div);
   baseLayerDiv.click(function () {
       if (baseLayerImg[0].getAttribute("src") == mapTools.baseLayer.srcSat) {
           baseLayerImg[0].setAttribute("src", mapTools.baseLayer.srcPhys)
           espMap.setVisibleId(1, true);
           espMap.setVisibleId(0, false);
       } else {
           baseLayerImg[0].setAttribute("src", mapTools.baseLayer.srcSat);
           espMap.setVisibleId(1, false);
           espMap.setVisibleId(0, true);
       }
   });
   baseLayerDiv.mouseover(function () {
       baseLayerDiv.css({ "opacity":1,"filter":"alpha(opacity=100)" });
   });
   baseLayerDiv.mouseout(function () {
       baseLayerDiv.css({ "opacity": 0.75, "filter": "alpha(opacity = 75)" });
   });
   regionsDiv.click(function () {
       espMap.setVisible(ogclinks.region.name, !espMap.isVisible(ogclinks.region.name));
   });
   regionsDiv.mouseover(function () {
       regionsDiv.css({ "opacity": 1, "filter": "alpha(opacity=100)" });
   });
   regionsDiv.mouseout(function () {
       regionsDiv.css({ "opacity": 0.75, "filter": "alpha(opacity = 75)" });
   });
   uploadedmapDiv.mouseover(function () {
       uploadedmapDiv.css({ "opacity": 1, "filter": "alpha(opacity=100)" });
   });
   uploadedmapDiv.mouseout(function () {
       uploadedmapDiv.css({ "opacity": 0.95, "filter": "alpha(opacity = 95)" });
   });
   uploadedmapDiv.hide();
   var sliderDiv = $("#div_slider");
   sliderDiv.slider({
       value: 0
        , min: 0
        , max: 1
        , step: 0.1
        , change: function (event, ui) {
            espMap.setOpacity("esp", 1 - ui.value);
        }
        , slide: function (event, ui) {
            $("#divopacity").html(Math.round((1 - ui.value)*10)/10);
        }
   });
}

