/*
Name:       preparemap
Goal:       prepare the map and the overview map, sld for regions, etc, for the maps, uses MapApp.js
Input:      none
Output:     maps are ready
Caller:     prepareGetData
*/

function preparemap() {
    var regions = new Array(regionTables.regions.length);
    var values = new Array(regionTables.regions.length);
    var max = 0;
    for (var i = 0; i < regionTables.regions.length; i++) {
        regions[i] = regionTables.regions[i].id;
        values[i] = (regionTables.regions[i].n != "null") ? parseInt(regionTables.regions[i].n) : 0;
        max = (values[i] > max) ? values[i] : max;
    }
    for (var i = 0; i < values.length; i++) {
        values[i] = (values[i] == 0) ? 255 : (100 - Math.round(values[i] / max * 100));
        var hex = values[i].toString(16);
        if (hex.length == 1) hex = "0" + hex;
        values[i] = "#" + hex + hex + hex;
    }

    espMap = new MapApp({

        mapdiv: "div_content_map"
            , esriBasemapIndex: -1
            , navigation: true
            , showscalebar: true
            , map_projection: new OpenLayers.Projection("EPSG:900913".toUpperCase())
            , listeners: {
                MapApp_Clicked: function (lonlat) {
                    identify(lonlat);
                }
            }
    });

    

    espMap.addGoogleLayer("terrain");
    espMap.addGoogleLayer("satellite");
    //espMap.addWMSLayer("GLOBCOVER2009", 'http://lrm-maps.jrc.ec.europa.eu/geoserver/lrm/wms?', 'lrm:GLOBCOVER2009');
    //espMap.addWMSLayer("Global_Accessibility_Map", 'http://lrm-maps.jrc.ec.europa.eu/geoserver/lrm/wms?', 'lrm:Global_Accessibility_Map');
    //espMap.addWMSLayer("GLOBCOVER2005", 'http://lrm-maps.jrc.ec.europa.eu/geoserver/lrm/wms?', 'lrm:GLOBCOVER2005');
    espMap.addWMSLayer("bathymetry", 'http://h05-dev-vm3.jrc.it:8080/geoserver/lrm/ows?', 'bathymetry_amis');
    espMap.addWMSLayer("glc2000_v1_gdal_1", 'http://lrm-maps.jrc.ec.europa.eu/geoserver/lrm/wms?', 'lrm:glc2000_v1_gdal_1');
    espMap.addWMSLayer("basic", 'http://vmap0.tiles.osgeo.org/wms/vmap0?', 'basic');
    espMap.addWMSLayer("WDPA", 'http://lrm-maps.jrc.ec.europa.eu/geoserver/lrm/wms?', 'lrm:wdpa_latest');
    //espMap.setVisible("bathymetry", true);
    espMap.zoomTo(3);
    ovMap = new MapApp({
        mapdiv: "div_overview_map"
            , esriBasemapIndex: -1
            , navigation: false
            , showscalebar: false
            , map_projection: new OpenLayers.Projection("EPSG:900913".toUpperCase())
        //, maxResolution: 313086.0672
            , maxResolution: 156543.0336
            , listeners: {
                MapApp_Clicked: function (lonlat) {
                    espMap.map.panTo(lonlat.transform(espMap.map.displayProjection, espMap.map.getProjectionObject()));
                    //alert();
                }
            }
        });
        ovMap.addGoogleLayer("terrain");
        ovMap.zoomTo(1);
    espMap.addFollower(ovMap);

    if (isdevelopping) {
        espMap.addWMSLayer(ogclinks.region.name, ogclinks.region.urlwms, ogclinks.region.layername);
    } else {
        var sld = espMap.createPolygonSLD(ogclinks.region.layername, ogclinks.region.sldfield, regions, values, 0.5, "#000000", 1);
        espMap.addWMSLayer(ogclinks.region.name, ogclinks.region.urlwms, ogclinks.region.layername, { sld_body: sld });
    }
    //espMap.setVisible(ogclinks.region.name, true);

}
