sources = [
  {
    "id":"phila-ward-divisions",
    "name":"Divisions",
    "data":{
      "type": "geojson",
      "data": "https://raw.githubusercontent.com/aerispaha/reclaim_map/dev/data/spatial/20190401/divisions-officials.geojson"
    },
  },
  {
    "id":"phila-wards",
    "name":"Philly Wards",
    "data":{
      "type": "geojson",
      "data": "https://raw.githubusercontent.com/aerispaha/reclaim_map/dev/data/spatial/20190401/wards-officials.geojson"
    }
  },
  {
    "id":"us-congress",
    "name":"US Congress",
    "data":{
      'type':"geojson",
      "data":"https://raw.githubusercontent.com/aerispaha/reclaim_map/dev/data/spatial/20190401/pa-us-congress-officials-2019.geojson",
    }
  },
  {
    "id": "phila-council",
    "name": "Phila City Council",
    "data":{
      "type": "geojson",
      "data": "https://raw.githubusercontent.com/reclaimphiladelphia/reclaim_map/master/data/spatial/20210912/philly-council-officials.geojson"
    }
  },
  {
    "id": "pa-legislative",
    "name":"PA Legislative",
    "data":{
      "type": "geojson",
      "data": "https://raw.githubusercontent.com/reclaimphiladelphia/reclaim_map/master/data/spatial/20210912/pa-legis-officials.geojson"
    }
  },
  {
    "id": "pa-senate",
    "name":"PA Senate",
    "data":{
      "type": "geojson",
      "data": "https://raw.githubusercontent.com/reclaimphiladelphia/reclaim_map/master/data/spatial/20210912/pa-senate-officials.geojson"
    }
  },
  {
    "id": "single-point",
    "name":"Singlepoint",
    "data":{
      "type": "geojson",
      "data": {"type": "FeatureCollection","features": []}
    }
  }
];

polygonLayers = [
  {
    "id": "divisions",
    'name':"Divisions",
    "is_toggleable":true,
    "source": "phila-ward-divisions",
    // 'source-layer':'divisions_cp_2018-28546a',
    'color': 'hsla(122, 25%, 53%, 0.9)',
    'layout': {
      'visibility': "none"
    },
    'filterKey': "district_num",
  },
  {
    "id": "phila-wards",
    'name':"Wards",
    "source": "phila-wards",
    // 'source-layer':'wards-0s9tle',
    'color': 'hsla(122, 25%, 53%, 0.9)',
    'layout': {
      'visibility': "none"
    },
    "is_toggleable":true,
    'filterKey': 'district_num',
  },
  {
    "id": "us-congress-layer",
    'name': 'U.S. Congress',
    "source": "us-congress",
    'color': 'hsla(122, 25%, 53%, 0.9)',
    'layout': {
      'visibility': "none"
    },
    "is_toggleable":true,
    'filterKey': 'district_num',
  },
  {
    "id": "phila-council-boundaries",
    "name": 'City Council',
    "source": "phila-council",
    'color': 'hsla(122, 25%, 53%, 0.9)',
    'layout': {
      'visibility': "none"
    },
    "is_toggleable":true,
    'filterKey': 'district_num',
  },
  {
    "id": "pa-legislative-boundaries",
    'name': 'PA Legislative',
    "source": "pa-legislative",
    'color': 'hsla(122, 25%, 53%, 0.9)',
    'layout': {
      'visibility': "none"
    },
    "is_toggleable":true,
    'filterKey':'district_num',
  },
  {
    "id": "pa-senate-boundaries",
    'name': 'PA Senate',
    "source": "pa-senate",
    'color': 'hsla(122, 25%, 53%, 0.9)',
    'layout': {
      'visibility': "none"
    },
    "is_toggleable":true,
    'filterKey':'district_num',
  }
];

other_layers = [
  {
    "id": "point",
    "source": "single-point",
    "type": "circle",
    "paint": {
      "circle-radius": 10,
      "circle-color": "#007cbf"
    },
    'layout': {
      'visibility': "visible"
    },
    "is_toggleable":false,
  }
]
