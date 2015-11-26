/* FUNCTIONS
function doresize()
$(document).ready(function ()
*/

/* EVENTS
$(window).resize(function ()
*/

/*
Name:       doresize
Goal:       change some div locations/dimensions with each resize of the browser window
Input:      
Output:     
Caller:     
*/
function doresize() {
    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();
    viewportWidth = (viewportWidth < divsConfig.window.minWidth) ? divsConfig.window.minWidth : viewportWidth;
    viewportHeight = (viewportHeight < divsConfig.window.minHeight) ? divsConfig.window.minHeight : viewportHeight;
    $("#div_window").height(viewportHeight);
    $("#div_window").width(viewportWidth);
    $("#div_page").css("left", ($("#div_window").width() - $("#div_page").width()) / 2);
    $("#div_page").css("top", ($("#div_window").height() - $("#div_page").height()) / 2);
    $("#div_content").height($("#div_page").height() - $("#div_header").height() - $("#div_footer").height());

    /*$("#div_content_home").width(divsConfig.about.width);*/
    $("#div_content_home").width(900);
    /*$("#div_content_home").height(divsConfig.about.height);*/
    $("#div_content_home").height(220);
    $("#div_content_home").css({ left: ($("#div_content").width() - $("#div_content_home").width()) / 2 + "px", top: ($("#div_content").height() - $("#div_content_home").height()) / 2 + "px" });

    $("#div_content_help").width(divsConfig.help.width);
    $("#div_content_help").height(divsConfig.help.height);
    $("#div_content_help").css({ left: ($("#div_content").width() - $("#div_content_help").width()) / 2 + "px", top: ($("#div_content").height() - $("#div_content_help").height()) / 2 + "px" });
}


/*
Name:       
Goal:       upfate/prepare divs when the page is rendered by the browser
Input:      
Output:     
Caller:     
*/
$(document).ready(function () {
    $("#overlay").show();
    $("#div_header").css("height", divsConfig.header.height + 'px');
    $("#div_title1").html(divsConfig.header.title1.text);
    $("#div_title2").html(divsConfig.header.title2.text);
    $("#div_content").css("top", divsConfig.header.height + 'px');

    $("#div_footer").css("height", divsConfig.footer.height + 'px');

    $("#div_content_home").hide();
    $("#div_content_data").hide();
    $("#div_content_upload").hide();
    $("#div_content_contact").hide();
    $("#div_content_help").hide();
    $("#div_googlechoice").hide();
    $("#div_regions").hide();
    $("#div_identify_container").hide();
    $("#div_identify_container").draggable({ containment: "#div_content_map", scroll: false });
    $("#div_maptool_baselayers").hide();
    $("#div_maptool_overlays").hide();
    $("#div_maptool_uploaded").hide();
    $("#div_maptool_uploaded_details").hide();
    $("#legend").hide();

    roundcorners($("#div_content_home"));
    roundcorners($("#div_content_upload"));
    roundcorners($("#div_content_contact"));
    roundcorners($("#div_content_help"));

    prepareStartscreen();
    placeButtons();
    placeMapButtons();
    prepareQueryResult();
    loadservices();
    prepareModal();
    prepareGetData();
    preparefreetext();
    prepareMaptools();

    $("#div_button_home").click();
    $("#div_slider_box").hide();
    activateDownloadBlueprint(false);
    $("#overlay").fadeOut(1000);
    $(window).resize(function () {
        doresize();
    });
});






