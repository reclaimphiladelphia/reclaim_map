from django.shortcuts import render_to_response, render
import os
from wardexplore.settings import GEO_DATA_DIR
import geojson

# Create your views here.
def home(request):

    return render(request, 'explore/home.html', {
            'somevar':'adam',
            # 'wards':wards,
            # 'divisions':divisions,
        })
