#!/bin/bash

# Check if the script is being run with sudo
if [ "$(id -u)" -ne 0 ]; then
  echo "This script must be run with sudo."
  exit 1
fi

# Attach the Docker container

sudo docker attach f1-sqlite3-server