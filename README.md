# Tuition Management System

A tuition management web application with a React frontend and an Express/Prisma API. The project provides an interface for students, tutors, and administrators.

## Repository Structure

- `frontend/` - React and Vite web application
- `backend/` - Express API, Prisma schema, and database migrations
- `render.yaml` - Render deployment configuration for the backend

## ✨ Current Features

- Responsive user interface
- Modern landing page
- Student and Tutor modules
- Subject browsing
- Service pages
- Smooth navigation using React Router
- Clean and reusable component-based architecture

## 🛠️ Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- React Router DOM
- Framer Motion

## 📂 Project Status

This project is actively being improved. Upcoming features include:

- User Authentication
- Student & Tutor Login
- Backend APIs using Express.js
- PostgreSQL database integration through Prisma
- JWT Authentication
- Admin Dashboard
- Tutor Request Management

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/jagratip21/Tuition-Management-System.git
```

Install frontend dependencies and start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Install backend dependencies and start the API:

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

## Deployment

Deploy the backend on Render using `render.yaml`. Configure these environment variables in Render:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - a long random secret
- `PORT` - use Render's assigned port, typically `10000`

After deployment, set the frontend hosting provider's environment variable to:

```bash
VITE_API_URL=https://your-backend-service.onrender.com/api
```

Set the frontend hosting provider's project root directory to `frontend` and build command to `npm run build`.

## 👩‍💻 Author

**Jagrati Patel**
