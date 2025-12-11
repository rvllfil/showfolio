#!/bin/bash
# ============================================================================
# Build and Push Script - For local development
# ============================================================================
# This script builds Docker images locally and pushes them to Docker Hub.
# Run this on your LOCAL machine (with 16GB RAM) or CI server.
#
# USAGE:
#   1. Update USERNAME in docker-compose.build.yml
#   2. Login: docker login
#   3. Run: ./build-and-push.sh
# ============================================================================

set -e  # Exit on error

echo "============================================"
echo "Building and Pushing Showfolio Images"
echo "============================================"
echo ""

# Check if user is logged in to Docker Hub
if ! docker info | grep -q "Username"; then
    echo "⚠️  Not logged in to Docker Hub"
    echo "Please run: docker login"
    exit 1
fi

# Get Docker Hub username from docker-compose.build.yml
USERNAME=$(grep "image: " docker-compose.build.yml | head -1 | cut -d'/' -f1 | cut -d':' -f2 | xargs)

if [ "$USERNAME" == "USERNAME" ]; then
    echo "⚠️  Please replace 'USERNAME' in docker-compose.build.yml with your Docker Hub username"
    exit 1
fi

echo "Docker Hub username: $USERNAME"
echo ""

# Build images
echo "============================================"
echo "Step 1/2: Building Images"
echo "============================================"
echo ""

docker compose -f docker-compose.build.yml build

echo ""
echo "✓ Images built successfully!"
echo ""

# Push images
echo "============================================"
echo "Step 2/2: Pushing Images to Docker Hub"
echo "============================================"
echo ""

docker compose -f docker-compose.build.yml push

echo ""
echo "============================================"
echo "Success! Images pushed to Docker Hub"
echo "============================================"
echo ""
echo "Images available:"
echo "  - $USERNAME/showfolio-server:latest"
echo "  - $USERNAME/showfolio-client:latest"
echo ""
echo "Next steps on VPS:"
echo "  1. Update docker-compose.yml with your username"
echo "  2. Run: docker compose pull"
echo "  3. Run: docker compose up -d"
echo ""
