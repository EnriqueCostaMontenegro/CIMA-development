#!/bin/bash

case "$(uname -s)" in
    Linux*)
        if which node > /dev/null
        then
            echo "Node is installed, skipping"
        else
            sudo apt update
            sudo apt install nodejs npm
            echo "Installation completed"
        fi
        node app.js
        ;;
    *)
    ;;
esac