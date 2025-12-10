#!/bin/bash

# Showfolio Docker Setup Script
# This script helps you set up the Docker environment

set -e

echo "🚀 Showfolio Docker Setup"
echo "=========================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop first."
    exit 1
fi

# Check if Docker Compose is installed
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose v2."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Function to generate random secret
generate_secret() {
    node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
}

# Check if .env files exist
if [ ! -f .env ]; then
    echo "📝 Creating root .env file..."
    cp .env.example .env
    
    # Generate secrets
    echo "🔐 Generating secure secrets..."
    APP_KEY1=$(generate_secret)
    APP_KEY2=$(generate_secret)
    APP_KEY3=$(generate_secret)
    APP_KEY4=$(generate_secret)
    API_TOKEN=$(generate_secret)
    ADMIN_JWT=$(generate_secret)
    TRANSFER_TOKEN=$(generate_secret)
    JWT_SECRET=$(generate_secret)
    
    # Update .env with generated secrets
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/toBeModified1,toBeModified2,toBeModified3,toBeModified4/${APP_KEY1},${APP_KEY2},${APP_KEY3},${APP_KEY4}/g" .env
        sed -i '' "s/API_TOKEN_SALT=tobemodified/API_TOKEN_SALT=${API_TOKEN}/g" .env
        sed -i '' "s/ADMIN_JWT_SECRET=tobemodified/ADMIN_JWT_SECRET=${ADMIN_JWT}/g" .env
        sed -i '' "s/TRANSFER_TOKEN_SALT=tobemodified/TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN}/g" .env
        sed -i '' "s/JWT_SECRET=tobemodified/JWT_SECRET=${JWT_SECRET}/g" .env
    else
        # Linux
        sed -i "s/toBeModified1,toBeModified2,toBeModified3,toBeModified4/${APP_KEY1},${APP_KEY2},${APP_KEY3},${APP_KEY4}/g" .env
        sed -i "s/API_TOKEN_SALT=tobemodified/API_TOKEN_SALT=${API_TOKEN}/g" .env
        sed -i "s/ADMIN_JWT_SECRET=tobemodified/ADMIN_JWT_SECRET=${ADMIN_JWT}/g" .env
        sed -i "s/TRANSFER_TOKEN_SALT=tobemodified/TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN}/g" .env
        sed -i "s/JWT_SECRET=tobemodified/JWT_SECRET=${JWT_SECRET}/g" .env
    fi
    
    echo "✅ Generated secure secrets in .env"
else
    echo "⚠️  .env file already exists, skipping..."
fi

if [ ! -f server/.env ]; then
    echo "📝 Creating server/.env file..."
    cp server/.env.example server/.env
    echo "✅ Created server/.env"
else
    echo "⚠️  server/.env file already exists, skipping..."
fi

if [ ! -f client/.env ]; then
    echo "📝 Creating client/.env file..."
    cp client/.env.example client/.env
    echo "✅ Created client/.env"
else
    echo "⚠️  client/.env file already exists, skipping..."
fi

echo ""
echo "=========================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Review and update .env files if needed"
echo "2. Run: docker compose up --build"
echo "3. Access Strapi admin at http://localhost:1337/admin"
echo "4. Access Next.js frontend at http://localhost:3000"
echo ""
echo "For development mode with hot reload:"
echo "docker compose -f docker-compose.dev.yml up --build"
echo ""
