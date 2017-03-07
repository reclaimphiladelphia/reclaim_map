from django.shortcuts import render_to_response, render
import os
from wardexplore.settings import GEO_DATA_DIR
import geojson

# Create your views here.
def home(request):

    divisions_path = os.path.join(GEO_DATA_DIR, 'divisions_cp.geojson') #r'F:\code\wards\explore\static\geo\divisions.geojson'
    wards_path = os.path.join(GEO_DATA_DIR, 'wards.geojson')

    with open(divisions_path, 'r') as f:
        divisions = geojson.loads(f.read())

    with open(wards_path, 'r') as f:
        wards = geojson.loads(f.read())


    return render(request, 'explore/home.html', {
            'somevar':'adam',
            'wards':wards,
            'divisions':divisions,
        })
