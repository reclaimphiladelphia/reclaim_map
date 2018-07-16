sources = [
  {
    "id":"committee-people",
    "name":"Committee People",
    "data":{
      'type':"geojson",
      "data":"https://gist.githubusercontent.com/natlownes/8093ceccc47d6bfbaaa4ca289b29398f/raw/b2d7d74e4a2db983bab9653a2faf0769c1935a8a/committee-people.geojson",
      "cluster":true,
    },
    "layers":[
      {
        "id": "committee-people-layer",
        'type': 'circle',
        "source": "committee-people",
        'paint': {
          'circle-color':'rgba(106,255,108,1)',
        },
        'layout': {
          'visibility': "visible"
        }
      }
    ]
  },
  {
    "id": "phila-divisions",
    "name": "Philadelphia Divisions",
    "data":{
      "type": "vector",
      "url": "mapbox://reclaimphillymap.dfdk5mxk"
    },
    "layers": [
      {
        "id": "phila-division-outlines",
        "type": "line",
        "source": "phila-divisions",
        "source-layer": "divisions_cp_2018-28546a",
        "paint": {
          "line-color": "#389AEF",
          "line-width": 1,
        },
        'layout': {
          'visibility': "visible"
        }
      }
    ]
  },
  {
    "id": "cso_boundary",
    "name":"CSO Boundary",
    "data":{
      "type": "geojson",
      "data": "https://gist.githubusercontent.com/aerispaha/0deffe0b2dfb9af0620cf99f6f232bd6/raw/c374f98674cb2d3615fa321d54070b50d31da6c6/philadelphia_cso_areas.geojson"
    },
    "layers": [
      {
        "id": "phila-cso-boundaries",
        "type": "line",
        "source": "cso_boundary",
        "paint": {
          'line-color':'rgba(200,120,20,0.8)',
          'line-width':3,
        },
        'layout': {
          'visibility': "visible"
        }
      }
    ]
  }
]
