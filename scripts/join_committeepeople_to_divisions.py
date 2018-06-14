'''
Join Committe-people in a CSV to their political divisions in a geojson file.

Committee-person data is organized like so:
    PRECINCT,WARD,DIVISION,FULL NAME,ADDRESS,ZIP
    01-01,01,01,MICHAEL MAZZUCCA,1026 CROSS ST,19147
    01-01,01,01,LINDA SAMACICIA,1031 CROSS ST,19147
    01-02,01,02,CHRISTOPHER BALDINO,1005 FERNON ST,19148

Running from cmd
$ python scripts\join_committeepeople_to_divisions.py data\phl-dem-cp-2014.csv
    data\spatial\divisions.geojson data\spatial\divisions_cp.geojson
'''

import pandas as pd
import geojson, json
import sys, os

ROOT = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
DATA = os.path.join(ROOT, 'data')
print(DATA)

def join_committeepeople_to_divisions(cp_pth=None, div_pth=None, out_pth=None):

    # cp_pth =  os.path.join(DATA, 'phl-dem-cp-2014.csv') if cp_pth is None else cp_pth
    # div_pth = os.path.join(DATA, 'spatial', 'divisions.geojson') if div_pth is None else div_pth
    # out_pth = os.path.join(DATA, 'spatial', 'divisions_cp.geojson') if out_pth is None else out_pth
    print (cp_pth, div_pth, out_pth)

    #set_index to organize by ward and division
    commpeeps = pd.read_csv(cp_pth)
    df = commpeeps.set_index(['WARD', 'DIVISION'])
    df = df.fillna('')

    #open the divisions geojson data (downloaded from opendataphilly)
    with open(div_pth, 'r') as f:
        divisions = geojson.loads(f.read())

    #iterate through the geojson data and write the committeeperson info
    for i, d in enumerate(divisions['features']):

        #open up the feature's properties
        properties = d['properties']

        #parse the ward and div, convert to integer
        ward =  int(properties['DIVISION_NUM'][:2])
        div = int(properties['DIVISION_NUM'][2:])

        try:
            #look up in dataframe
            peep_data = df.ix[ward, div]
            peep_list = peep_data.to_json(orient='records')

            #update the geojson properties
            properties.update({'committeepeople':json.loads(peep_list)})

        except:
            print('insufficient data: ward {} div {} ({})'.format(ward, div, i))
            properties.update({'committeepeople':[]})


    #write data to file as geojson file
    with open(out_pth, 'w') as f:
        f.write(geojson.dumps(divisions))

if __name__ == "__main__":

    comm_peep_path = sys.argv[1]  #docs/data/phl-dem-committeepeople-2014.csv
    divisions_path = sys.argv[2]  #data/spatial/divisions_cp.geojson
    out_path = sys.argv[3]       #data/spatial/divisions_cp.geojson

    join_committeepeople_to_divisions(comm_peep_path, divisions_path, out_path)
