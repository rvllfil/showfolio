#!/bin/bash
# ============================================================================
# VPS Deploy Script - For deploying on VPS using pre-built images
# ============================================================================
# This script pulls pre-built images from Docker Hub and starts services.
# Run this on your VPS (2GB RAM).
#
# PREREQUISITES:
#   - Images must be built and pushed to Docker Hub first
#   - docker-compose.yml must have correct Docker Hub username
#
# USAGE:
#   ./deploy-vps.sh
# ============================================================================

set -e  # Exit on error

echo "============================================"
echo "Deploying Showfolio on VPS"
echo "============================================"
echo ""

# Check if docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ docker-compose.yml not found"
    exit 1
fi

# Check if USERNAME is replaced
if grep -q "USERNAME/showfolio" docker-compose.yml; then
    echo "⚠️  Please replace 'USERNAME' in docker-compose.yml with your Docker Hub username"
    exit 1
fi

# Check if .env files exist
if [ ! -f "server/.env" ] && [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Consider creating one with:"
    echo "   - Database credentials"
    echo "   - Strapi secret keys"
    echo "   - API URLs"
    echo ""
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "============================================"
echo "Step 1/3: Pulling Latest Images"
echo "============================================"
echo ""

docker compose pull

echo ""
echo "✓ Images pulled successfully!"
echo ""

echo "============================================"
echo "Step 2/3: Stopping Old Containers"
echo "============================================"
echo ""

docker compose down

echo ""
echo "✓ Old containers stopped"
echo ""

echo "============================================"
echo "Step 3/3: Starting Services"
echo "============================================"
echo ""

docker compose up -d

echo ""
echo "✓ Services started successfully!"
echo ""

# Wait a few seconds for services to initialize
sleep 5

echo "============================================"
echo "Deployment Complete!"
echo "============================================"
echo ""
echo "Services:"
echo "  - Frontend: http://$(hostname -I | awk '{print $1}'):3000"
echo "  - Backend:  http://$(hostname -I | awk '{print $1}'):1337"
echo "  - Admin:    http://$(hostname -I | awk '{print $1}'):1337/admin"
echo ""
echo "Check status:"
echo "  docker compose ps"
echo ""
echo "View logs:"
echo "  docker compose logs -f"
echo ""
