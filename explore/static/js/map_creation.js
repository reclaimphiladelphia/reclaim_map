
// Set up the map



mapboxgl.accessToken = 'pk.eyJ1IjoiYWVyaXNwYWhhIiwiYSI6ImNpdWp3ZTUwbDAxMHoyeXNjdDlmcG0zbDcifQ.mjQG7vHfOacyFDzMgxawzw';
var map = new mapboxgl.Map({
    style:'mapbox://styles/aerispaha/cj9lvdi8q1yvs2rn24ytindg0',
    center: [-75.160082, 39.953064],
    zoom: 13,
    container: 'map_wrapper',
});

var overlay = document.getElementById('map-overlay');


map.on('load', function() {
  var geocoder = new MapboxGeocoder({accessToken: mapboxgl.accessToken});
  map.addControl(geocoder);

  //load interactive layers into the map
  map.addLayer({
    "id": "divisions-hover",
    'type': 'fill',
    "source": "composite",
    'source-layer':'divisions_cp-3bb6vb', //wards-9rgnox
    'paint': {
      'fill-color':'rgba(33,150,243,0.5)',
      'fill-outline-color':'rgba(33,150,243,1)',
      'fill-antialias':true,
    },
    'layout': {'visibility': 'visible'},
    'filter':["==", "DIVISION_NUM", ""],
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
   });

    // When a click event occurs near a polygon, open a popup at the location of
    // the feature, with description HTML from its properties.
  map.on('click','phila-ward-divisions',  function (e) {

    console.log(e)
    var features = e.features;//= map.queryRenderedFeatures(e.point, { layers: ['phila-ward-divisions', 'phila-wards'] });
    if (!features.length) {
        map.setFilter("divisions-hover", ["==", "DIVISION_NUM", ""]);
        return;
    }

    // var feature = features[0];
    // console.log(features)
    for (var i = 0; i < features.length; i++) {
      feature = features[i]
      console.log(feature)

      if (feature.layer.id == 'phila-ward-divisions'){
        map.setFilter("divisions-hover", ["==", "DIVISION_NUM", feature.properties.DIVISION_NUM]);
        ward = "Ward " + feature.properties.DIVISION_NUM.slice(0, 2);
        div = "Division " + feature.properties.SHORT_DIV_NUM;
        peeps = JSON.parse(feature.properties.committeepeople);
        peep_data = [];
        for (var i = 0; i < peeps.length; i++) {
          p = peeps[i]
          com_person_str = p['FULL NAME'];
          peep_data.push(com_person_str)
        }
        peep_data = peep_data.join('<br>')


        console.log(peeps);
        title = '<h4>' + ward + ' ' + div + '</h4>';
        var html_message = [title, 'Committee People:', peep_data];

        var popup = new mapboxgl.Popup()
            .setLngLat(map.unproject(e.point))
            .setHTML(html_message.join('<br>'))
            .addTo(map);
        }
    }



    });
    // Use the same approach as above to indicate that the symbols are clickable
    // by changing the cursor style to 'pointer'
    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['phila-ward-divisions'] });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });

});
