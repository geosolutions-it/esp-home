/* FUNCTIONS
function prepareQueryResult()
*/

/* EVENTS
$("#div_content_data_call_filter").click(function ()
$("#div_content_data_filter_run").click(function ()
$("#div_content_data_filter_run").mouseover(function ()
$("#div_content_data_filter_run").mouseout(function ()
$("#div_content_data_call_filter").mouseover(function ()
$("#div_content_data_call_filter").mouseout(function ()
*/

/*
Name:       prepareQueryResult
Goal:       some div preparations for data and filter
Input:      
Output:     
Caller:     document ready
*/
function prepareQueryResult() {
    $("#div_content_data").css({"background":""});
    $("#div_content_data_filter").hide();
    roundcorners($("#div_content_data_filter"));
    roundcorners($("#div_content_data_service"));
    roundcorners($("#div_content_data_filter_run"));
    roundcorners($("#div_content_data_call_filter"));
    $("#div_content_data_call_filter").click(function () {
        //$("#div_content_data_filter").slideDown();
        $("#div_content_data_filter").fadeIn(divsConfig.fadeSpeed)
        $("#overlay").show();
        $("#div_content_data").css({"z-index":"1006"});
    });
    $("#div_content_data_filter_run").click(function () {

        //$("#div_content_data_filter").slideUp();
        $("#div_content_data_filter").fadeOut(divsConfig.fadeSpeed)
        $("#overlay").hide();
        $("#div_content_data").css({ "z-index": "6" });
    });
    $("#div_content_data_filter_run").mouseover(function () {
        $("#" + this.id).css({ "border-color": divsConfig.buttons.colorbuttonborderhover });
    });
    $("#div_content_data_filter_run").mouseout(function () {
        $("#" + this.id).css({ "border-color": divsConfig.buttons.colorbuttonborder });
    });
    $("#div_content_data_call_filter").mouseover(function () {
        $("#" + this.id).css({ "border-color": divsConfig.buttons.colorbuttonborderhover });
    });
    $("#div_content_data_call_filter").mouseout(function () {
        $("#" + this.id).css({ "border-color": divsConfig.buttons.colorbuttonborder });
    });
}

