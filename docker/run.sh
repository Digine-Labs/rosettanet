#!/bin/bash

# Build and run the Docker containers
echo "Building Docker containers..."
docker-compose -f docker/docker-compose.yml build

echo "Starting Docker containers..."
docker-compose -f docker/docker-compose.yml up
