#!/bin/bash

#check we have ASK credentials
if [ ! -e $HOME/.ask/cli_config ]; then
	echo "No ASK credentials, requesting them"
	ask configure --no-browser
fi

#install the app
(cd infra/src; npm install)
node infra/src/index.ts "$@"

#other commands
#/bin/bash
