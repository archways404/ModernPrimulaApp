#!/bin/bash


# TO RUN IT: 

#  chmod +x install.sh

#  ./install.sh

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "Git could not be found. Please install Git and try again."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js could not be found. Please install Node.js and try again."
    exit 1
fi

# Define the repository URL and the directory name to clone into
REPO_URL="https://github.com/archways404/ModernPrimulaApp.git"
REPO_DIR="ModernPrimulaApp"

# Clone the repository
echo "Cloning the repository..."
git clone $REPO_URL $REPO_DIR

# Check if the clone was successful
if [ $? -ne 0 ]; then
    echo "Failed to clone the repository."
    exit 1
fi

# Change directory to the cloned repository
cd $REPO_DIR

# Install dependencies
echo "Installing dependencies..."
npm install

# Check if npm install was successful
if [ $? -ne 0 ]; then
    echo "Failed to install dependencies."
    exit 1
fi

# Build the project
echo "Building the project..."
npm run build:mac

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Failed to build the project."
    exit 1
fi

echo "Setup and build complete."
