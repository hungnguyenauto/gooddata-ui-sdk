#!/bin/bash

SCRIPTDIR=`dirname $0`
ROOTDIR="${SCRIPTDIR}/.."
EXPORTER="${ROOTDIR}/node_modules/.bin/gdc-catalog-export"
OUTPUT="${ROOTDIR}/src/fixtures/full.ts"
PROJECTID="4aefdef78922461faeb08c12de183f81"

$EXPORTER \
  --hostname "https://staging.anywhere.gooddata.com" \
  --output "${OUTPUT}" \
  --project-id "${PROJECTID}" \
  --backend "tiger"
