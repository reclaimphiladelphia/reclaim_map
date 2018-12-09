polygonLayers = [
  {
    "id": "divisions",
    'name':"Divisions",
    "is_toggleable":true,
    "source": "phila-ward-divisions",
    'source-layer':'divisions_cp_2018-28546a',
    'color': 'rgba(33,150,243,0.5)',
    'layout': {
      'visibility': "visible"
    },
    'filterKey': "DIVISION_NUM",
  },
  {
    "id": "phila-wards",
    'name':"Wards",
    "source": "phila-wards",
    'source-layer':'wards-0s9tle',
    'color': 'hsla(122, 25%, 53%, 0.9)',
    'layout': {
      'visibility': "visible"
    },
    "is_toggleable":true,
    'filterKey': 'OBJECTID',
  },
  {
    "id": "us-congress-layer",
    'name': 'U.S. Congress',
    "source": "us-congress",
    'color':'rgba(106,88,176,0.8)',
    'layout': {
      'visibility': "none"
    },
    "is_toggleable":true,
    'filterKey': 'name',
  },
  {
    "id": "phila-council-boundaries",
    "name": 'City Council',
    "source": "phila-council",
    "color": "rgba(33,88,176,0.7)",
    'layout': {
      'visibility': "none"
    },
    "is_toggleable":true,
    'filterKey': 'name',
  },
  {
    "id": "pa-legislative-boundaries",
    'name': 'PA Legislative',
    "source": "pa-legislative",
    'color':'rgba(200,120,20,0.7)',
    'layout': {
      'visibility': "none"
    },
    "is_toggleable":true,
    'filterKey':'name',
  },
  {
    "id": "pa-senate-boundaries",
    'name': 'PA Senate',
    "source": "pa-senate",
    'color':'rgba(87,200,20,0.7)',
    'layout': {
      'visibility': "none"
    },
    "is_toggleable":true,
    'filterKey':'name',
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

sources_01 = [
  {
    "id":"phila-ward-divisions",
    "name":"Divisions",
    "data":{
      "type": "vector",
      "url": "mapbox://reclaimphillymap.dfdk5mxk"
    },
  },
  {
    "id":"phila-wards",
    "name":"Philly Wards",
    "data":{
      "type": "vector",
      "url": "mapbox://reclaimphillymap.6b3b121k",
    }
  },
  {
    "id":"us-congress",
    "name":"US Congress",
    "data":{
      'type':"geojson",
      "data":"https://raw.githubusercontent.com/reclaimphiladelphia/reclaim_map/master/data/spatial/us-congress-2018.geojson",
    }
  },
  {
    "id": "phila-council",
    "name": "Phila City Council",
    "data":{
      "type": "geojson",
      "data": "https://raw.githubusercontent.com/reclaimphiladelphia/reclaim_map/master/data/spatial/philly-city-council-2018.geojson"
    }
  },
  {
    "id": "pa-legislative",
    "name":"PA Legislative",
    "data":{
      "type": "geojson",
      "data": "https://raw.githubusercontent.com/reclaimphiladelphia/reclaim_map/master/data/spatial/pa-legis-2018.geojson"
    }
  },
  {
    "id": "pa-senate",
    "name":"PA Senate",
    "data":{
      "type": "geojson",
      "data": "https://raw.githubusercontent.com/reclaimphiladelphia/reclaim_map/master/data/spatial/pa-senate-2018.geojson"
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
sources = [
  {
    "id":"phila-ward-divisions",
    "name":"Divisions",
    "data":{
      "type": "vector",
      "url": "mapbox://reclaimphillymap.dfdk5mxk"
    },
    "layers":[
      {
        "id": "divisions-hover",
        'type': 'fill',
        "source": "phila-ward-divisions",
        'source-layer':'divisions_cp_2018-28546a',
        'paint': {
          'fill-color':'rgba(33,150,243,0.5)',
        },
        'layout': {
          'visibility': "visible"
        },
        'filter':["==", "DIVISION_NUM", ''],
    	},
      {
        "id": "divisions-click",
        'type': 'fill',
        "source": "phila-ward-divisions",
        'source-layer':'divisions_cp_2018-28546a',
        'paint': {'fill-color':'transparent'},
        'layout': {
          'visibility': "visible"
        }
    	},
      {
        "id": "phila-ward-divisions-boundary",
        'type': 'line',
        "source": "phila-ward-divisions",
        'source-layer':'divisions_cp_2018-28546a',
        'paint': {'line-color':'hsla(208, 88%, 57%, 0.3)'},
        'layout': {
          'visibility': "visible"
        },
        "is_toggleable":true,
    	},

    ]
  },
  {
    "id":"phila-wards",
    "name":"Philly Wards",
    "data":{
      "type": "vector",
      "url": "mapbox://reclaimphillymap.6b3b121k",
    },
    "layers":[
      {
        "id": "phila-wards-layer",
        "type": "line",
        "source": "phila-wards",
        'source-layer':'wards-0s9tle',
        'paint': {
          'line-color':"hsla(122, 25%, 53%, 0.9)",
          'line-width':{
              "base": 1.5,
              "stops": [
                [12, 1.35],
                [18, 5]
              ]
            }
        },
        'layout': {
          'visibility': "visible"
        },
        "is_toggleable":true,
      }
    ]
  },
  {
    "id":"us-congress",
    "name":"US Congress",
    "data":{
      'type':"geojson",
      "data":"https://raw.githubusercontent.com/reclaimphiladelphia/reclaim_map/master/data/spatial/us-congress-2018.geojson",
    },
    "layers":[
      {
        "id": "us-congress-layer",
        "type": "line",
        "source": "us-congress",
        'paint': {
          'line-color':'rgba(106,88,176,1)',
        },
        'layout': {
          'visibility': "none"
        },
        "is_toggleable":true,
      }
    ]
  },
  {
    "id": "phila-council",
    "name": "Phila City Council",
    "data":{
      "type": "geojson",
      "data": "https://raw.githubusercontent.com/reclaimphiladelphia/reclaim_map/master/data/spatial/philly-city-council-2018.geojson"
    },
    "layers": [
      {
        "id": "phila-council-boundaries",
        "type": "line",
        "source": "phila-council",
        "paint": {
          "line-color": "rgba(33,88,176,1)",
          "line-width": 1,
        },
        'layout': {
          'visibility': "none"
        },
        "is_toggleable":true,
      }
    ]
  },
  {
    "id": "pa-legislative",
    "name":"PA Legislative",
    "data":{
      "type": "geojson",
      "data": "https://raw.githubusercontent.com/reclaimphiladelphia/reclaim_map/master/data/spatial/pa-legis-2018.geojson"
    },
    "layers": [
      {
        "id": "pa-legislative-boundaries",
        "type": "line",
        "source": "pa-legislative",
        "paint": {
          'line-color':'rgba(200,120,20,0.8)',
          'line-width':3,
        },
        'layout': {
          'visibility': "none"
        },
        "is_toggleable":true,
      }
    ]
  },
  {
    "id": "pa-senate",
    "name":"PA Senate",
    "data":{
      "type": "geojson",
      "data": "https://raw.githubusercontent.com/reclaimphiladelphia/reclaim_map/master/data/spatial/pa-senate-2018.geojson"
    },
    "layers": [
      {
        "id": "pa-senate-boundaries",
        "type": "line",
        "source": "pa-senate",
        "paint": {
          'line-color':'rgba(87,200,20,0.8)',
          'line-width':3,
        },
        'layout': {
          'visibility': "none"
        },
        "is_toggleable":true,
      }
    ]
  },
  {
    "id": "single-point",
    "name":"Singlepoint",

    "data":{
      "type": "geojson",
      "data": {"type": "FeatureCollection","features": []}
    },
    "layers": [
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
  }
]
