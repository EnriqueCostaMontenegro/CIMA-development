#!/bin/bash

case "$(uname -s)" in
    CYGWIN*|MINGW32*|MSYS*|MINGW*)
        if where node || echo not installed
        then
            echo "Node is installed, skipping"
        else
            wget https://nodejs.org/dist/v14.18.1/node-v14.18.1-x64.msi
            ./node-v14.18.1-x64.msi
        fi
        node app.js
        ;;
    *)
    ;;
esac