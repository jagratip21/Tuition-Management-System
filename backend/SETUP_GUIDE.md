# UpHomeTuition API - Complete Setup Guide (Prisma Only)

## Overview

This API uses **Prisma ORM** with **PostgreSQL** database. No Supabase dependencies!

### Tech Stack
- **Backend:** Node.js + Express
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT + Bcrypt
- **File Upload:** Multer

---

## Prerequisites

Before starting, ensure you have:
- Node.js (v14 or higher)
- PostgreSQL installed and running
- npm or yarn

---

## Step 1: Set Up PostgreSQL Database

### Option A: Local PostgreSQL

1. **Install PostgreSQL** from https://www.postgresql.org/download/

2. **Create database:**
```bash
createdb uphometuition
```

3. **Get connection string:**
```
postgresql://username:password@localhost:5432/uphometuition
```

### Option B: PostgreSQL Docker

```bash
docker run --name uphometuition-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=uphometuition \
  -p 5432:5432 \
  -d postgres:latest
```

Connection string:
```
postgresql://postgres:password@localhost:5432/uphometuition
```

---

## Step 2: Update Environment Variables

Edit `.env` file:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/uphometuition"

# JWT Secret (change in production!)
JWT_SECRET="your-secret-key-change-this-in-production"

# Server Port
PORT=3000
```

**Replace:**
- `username` - Your PostgreSQL username (default: `postgres`)
- `password` - Your PostgreSQL password
- `uphometuition` - Your database name

---

## Step 3: Install Dependencies

```bash
npm install
```

---

## Step 4: Initialize Prisma

Generate Prisma client:

```bash
npx prisma generate
```

---

## Step 5: Run Database Migration

Create database tables:

```bash
npx prisma migrate deploy
```

If this is first time, run:

```bash
npx prisma migrate dev --name init
```

---

## Step 6: Verify Database

Check if tables were created:

```bash
npx prisma studio
```

Opens Prisma Studio at `http://localhost:5555`

---

## Step 7: Start the Server

### Production Mode
```bash
npm start
```

### Development Mode (auto-reload)
```bash
npm run dev
```

Expected output:
```
Server is running on port 3000
API Health: http://localhost:3000/api/health
```

---

## Testing the API

Open a **new terminal** and run:

```bash
# Test 1: Health check
curl http://localhost:3000/api/health

# Test 2: Register admin
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "AdminPassword123",
    "name": "My Admin"
  }'

# Test 3: Get tutors
curl http://localhost:3000/api/tutors
```

---

## Useful Commands

| Command | Purpose |
|---------|---------|
| `npx prisma generate` | Generate Prisma client |
| `npx prisma migrate dev` | Create and apply migration |
| `npx prisma migrate deploy` | Apply migrations |
| `npx prisma studio` | Open Prisma GUI |
| `npm run dev` | Start with auto-reload |
| `npm start` | Start server |

---

## Troubleshooting

### Cannot connect to database
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Verify username/password

### Relation does not exist
```bash
npx prisma migrate deploy
```

### Port 3000 already in use
```bash
PORT=3001 npm start
```

---

## Summary - Quick Start

```bash
# 1. Create database
createdb uphometuition

# 2. Update .env with connection string

# 3. Install dependencies
npm install

# 4. Generate Prisma client
npx prisma generate

# 5. Create tables
npx prisma migrate deploy

# 6. Start server
npm start
```

Done! API running at http://localhost:3000 🚀
