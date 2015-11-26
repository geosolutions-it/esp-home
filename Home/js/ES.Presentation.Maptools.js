var maptoolbuttonselected = 0;
//

function prepareMaptools() {
    $("#div_maptoolscontainer").draggable({ containment: "#div_content_map", scroll: false });
    $("#div_maptoolscontainer").mouseover(function () {
        //$("#div_maptoolscontainer").css({ "opacity": 1, "filter": "alpha(opacity = 100)" });
    });
    $("#div_maptoolscontainer").mouseout(function () {
        //$("#div_maptoolscontainer").css({ "opacity": 0.75, "filter": "alpha(opacity = 75)" });
    });
    $("#div_maptoolbttns_baselayers").mouseover(function () {
        $("#div_maptoolbttns_baselayers").css({ "border-color": divsConfig.buttons.colorbuttonborderhover });
    });
    $("#div_maptoolbttns_baselayers").mouseout(function () {
        $("#div_maptoolbttns_baselayers").css({ "border-color": divsConfig.buttons.colorbuttonborder });
    });
    $("#div_maptoolbttns_baselayers").click(function () {
        if (maptoolbuttonselected == 0) {
            maptoolbuttonselected = 1;
            $("#div_maptoolbttns_baselayers").css({ "background": divsConfig.buttons.colorbuttonselected }); //colorbutton
        }
        else if (maptoolbuttonselected == 1) {
            maptoolbuttonselected = 0;
            $("#div_maptoolbttns_baselayers").css({ "background": divsConfig.buttons.colorbutton }); //colorbutton
        }
        else {
            if (maptoolbuttonselected == 2)
                $("#div_maptoolbttns_overlays").click();
            else if (maptoolbuttonselected == 3)
                $("#div_maptoolbttns_uploaded").click();
            maptoolbuttonselected = 1;
            $("#div_maptoolbttns_baselayers").css({ "background": divsConfig.buttons.colorbuttonselected }); //colorbutton
        }
        manageToolOutput();
    });

    $("#div_maptoolbttns_overlays").mouseover(function () {
        $("#div_maptoolbttns_overlays").css({ "border-color": divsConfig.buttons.colorbuttonborderhover });
    });
    $("#div_maptoolbttns_overlays").mouseout(function () {
        $("#div_maptoolbttns_overlays").css({ "border-color": divsConfig.buttons.colorbuttonborder });
    });
    $("#div_maptoolbttns_overlays").click(function () {
        if (maptoolbuttonselected == 0) {
            maptoolbuttonselected = 2;
            $("#div_maptoolbttns_overlays").css({ "background": divsConfig.buttons.colorbuttonselected }); //colorbutton
        }
        else if (maptoolbuttonselected == 2) {
            maptoolbuttonselected = 0;
            $("#div_maptoolbttns_overlays").css({ "background": divsConfig.buttons.colorbutton }); //colorbutton
        }
        else {
            if (maptoolbuttonselected == 1)
                $("#div_maptoolbttns_baselayers").click();
            else if (maptoolbuttonselected == 3)
                $("#div_maptoolbttns_uploaded").click();
            maptoolbuttonselected = 2;
            $("#div_maptoolbttns_overlays").css({ "background": divsConfig.buttons.colorbuttonselected }); //colorbutton
        }
        manageToolOutput();
    });


    $("#div_maptoolbttns_uploaded").mouseover(function () {
        $("#div_maptoolbttns_uploaded").css({ "border-color": divsConfig.buttons.colorbuttonborderhover });
    });
    $("#div_maptoolbttns_uploaded").mouseout(function () {
        $("#div_maptoolbttns_uploaded").css({ "border-color": divsConfig.buttons.colorbuttonborder });
    });
    $("#div_maptoolbttns_uploaded").click(function () {
        if (maptoolbuttonselected == 0) {
            maptoolbuttonselected = 3;
            $("#div_maptoolbttns_uploaded").css({ "background": divsConfig.buttons.colorbuttonselected }); //colorbutton
        }
        else if (maptoolbuttonselected == 3) {
            maptoolbuttonselected = 0;
            $("#div_maptoolbttns_uploaded").css({ "background": divsConfig.buttons.colorbutton }); //colorbutton
        }
        else {
            if (maptoolbuttonselected == 1)
                $("#div_maptoolbttns_baselayers").click();
            else if (maptoolbuttonselected == 2)
                $("#div_maptoolbttns_overlays").click();
            maptoolbuttonselected = 3;
            $("#div_maptoolbttns_uploaded").css({ "background": divsConfig.buttons.colorbuttonselected }); //colorbutton
        }
        manageToolOutput();
    });
    manageToolOutput();
    
    $("#div_maptool_uploaded_details").fadeOut(divsConfig.fadeSpeed);
    $("#glclegend").mouseenter(function (e) {
        if (espMap.isVisible("glc2000_v1_gdal_1")) {
            var str = "";
            str += '<br/><img src="http://lrm-maps.jrc.ec.europa.eu/geoserver/lrm/wms?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=10&height=10&layer=lrm:glc2000_v1_gdal_1" alt="" />';
            $("#legend").html(str);
            $("#legend").fadeIn(divsConfig.fadeSpeed);
        }
    });
    $("#glclegend").mouseleave(function (e) {

        $("#legend").fadeOut(divsConfig.fadeSpeed);
    });
    $("#wdpacopyright").hide();
    $("#wdpacopyright").html('&copy;WDPA by UNEP-WCMC 2011');

}

function manageToolOutput() {
    if (maptoolbuttonselected == 0) {
        $("#div_maptool_baselayers").fadeOut(divsConfig.fadeSpeed);
        $("#div_maptool_overlays").fadeOut(divsConfig.fadeSpeed);
        $("#div_maptool_uploaded").fadeOut(divsConfig.fadeSpeed);
        $("#div_maptoolscontainer").css({ "height": "24px" });
        $("#div_maptoolscontainer").draggable("destroy");
        $("#div_maptool_uploaded_details").fadeOut(divsConfig.fadeSpeed);   
    } else if (maptoolbuttonselected == 1) {
        $("#div_maptool_baselayers").fadeIn(divsConfig.fadeSpeed);
        $("#div_maptool_overlays").fadeOut(divsConfig.fadeSpeed);
        $("#div_maptool_uploaded").fadeOut(divsConfig.fadeSpeed);
        $("#div_maptoolscontainer").css({ "height": "375px" });
        $("#div_maptoolscontainer").draggable({ containment: "#div_content_map", scroll: false });
    } else if (maptoolbuttonselected == 2) {
        $("#div_maptool_baselayers").fadeOut(divsConfig.fadeSpeed);
        $("#div_maptool_overlays").fadeIn(divsConfig.fadeSpeed);
        $("#div_maptool_uploaded").fadeOut(divsConfig.fadeSpeed);
        $("#div_maptoolscontainer").css({ "height": "375px" });
        $("#div_maptoolscontainer").draggable({ containment: "#div_content_map", scroll: false });
    } else if (maptoolbuttonselected == 3) {
        $("#div_maptool_baselayers").fadeOut(divsConfig.fadeSpeed);
        $("#div_maptool_overlays").fadeOut(divsConfig.fadeSpeed);
        $("#div_maptool_uploaded").fadeIn(divsConfig.fadeSpeed);
        $("#div_maptoolscontainer").css({ "height": "375px" });
        $("#div_maptoolscontainer").draggable({ containment: "#div_content_map", scroll: false });
    }
    if (maptoolbuttonselected != 3) {
        for (var i = 0; i < uploadedmaps.length; i++) {
            if (uploadedmaps[i].selected) {
                $("#spanmaptitle" + i).removeClass("selectedlayer");
                uploadedmaps[i].selected = false;
            }
        }
    }
}


function setBaseLayer(casus) {
    switch (casus) {
        case 1: espMap.setVisibleId(0, true);
            espMap.setVisibleId(1, false);
            //espMap.setVisibleId(2, false);
            espMap.setVisibleId(3, false);
            espMap.setVisibleId(4, false);
            break;
        case 2: espMap.setVisibleId(0, false);
            espMap.setVisibleId(1, true);
            //espMap.setVisibleId(2, false);
            espMap.setVisibleId(3, false);
            espMap.setVisibleId(4, false);
            break;
        case 3: espMap.setVisibleId(0, false);
            espMap.setVisibleId(1, false);
            //espMap.setVisibleId(2, true);
            espMap.setVisibleId(3, false);
            espMap.setVisibleId(4, false);
            break;
        case 4: espMap.setVisibleId(0, false);
            espMap.setVisibleId(1, false);
            //espMap.setVisibleId(2, false);
            espMap.setVisibleId(3, true);
            espMap.setVisibleId(4, false);
            break;
        case 5: espMap.setVisibleId(0, false);
            espMap.setVisibleId(1, false);
            //espMap.setVisibleId(2, false);
            espMap.setVisibleId(3, false);
            espMap.setVisibleId(4, true);
            break;
    }
}

function layerSelected(id) {
    var isvisible;
    
    if (id == 1) {
        isvisible = espMap.isVisible("WDPA");
        espMap.setVisible("WDPA", !isvisible);
        $("#layers_wdpa_img")[0].setAttribute("src", (isvisible) ? "images/unchecked.png" : "images/checked.png");
        isvisible ? $("#wdpacopyright").hide() : $("#wdpacopyright").show();
    }
    if (id == 2) {
        isvisible = espMap.isVisible(ogclinks.region.name);
        espMap.setVisible(ogclinks.region.name, !isvisible);
        $("#layers_regions_img")[0].setAttribute("src", (isvisible) ? "images/unchecked.png" : "images/checked.png");
    }
    if (id == 6) {
        isvisible = espMap.isVisible("bathymetry");
        espMap.setVisible("bathymetry", !isvisible);
        $("#layers_bat_img")[0].setAttribute("src", (isvisible) ? "images/unchecked.png" : "images/checked.png");
    }

}

function writeUploadedmaps() {
    var htmlstr = "";
    var isvisible;
    var src;
    //uploadedmaps
    for (var i = 0; i < uploadedmaps.length; i++) {
        isvisible = espMap.isVisible(ogclinks.mapupload.name + uploadedmaps[i].id);
        if (isvisible)
            src = "images/checked.png";
        else
            src = "images/unchecked.png";
        //htmlstr += '<div class="layers" style="position: absolute;top:' + (30 * (i + 1)) + 'px"><a href="javascript:uploadedLayerSelected(' + i + ');"><img alt=""  id="layers_uploaded_img' + uploadedmaps[i].id + '" src="' + src + '" /></a>&nbsp;<a href="javascript:uploadedLayerRemove(' + i + ')"><img src="css/close.png"/></a>&nbsp;<span id="spanmaptitle' + i + '"><a href="javascript:uploadedLayerDetails(' + i + ')">' + uploadedmaps[i].maptitle + '</a></span></div>';
        htmlstr += '<div class="layers" style="position: absolute;top:' + (30 * (i + 1)) + 'px"><a href="javascript:uploadedLayerSelected(' + i + ');"><img alt=""  id="layers_uploaded_img' + uploadedmaps[i].id + '" src="' + src + '" /></a>&nbsp;<span id="spanmaptitle' + i + '"><a href="javascript:uploadedLayerDetails(' + i + ')">' + uploadedmaps[i].maptitle + '</a></span></div>';
    }
    $("#div_maptool_uploaded").html(htmlstr);
     
}

function uploadedLayerSelected(ind) {
    var isvisible;

    isvisible = espMap.isVisible(ogclinks.mapupload.name + uploadedmaps[ind].id);
    espMap.setVisible(ogclinks.mapupload.name + uploadedmaps[ind].id, !isvisible);
    $("#layers_uploaded_img" + uploadedmaps[ind].id)[0].setAttribute("src", (isvisible) ? "images/unchecked.png" : "images/checked.png");
}

function uploadedLayerRemove(ind) {
    espMap.removeWMSLayer(ogclinks.mapupload.name + uploadedmaps[ind].id);
    uploadedmaps.remove(uploadedmaps[ind]);
    $("#div_maptool_uploaded_details").fadeOut(divsConfig.fadeSpeed);   
    writeUploadedmaps();
}

function uploadedLayerDetails(ind) {
    for (var i = 0; i < uploadedmaps.length; i++) {
        if (uploadedmaps[i].selected) {
            $("#spanmaptitle" + i).removeClass("selectedlayer");
            uploadedmaps[i].selected = false;
        }
    }
    uploadedmaps[ind].selected = true;
    $("#div_maptool_uploaded_details").html(uploadedmaps[ind].htmlstr);
    var sliderDivi = $("#div_slideri");
    sliderDivi.slider({
        value: uploadedmaps[ind].opacity
        , min: 0
        , max: 1
        , step: 0.1
        , change: function (event, ui) {
            espMap.setOpacity(ogclinks.mapupload.name + uploadedmaps[ind].id, 1 - ui.value);
        }
        , slide: function (event, ui) {
            $("#divopacityi").html(Math.round((1 - ui.value) * 10) / 10);
            uploadedmaps[ind].opacity = Math.round((1 - ui.value) * 10) / 10;
        }
    });
    $("#div_slideri").slider('value', 1 - uploadedmaps[ind].opacity);
    $("#divopacityi").html(uploadedmaps[ind].opacity);
    $("#div_maptool_uploaded_details").fadeIn(divsConfig.fadeSpeed);
    $("#spanmaptitle" + ind).addClass("selectedlayer");
}

function hideDetails() {
    $("#div_maptool_uploaded_details").fadeOut(divsConfig.fadeSpeed);
    for (var i = 0; i < uploadedmaps.length; i++) {
        if (uploadedmaps[i].selected) {
            $("#spanmaptitle" + i).removeClass("selectedlayer");
            uploadedmaps[i].selected = false;
        }
    }
}

function zoomDetails() {
    for (var i = 0; i < uploadedmaps.length; i++) {
        if (uploadedmaps[i].selected) {
            espMap.zoom2Extent(uploadedmaps[i].extent);
            break;
        }
    }
    
}
function upDetails() {
    var sel;
    for (var i = 0; i < uploadedmaps.length; i++) {
        if (uploadedmaps[i].selected) {
            sel=i;
            break;
        }
    }
    if (sel > 0) {
        element = uploadedmaps[sel];
        uploadedmaps.splice(sel, 1);
        uploadedmaps.splice(sel - 1, 0, element);
        writeUploadedmaps();
        uploadedLayerDetails(sel - 1);
        $("#spanmaptitle" + (sel - 1)).addClass("selectedlayer");
        espMap.layerUp(ogclinks.mapupload.name + uploadedmaps[sel].id);
    }
}
function downDetails() {
    var sel;
    for (var i = 0; i < uploadedmaps.length; i++) {
        if (uploadedmaps[i].selected) {
            sel = i;
            break;
        }
    }
    if (sel < (uploadedmaps.length-1)) {
        element = uploadedmaps[sel];
        uploadedmaps.splice(sel, 1);
        uploadedmaps.splice(sel + 1, 0, element);
        writeUploadedmaps();
        uploadedLayerDetails(sel + 1);
        $("#spanmaptitle" + (sel + 1)).addClass("selectedlayer");
        espMap.layerDown(ogclinks.mapupload.name + uploadedmaps[sel].id);
    }
}
function removeDetails() {
    var sel;
    for (var i = 0; i < uploadedmaps.length; i++) {
        if (uploadedmaps[i].selected) {
            sel = i;
            break;
        }
    }
    uploadedLayerRemove(sel);
}


function identify(lonlat) {

    $("#div_identify_container").fadeIn(divsConfig.fadeSpeed);

/* REGION */
    if (espMap.isVisible(ogclinks.region.name)) {
        $("#id_info_region").show();
        $("#id_info_region_info").html("loading...");
        var url = ogclinks.region.urlwfs + 'SERVICE=WFS&REQUEST=GetFeature&VERSION=1.1.0&typename=' + ogclinks.region.layername + '&srsname=EPSG:4326&outputFormat=json&propertyName=' + ogclinks.region.sldfield + '&BBOX=' + lonlat.lat + "," + lonlat.lon + "," + lonlat.lat + "," + lonlat.lon;
        $.ajax(url).done(function (data, b, c, d) {
            try {
                var theregion = data.features[0].properties.REGION;
                $("#id_info_region_info").html('<a href="javascript:identifyDoRegion(\''+theregion+'\')">' + theregion + '</a>');
            } catch (e) {
                $("#id_info_region_info").html("no data");
            }
        }).fail(function (e, x, a, b) { 
        
        });
    } else {
        $("#id_info_region").hide();
    }


    /* GLC */
    if (espMap.isVisible("glc2000_v1_gdal_1")) {
        $("#id_info_glc").show();
        $("#id_info_glc_info").html("loading...");
        identifyglc(lonlat);
    } else {
        $("#id_info_glc").hide();
    }
    /* WDPA */
    if (espMap.isVisible("WDPA")) {
        $("#id_info_wdpa").show();
        $("#id_info_wdpa_info").html("loading...");
        var url = ogclinks.wdpa.urlwfs + 'SERVICE=WFS&REQUEST=GetFeature&VERSION=1.1.0&typename=' + ogclinks.wdpa.layername + '&srsname=EPSG:4326&outputFormat=json&propertyName=name,wdpa_id&BBOX=' + lonlat.lat + "," + lonlat.lon + "," + lonlat.lat + "," + lonlat.lon;
        $.ajax(url).done(function (data, b, c, d) {
            try {
                
                $("#id_info_wdpa_info").html('<a href="http://www.protectedplanet.net/sites/' + data.features[0].properties.wdpa_id + '" target="_blank">' + data.features[0].properties.name + '</a>');
            } catch (e) {
                $("#id_info_wdpa_info").html("no data");
            }
        }).fail(function (e, x, a, b) {

        });
    } else {
        $("#id_info_wdpa").hide();
    }

    $("#id_info_eez").hide();
    $("#id_info_eco").hide();
    $("#id_info_meow").hide();
    /* EEZ */
    /* ECOREGIONS */
    /* MEOW */
    /* UPLOADED MAP */
    
    
    $("#id_info_uploaded").hide();
    for (var i = 0; i < uploadedmaps.length; i++) {
        if (uploadedmaps[i].selected) {
            if (uploadedmaps[i].isvector) {
                $("#id_info_uploaded").show();
                $("#id_info_uploaded_info").html("loading...");
                $("#id_info_uploaded_title").html(uploadedmaps[i].maptitle);
                var url = ogclinks.mapupload.urlwfs + 'SERVICE=WFS&REQUEST=GetFeature&VERSION=1.1.0&typename=esp:' + uploadedmaps[i].layer_name + '&srsname=EPSG:4326&outputFormat=json&BBOX=' + lonlat.lon + "," + lonlat.lat + "," + lonlat.lon + "," + lonlat.lat + ',EPSG:4326';
                $.ajax(url)
                            .done(function (data, b, c, d) {
                                try {
                                    if (data.features) {
                                        if (data.features[0]) {
                                            if (data.features[0].properties) {
                                                var props = data.features[0].properties;
                                                var str = "";
                                                for (var key in props) {
                                                    str += key + ":" + props[key] + "<br />";
                                                }
                                                $("#id_info_uploaded_info").html(str);
                                            }
                                        }
                                    }
                                } catch (e) {
                                    $("#id_info_uploaded_info").html("no data");
                                }
                            }).fail(function () {
                                $("#id_info_uploaded_info").html("no data");
                            });
            }
            break;
        }
    }
}







function identifyDoRegion(theregion) {

                        var anUrl;
                        if (isdevelopping)
                            anUrl = ajaxUrls.listESByRegion + "?region=" + escape(theregion);
                        else
                            anUrl = ajaxUrls.listESByRegion + "?region=" + escape(escape(theregion)); ;

                        $.ajax(anUrl)
                                    .done(function (data, b, c, d) {
                                        try {
                                            var tmpcount = (myParseJSON(data).records.length);
                                            if (tmpcount > 0) {
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
                                                        var tmpcount = (myParseJSON(data).records.length);
                                                        $("#div_content_data_filter_head_nr").html(tmpcount);
                                                        $(".class_content_last_text").html(" region (" + theregion + ")");
                                                        $("#div_button_data").click();
                                                        //alert(tmpcount + " records uploaded for " + theregion + ", they are listed under DATA");
                                                    } catch (e) {
                                                        var a = 0;
                                                    }
                                                })
                                                .fail(function (e) {
                                                    var a = 0;
                                                });
                                                activateDownloadBlueprint(false);
                                                //$("#divshowdownloadblueprint").hide();
                                            } else {
                                                alert("No records uploaded for " + theregion);
                                            }
                                        } catch (e) {
                                            var a = 0;
                                        }
                                    })
                                    .fail(function (e) {
                                        var a = 0;
                                    });
                                }


                                function identifyglc(lonlat) {
                                    var lookuptable = {
                                        "1": { "label": "Tree Cover, broadleaved, evergreen", "red": 0, "green": 99, "blue": 0 },
                                        "2": { "label": "Tree Cover, broadleaved, deciduous, closed", "red": 0, "green": 149, "blue": 0 },
                                        "3": { "label": "Tree Cover, broadleaved, deciduous, open", "red": 174, "green": 254, "blue": 98 },
                                        "4": { "label": "Tree Cover, needle-leaved, evergreen", "red": 138, "green": 68, "blue": 18 },
                                        "5": { "label": "Tree Cover, needle-leaved, deciduous", "red": 204, "green": 126, "blue": 95 },
                                        "6": { "label": "Tree Cover, mixed leaf type", "red": 139, "green": 189, "blue": 0 },
                                        "7": { "label": "Tree Cover, regularly flooded, fresh water", "red": 119, "green": 149, "blue": 254 },
                                        "8": { "label": "Tree Cover, regularly flooded, saline water", "red": 0, "green": 70, "blue": 199 },
                                        "9": { "label": "Mosaic: Tree Cover / Other natural vegetation", "red": 0, "green": 229, "blue": 0 },
                                        "10": { "label": "Tree Cover, burnt", "red": 0, "green": 0, "blue": 0 },
                                        "11": { "label": "Shrub Cover, closed-open, evergreen", "red": 254, "green": 118, "blue": 0 },
                                        "12": { "label": "Shrub Cover, closed-open, deciduous", "red": 254, "green": 178, "blue": 0 },
                                        "13": { "label": "Herbaceous Cover, closed-open", "red": 254, "green": 233, "blue": 157 },
                                        "14": { "label": "Sparse herbaceous or sparse shrub cover", "red": 221, "green": 201, "blue": 160 },
                                        "15": { "label": "Regularly flooded shrub and/or herbaceous cover", "red": 0, "green": 149, "blue": 149 },
                                        "16": { "label": "Cultivated and managed areas", "red": 254, "green": 223, "blue": 228 },
                                        "17": { "label": "Mosaic: Cropland / Tree Cover / Other natural vege", "red": 254, "green": 116, "blue": 231 },
                                        "18": { "label": "Mosaic: Cropland / Shrub and/or grass cover", "red": 201, "green": 137, "blue": 254 },
                                        "19": { "label": "Bare Areas", "red": 179, "green": 179, "blue": 179 },
                                        "20": { "label": "Water Bodies", "red": 137, "green": 226, "blue": 254 },
                                        "21": { "label": "Snow and Ice", "red": 239, "green": 239, "blue": 239 },
                                        "22": { "label": "Artificial surfaces and associated areas", "red": 254, "green": 0, "blue": 0 },
                                        "23": { "label": "No data", "red": 254, "green": 254, "blue": 254 }
                                    };
                                    var d = 0.00001;
                                    var url = proxyget + "http://lrm-maps.jrc.ec.europa.eu/geoserver/lrm/wms?service=WMS&request=GetFeatureInfo&LAYERS=lrm:glc2000_v1_gdal_1&QUERY_LAYERS=lrm:glc2000_v1_gdal_1&version=1.3.0&width=100&height=100&i=50&j=50&info_format=text/plain&bbox=";
                                    url += (lonlat.lon - d) + ",";
                                    url += (lonlat.lat - d) + ",";
                                    url += (lonlat.lon + d) + ",";
                                    url += (lonlat.lat + d);
                                    $.ajax(url).done(function (data, b, c, d) {
                                        var str = "";
                                        var i1 = data.indexOf("PALETTE_INDEX");
                                        if (i1 > 0) {
                                            str = data.substr(data.indexOf("PALETTE_INDEX") + 16);
                                            str = str.substr(0, str.indexOf(".0"));
                                            str = lookuptable[str].label;
                                            $("#id_info_glc_info").html(str);
                                        }

                                        else {
                                            $("#id_info_glc_info").html("no data");
                                        }
                                        
                                    });

                                }
                                function hideIdentify() {
                                    $("#div_identify_container").fadeOut(divsConfig.fadeSpeed);

                                    
                                }