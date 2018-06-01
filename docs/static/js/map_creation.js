
// check for url parameter to set the view
function UIState(){

  url = new URL(window.location.href);

  //get current map state, update url
  this.lng = url.searchParams.get('lng') || -75.15819172765856;
  this.lat = url.searchParams.get('lat') || 39.94848811327782;
  this.zoom = url.searchParams.get('z') || 13;
  this.division = url.searchParams.get('div') || '';
  // that = this;
  this.update_url = function(){

    //update map_state object
    Object.assign(map_state, map.getCenter());
    this.zoom = map.getZoom();
    url.searchParams.set('lng', Math.round(this.lng * 100000) / 100000);
    url.searchParams.set('lat', Math.round(this.lat * 100000) / 100000);
    url.searchParams.set('z', Math.round(this.zoom * 100) / 100);
    url.searchParams.set('div',map_state.division);
    window.history.pushState('page2', 'Title', url.search);
  }
}

map_state = new UIState();

mapboxgl.accessToken = 'pk.eyJ1IjoiYWVyaXNwYWhhIiwiYSI6ImNpdWp3ZTUwbDAxMHoyeXNjdDlmcG0zbDcifQ.mjQG7vHfOacyFDzMgxawzw';
var map = new mapboxgl.Map({
    style:'mapbox://styles/aerispaha/cj9lvdi8q1yvs2rn24ytindg0',
    center: [map_state.lng, map_state.lat],
    zoom: map_state.zoom,
    container: 'map_wrapper',
});

var overlay = document.getElementById('map-overlay');


map.on('load', function() {
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    country: 'us',
    bbox: [-75.280296, 39.867004, -74.955833, 40.137959],
  });
  map.addControl(geocoder);

  //load interactive layers into the map
  map.addSource('phila-ward-divisions', {
        "type": "vector",
        "url": "mapbox://aerispaha.0ava9jx8"
    });
  map.addSource('phila-wards', {
        "type": "vector",
        "url": "mapbox://aerispaha.bto5kb2v"
    });
    map.addLayer({
      "id": "wards-hover",
      'type': 'line',
      "source": "phila-wards",
      'source-layer':'wards-9rgnox',
      'paint': {
        'line-color':'rgba(106,165,108,1)',
        'line-width':3,
      },
      'filter':["==", "WARD_NUM", ""],
  	}, 'waterway-label');

  map.addLayer({
    "id": "divisions-hover",
    'type': 'fill',
    "source": "phila-ward-divisions",
    'source-layer':'divisions_cp-3bb6vb',
    'paint': {
      'fill-color':'rgba(33,150,243,0.5)',
    },
    'filter':["==", "DIVISION_NUM", map_state.division],
	}, 'waterway-label');

  map.addLayer({
    "id": "divisions-click",
    'type': 'fill',
    "source": "phila-ward-divisions",
    'source-layer':'divisions_cp-3bb6vb',
    'paint': {'fill-color':'rgba(33,150,243,0.01)'},
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
  map.on('click','divisions-click',  function (e) {

    console.log(e)
    var features = e.features;//= map.queryRenderedFeatures(e.point, { layers: ['phila-ward-divisions', 'phila-wards'] });
    if (!features.length) {
        map.setFilter("divisions-hover", ["==", "DIVISION_NUM", ""]);
        return;
    }

    for (var i = 0; i < features.length; i++) {
      feature = features[i]
      console.log(feature)

      if (feature.layer.id == 'divisions-click'){

        map.setFilter("divisions-hover", ["==", "DIVISION_NUM", feature.properties.DIVISION_NUM]);

        //update map_state and url params with active division
        map_state.division = feature.properties.DIVISION_NUM;
        map_state.update_url();

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


        // console.log(peeps);
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
        var features = map.queryRenderedFeatures(e.point, { layers: ['divisions-click'] });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });

});

map.on('moveend', function(ev) {
    //update map_state object after moving the view
    map_state.update_url();
});
