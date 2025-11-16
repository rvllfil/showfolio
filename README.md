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
