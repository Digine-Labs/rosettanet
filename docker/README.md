# Rosettanet Docker Setup

This directory contains Docker configuration for running the Rosettanet project in a containerized environment.

## Files

- `Dockerfile`: Defines the container image with all necessary dependencies
- `docker-compose.yml`: Orchestrates the services needed for Rosettanet
- `run.sh`: Convenience script to build and run the Docker setup
- `.dockerignore`: Specifies files to exclude from the Docker build context

## Requirements

- Docker
- Docker Compose

## Usage

To build and run the Rosettanet project in Docker:

```bash
# From the project root directory
./docker/run.sh
```

This will:
1. Build the Docker image with all dependencies
2. Start the container with the Rosettanet application
3. Run the starknet-devnet with the required parameters
4. Execute the e2e tests

## Configuration

The Docker setup includes:
- Python 3.9 as the base image
- Node.js 18.x
- starknet-devnet version 0.3.0rc0
- All project dependencies from package.json

The container exposes ports:
- 3000: Rosettanet API
- 6050: starknet-devnet

## Troubleshooting

If you encounter issues:
1. Check that Docker and Docker Compose are installed and running
2. Verify that ports 3000 and 6050 are not already in use on your host machine
3. Check the Docker logs for detailed error messages
