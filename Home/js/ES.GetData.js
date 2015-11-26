/* FUNCTIONS
function do_ajax(url, assignObject, assignIndex) 
function prepareGetData() 
function preparemap() 
*/

/* EVENTS
MapApp_Clicked (both)
*/

/*
Name:       do_ajax
Goal:       fill lookupTables (see config) with data from esp database
Input:      jsp-json call, jsonObject to assign values to, index
Output:     Call preparefilter after last ajax call
Caller:     prepareGetData
*/
function do_ajax(url, assignObject, assignIndex) {
    $.ajax(url)
    .done(function (data, b, c, d) {
        try {
            assignObject[assignIndex] = myParseJSON(data); // return is not a good idea

            for (var key in assignObject) {
                if (assignObject.hasOwnProperty(key))
                    if (assignObject[key] == null)
                        return;
            }

            preparefilter();
        } catch (e) {
            assignObject[assignIndex] = null;
        }
    })
    .fail(function () {
        assignObject[assignIndex] = null;
    });
}

/*
Name:       prepareGetData
Goal:       fill lookupTables and pre-prepare maps
Input:      none
Output:     call preparemap
Caller:     document ready
*/
function prepareGetData() {
    //do_ajax(ajaxUrls.lutArealunit, lookupTables, "arealunit");
    do_ajax(ajaxUrls.lutBiome, lookupTables, "biome");
    do_ajax(ajaxUrls.lutBiomecategory, lookupTables, "biomecategory");
    //do_ajax(ajaxUrls.lutClassificationsystem, lookupTables, "classificationsystem");
    do_ajax(ajaxUrls.lutEcosystemservice, lookupTables, "ecosystemservice");
    do_ajax(ajaxUrls.lutEcosystemservicecategory, lookupTables, "ecosystemservicecategory");
    //do_ajax(ajaxUrls.lutIndicator, lookupTables, "indicator");
    //do_ajax(ajaxUrls.lutQuantificationmethod, lookupTables, "quantificationmethod");
    //do_ajax(ajaxUrls.lutQuantificationunit, lookupTables, "quantificationunit");
    //do_ajax(ajaxUrls.lutQuantificationunitcategory, lookupTables, "quantificationunitcategory");
    do_ajax(ajaxUrls.lutSpatialscale, lookupTables, "spatialscale");
    //do_ajax(ajaxUrls.lutStudyobjectivemet, lookupTables, "studyobjectivemet");
    do_ajax(ajaxUrls.lutStudypurpose, lookupTables, "studypurpose");
    //do_ajax(ajaxUrls.lutTemporalunit, lookupTables, "temporalunit");

    /*  prepare rendering data for map  */
   
    $.ajax(ajaxUrls.lutRegions)
    .done(function (data, b, c, d) {
        try {
            regionTables.regions = myParseJSON(data).records;
             preparemap();
        } catch (e) {
            return;
        }
    })
    .fail(function () {
        return;
    });
}

    