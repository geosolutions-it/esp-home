/* FUNCTIONS
function preparefilter()
function spatialscaleselected(id, that)
function studypurposeselected(id, that)
function biomeselected(id, that)
function biomecategoryselected(id, that)
function ecosystemservicecategoryselected(id, that)
function ecosystemserviceselected(id, that)
function selectServices()
*/

/* EVENTS
onclick=spatialscaleselected(id)
onclick=studypurposeselected(id)
onclick=biomecategoryselected(id)
onclick=biomeselected(id)
onclick=ecosystemservicecategoryselected(id)
onclick=ecosystemserviceselected(id)
*/

/*
Name:       preparefilter
Goal:       make a new filter menu with mo selections
Input:      
Output:     
Caller:     document ready
*/
function preparefilter() {
    appStatus.filter.biome = new Array();
    appStatus.filter.biomecategory = new Array();
    appStatus.filter.spatialscale = new Array();
    appStatus.filter.ecosystemservicecategory = new Array();
    appStatus.filter.ecosystemservice = new Array();
    appStatus.filter.studypurpose = new Array();
    
    var str;
    var style;
    str = '<p class="filter_table_header">Spatial scale <img src="images/info.png" alt="" title="" width="27" height="18" /></p><table>';
    style = "filter_table_row2";
    for (var key in lookupTables.spatialscale.records) {
        if (lookupTables.spatialscale.records.hasOwnProperty(key)) {
            var style = (style == "filter_table_row2") ? "filter_table_row1" : "filter_table_row2";
            str += "<tr><td class=\"" + style + "\"><input type=\"checkbox\" value=\"" + lookupTables.spatialscale.records[key].id + "\" onclick=\"spatialscaleselected(" + lookupTables.spatialscale.records[key].id + ",this)\">&nbsp;" + lookupTables.spatialscale.records[key].label + "</td></tr>";
        }
    }
    str += "</table>";
    $("#div_content_data_filter_spatialscale").html(str);

    str = '<p class="filter_table_header">Study purpose <img src="images/info.png" alt="" title="Search the database according to the rationale of the study. Definitions provided in Egoh et al. 2011." width="27" height="18" /></p><table>';
    style = "filter_table_row2";
    for (var key in lookupTables.studypurpose.records) {
        if (lookupTables.studypurpose.records.hasOwnProperty(key)) {
            var style = (style == "filter_table_row2") ? "filter_table_row1" : "filter_table_row2";
            str += "<tr><td class=\"" + style + "\"><input type=\"checkbox\" value=\"" + lookupTables.studypurpose.records[key].id + "\" onclick=\"studypurposeselected(" + lookupTables.studypurpose.records[key].id + ",this)\">&nbsp;" + lookupTables.studypurpose.records[key].label + "</td></tr>";
        }
    }
    str += "</table>";
    $("#div_content_data_filter_studypurpose").html(str);
    /*
    str = "<p class=\"filter_table_header\">Biome</p><table>"
    for (var key in lookupTables.biome.records) {
    if (lookupTables.biome.records.hasOwnProperty(key)) {
    var style = (style == "filter_table_row2") ? "filter_table_row1" : "filter_table_row2";
    str += "<tr><td class=\"" + style + "\"><input type=\"checkbox\" value=\"" + lookupTables.biome.records[key].id + "\" onclick=\"biomeselected(" + lookupTables.biome.records[key].id + ",this)\">&nbsp;" + lookupTables.biome.records[key].label + "</td></tr>";
    }
    }
    str += "</table>";
    $("#div_content_data_filter_biome").html(str);
    */
    str = '<p class="filter_table_header">Biome <img src="images/info.png" alt="" title="Select the Biomes you want to search for in the database." width="27" height="18" /></p><table><tr><td><table>'
    for (var key in lookupTables.biomecategory.records) {
        if (lookupTables.biomecategory.records.hasOwnProperty(key)) {
            var subset = filteredjson(lookupTables.biome.records, "biome_category_id", lookupTables.biomecategory.records[key].id);
            if (subset.length > 1)
                str += "<tr><td class=\"filter_table_main\"><input type=\"checkbox\" value=\"" + lookupTables.biomecategory.records[key].id + "\" onclick=\"biomecategoryselected(" + lookupTables.biomecategory.records[key].id + ",this)\">&nbsp;" + lookupTables.biomecategory.records[key].label + "</td></tr>";
            var style = "filter_table_row2";

            for (var key2 in subset) {
                if (subset.hasOwnProperty(key2)) {
                    var style = (style == "filter_table_row2") ? "filter_table_row1" : "filter_table_row2";
                    if (subset.length > 1)
                        str += "<tr><td class=\"" + style + "\">&nbsp;&nbsp;&nbsp;<input type=\"checkbox\" id=\"biomecheckbox" + subset[key2].id + "\" value=\"" + subset[key2].id + "\" onclick=\"biomeselected(" + subset[key2].id + ",this)\">&nbsp;" + subset[key2].label + "</td></tr>";
                    else
                        str += "<tr><td class=\"filter_table_main\"><input type=\"checkbox\" id=\"biomecheckbox" + subset[key2].id + "\" value=\"" + subset[key2].id + "\" onclick=\"biomeselected(" + subset[key2].id + ",this)\">&nbsp;" + subset[key2].label + "</td></tr>";
                }
            }
	    //console.log(key); // to divide biomes in 2 columns (key is from 0 to 13 while biomecategory.records.length=14)
	    if (key == (lookupTables.biomecategory.records.length/2 -2))
		str += "</table></td><td valign=\"top\"><table>";
	   //	console.log(key); // to divide biomes in 2 columns (key is from 0 to 13 while biomecategory.records.length=14)
        }
    }
    str += "</table></td></tr></table>";
    $("#div_content_data_filter_biome").html(str);







    //Select the Ecosystem Services you want to search for in the database. Classification is according to the TEEB (2010).

    str = '<p class="filter_table_header">Ecosystem Services <img src="images/info.png" alt="" title="Select the Ecosystem Services you want to search for in the database. Classification is according to the TEEB (2010)." width="27" height="18" /></p><table>'
    for (var key in lookupTables.ecosystemservicecategory.records) {
        if (lookupTables.ecosystemservicecategory.records.hasOwnProperty(key)) {
            str += "<tr><td class=\"filter_table_main\"><input type=\"checkbox\" value=\"" + lookupTables.ecosystemservicecategory.records[key].id + "\" onclick=\"ecosystemservicecategoryselected(" + lookupTables.ecosystemservicecategory.records[key].id + ",this)\">&nbsp;" + lookupTables.ecosystemservicecategory.records[key].label + "</td></tr>";
            var style = "filter_table_row2";
            var subset = filteredjson(lookupTables.ecosystemservice.records, "ecosystem_service_category_id", lookupTables.ecosystemservicecategory.records[key].id);
            for (var key2 in subset) {
                if (subset.hasOwnProperty(key2)) {
                    var style = (style == "filter_table_row2") ? "filter_table_row1" : "filter_table_row2";
                    str += "<tr><td class=\"" + style + "\">&nbsp;&nbsp;&nbsp;<input type=\"checkbox\" id=\"ecosystemservicecheckbox" + subset[key2].id + "\" value=\"" + subset[key2].id + "\" onclick=\"ecosystemserviceselected(" + subset[key2].id + ",this)\">&nbsp;" + subset[key2].label + "</td></tr>";
                }
            }
        }
    }
    str += "</table>";
    $("#div_content_data_filter_ecosystemservice").html(str);
}

/*
Name:       _______selected
Goal:       a checkbox in the filter is clicked
Input:      the id and this
Output:     
Caller:     the filter
*/
function spatialscaleselected(id, that) {
    if (that.checked)
        appStatus.filter.spatialscale.push(id);
    else {
        var ind = appStatus.filter.spatialscale.indexOf(id);
        if (ind > (-1))
            appStatus.filter.spatialscale.splice(ind, 1);
    }
    selectServices();
}

function studypurposeselected(id, that) {
    if (that.checked)
        appStatus.filter.studypurpose.push(id);
    else {
        var ind = appStatus.filter.studypurpose.indexOf(id);
        if (ind > (-1))
            appStatus.filter.studypurpose.splice(ind, 1);
    }
    selectServices();
}

function biomeselected(id, that) {
    if (that.checked)
        appStatus.filter.biome.push(id);
    else {
        var ind = appStatus.filter.biome.indexOf(id);
        if (ind > (-1))
            appStatus.filter.biome.splice(ind, 1);
    }
    selectServices();
}
function biomecategoryselected(id, that) {
    if (that.checked) {
        appStatus.filter.biomecategory.push(id);
        var subset = filteredjson(lookupTables.biome.records, "biome_category_id", id);
        for (var key2 in subset) {
            if (subset.hasOwnProperty(key2)) {

                var ind = appStatus.filter.biome.indexOf(subset[key2].id);
                if (ind <= (-1)) {
                    appStatus.filter.biome.push(subset[key2].id);
                }
                $("#biomecheckbox" + subset[key2].id)[0].checked = true;

            }
        }

    } else {
        var ind = appStatus.filter.biomecategory.indexOf(id);
        if (ind > (-1)) {
            appStatus.filter.biomecategory.splice(ind, 1);
        }

        var subset = filteredjson(lookupTables.biome.records, "biome_category_id", id);
        for (var key2 in subset) {
            if (subset.hasOwnProperty(key2)) {
                var ind = appStatus.filter.biome.indexOf(subset[key2].id);
                if (ind > (-1)) {
                    appStatus.filter.biome.splice(ind, 1);
                }
                $("#biomecheckbox" + subset[key2].id)[0].checked = false;
            }
        }
    }
    selectServices();
}


function ecosystemservicecategoryselected(id, that) {
    if (that.checked) {
        appStatus.filter.ecosystemservicecategory.push(id);
        var subset = filteredjson(lookupTables.ecosystemservice.records, "ecosystem_service_category_id", id);
        for (var key2 in subset) {
            if (subset.hasOwnProperty(key2)) {

                var ind = appStatus.filter.ecosystemservice.indexOf(subset[key2].id);
                if (ind <= (-1)) {
                    appStatus.filter.ecosystemservice.push(subset[key2].id);
                }
                $("#ecosystemservicecheckbox" + subset[key2].id)[0].checked = true;

            }
        }

    } else {
        var ind = appStatus.filter.ecosystemservicecategory.indexOf(id);
        if (ind > (-1)) {
            appStatus.filter.ecosystemservicecategory.splice(ind, 1);
        }

        var subset = filteredjson(lookupTables.ecosystemservice.records, "ecosystem_service_category_id", id);
        for (var key2 in subset) {
            if (subset.hasOwnProperty(key2)) {
                var ind = appStatus.filter.ecosystemservice.indexOf(subset[key2].id);
                if (ind > (-1)) {
                    appStatus.filter.ecosystemservice.splice(ind, 1);
                }
                $("#ecosystemservicecheckbox" + subset[key2].id)[0].checked = false;
            }
        }
    }
    selectServices();
}


function ecosystemserviceselected(id, that) {
    if (that.checked)
        appStatus.filter.ecosystemservice.push(id);
    else {
        var ind = appStatus.filter.ecosystemservice.indexOf(id);
        if (ind > (-1))
            appStatus.filter.ecosystemservice.splice(ind, 1);
    }
    selectServices();
}


/*
Name:       selectServices
Goal:       when the selections in the filter arechanged by the client, the data view is automatically updated
Input:      
Output:     
Caller:     
*/
function selectServices() {
    appStatus.selectedServices = new Array();
    var cnt = loadservices();
    //$("#divshowdownloadblueprint").hide();
    activateDownloadBlueprint(false);
    if(appStatus.filter.biome.length==0 && appStatus.filter.ecosystemservice.length==0 && appStatus.filter.ecosystemservicecategory.length==0 && appStatus.filter.spatialscale.length==0 && appStatus.filter.studypurpose.length==0)
        $(".class_content_last_text").html("nothing");
    else
        $(".class_content_last_text").html("filter");
}
