#!/usr/bin/env bash

set -e

cd "$(dirname $(dirname "$0"))"
root="${PWD}"
echo "Project root: ${root}"

firebase_admin_json_path="${root}/src/config/firebase.admin.json"

if [ -f "${firebase_admin_json_path}" ]; then
    echo "Found ${firebase_admin_json_path}"
else
    echo "File ${firebase_admin_json_path} does not exist"
    exit 1
fi

export GOOGLE_APPLICATION_CREDENTIALS="${firebase_admin_json_path}"
node "./scripts/generate-notes.mjs"
node "./scripts/setup-firestore.mjs"
