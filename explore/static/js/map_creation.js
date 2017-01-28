
// Set up the map
var mymap = L.map('map_wrapper').setView([39.921685, -75.148946], 15);
var tile_url = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWVyaXNwYWhhIiwiYSI6ImNpdWp3ZTUwbDAxMHoyeXNjdDlmcG0zbDcifQ.mjQG7vHfOacyFDzMgxawzw'
L.tileLayer(tile_url).addTo(mymap);
L.control.scale().addTo(mymap);

// POPUPS
function onEachFeature(feature, layer) {
// does this feature have a property named popupContent?
console.log(feature.properties)
// console.log(layer)
    if (feature.properties.DIVISION_NUM) {
        ward = "Ward: " + feature.properties.DIVISION_NUM.slice(0, 2);
        div = "Division: " + feature.properties.SHORT_DIV_NUM

        popupContent = [ward, div].join('<br>');
        // layer.bindPopup('Geom1 % ' + feature.properties.MaxQPercent);
        layer.bindPopup(popupContent);
    };

}
// ADD THE DATA TO MAP, zoom to the bounds
features = L.geoJSON(data, {onEachFeature:onEachFeature}).addTo(mymap);
