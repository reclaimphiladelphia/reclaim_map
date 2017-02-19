
// Set up the map

mapboxgl.accessToken = 'pk.eyJ1IjoiYWVyaXNwYWhhIiwiYSI6ImNpdWp3ZTUwbDAxMHoyeXNjdDlmcG0zbDcifQ.mjQG7vHfOacyFDzMgxawzw';
var map = new mapboxgl.Map({
    style:'mapbox://styles/mapbox/dark-v9',
    center: [-75.160082, 39.953064],
    zoom: 13,
    //pitch: 20,
    //bearing: -17.6,
    container: 'map_wrapper',
});



map.on('load', function() {
  var geocoder = new MapboxGeocoder({accessToken: mapboxgl.accessToken});
  map.addControl(geocoder);

  //load the data into the map
  divisions_source = map.addSource('division-data', {'type': 'geojson', 'data': divisions});
  wards_source = map.addSource('ward-data', {'type': 'geojson','data': wards});

  map.addLayer({
    "id": "divisions",
    'type': 'fill',
    "source": "division-data",
    'paint': {
      'fill-color':'rgba(33,150,243,0.1)',
      'fill-outline-color':'rgba(33,150,243,0.9)',
      'fill-antialias':true,
    },
    'layout': {'visibility': 'visible'},
	});
  map.addLayer({
    "id": "divisions-hover",
    'type': 'fill',
    "source": "division-data",
    'paint': {
      'fill-color':'rgba(33,150,243,0.5)',
      'fill-outline-color':'rgba(33,150,243,1)',
      'fill-antialias':true,
    },
    'layout': {'visibility': 'visible'},
    'filter':["==", "DIVISION_NUM", ""],
	});
  map.addLayer({
    "id": "wards",
    'type': 'line',
    "source": "ward-data",
    'paint': {
      'line-color':'rgba(106,165,108,0.9)',
      'line-width':3,
    },
    'layout': {'visibility': 'visible'},
	});

  //Geocoder point layer
  map.addSource('single-point', {
    "type": "geojson",
    "data": {"type": "FeatureCollection","features": []}
  });
  map.addLayer({
    "id": "point",
    "source": "single-point",
    "type": "circle",
    "paint": {
      "circle-radius": 10,
      "circle-color": "#007cbf"
    }
  });

  // Listen for the `geocoder.input` event that is triggered when a user
   // makes a selection and add a symbol that matches the result.
   geocoder.on('result', function(ev) {
       map.getSource('single-point').setData(ev.result.geometry);
       console.log(ev)
      //  point = ev.result.geometry.coordinates;

      //  var features = map.queryRenderedFeatures(ev.result.geometry, { layers: ['divisions'] });
      //  console.log(features);
   });

    // When a click event occurs near a polygon, open a popup at the location of
    // the feature, with description HTML from its properties.
  map.on('click', function (e) {
    console.log(e.point)
    var features = map.queryRenderedFeatures(e.point, { layers: ['divisions'] });
    if (!features.length) {
        map.setFilter("divisions-hover", ["==", "DIVISION_NUM", ""]);
        return;
    }

    var feature = features[0];
    console.log(feature)

    if (feature.layer.id == 'divisions'){
      map.setFilter("divisions-hover", ["==", "DIVISION_NUM", feature.properties.DIVISION_NUM]);
      ward = "Ward: " + feature.properties.DIVISION_NUM.slice(0, 2);
      div = "Division: " + feature.properties.SHORT_DIV_NUM;
      var html_message = [ward, div]

      var popup = new mapboxgl.Popup()
          .setLngLat(map.unproject(e.point))
          .setHTML(html_message.join('<br>'))
          .addTo(map);
      }

    });
    // Use the same approach as above to indicate that the symbols are clickable
    // by changing the cursor style to 'pointer'
    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['divisions'] });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });

});
