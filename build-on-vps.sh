#!/bin/bash
# Safe build script for 2GB VPS
# This script builds services sequentially to prevent OOM errors

set -e  # Exit on error

echo "============================================"
echo "Building Showfolio on 2GB VPS"
echo "============================================"
echo ""

# Check if swap is enabled
echo "Checking swap..."
if ! swapon --show | grep -q .; then
    echo "⚠️  WARNING: No swap detected. Consider enabling swap for safer builds."
    echo "   Run: sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile"
else
    echo "✓ Swap is enabled"
    swapon --show
fi
echo ""

# Check available memory
echo "Checking available memory..."
free -h
echo ""

# Prompt to stop other services
read -p "Stop other Docker containers to free memory? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Stopping other containers..."
    docker stop $(docker ps -q) 2>/dev/null || echo "No containers to stop"
fi
echo ""

# Clear cache
read -p "Clear system cache to free memory? (requires sudo) (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Clearing cache..."
    sudo sh -c 'sync; echo 3 > /proc/sys/vm/drop_caches'
    echo "✓ Cache cleared"
fi
echo ""

echo "============================================"
echo "Step 1/2: Building Strapi Backend (server)"
echo "============================================"
echo "⚠️  CRITICAL: This will use 1.15GB RAM for Node.js build"
echo "   Peak system usage will be ~1.5-1.6GB total"
echo "   Ensure ALL other services are stopped!"
echo ""
echo "This will take 5-10 minutes..."
echo ""

# Build server
docker compose build server

echo ""
echo "✓ Server build completed successfully!"
echo ""
echo "Waiting 5 seconds before building client..."
sleep 5

echo "============================================"
echo "Step 2/2: Building Next.js Frontend (client)"
echo "============================================"
echo "This will take 2-5 minutes and use up to 512MB RAM"
echo ""

# Build client
docker compose build client

echo ""
echo "✓ Client build completed successfully!"
echo ""

echo "============================================"
echo "Build Complete!"
echo "============================================"
echo ""
echo "To start the services, run:"
echo "  docker compose up -d"
echo ""
echo "To view logs:"
echo "  docker compose logs -f"
echo ""
echo "To check status:"
echo "  docker compose ps"
echo ""
