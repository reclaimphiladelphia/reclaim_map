sources = [
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
          'visibility': "visible"
        }
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
          'visibility': "visible"
        }
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
          'visibility': "visible"
        }
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
          'visibility': "visible"
        }
      }
    ]
  }
]
