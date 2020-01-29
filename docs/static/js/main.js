map_state = new UIState();

mapboxgl.accessToken = 'pk.eyJ1IjoicmVjbGFpbXBoaWxseW1hcCIsImEiOiJjamloeG5ybjkwMXA1M2ttd29zZXE4Z3BjIn0.4c2s740pOCRGV2n28KEkXw';
var map = new mapboxgl.Map({
    style:'mapbox://styles/reclaimphillymap/cjj1s1d5n1rk02sprnrynnck4', //TEST MAP STYLE
    center: [map_state.lng, map_state.lat],
    zoom: map_state.zoom,
    container: 'map_wrapper',
});


map.on('load', function() {
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    country: 'us',
    bbox: [-75.280296, 39.867004, -74.955833, 40.137959],
  });
  map.addControl(geocoder);

  // LOAD LAYER PICKER
  toggleableLayerIds = [];
  loadSources(sources);
  loadPolygonLayers(polygonLayers);
  loadLayers(other_layers);

  map_state.activeLayerObject = polygonLayers.find(obj => {
    return obj.id === map_state.activeLayer
  });
  map.setFilter(map_state.activeLayer+"-highlight", ["==", map_state.activeLayerObject['filterKey'], map_state.filterVal]);
  toggleLayer(map_state.activeLayer) //set the active layer
  map_state.update_url();

  // Listen for the `geocoder.input` event that is triggered when a user
  // makes a selection and add a symbol that matches the result.
  geocoder.on('result', function(ev) {
    map.getSource('single-point').setData(ev.result.geometry);
    console.log(ev)
  });


  map.on('click', function (e) {
    // When a click event occurs near a polygon, open a popup at the location of
    // the feature, with description HTML from its properties.

		// query the features in the map at the clicked point
    var features = map.queryRenderedFeatures(e.point, { layers: toggleableLayerIds });

    //use the first feature found, calculate the config id and highlight id
    var feature = features[0];
    configid = feature.layer.id.replace('-click', '');
    highlightid = feature.layer.id.replace('-click', '-highlight');

    //grab the layer config object
    var layer = polygonLayers.find(obj => { return obj.id === configid});

    // filter the highLight layer to show only the clicked polygon, store in map state
    map.setFilter(
      highlightid,
      ["==", layer.filterKey, feature.properties[layer.filterKey]]
    );
    map_state.filterVal = feature.properties[layer.filterKey];

    popUpHTML = makePopUpHTML(feature);
    var popup = new mapboxgl.Popup()
        .setLngLat(map.unproject(e.point))
        .setHTML(popUpHTML)
        .addTo(map);

    // update URL params
    map_state.update_url();
  });

  // update URL params
  map_state.update_url();

  // Use the same approach as above to indicate that the symbols are clickable
  // by changing the cursor style to 'pointer'
  map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: toggleableLayerIds });
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });

});

map.on('moveend', function(ev) {
    //update map_state object after moving the view
    map_state.update_url();
});


$('#sidebarCollapse').on('click', function () {
    $('#layerpicker, #map_wrapper').toggleClass('active');
    $('#sidebarCollapse span').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');

});
