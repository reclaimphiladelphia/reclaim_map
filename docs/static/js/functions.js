function UIState(){
  // check for url parameter to set the view

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


function toggleLayer(layerId) {
  // toggle a layer on/off

  console.log(layerId);
  var layer = polygonLayers.find(obj => {
    return obj.id === layerId
  });
  function toggleSingleLayer (id){
    // Get the current visibility
    var visibility = map.getLayoutProperty(id, 'visibility');
    if (visibility == 'none') {
      // If it's currently visible, let's set it to none
      map.setLayoutProperty(id, 'visibility', 'visible');
    } else if (visibility == 'visible') {
      // If it's currently not visible, let's set it to visible
      map.setLayoutProperty(id, 'visibility', 'none');
    }
  };

  if (layer.hasOwnProperty('layerComponents')) {
    layer.layerComponents.forEach(component => {
      toggleSingleLayer(component.id);
    });
  }
  else {
    toggleSingleLayer(layerId);
  }
}


function addToLayerPicker(layer, name) {
  var html = `<button onclick="toggleLayer('${layer.id}')">${name}</button>`;
  var el = document.getElementById('layerpicker');
  el.innerHTML += html;
}


function loadSources(sources) {
  // Add source to the map
  sources.forEach(source => {
    map.addSource(source.id, source.data);
  })
}


function createClickablePolygonLayer(layerConfig){

  // create a layer of a certain type given a generalized config object
  layerConfig['paint'] = new Object();
  // create click object
  click_layer = JSON.parse(JSON.stringify(layerConfig));
  click_layer['id'] = click_layer['id'] + '-click';
  click_layer['type'] = 'fill';
  click_layer['paint'] = {'fill-color': 'transparent'}
  click_layer['highlight_id'] =  layerConfig['id'] + '-highlight';
  toggleableLayerIds.push(click_layer.id); // NOTE this declared outside this func!!!

  // create highlight object
  hightlight_layer = JSON.parse(JSON.stringify(layerConfig));
  hightlight_layer['id'] = hightlight_layer['id'] + '-highlight';
  hightlight_layer['type'] = 'fill';
  hightlight_layer['paint']['fill-color'] = hightlight_layer['color']
  hightlight_layer['filter'] = ["==", hightlight_layer['filterKey'], ''],

  // create outline layer
  outline_layer = JSON.parse(JSON.stringify(layerConfig));
  outline_layer['id'] = outline_layer['id'] + '-outline'
  outline_layer['type'] = 'line';
  outline_layer['paint']['line-color'] = outline_layer['color'];

  layerConfig['layerComponents'] = [
    click_layer,
    hightlight_layer,
    outline_layer
  ];

  return layerConfig;
}

function loadPolygonLayers(layers) {
  layers.forEach(layerConfig => {
    // Add 3 layer components of each highlightable layer to the map: click, highlight, outline
    polygonObj = createClickablePolygonLayer(layerConfig);
    // Add each of layers to the map
    polygonObj.layerComponents.forEach(layer => {
      map.addLayer(layer);
    });

    // Add layer to state, which we will use as the source of truth
    // about our layers. Any time information about the layers changes,
    // that should be reflected on the state.
    if (layerConfig.hasOwnProperty('is_toggleable')){
      if (layerConfig.is_toggleable){
        addToLayerPicker(layerConfig, layerConfig.name);
      }
    }
  })
}
function loadLayers(layers) {
  layers.forEach(layerConfig => {
    // Add each of layers to the map
    map.addLayer(layerConfig);

    // control whether the layer should be toggleable in the side bar
    if (layerConfig.hasOwnProperty('is_toggleable')){
      if (layerConfig.is_toggleable){
        addToLayerPicker(layerConfig, layerConfig.name);
      }
    }
  })
}
