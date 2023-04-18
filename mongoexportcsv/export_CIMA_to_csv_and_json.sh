#!/bin/bash

FECHA=$(date +%Y-%m-%d-%H.%M.%S)

pip3 install unicodecsv pymongo

python3 mongoexportcsv.py Allure pdf_info CIMA_$FECHA.csv

python3 mongoexportcsvparcial.py Allure pdf_info CIMA_parcial_$FECHA.csv

mongoexport --collection=pdf_info --db=Allure --out=CIMA_$FECHA.json



