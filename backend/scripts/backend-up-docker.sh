#!/bin/bash

# Check if the script is being run with sudo
if [ "$(id -u)" -ne 0 ]; then
  echo "This script must be run with sudo."
  exit 1
fi

# Remove existing container if it exists
docker rm -f f1-sqlite3-server

# Build the Docker image
docker build -t f1-sqlite3-server .

# Run the Docker container
docker run --name f1-sqlite3-server -dit -p 5000:5000 f1-sqlite3-server
