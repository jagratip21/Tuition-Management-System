# Quick Start - Prisma API (5 Minutes)

## Prerequisites
✅ PostgreSQL installed and running
✅ Node.js installed

---

## 5-Step Setup

### Step 1: Create Database
```bash
createdb uphometuition
```

### Step 2: Update .env
Open `.env` file and set:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/uphometuition"
JWT_SECRET="your-secret-key"
PORT=3000
```

Replace:
- `postgres` - Your PostgreSQL username
- `password` - Your PostgreSQL password

### Step 3: Install & Setup
```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

### Step 4: Start Server
```bash
npm start
```

You should see:
```
Server is running on port 3000
```

### Step 5: Test API
Open new terminal:
```bash
curl http://localhost:3000/api/health
```

---

## Create Admin & Use API

### Register Admin
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "AdminPassword123",
    "name": "My Admin"
  }'
```

Save the `token` from response!

### Create Tutor (with token)
```bash
curl -X POST http://localhost:3000/api/tutors \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "fullName=John Doe" \
  -F "email=john@example.com" \
  -F "phone=9876543210" \
  -F "location=New York" \
  -F "expertise=Mathematics"
```

### Get All Tutors (Public - no auth)
```bash
curl http://localhost:3000/api/tutors
```

---

## Development Tips

Auto-reload on file changes:
```bash
npm run dev
```

View database in browser:
```bash
npx prisma studio
```

Opens at: http://localhost:5555

---

## Common Issues

**Database connection error?**
- Check .env DATABASE_URL
- Verify PostgreSQL is running
- Try: `psql -U postgres -d uphometuition`

**Port already in use?**
```bash
PORT=3001 npm start
```

**Tables not created?**
```bash
npx prisma migrate deploy
```

---

## Next: Full API Reference

See `API_DOCUMENTATION.md` for all endpoints

Your API is ready! 🚀
