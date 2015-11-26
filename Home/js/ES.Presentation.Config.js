
jQuery.support.cors = true;
var isdevelopping = false;
var espMap;
var ovMap;
var modal;
var MapApp;




var divsConfig = {
    fadeSpeed:250
    ,window: {
        minWidth: 1024
        , minHeight: 768
    }
    , header: {
        height: 140
        , title1: {
            text: 'ESP'
        }
        , title2: {
            text: 'The Ecosystem Services Partnership Visualization tool'
        }
    }
    , footer: {
        height: 1
    }
    , about: {
        width: 850
        ,height:650
    }
    , help: {
        width: 850
        , height: 650
    }
    , buttons: {
        items: [{ text: 'About'
                    , div: "div_button_home"
        }
                , { text: 'Maps'
                    , div: "div_button_map"
                }
                , { text: 'Data'
                    , div: "div_button_data"
                }
                , { text: 'Upload'
                    , div: "div_button_upload"
                }
                , { text: 'Help'
                    , div: "div_button_help"
                }]
        , colorbutton: "#5182bd"
        , colorbuttonborder: "#5751bd"
        , colorbuttonselected: "#7ea2ce"
        , colorbuttonborderhover: "#51b8bd"
    }
   

};

var appStatus = {
    startmessageId: 0
    , selectedbutton: "div_button_map"
    //, selectedtab: "div_content_data_menu_filter"
    , filter: {
        biome: new Array()
        , biomecategory: new Array()
        , spatialscale: new Array()
        , ecosystemservicecategory: new Array()
        , ecosystemservice: new Array()
        , studypurpose: new Array()
    }
    , selectedServices: new Array()
    , selectedServicesAll: new Array()
    , allrecords: null
    , lastsort: true
    , uploadwindow:null
};

var lookupTables = {
    //arealunit: null
    biome: null
    , biomecategory: null
    //, classificationsystem: null
    , ecosystemservice: null
    , ecosystemservicecategory: null
    //, indicator: null
    //, quantificationmethod: null
    //, quantificationunit: null
    //, quantificationunitcategory: null
    , spatialscale: null
    //, studyobjectivemet: null
    , studypurpose: null
    //, temporalunit: null
    
}
var regionTables = {
    regions: null
    , nStudiesByRegion: null
    , nServicesByRegion: null
};






if (isdevelopping) {
    OpenLayers.ProxyHost = "http://h05-dev-vm9:8080/cgi-bin/urlproxy.jsp?url=";
    var proxyget = "";
    var proxypost = "";
    var baseUrl = "http://h05-dev-vm9:8080";
} else {
    OpenLayers.ProxyHost = "http://" + window.location.host + '/cgi-bin/urlproxy.jsp?url=';
    var baseUrl = "http://" + document.location.host;
    var proxyget = "http://" + window.location.host + '/cgi-bin/urlproxy.jsp?url='; // later
    var proxypost = ""; //later
}

var ogclinks = {
    region: 
    {
        
        urlwms: 'http://lrm-maps.jrc.ec.europa.eu/geoserver/espregions/wms?'
        , layername: 'espregions:mces'
        //, layername: 'esp:mces'
        , sldfield: 'REGION'
        , name: 'ESstudies'
        , urlwfs: proxyget + 'http://lrm-maps.jrc.ec.europa.eu/geoserver/espregions/wfs?'
    }
    
    , mapupload: {
        urlwms: 'http://lrm-maps.jrc.ec.europa.eu/geoserver/esp/wms?'
        , layername: 'esp:'
        , name: 'esp'
        , urlwfs: proxyget + 'http://lrm-maps.jrc.ec.europa.eu/geoserver/esp/wfs?'
        , lastUploadedMap: null
    }
    , wdpa: {
        urlwms: 'http://lrm-maps.jrc.ec.europa.eu/geoserver/lrm/wms?'
        , layername: 'lrm:wdpa_latest'
        , name: 'lrm'
        , urlwfs: proxyget + 'http://lrm-maps.jrc.ec.europa.eu/geoserver/lrm/wfs?'
     
    }
};

var ajaxUrls = {
    getStudyById: proxyget + baseUrl + "/cgi-bin/blueprint/getStudyById.jsp"
    , applyFilter: proxyget + baseUrl + "/cgi-bin/blueprint/applyFilter.jsp"
    , lutArealunit: proxyget + baseUrl + "/cgi-bin/blueprint/lutArealunit.jsp"
    , lutBiome: proxyget + baseUrl + "/cgi-bin/blueprint/lutBiome.jsp"
    , lutBiomecategory: proxyget + baseUrl + "/cgi-bin/blueprint/lutBiomecategory.jsp"
    , lutClassificationsystem: proxyget + baseUrl + "/cgi-bin/blueprint/lutClassificationsystem.jsp"
    , lutEcosystemservice: proxyget + baseUrl + "/cgi-bin/blueprint/lutEcosystemservice.jsp"
    , lutEcosystemservicecategory: proxyget + baseUrl + "/cgi-bin/blueprint/lutEcosystemservicecategory.jsp"
    , lutIndicator: proxyget + baseUrl + "/cgi-bin/blueprint/lutIndicator.jsp"
    , lutQuantificationmethod: proxyget + baseUrl + "/cgi-bin/blueprint/lutQuantificationmethod.jsp"
    , lutQuantificationmethod: proxyget + baseUrl + "/cgi-bin/blueprint/lutQuantificationunit.jsp"
    , lutQuantificationunitcategory: proxyget + baseUrl + "/cgi-bin/blueprint/lutQuantificationunitcategory.jsp"
    , lutSpatialscale: proxyget + baseUrl + "/cgi-bin/blueprint/lutSpatialscale.jsp"
    , lutStudyobjectivemet: proxyget + baseUrl + "/cgi-bin/blueprint/lutStudyobjectivemet.jsp"
    , lutStudypurpose: proxyget + baseUrl + "/cgi-bin/blueprint/lutStudypurpose.jsp"
    , lutTemporalunit: proxyget + baseUrl + "/cgi-bin/blueprint/lutTemporalunit.jsp"
    , listAllServices: proxyget + baseUrl + "/cgi-bin/blueprint/listAllServices.jsp"
    , listAllServicesCSV: baseUrl + "/cgi-bin/blueprint/listAllServicesCSV.jsp"
    , getIndicatorSurface: proxyget + baseUrl + "/cgi-bin/blueprint/getIndicatorSurface.jsp"
    , lutRegions: proxyget + baseUrl + "/cgi-bin/blueprint/lutRegions.jsp"
    , nServicesByRegion: proxyget + baseUrl + "/cgi-bin/blueprint/nServicesByRegion.jsp"
    , nStudiesByRegion: proxyget + baseUrl + "/cgi-bin/blueprint/nStudiesByRegion.jsp"
    , freesearch: proxyget + baseUrl + "/cgi-bin/blueprint/freesearch.jsp"
    , applyfreesearch: proxyget + baseUrl + "/cgi-bin/blueprint/applyFreeSearch.jsp"
    , listESByRegion: proxyget + baseUrl + "/cgi-bin/blueprint/listESByRegion.jsp"
};

var htmllinks = {
    upload: (isdevelopping)?'http://esp-mapping.jrc.it/esp-upload':("http://" + window.location.host + '/esp-upload/')
    , about_start: 'html/startscreen.htm'
    , help: 'html/help.html'
    


};

var mapTools = {
    baseLayer: {
        div: "div_googlechoice"
        , idimg: "img_googlechoice"
        , srcSat: "images/googlesat.JPG"
        , srcPhys: "images/googlephys.JPG"

    }
    , regions: {
        div: "div_regions"
    }
    , uploadedmap: {
        div: "div_uploadedmap_container"
    }

}

var graphics = {
    filter: {
        normal: 'images/Buttons_Ioanna/png/final-icons_01.png'
        , hover: 'images/Buttons_Ioanna/png/final-icons_070.png'
        , select: 'images/Buttons_Ioanna/png/final-icons_13.png'
    }
    , viewblueprint: {
        normal: 'images/Buttons_Ioanna/png/final-icons_02.png'
        , hover: 'images/Buttons_Ioanna/png/final-icons_08.png'
        , select: 'images/Buttons_Ioanna/png/final-icons_14.png'
    }
    , downloadbluepint: {
        normal: 'images/Buttons_Ioanna/png/final-icons_03.png'
        , hover: 'images/Buttons_Ioanna/png/final-icons_09.png'
        , select: 'images/Buttons_Ioanna/png/final-icons_15.png'
    }
    , showmap: {
        normal: 'images/Buttons_Ioanna/png/final-icons_04.png'
        , hover: 'images/Buttons_Ioanna/png/final-icons_10.png'
        , select: 'images/Buttons_Ioanna/png/final-icons_16.png'
    }
    , downloadshape: {
        normal: 'images/Buttons_Ioanna/png/final-icons_05.png'
        , hover: 'images/Buttons_Ioanna/png/final-icons_11.png'
        , select: 'images/Buttons_Ioanna/png/final-icons_17.png'
    }
    , downloadgeotiff: {
        normal: 'images/Buttons_Ioanna/png/final-icons_06.png'
        , hover: 'images/Buttons_Ioanna/png/final-icons_12.png'
        , select: 'images/Buttons_Ioanna/png/final-icons_18.png'
    }
}
