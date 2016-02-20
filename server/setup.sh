#!/usr/bin/env bash

set -x

## Set up database: Create databases and user ##
USER=root
PASS=dbpass
mysql -u $USER -p$PASS << EOF

CREATE DATABASE IF NOT EXISTS crowdcast;
GRANT USAGE ON *.* TO 'crowdcast'@'%' IDENTIFIED BY 'mlh';
GRANT ALL PRIVILEGES ON crowdcast.* TO 'crowdcast'@'%';
FLUSH PRIVILEGES;

EOF

## Run server ##
# gradle run