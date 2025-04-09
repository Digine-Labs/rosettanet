#!/bin/bash

# Constants for Starknet Devnet configuration
SEED=1223632
REQUEST_BODY_SIZE_LIMIT=3777362
PORT=6050

# Function to run Starknet devnet
start_devnet() {
    echo "Starting Starknet Devnet..."
    starknet-devnet \
        --seed "$SEED" \
        --request-body-size-limit "$REQUEST_BODY_SIZE_LIMIT" \
        --port "$PORT" &
    
    # Store the PID of the devnet process
    DEVNET_PID=$!
    
    # Wait a moment to ensure devnet is up
    sleep 5
}

# Function to run E2E tests
run_e2e_tests() {
    echo "Running E2E tests..."
    jest --config ./e2e/jest.config.ts --runInBand
}

# Function to cleanup devnet process
cleanup() {
    echo "Cleaning up Starknet Devnet..."
    if [ ! -z "$DEVNET_PID" ]; then
        kill "$DEVNET_PID"
        wait "$DEVNET_PID"
    fi
}

# Trap to ensure cleanup happens even if script is interrupted
trap cleanup EXIT

# Main script execution
main() {
    # Start devnet
    start_devnet

    # Run tests
    run_e2e_tests

    # Store the test exit code
    TEST_EXIT_CODE=$?

    # Return the test exit code
    exit $TEST_EXIT_CODE
}

# Run the main function
main