# Showfolio - Clean Setup

Showfolio adalah aplikasi portfolio yang terdiri dari:

- **Backend**: Strapi CMS (server/)
- **Frontend**: Next.js application (client/)

## Setup Awal

### 1. Server Setup (Strapi)

```bash
cd server
npm install
# atau
yarn install

# Copy environment file
cp .env.example .env

# Edit .env dengan konfigurasi database Anda
# DATABASE_HOST=localhost
# DATABASE_PORT=3306
# DATABASE_NAME=showfolio
# DATABASE_USERNAME=your_username
# DATABASE_PASSWORD=your_password
```

### 2. Database Setup

Buat database MySQL bernama `showfolio`:

```sql
CREATE DATABASE showfolio;
```

### 3. Start Server

```bash
cd server
yarn develop
# atau
npm run develop
```

Server akan berjalan di http://localhost:1337

### 4. Setup Admin & Permissions

1. Buka http://localhost:1337/admin
2. Buat akun admin pertama
3. Setup permissions untuk API:
   - Go to Settings → Users & Permissions → Roles
   - Click "Public" role
   - Under "Portfolio" permissions, enable:
     - `find` (untuk GET /api/portfolios)
     - `findOne` (untuk GET /api/portfolios/:id)
   - Save changes

### 5. Client Setup (Next.js)

```bash
cd client
npm install
# atau
yarn install

# Start development server
yarn dev
# atau
npm run dev
```

Client akan berjalan di http://localhost:3000

## Struktur API

### Portfolio Schema

```json
{
  "title": "string",
  "slug": "uid",
  "workType": "real|dummy",
  "shortDescription": "text",
  "detailedDescription": "blocks",
  "problem": "blocks",
  "solution": "blocks",
  "role": "string",
  "year": "string",
  "portfolioType": "website|landing_page|commerce|ecommerce|web_app",
  "techTags": "component[]",
  "isFeatured": "boolean",
  "liveUrl": "string",
  "githubUrl": "string",
  "clientName": "string",
  "thumbnail": "media",
  "portfolioImages": "media[]"
}
```

### API Endpoints

- `GET /api/portfolios` - List all portfolios
- `GET /api/portfolios/:id` - Get single portfolio
- `POST /api/portfolios` - Create portfolio (admin only)
- `PUT /api/portfolios/:id` - Update portfolio (admin only)
- `DELETE /api/portfolios/:id` - Delete portfolio (admin only)

## Development

Aplikasi ini dibuat clean tanpa data seed otomatis. Anda perlu:

1. Setup admin account
2. Configure API permissions
3. Add portfolio content melalui admin panel atau API

---

## 🐳 Running with Docker

### Prerequisites

- Docker Desktop installed
- Docker Compose v2 or higher

### Quick Start

1. **Copy environment files**:

   ```bash
   cp .env.example .env
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```

2. **Generate secure secrets** (IMPORTANT for production):

   ```bash
   # Generate random strings for Strapi secrets
   node -e "console.log('APP_KEYS=' + Array(4).fill(0).map(() => require('crypto').randomBytes(16).toString('base64')).join(','))"
   node -e "console.log('API_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"
   node -e "console.log('ADMIN_JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
   node -e "console.log('TRANSFER_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"
   node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
   ```

   Update the values in `.env` and `server/.env` with the generated secrets.

3. **Start all services**:

   ```bash
   docker compose up --build
   ```

   This will start:
   - **PostgreSQL** database on `localhost:5432`
   - **Strapi** backend on `http://localhost:1337`
   - **Next.js** frontend on `http://localhost:3000`

4. **Setup Strapi admin**:

   - Open `http://localhost:1337/admin`
   - Create your first admin account
   - Configure API permissions as needed

5. **Access the application**:

   - Frontend: `http://localhost:3000`
   - Backend Admin: `http://localhost:1337/admin`
   - Backend API: `http://localhost:1337/api`

### Docker Commands

```bash
# Start services in background
docker compose up -d

# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f server
docker compose logs -f client

# Stop services
docker compose down

# Stop and remove volumes (WARNING: deletes database data)
docker compose down -v

# Rebuild without cache
docker compose build --no-cache

# Restart specific service
docker compose restart server
```

### Docker Services

- **db**: PostgreSQL 15 database
- **server**: Strapi CMS backend
- **client**: Next.js frontend

### Data Persistence

Docker volumes are used for data persistence:

- `postgres_data`: PostgreSQL database data
- `strapi_data`: Strapi temporary files
- `./server/public/uploads`: Media uploads (bind mount)

### Environment Variables

#### Server (Strapi)

- `DATABASE_CLIENT`: postgres (default)
- `DATABASE_HOST`: db (Docker service name)
- `DATABASE_PORT`: 5432
- `DATABASE_NAME`: showfolio
- `DATABASE_USERNAME`: showfolio
- `DATABASE_PASSWORD`: showfolio
- `APP_KEYS`: Comma-separated secret keys
- `API_TOKEN_SALT`: Secret for API tokens
- `ADMIN_JWT_SECRET`: Secret for admin JWT
- `JWT_SECRET`: Secret for user JWT

#### Client (Next.js)

- `NEXT_PUBLIC_API_URL`: `http://localhost:1337` (for browser)
- `API_URL`: `http://server:1337` (for server-side, inside Docker network)

### Production Deployment

For production deployment:

1. **Update environment variables**:
   - Generate new secure secrets
   - Set proper `NEXT_PUBLIC_API_URL` to your domain
   - Configure database passwords

2. **Use a reverse proxy** (nginx, Traefik) for:
   - SSL/TLS termination
   - Domain routing
   - Load balancing

3. **Configure external database** (optional):
   - Use managed PostgreSQL (AWS RDS, Digital Ocean, etc.)
   - Update `DATABASE_HOST` and credentials

4. **Setup cloud storage** (optional):
   - Configure S3/Cloudinary for media uploads
   - Update Strapi upload provider settings

5. **Enable HTTPS**:
   - Update `APP_URL` and `ADMIN_URL` to use https
   - Configure CORS properly

---

## Production

Untuk production, pastikan:

1. Update environment variables
2. Configure proper database
3. Setup SSL/TLS
4. Configure proper CORS settings
5. Setup file upload storage (cloudinary, S3, etc.)
   ::contentReference[oaicite:0]{index=0}

```

```
