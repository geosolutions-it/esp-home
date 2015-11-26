/* FUNCTIONS
MapApp
*/

/*
Name:       MapApp
Goal:       Creation of the map appkication , reused from fire app, needs some refactoring (for instance base layers, ...) and documentation
Input:      some map parameters, see constructor
Output:     a map div
Caller:     preparemap
*/

MapApp = Ext.extend(Ext.util.Observable, (
function () {
    /*GENERAL*/   // private static fields (can access only to scope: minimum privileges).

    // _eManager is the internal event manager (events inside the object:AJAX)
    var _eManager = new Ext.util.Observable();
    var _SLD_Base;
    var _SLD_RuleBase;
    /*GENERAL*/   // private static functions (can access only to scope and arguments, but we can send them the scope by param)

    // AJAX request is successfully executed, the response is stored in the object, one of two possible messages is sent to the object: Fire_Report_Class_Globcover_loaded', 'Fire_Report_Class_Globcover_errorloading
    var _onmaploadok = function (caller) {
        if (caller == this)
            this.fireEvent('MapApp_loaded', this.id);
    };
    // ERROR executing AJAX request
    var _onmaploaderror = function (caller) {
        if (caller == this)
            this.fireEvent('MapApp_errorloading', "error loading");
    };

    // private main function, object (fields declared in constructor) is passed as a parameter
    // method to translate globcover data to data to be used to construct the pie charts

    var _mapevent_click = function (evt) {
        var lonLat;
        lonLat = this.map.getLonLatFromPixel(evt.xy);
        if (!lonLat) {
            return;
        }

        if (this.map.displayProjection) {
            lonLat.transform(this.map.getProjectionObject(),
                this.map.displayProjection);
        }
        this.fireEvent('MapApp_Clicked', lonLat);
    }
    var _mapevent_moveend = function (a, b, c) {
        for (var i = 0; i < this.followers.length; i++) {
            this.followers[i].map.panTo(this.map.getCenter());
        }
    };
    var _addWMSLayer = function (that, name, url, lyrname, extra) {
        var base = { layers: lyrname, format: "image/png", transparent: "true" };
        if (extra)
            base = jQuery.extend(base, extra);
        var lyr = new OpenLayers.Layer.WMS(name, url, base, { isBaseLayer: false, transitionEffect: 'resize', projection: that.map.getProjectionObject(), visibility: true, tileOptions: { maxGetUrlLength: 2048 }, ratio: 1 }); //, singleTile: true
        lyr.buffer = 0;
        lyr.wrapDateLine = true;
        lyr.setVisibility(false);
        lyr.setTileSize(new OpenLayers.Size(512, 512));
        that.map.addLayer(lyr);

    };

    var _addGoogleLayer = function (that, type) {
        var lyrgoogle;
        if (type == "terrain")
            that.map.addLayer(new OpenLayers.Layer.Google("Google Physical", { type: google.maps.MapTypeId.TERRAIN/*, numZoomLevels: 20*/ }));
        else if (type == "satellite")
            that.map.addLayer(new OpenLayers.Layer.Google("Google Satellite", { type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22, visibility: false }));

    };
    var _removeWMSLayer = function (that, name) {
        for (var i = 0; i < that.map.layers.length; i++) {
            if (name == that.map.layers[i].name) {
                that.map.removeLayer(that.map.layers[i]);
                break;
            }
        }

    };
    var _changeCQL = function (that, name, cql) {
        for (var i = 0; i < that.map.layers.length; i++) {
            if (name == that.map.layers[i].name) {
                that.map.layers[i].params.CQL_FILTER = cql;
                that.map.layers[i].redraw();
                break;
            }
        }
    }

    var _setVisible = function (that, name, v) {
        if (!name && !that.map.layers[1].name) {
            that.map.layers[1].setVisibility(v);
            return;
        }
        for (var i = 0; i < that.map.layers.length; i++) {
            if (name == that.map.layers[i].name) {
                that.map.layers[i].setVisibility(v);
                break;
            }
        }
    }

    var _setOpacity = function (that, name, o) {
        for (var i = 0; i < that.map.layers.length; i++) {
            if (name == that.map.layers[i].name) {
                that.map.layers[i].setOpacity(o);
                break;
            }
        }
    }
    var _layerUp = function (that, name) {
        for (var i = 0; i < that.map.layers.length; i++) {
            if (name == that.map.layers[i].name) {
                element = that.map.layers[i];
                /*
                that.map.layers.splice(i, 1);
                that.map.layers.splice(i - 1, 0, element);*/
                that.map.setLayerIndex(element, i + 1);
                break;
            }
        }
    }

    var _layerDown = function (that, name) {
        for (var i = 0; i < that.map.layers.length; i++) {
            if (name == that.map.layers[i].name) {
                element = that.map.layers[i];
                /*that.map.layers.splice(i, 1);
                that.map.layers.splice(i + 1, 0, element);*/
                that.map.setLayerIndex(element, i - 1);
                break;
            }
        }
    }
    var _setVisibleId = function (that, id, v) {
        that.map.layers[id].setVisibility(v);
    }

    var _isVisible = function (that, name) {

        for (var i = 0; i < that.map.layers.length; i++) {
            if (name == that.map.layers[i].name) {
                return that.map.layers[i].visibility;
                break;
            }
        }
    }
    var _updateSize = function (that) {
        that.map.updateSize();
    }
    var _fillInfographics = function (that) {
        var infographicsLayer;
        for (var i = 0; i < that.map.layers.length; i++) {
            if ("infographics" == that.map.layers[i].name) {
                infographicsLayer = that.map.layers[i];
                break;
            }
        }
        that.map.setLayerIndex(infographicsLayer, that.map.layers.length - 1);
        infographicsLayer.removeAllFeatures();
        var style = new OpenLayers.Style(
                { graphicWidth: "${width}",
                    graphicHeight: "${height}"
                },

                {
                    rules: [/*new OpenLayers.Rule({
                        //minScaleDenominator: 10000000, //full zoom -> 10000000
                        symbolizer: {
                            externalGraphic: "http://chart.apis.google.com/chart?chs=175x50&chd=t:${pctnot},${pctprot},${pctnodata}&cht=p3&chco=0165A3,FF0000,999999&chtt=++++++++++&chf=bg,s,65432100"
                        }
                    }),*/
                    new OpenLayers.Rule({
                        //maxScaleDenominator: 10000000, //10000000-> detail
                        symbolizer: {
                            //externalGraphic: "http://chart.apis.google.com/chart?chs=175x100&chd=t:${pctnot},${pctprot},${pctnodata}&cht=p3&chco=0165A3,FF0000,999999&chtt=${country}&chf=bg,s,65432100"
                            externalGraphic: "http://chart.apis.google.com/chart?chs=${width}x${height}&chd=t:${pctnot},${pctprot},${pctnodata}&cht=p3&chco=014c73,f5a27a,999999&chf=bg,s,65432100"
                            //externalGraphic: "http://chart.apis.google.com/chart?chs=${width}&chd=t:${pctnot},${pctprot},${pctnodata}&cht=p3&chco=0165A3,FF0000,999999&chf=bg,s,65432100"
                        }
                    })
                    ]
                }
               );
        var styleMap = new OpenLayers.StyleMap(style);
        var n = 25;
        var features = new Array(n);

        for (var i = 0; i < n; i++) {
            var x = (Math.random() * 2 - 1) * 90;
            var y = (Math.random() * 2 - 1) * 45;
            var d = Math.round(Math.random() * 75) + 10;
            var n1 = Math.round(Math.random() * 50);
            var n2 = Math.round(Math.random() * 50);
            var n3 = 100 - n1 - n2;
            var point = new OpenLayers.Geometry.Point(x, y);
            point.transform(that.map_displayprojection, that.map_projection);
            features[i] = new OpenLayers.Feature.Vector(point, { width: d, height: d, pctnot: n1, pctprot: n2, pctnodata: n3 });
        }

        infographicsLayer.styleMap = styleMap;
        infographicsLayer.addFeatures(features);
    }

    var _zoom2ExtentSrid = function (that, extent, srid) {
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
        var lonLatmin = new OpenLayers.LonLat(minx, miny);
        var lonLatmax = new OpenLayers.LonLat(maxx, maxy);
        /*
        Proj4js.defs["EPSG:3035"] = "+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +units=m +no_defs";
        var newp = new OpenLayers.Projection("EPSG:3035".toUpperCase());
        var p = new OpenLayers.Geometry.Point(minx,miny);
        p.transform(newp, that.map.getProjectionObject());

        http://spatialreference.org/ref/epsg/3130/proj4js/
        http://spatialreference.org/ref/epsg/3130/proj4/
        */
        lonLatmin.transform(new OpenLayers.Projection(srid.toUpperCase()), that.map.getProjectionObject());
        lonLatmax.transform(new OpenLayers.Projection(srid.toUpperCase()), that.map.getProjectionObject());
        //that.map.zoomToExtent(new OpenLayers.Bounds(minx, miny, maxx, maxy));
        //that.map.zoomToExtent(new OpenLayers.Bounds(lonLatmin.lon, lonLatmax.lat, lonLatmax.lon, lonLatmin.lat));
        that.map.zoomToExtent(new OpenLayers.Bounds(
            (lonLatmin.lon < lonLatmax.lon) ? lonLatmin.lon : lonLatmax.lon,
            (lonLatmin.lat < lonLatmax.lat) ? lonLatmin.lat : lonLatmax.lat,
            (lonLatmin.lon > lonLatmax.lon) ? lonLatmin.lon : lonLatmax.lon,
            (lonLatmin.lat > lonLatmax.lat) ? lonLatmin.lat : lonLatmax.lat
          ), false);
        //that.map.zoomToExtent(that.map.getExtent());
    };
    var _zoomTo = function (that, l) {
        that.map.zoomTo(l);
    };
    var _zoom2Extent = function (that, extent) {
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
        var lonLatmin = new OpenLayers.LonLat(minx, miny);
        var lonLatmax = new OpenLayers.LonLat(maxx, maxy);

        lonLatmin.transform(that.map.displayProjection, that.map.getProjectionObject());
        lonLatmax.transform(that.map.displayProjection, that.map.getProjectionObject());
        //that.map.zoomToExtent(new OpenLayers.Bounds(minx, miny, maxx, maxy));
        //that.map.zoomToExtent(new OpenLayers.Bounds(lonLatmin.lon, lonLatmax.lat, lonLatmax.lon, lonLatmin.lat));
        that.map.zoomToExtent(new OpenLayers.Bounds(
            (lonLatmin.lon < lonLatmax.lon) ? lonLatmin.lon : lonLatmax.lon,
            (lonLatmin.lat < lonLatmax.lat) ? lonLatmin.lat : lonLatmax.lat,
            (lonLatmin.lon > lonLatmax.lon) ? lonLatmin.lon : lonLatmax.lon,
            (lonLatmin.lat > lonLatmax.lat) ? lonLatmin.lat : lonLatmax.lat
          ), false);
        //that.map.zoomToExtent(that.map.getExtent());
    };

    var _createRandomColorScheme = function (n) {
        var s = [];
        for (var i = 0; i < n; i++) {
            s[i] = '#' + Math.floor(Math.random() * 16777215).toString(16);
        }
        return s;
    }
    var _createPolygonSLDold = function (that, layername, propertyname, propervalues, propervaluesname, colorscheme, opacity, strokecolor, strokewidth) {
        var sld = "";
        var sldrule;
        var sldrules = "";
        var cScheme = _createRandomColorScheme(propervalues.length)
        for (var i = 0; i < propervalues.length; i++) {
            sldrule = "";
            sldrule = _SLD_RuleBase.replace("$PROPERTYNAME$", propertyname).replace("$PROPERTYLITERAL$", propervalues[i][propervaluesname]);
            sldrule = sldrule.replace("$FILLCOLOR$", cScheme[i]);
            sldrule = sldrule.replace("$FILLOPACITY$", opacity);
            sldrule = sldrule.replace("$STROKECOLOR$", strokecolor);
            sldrule = sldrule.replace("$STROKEWIDTH$", strokewidth);
            sldrules += sldrule;
            //if (i > 0) break;
        }
        sld = _SLD_Base.replace("$LAYERNAME$", layername).replace("$RULES$", sldrules);
        return sld;
    };
    var _createPolygonSLD = function (that, layername, propertyname, propervalues, properclrs, opacity, strokecolor, strokewidth) {
        var sld = "";
        var sldrule;
        var sldrules = "";
        var cScheme = _createRandomColorScheme(propervalues.length)
        for (var i = 0; i < propervalues.length; i++) {
            sldrule = "";
            //sldrule = _SLD_RuleBase.replace("$PROPERTYNAME$", propertyname).replace("$PROPERTYLITERAL$", propervalues[i][propervaluesname]);
            sldrule = _SLD_RuleBase.replace("$PROPERTYNAME$", propertyname).replace("$PROPERTYLITERAL$", propervalues[i]);
            sldrule = sldrule.replace("$FILLCOLOR$", properclrs[i]);
            sldrule = (properclrs[i] == "#ffffff") ? sldrule.replace("$FILLOPACITY$", 0) : sldrule.replace("$FILLOPACITY$", opacity);
            sldrule = sldrule.replace("$STROKECOLOR$", strokecolor);
            sldrule = sldrule.replace("$STROKEWIDTH$", strokewidth);
            sldrules += sldrule;
            //if (i > 0) break;
        }
        sld = _SLD_Base.replace("$LAYERNAME$", layername).replace("$RULES$", sldrules);
        return sld;
    };
    return {
        constructor: function (config) {
            // privileged private/public members (can access to anything privated and public)
            //private
            //            var a=0;
            //public : these fields are presented to the client, can be changed by the client, or can be initialised during object creation
            //this.map_projection = config.map_projection || new OpenLayers.Projection("EPSG:900913".toUpperCase());
            this.map_projection = config.map_projection || new OpenLayers.Projection("EPSG:4326".toUpperCase());
            this.map_displayprojection = config.map_displayprojection || new OpenLayers.Projection("EPSG:4326".toUpperCase());
            this.navigation = config.navigation || null;

            this.bounds_extent = config.bounds_extent || new OpenLayers.Bounds.fromArray([-20037508.34, -20037508.34, 20037508.34, 20037508.34]);
            /*this.bounds_extent = config.bounds_extent || new OpenLayers.Bounds.fromArray([-180, -90, 180, 90]);
            //this.units = config.units || "m";
            this.units = config.units || "degree";
            */
            this.controls = [];
            this.followers = [];


            //this.maxResolution = config.maxResolution || 19567.8792;
            this.maxResolution = config.maxResolution || 39135.7584;


            /*this.maxResolution = config.maxResolution || 0.175781250;
            //this.minResolution = config.maxResolution || 40075216.6016;
            this.minResolution = config.minResolution || 2280;
            */
            this.mapdiv = config.mapdiv || "map";
            this.map = new OpenLayers.Map(this.mapdiv, {
                allOverlays: true
                , projection: this.map_projection
		            , displayProjection: this.map_displayprojection
		            , units: this.units
		            , maxResolution: this.maxResolution

		            , maxExtent: this.bounds_extent
                    , controls: this.controls
			        , div: this.mapdiv
                //, fractionalZoom:true
            });
            var loadingpanel = new OpenLayers.Control.LoadingPanel();
            this.map.addControl(loadingpanel);
            /*
            var noBaseLayer = new OpenLayers.Layer.Vector("noBaseLayer", { isBaseLayer: true });
            this.map.addLayers([noBaseLayer]);
            */

            //this.map.addLayers([new OpenLayers.Layer.Vector("infographics")]);
            /*
            var lyrgoogleterrain = new OpenLayers.Layer.Google("Google Physical", { type: google.maps.MapTypeId.TERRAIN/ });
            var lyrgooglesatellite = new OpenLayers.Layer.Google("Google Satellite", { type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22, visibility: false });
            this.map.addLayers([lyrgoogleterrain, lyrgooglesatellite]);
            */
            /*
            var options = {
            autoPan: true,
            size: new OpenLayers.Size(300, 200),
            layers: [lyrgoogleterrain.clone()],
            mapOptions: {
            allOverlays: true
            }
            };
            */
            //var ov = new OpenLayers.Control.OverviewMap();

            //this.map.addControl(ov);



            /*
            this.map.zoomToExtent(this.bounds_extent, true);
            this.map.zoomTo(0);
            */
            this.map.zoomTo(3);
            ctrlNavigation = new OpenLayers.Control.Navigation({ dragPanOptions: { enableKinetic: true}/*, mouseWheelOptions: { interval: 50}*/ })
            if (this.navigation) {
                this.map.addControl(ctrlNavigation);
                this.map.addControl(new OpenLayers.Control.PanZoomBar({ zoomWorldIcon: true }));
            }
            if (config.showscalebar) {
                var scalebar = new OpenLayers.Control.ScaleLine({
                    geodesic: true, bottomInUnits: '', bottomOutUnits: '', maxWidth: 250
                });

                this.map.addControl(scalebar);
            }
            this.map.events.register('moveend', this, _mapevent_moveend);
            this.map.events.register('click', this, _mapevent_click);
            //this.ajaxresponse = config.ajaxresponse || { ajaxresult: null, ajaxrequest: null };

            /**/

            /**/

            //actions in constructor
            _eManager.on('maloadok', _onmaploadok, this);
            _eManager.on('maploaderror', _onmaploaderror, this);
            this.addEvents({ 'MapApp_loaded': true, 'MapApp_errorloading': true, 'MapApp_clicked': true });
            this.listeners = config.listeners;
            MapApp.superclass.constructor.call(this, config);
            //_doSomething(this);
            _SLD_Base = '';
            _SLD_Base += '<StyledLayerDescriptor version="1.0.0">';
            _SLD_Base += '<NamedLayer>';
            _SLD_Base += '<Name>$LAYERNAME$</Name>';
            _SLD_Base += '<UserStyle>';
            _SLD_Base += '<FeatureTypeStyle>';
            _SLD_Base += '$RULES$';
            _SLD_Base += '</FeatureTypeStyle>';
            _SLD_Base += '</UserStyle>';
            _SLD_Base += '</NamedLayer>';
            _SLD_Base += '</StyledLayerDescriptor>';
            _SLD_RuleBase = '';
            _SLD_RuleBase += '<Rule>';
            _SLD_RuleBase += '<Filter>';
            _SLD_RuleBase += '<PropertyIsEqualTo>';
            _SLD_RuleBase += '<PropertyName>$PROPERTYNAME$</PropertyName>';
            _SLD_RuleBase += '<Literal>$PROPERTYLITERAL$</Literal>';
            _SLD_RuleBase += '</PropertyIsEqualTo>';
            _SLD_RuleBase += '</Filter>';
            _SLD_RuleBase += '<PolygonSymbolizer>';
            _SLD_RuleBase += '<Fill>';
            _SLD_RuleBase += '<CssParameter name="fill">$FILLCOLOR$</CssParameter>';
            _SLD_RuleBase += '<CssParameter name="fill-opacity">$FILLOPACITY$</CssParameter>';
            _SLD_RuleBase += '</Fill>';
            _SLD_RuleBase += '<Stroke>';
            _SLD_RuleBase += '<CssParameter name="stroke">$STROKECOLOR$</CssParameter>';
            _SLD_RuleBase += '<CssParameter name="stroke-width">$STROKEWIDTH$</CssParameter>';
            _SLD_RuleBase += '</Stroke>';
            _SLD_RuleBase += '</PolygonSymbolizer>';
            _SLD_RuleBase += '</Rule>';

        },
        // public members (can access to public and private static, but not to the members defined in the constructor)
        doSomething: function () {
            _doSomething(this);
        },
        addFollower: function (m) {
            this.followers[this.followers.length] = m;
        },
        zoom2Extent: function (extent) {
            _zoom2Extent(this, extent);
        },
        zoomTo: function (l) {
            _zoomTo(this, l);
        },
        zoom2ExtentSrid: function (extent, srid) {
            _zoom2ExtentSrid(this, extent, srid);
        },
        addWMSLayer: function (name, url, lyrname, extra) {
            _addWMSLayer(this, name, url, lyrname, extra);
        },
        addGoogleLayer: function (type) {
            _addGoogleLayer(this, type);
        },
        removeWMSLayer: function (name) {
            _removeWMSLayer(this, name);
        },
        createPolygonSLD: function (layername, propertyname, propervalues, properclrs, opacity, strokecolor, strokewidth) {
            return _createPolygonSLD(this, layername, propertyname, propervalues, properclrs, opacity, strokecolor, strokewidth);
        },
        changeCQL: function (name, cql) {
            _changeCQL(this, name, cql);
        },
        setVisible: function (name, v) {
            _setVisible(this, name, v);
        },
        setVisibleId: function (id, v) {
            _setVisibleId(this, id, v);
        },
        isVisible: function (name) {
            return _isVisible(this, name);
        },
        updateSize: function () {
            _updateSize(this);
        },
        fillInfographics: function () {
            return _fillInfographics(this);
        },
        setOpacity: function (name, o) {
            _setOpacity(this, name, o);
        },
        layerUp: function (name) {
            _layerUp(this, name);
        },
        layerDown: function (name) {
            _layerDown(this, name);
        }
    };
}
  ()));


