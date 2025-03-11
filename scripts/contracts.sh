#!/bin/bash

# Define paths
SCRIPT_DIR="$(dirname "$0")"
CONFIG_FILE="$SCRIPT_DIR/../config.json"
TARGET_DIR="$SCRIPT_DIR/../contracts"

# Define the GitHub repository (e.g., owner/repo)
REPO="Digine-Labs/rosettacontracts"

# Function to extract `scarbVersion` from config.json
get_config_version() {
    if [[ -f "$CONFIG_FILE" ]]; then
        jq -r '.scarbVersion' "$CONFIG_FILE" 2>/dev/null
    else
        echo "Error: config.json not found at $CONFIG_FILE"
        exit 1
    fi
}

# Check if `jq` is installed (needed to parse JSON)
if ! command -v jq &>/dev/null; then
    echo "Error: 'jq' is required but not installed. Install it and retry."
    exit 1
fi

# Check if `scarb` is installed
if ! command -v scarb &>/dev/null; then
    echo "Error: 'scarb' is not installed. Please install it first."
    exit 1
fi

# Get installed Scarb version
INSTALLED_SCARB_VERSION=$(scarb -V | awk '{print $2}')
EXPECTED_SCARB_VERSION=$(get_config_version)

# Compare versions
if [[ "$INSTALLED_SCARB_VERSION" != "$EXPECTED_SCARB_VERSION" ]]; then
    echo "Error: Installed Scarb version ($INSTALLED_SCARB_VERSION) does not match required version ($EXPECTED_SCARB_VERSION) from config.json."
    exit 1
fi

if [[ -d "$TARGET_DIR" ]]; then
    echo "Removing existing contracts folder..."
    rm -rf "$TARGET_DIR"
fi

# Get the latest release tag using GitHub API
LATEST_TAG=$(curl -s "https://api.github.com/repos/$REPO/releases/latest" | grep '"tag_name":' | cut -d '"' -f 4)

# Check if a valid tag was found
if [[ -z "$LATEST_TAG" ]]; then
    echo "Error: Could not find the latest release tag for $REPO"
    exit 1
fi

# Construct the ZIP download URL for the source code
LATEST_RELEASE_URL="https://github.com/$REPO/archive/refs/tags/$LATEST_TAG.zip"

# Get the filename from the URL
FILENAME="$LATEST_TAG.zip"

# Download the latest release ZIP file
echo "Downloading latest release from $LATEST_RELEASE_URL..."
curl -L -o "$FILENAME" "$LATEST_RELEASE_URL"

# Ensure the target directory exists
mkdir -p "$TARGET_DIR"

# Extract ZIP to a temporary directory
TEMP_DIR="$SCRIPT_DIR/../temp_extract"
mkdir -p "$TEMP_DIR"
unzip -o "$FILENAME" -d "$TEMP_DIR"

# Find the extracted folder (should be named $REPO-$LATEST_TAG)
EXTRACTED_FOLDER="$TEMP_DIR/$(ls "$TEMP_DIR" | head -n 1)"

# Move all inner files to contracts, overwrite existing ones
echo "Moving files to $TARGET_DIR..."
mv -f "$EXTRACTED_FOLDER"/* "$TARGET_DIR"

# Cleanup: Remove temp folder and ZIP file
rm -rf "$TEMP_DIR" "$FILENAME"

# Run scarb build
echo "Running 'scarb build' in $TARGET_DIR..."
cd "$TARGET_DIR" || exit 1
scarb build

echo "Compilation complete!"