/* FUNCTIONS
function loadservices()
function presentServicesList(data)
function showmapImg(that, isover)
function shapeImg(that, isover)
function geotiffImg(that, isover)
function showblueprintImg(that, isover)
function downloadblueprintImg(that, isover)
function selectstudy(id)
function serviceselectall(that)
function serviceselected(id,that)
function removemap()
function loadmap(id)
function downloadmap(id)
function showblueprint()
function downloadblueprint()
function sortservicedata(prop)
function clearallfilters()
function preparefreetext()
*/

/* EVENTS
onclick=serviceselectall(this)
href=sortservicedata(name)
onclick=serviceselected(id,this)
href=loadmap(id)
href=downloadmap(id)
onmouseover=showmapImg(this,1)
onmouseout=showmapImg(this,0)
onmouseover=geotiffImg(this,1)
onmouseout=geotiffImg(this,0)
onmouseover=shapeImg(this,1)
onmouseout=shapeImg(this,0)
href=removemap
$("#div_content_freesearch_text").on('keypress',...
*/

/*
Name:       loadservices
Goal:       fill the data window with the current filter settings
Input:      
Output:     
Caller:     document ready and selectservices (filter.js)
*/
function loadservices() {
    /*
    if (appStatus.filter.ecosystemservice.length == 0 && appStatus.filter.biome.length == 0 && appStatus.filter.spatialscale.length == 0 && appStatus.filter.studypurpose.length == 0) {
            $("#div_content_data_service_table").html("nothing selected");
    }
    */
    var isfirstparameter = true;
    var isfirstitem;
    var url = ajaxUrls.applyFilter+"?";
    if (appStatus.filter.ecosystemservice.length > 0) {
        if (isfirstparameter)
            isfirstparameter = false;
        else
            url += "&";
        url += "ecosystemserviceID=";
        isfirstitem = true;
        for (var key in appStatus.filter.ecosystemservice) {
            if (appStatus.filter.ecosystemservice.hasOwnProperty(key)) {
                if (isfirstitem)
                    isfirstitem = false;
                else
                    url += ","
                url += appStatus.filter.ecosystemservice[key]
            }
        }
    }
    if (appStatus.filter.biome.length > 0) {
        if (isfirstparameter)
            isfirstparameter = false;
        else
            url += "&";
        url += "biomeID=";
        isfirstitem = true;
        for (var key in appStatus.filter.biome) {
            if (appStatus.filter.biome.hasOwnProperty(key)) {
                if (isfirstitem)
                    isfirstitem = false;
                else
                    url += ","
                url += appStatus.filter.biome[key]
            }
        }
    }
    if (appStatus.filter.spatialscale.length > 0) {
        if (isfirstparameter)
            isfirstparameter = false;
        else
            url += "&";
        url += "spatialscaleID=";
        isfirstitem = true;
        for (var key in appStatus.filter.spatialscale) {
            if (appStatus.filter.spatialscale.hasOwnProperty(key)) {
                if (isfirstitem)
                    isfirstitem = false;
                else
                    url += ","
                url += appStatus.filter.spatialscale[key]
            }
        }
    }
    if (appStatus.filter.studypurpose.length > 0) {
        if (isfirstparameter)
            isfirstparameter = false;
        else
            url += "&";
        url += "studypurposeID=";
        isfirstitem = true;
        for (var key in appStatus.filter.studypurpose) {
            if (appStatus.filter.studypurpose.hasOwnProperty(key)) {
                if (isfirstitem)
                    isfirstitem = false;
                else
                    url += ","
                url += appStatus.filter.studypurpose[key]
            }
        }
    }





    /**//**//**///url = "http://h03-dev-vm15:8080/cgi-bin/blueprint/applyFilter.jsp?";

    var tmpcount;
    //biomeID spatialscaleID ecosystemserviceID
    $.ajax(url)
    .done(function (data) {
        try {
            presentServicesList(myParseJSON(data));
            tmpcount = (myParseJSON(data).records.length);
            $("#div_content_data_filter_head_nr").html(tmpcount);
        } catch (e) {

        }
    })
    .fail(function () {

    });
    
}

/*
Name:       presentServicesList
Goal:       fill the data window with the current selection (filter, sort, freetext, regions)
Input:      
Output:     
Caller:     loadservices,sortservicedata,preparefreetext, map_click
*/
function presentServicesList(data) {
    appStatus.allrecords = data;

    var str = '<table style="table-layout:fixed;width:100%;" ><col width="3%" /><col width="15%" /><col width="15%" /><col width="32%" /><col width="10%" /><col width="10%" /><col width="7%" /><col width="8%" /><tr><th style="overflow:hidden;"><input type="checkbox" id="selectedservicecheckbox" onclick="serviceselectall(this);" /></th><th style="overflow:hidden;" class="servicelistheader"><a href=javascript:sortservicedata("indicator")>Indicator</a></th><th style="overflow:hidden;" class="servicelistheader"><a href=javascript:sortservicedata("location")>Location</a></th><th style="overflow:hidden;" class="servicelistheader"><a href=javascript:sortservicedata("study_name")>Study</a></th><th style="overflow:hidden;" class="servicelistheader"><a href=javascript:sortservicedata("duration")>Duration</a></th><th style="overflow:hidden;" class="servicelistheader"><a href=javascript:sortservicedata("study_purpose")>Purpose</a></th><th style="overflow:hidden;"></th><th style="overflow:hidden;"></th></tr></table>';
    //for(var j=0;j<10;j++)
    var rowcnt = 2;
    appStatus.selectedServicesAll = new Array();
    $("#div_content_data_service_table_header").html(str);
    str = '<table style="table-layout:fixed;width:100%;" ><col width="3%" /><col width="15%" /><col width="15%" /><col width="32%" /><col width="10%" /><col width="10%" /><col width="50px" /><col width="50px" /><col width="50px" />';
    for (var key2 in data.records) {
        if (data.records.hasOwnProperty(key2)) {
            //str += '<tr><td><input type="radio" name="radioservices" value="' + data.records[key2].ecosystemserviceindicatorid + '" onclick="handleClickEcosystemserciceindicator(' + data.records[key2].ecosystemserviceindicatorid + ');" /></td><td><input type=\"checkbox\" id="selectedservicecheckbox' + data.records[key2].ecosystemserviceindicatorid + '" onclick="serviceselected(' + data.records[key2].ecosystemserviceindicatorid + ',this);" /></td><td>' + data.records[key2].indicator + "</td><td>" + data.records[key2].location + '</td><td><a href=javascript:selectstudy(' + data.records[key2].studyid + ')>' + data.records[key2].study_name + "</a></td><td>" + data.records[key2].year + "</td><td>" + data.records[key2].study_purpose + '</td><td><a href="javascript:loadmap(' + data.records[key2].ecosystemserviceindicatorid + ')"><img src="images/map.png" /></a></td><td><a href="javascript:downloadmap(' + data.records[key2].ecosystemserviceindicatorid + ')"><img src="images/shp.png" /></a></td></td><td><a href="javascript:downloadcsv(' + data.records[key2].ecosystemserviceindicatorid + ')"><img src="images/csv.png" /></a></td></td></tr>';
            rowcnt = (rowcnt == 2) ? 1 : 2;
            str += '<tr class="clsrowservice' + rowcnt + '"><td style="overflow:hidden;"><input type=\"checkbox\" id="selectedservicecheckbox' + data.records[key2].ecosystemserviceindicatorid + '" onclick="serviceselected(' + data.records[key2].ecosystemserviceindicatorid + ',this);" /></td><td style="overflow:hidden;">' + data.records[key2].indicator + '</td><td style="overflow:hidden;">' + data.records[key2].location + '</td><td style="overflow:hidden;"><a href=javascript:selectstudy(' + data.records[key2].studyid + ')>' + data.records[key2].study_name + '</a></td><td style="overflow:hidden;">' + data.records[key2].duration + '</td><td style="overflow:hidden;">' + data.records[key2].study_purpose + '</td>';
            str += '<td style="overflow:hidden;text-align:center;">';
            if(data.records[key2].spatial_data_type_id !="null")
                //str += '<a href="javascript:loadmap(' + data.records[key2].ecosystemserviceindicatorid + ')">show map</a>';
                str += '<a href="javascript:loadmap(' + data.records[key2].ecosystemserviceindicatorid + ')"><img src="' + graphics.showmap.normal + '" title="Click to load map" onmouseover="showmapImg(this,1);" onmouseout="showmapImg(this,0);"></a>';
            str += '</td>';
            str += '<td style="overflow:hidden;text-align:center;">';
            if (data.records[key2].spatial_data_type_id == "1")
                //str += '<a href="javascript:downloadmap(' + data.records[key2].ecosystemserviceindicatorid + ')">download GeoTiff</a>';
                str += '<a href="javascript:downloadmap(' + data.records[key2].ecosystemserviceindicatorid + ')"><img src="' + graphics.downloadgeotiff.normal + '" title="Click to download GeoTiff" onmouseover="geotiffImg(this,1);" onmouseout="geotiffImg(this,0);"></a>';
            if (data.records[key2].spatial_data_type_id == "2")
                //str += '<a href="javascript:downloadmap(' + data.records[key2].ecosystemserviceindicatorid + ')">download Shape</a>';
                str += '<a href="javascript:downloadmap(' + data.records[key2].ecosystemserviceindicatorid + ')"><img src="' + graphics.downloadshape.normal + '" title="Click to download shape" onmouseover="shapeImg(this,1);" onmouseout="shapeImg(this,0);"></a>';
            str += '</td>';
			str += '<td style="overflow:hidden;text-align:center;">';
			
			var downloadUrl = (isdevelopping)?'http://esp-mapping.jrc.it/esp-upload':("http://" + window.location.host + '/esp-upload/');
			downloadUrl = downloadUrl + 'getoriginal/' + data.records[key2].ecosystemserviceindicatorid + '/' + data.records[key2].spatial_data_type_id;
			
			str += '<a href="'+downloadUrl+'"><img src="' + graphics.downloadoriginal.normal + '" title="Click to download original file" onmouseover="downloadImg(this,1);" onmouseout="downloadImg(this,0);"></a>';
			str += '</td>';
            //str += '<td style="overflow:hidden;"><a href="javascript:showfiche(' + data.records[key2].ecosystemserviceindicatorid + ')">blueprint</a></td>';
            str += '</tr>';
            appStatus.selectedServicesAll.push(data.records[key2].ecosystemserviceindicatorid);
        }
    }

    str += "</table>";
    //str += '<p><a href="javascript:showblueprinttable();"> More</a></p>';
    $("#div_content_data_service_table").html(str);



}
/*
Name:       showmapImg,shapeImg,geotiffImg,showblueprintImg,downloadblueprintImg
Goal:       show image hover/normal
Input:      
Output:     
Caller:     presentServicesList
*/
function showmapImg(that, isover) {
    if (isover)
        that.src = graphics.showmap.hover;
    else
        that.src = graphics.showmap.normal;
}
function shapeImg(that, isover) {
    if (isover)
        that.src = graphics.downloadshape.hover;
    else
        that.src = graphics.downloadshape.normal;
}
function downloadImg(that, isover) {
    if (isover)
        that.src = graphics.downloadoriginal.hover;
    else
        that.src = graphics.downloadoriginal.normal;
}
function geotiffImg(that, isover) {
    if (isover)
        that.src = graphics.downloadgeotiff.hover;
    else
        that.src = graphics.downloadgeotiff.normal;
}
function showblueprintImg(that, isover) {
    if (isover)
        that.src = graphics.viewblueprint.hover;
    else
        that.src = graphics.viewblueprint.normal;
}
function downloadblueprintImg(that, isover) {
    if (isover)
        that.src = graphics.downloadbluepint.hover;
    else
        that.src = graphics.downloadbluepint.normal;
}

/*
Name:       selectstudy
Goal:       click event study
Input:      study id
Output:     
Caller:     data div
*/
function selectstudy(id) {
    loadStudyServices(id);
}
/*
Name:       serviceselectall
Goal:       toggle check all/none services
Input:      self
Output:     
Caller:     data div
*/
function serviceselectall(that) {
    if (that.checked) {
        for (var i = 0; i < appStatus.selectedServicesAll.length; i++) {
            if (!$("#selectedservicecheckbox" + appStatus.selectedServicesAll[i])[0].checked) {
                $("#selectedservicecheckbox" + appStatus.selectedServicesAll[i])[0].checked = true;
                serviceselected(appStatus.selectedServicesAll[i], $("#selectedservicecheckbox" + appStatus.selectedServicesAll[i])[0]);
            }
        }
     
    } else {
        for (var i = 0; i < appStatus.selectedServicesAll.length; i++) {
            if ($("#selectedservicecheckbox" + appStatus.selectedServicesAll[i])[0].checked) {
                $("#selectedservicecheckbox" + appStatus.selectedServicesAll[i])[0].checked = false;
                serviceselected(appStatus.selectedServicesAll[i], $("#selectedservicecheckbox" + appStatus.selectedServicesAll[i])[0]);
            }
        }
    }
}

/*
Name:       serviceselected
Goal:       click event service checkbox
Input:      service id
Output:     
Caller:     
*/
function serviceselected(id,that) {
    if (that.checked)
        appStatus.selectedServices.push(id);
    else {
        var ind = appStatus.selectedServices.indexOf(id);
        if (ind > (-1))
            appStatus.selectedServices.splice(ind, 1);
    }
    if (appStatus.selectedServices.length > 0)
        activateDownloadBlueprint(true);
        //$("#divshowdownloadblueprint").show();
    else
        activateDownloadBlueprint(false);
        //$("#divshowdownloadblueprint").hide();
}
/*
Name:       removemap
Goal:       remove uploaded map
Input:      
Output:     
Caller:     loadmap (div_uploadedmap click c)
*/
function removemap() {
    espMap.removeWMSLayer("esp");
    ogclinks.mapupload.lastUploadedMap = null;
    $("#" + mapTools.uploadedmap.div).fadeOut(divsConfig.fadeSpeed);
    $("#div_slider_box").hide();
}

/*
Name:       loadmap
Goal:       load uploaded map
Input:      service id
Output:     
Caller:     Data div click map image
*/

var uploadedmaps = new Array();
function loadmap(id) {

    var test = filteredjson(uploadedmaps, "id", id);
    if (test.length > 0) 
        return;
    var url = ajaxUrls.getIndicatorSurface + "?id=" + id;
    var record = new Object();
    $.ajax(url)
    .done(function (data) {
        try {
            var themapdata = myParseJSON(data);
            if (themapdata.records.length == 0) {
                return;
            }
            if (themapdata.records[0].layer_name == "null") {
                return;
            }
            record.id = id;
            record.opacity = 1;
            var maptitle = themapdata.records[0].maptitle;
            record.maptitle = themapdata.records[0].maptitle;
            record.extent = themapdata.records[0].extent;
            record.selected = false;
            record.layer_name = themapdata.records[0].layer_name;
            record.isvector = (themapdata.records[0].spatial_data_type_id == 1) ? false : true;

            if (themapdata.records[0].min_val == "-3.4028230607370965e+38")
                themapdata.records[0].min_val = "0";
            /*if (themapdata.records[0].extent)
            espMap.zoom2Extent(themapdata.records[0].extent);*/
            espMap.addWMSLayer(ogclinks.mapupload.name + id, ogclinks.mapupload.urlwms, ogclinks.mapupload.layername + themapdata.records[0].layer_name);
            //espMap.setVisible(ogclinks.mapupload.name + id, true);
            ogclinks.mapupload.lastUploadedMap = ogclinks.mapupload.layername + themapdata.records[0].layer_name;

            var htmlstr = '<p style="text-align:right; margin-top: 0px; ">'
            htmlstr += '<a class="detailtools" href="javascript:removeDetails();">remove</a>&nbsp;';
            htmlstr += '<a class="detailtools" href="javascript:upDetails();">up</a>&nbsp;';
            htmlstr += '<a class="detailtools" href="javascript:downDetails();">down</a>&nbsp;';
            htmlstr += '<a class="detailtools" href="javascript:zoomDetails();">zoom</a>&nbsp;';
            htmlstr += '<a href="javascript:hideDetails();"><img src="css/close.png" /></a>';
            htmlstr += '</p><b><u>' + maptitle + '</u></b>';
            htmlstr += (themapdata.records[0].quantification_unit != "null") ? '<br/><b>Quantification unit : ' + themapdata.records[0].quantification_unit + '</b>' : "";
            htmlstr += (themapdata.records[0].areal_unit != "null") ? '<br/><b>Areal unit : ' + themapdata.records[0].areal_unit + '</b>' : "";
            htmlstr += (themapdata.records[0].temporal_unit != "null") ? '<br/><b>Temporal unit : ' + themapdata.records[0].temporal_unit + '</b>' : "";
            htmlstr += '<br/>min : ' + themapdata.records[0].min_val;
            htmlstr += '<br/><img src="http://lrm-maps.jrc.ec.europa.eu/geoserver/esp/wms?service=wms&version=1.3.0&request=GetLegendGraphic&format=image/gif&TRANSPARENT=TRUE&layer=' + ogclinks.mapupload.layername + themapdata.records[0].layer_name + '">';
            htmlstr += '<br/>max : ' + themapdata.records[0].max_val;
            htmlstr += '<br/><br/><b>Opacity: <span id="divopacityi">1</span></b><br/><div id = "div_slideri"></div>';



            record.htmlstr = htmlstr;

            //$("#div_uploadedmap").html(htmlstr);
            //$("#" + mapTools.uploadedmap.div).show();
            //$("#divopacity").html("1");
            //$("#div_slider_box").show();
            //$("#div_slider").slider('value', 0);
            //$("#div_button_map").click();
            uploadedmaps[uploadedmaps.length] = record;
            if (!$("#div_maptool_uploaded").is(":VISIBLE"))
                $("#div_maptoolbttns_uploaded").click();
            $("#div_maptool_uploaded_details").fadeOut(divsConfig.fadeSpeed);
            writeUploadedmaps();
        } catch (e) {
            alert("error");
        }
    })
    .fail(function () {
        alert("error");
    });
}


function loadmapBU(id) {
    var url = ajaxUrls.getIndicatorSurface + "?id=" + id;
    espMap.removeWMSLayer("esp");
    ogclinks.mapupload.lastUploadedMap = null;
    $.ajax(url)
    .done(function (data) {
        try {
            var themapdata = myParseJSON(data);
            if (themapdata.records.length == 0) {
                alert("no map uploaded");
                return;
            }
            if (themapdata.records[0].layer_name == "null") {
                alert("no map uploaded");
                return;
            }
            var maptitle = themapdata.records[0].maptitle;
            if (themapdata.records[0].min_val == "-3.4028230607370965e+38")
                themapdata.records[0].min_val = "0";
            if (themapdata.records[0].extent)
                espMap.zoom2Extent(themapdata.records[0].extent);
            espMap.addWMSLayer(ogclinks.mapupload.name, ogclinks.mapupload.urlwms, ogclinks.mapupload.layername + themapdata.records[0].layer_name); 
            espMap.setVisible(ogclinks.mapupload.name, true);
            ogclinks.mapupload.lastUploadedMap = ogclinks.mapupload.layername + themapdata.records[0].layer_name;

            var htmlstr = '<p style="text-align:right"><a href="javascript:removemap();"><img src="css/close.png" /></a></p><b><u>' + maptitle + '</u></b>'

            htmlstr += (themapdata.records[0].quantification_unit != "null") ? '<br/><b>Quantification unit : ' + themapdata.records[0].quantification_unit + '</b>' : "";
            htmlstr += (themapdata.records[0].areal_unit != "null") ? '<br/><b>Areal unit : ' + themapdata.records[0].areal_unit + '</b>' : "";
            htmlstr += (themapdata.records[0].temporal_unit != "null") ? '<br/><b>Temporal unit : ' + themapdata.records[0].temporal_unit + '</b>' : "";
            htmlstr += '<br/>min : ' + themapdata.records[0].min_val;
            htmlstr += '<br/><img src="http://lrm-maps.jrc.ec.europa.eu/geoserver/esp/wms?service=wms&version=1.3.0&request=GetLegendGraphic&format=image/gif&TRANSPARENT=TRUE&layer=' + ogclinks.mapupload.layername + themapdata.records[0].layer_name + '">';
            htmlstr += '<br/>max : ' + themapdata.records[0].max_val;

            $("#div_uploadedmap").html(htmlstr);
            $("#" + mapTools.uploadedmap.div).fadeIn(divsConfig.fadeSpeed);
            $("#divopacity").html("1");
            $("#div_slider_box").show();
            $("#div_slider").slider('value', 0);
            $("#div_button_map").click();

        } catch (e) {
            alert("error");
        }
    })
    .fail(function () {
        alert("error");
    });
}

/*
Name:       downloadmap
Goal:       download shape or tiff
Input:      service id
Output:     
Caller:     data div
*/
function downloadmap(id) {
    // NOG AANPASSEN EN IN CONFIG PARAMETERS TOEVOEGEN
    //window.open("http://h05-dev-vm3.jrc.it/geoserver/esp/wms?service=WMS&version=1.1.0&request=GetMap&layers=esp:esp-3&styles=&bbox=578966.2622484565,781220.2313084602,8062966.2622484565,6533220.23130846&width=512&height=393&srs=EPSG:3035&format=image/geotiff", "_self");
    //http://lrm-maps.jrc.ec.europa.eu:8080/geoserver/esp/wfs?service=wfs&version=1.0.0&request=GetFeature&typeName=esp:esp-51&outputFormat=shape-zip&format_options=filename:oc_350_Aug2012
    //&srsName=EPSG:4326
    
    var url = ajaxUrls.getIndicatorSurface + "?id=" + id;
    $.ajax(url)
    .done(function (data) {
        try {
            var themapdata = myParseJSON(data);
            if (themapdata.records.length == 0)
                alert("no map to download");
            else {
                //$("#" + mapTools.uploadedmap.div).html(themapdata.records[0].label + '<BR><img id = "img_uploadedmap" src="' + ogclinks.mapupload.urlwms + 'service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=' + themapdata.records[0].layer_name + '" alt="uploadedmap" title="Remove uploaded map" />');
                if (themapdata.records[0].spatial_data_type_id == 2) {
                    window.open("http://lrm-maps.jrc.ec.europa.eu/geoserver/esp/wfs?service=wfs&version=1.0.0&request=GetFeature&typeName=esp:" + themapdata.records[0].layer_name + "&outputFormat=shape-zip&format_options=filename:" + themapdata.records[0].layer_name, "_self");
                }
                if (themapdata.records[0].spatial_data_type_id == 1) {
                    var urlextra = calculateWCSparameters(themapdata.records[0]);
                    if(urlextra){
                        window.open("http://lrm-maps.jrc.ec.europa.eu/geoserver/esp/wcs?service=WCS&version=1.0.0&request=GetCoverage&Coverage=esp:" + themapdata.records[0].layer_name + urlextra + "&CRS=EPSG:4326&FORMAT=GeoTIFF&filename=" + themapdata.records[0].layer_name + ".tiff", "_self");
                    }
                }
            }
        } catch (e) {
            alert("error");
        }
    })
    .fail(function () {
        alert("error");
    });

}

/*
Name:       showblueprint
Goal:       show blueprint selected services as html page
Input:      service id
Output:     
Caller:     data div
*/
function showblueprint() {
    var str="";
    for (var i = 0; i < appStatus.selectedServices.length; i++) {
        if (i > 0)
            str += ",";
        str += appStatus.selectedServices[i]
    }
    if(str!="")
        window.open("blueprint.htm?id="+str, "blueprint");
}
/*
Name:       downloadblueprint
Goal:       download blueprint selected services as csv
Input:      service id
Output:     
Caller:     data div
*/
function downloadblueprint() {
    var str = "";
    for (var i = 0; i < appStatus.selectedServices.length; i++) {
        if (i > 0)
            str += ",";
        str += appStatus.selectedServices[i]
    }
    if (str != "")
        window.open(ajaxUrls.listAllServicesCSV + "?id=" + str, "_self");

}
/*
Name:       sortservicedata
Goal:       present sorted list off services
Input:      
Output:     
Caller:     data div (click on column header)
*/
function sortservicedata(prop) {
    appStatus.allrecords.records = sortdata(appStatus.allrecords.records, prop, appStatus.lastsort);
    appStatus.lastsort = !appStatus.lastsort;
    presentServicesList(appStatus.allrecords);
    for (var i = 0; i < appStatus.selectedServices.length; i++) {
        $("#selectedservicecheckbox" + appStatus.selectedServices[i])[0].checked = true;
    }
}

//http://lrm-maps.jrc.ec.europa.eu/geoserver/esp/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=150&height=80&layer=esp-51
/*
Name:       clearallfilters
Goal:       another selection has been made (free text, map click), so filter needs to be reinitialized
Input:      
Output:     
Caller:     
*/
function clearallfilters() {
    preparefilter();
    selectServices()
}
/*
Name:       preparefreetext
Goal:       make the free text textbox
Input:      
Output:     
Caller:     document ready
*/
function preparefreetext() {
    $(".class_content_freesearch_text").on('keypress', function (event) {
        if (event.which == '13') {
            //Disable textbox to prevent multiple submit
            //$(this).attr("disabled", "disabled");
            var freetext = $(this).val();
            $.ajax(ajaxUrls.freesearch + '?s=' + $(this).val())
                .done(function (data, b, c, d) {
                    try {
                        //$(this).removeAttr("disabled");
                        var url = ajaxUrls.applyfreesearch + "?";
                        var isfirstitem = true;
                        lst = myParseJSON(data);
                        if (lst.records.length > 0) {
                            url += "id=";
                            isfirstitem = true;
                            for (var key in lst.records) {
                                if (lst.records.hasOwnProperty(key)) {
                                    if (isfirstitem)
                                        isfirstitem = false;
                                    else
                                        url += ","
                                    url += lst.records[key].id;
                                }
                            }
                        }


                        $.ajax(url)
                            .done(function (data) {
                                try {
                                    appStatus.selectedServices = new Array();
                                    preparefilter();
                                    presentServicesList(myParseJSON(data));
                                    tmpcount = (myParseJSON(data).records.length);
                                    $("#div_content_data_filter_head_nr").html(tmpcount);
                                    $(".class_content_last_text").html(" search (" + freetext + ")");
                                } catch (e) {

                                }
                            })
                            .fail(function () {

                            });
                        //$("#divshowdownloadblueprint").hide();
                        activateDownloadBlueprint(false);

                    } catch (e) {
                        //$(this).removeAttr("disabled");
                    }
                })
                .fail(function () {
                    //$(this).removeAttr("disabled");
                });
        }
    });
}