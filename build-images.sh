#!/bin/bash
set -e

# Load environment variables from .env file
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    echo "Please copy .env.example to .env and configure it first."
    exit 1
fi

# Export DOCKER_USERNAME from .env
export $(grep '^DOCKER_USERNAME=' .env | xargs)

if [ -z "$DOCKER_USERNAME" ]; then
    echo "Error: DOCKER_USERNAME not set in .env file"
    exit 1
fi

echo "Building Docker images for user: $DOCKER_USERNAME"
echo "This will use the latest packages from package.json and package-lock.json"
echo ""

# Build images
docker compose -f docker-compose.build.yml build

echo ""
echo "✓ Build complete!"
echo ""
echo "To push images to Docker Hub, run:"
echo "  docker compose -f docker-compose.build.yml push"
echo ""
echo "To deploy on VPS, run:"
echo "  docker compose pull && docker compose up -d"
