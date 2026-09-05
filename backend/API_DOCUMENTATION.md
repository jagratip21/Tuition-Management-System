# UpHomeTuition API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Auth Endpoints

#### Register Admin
- **POST** `/auth/register`
- **Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123",
  "name": "Admin Name"
}
```

#### Login
- **POST** `/auth/login`
- **Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

#### Get Profile
- **GET** `/auth/profile`
- **Auth Required:** Yes

---

## Tutor Management

#### Get All Tutors (Public)
- **GET** `/tutors`

#### Get Tutor by ID (Public)
- **GET** `/tutors/:id`

#### Create Tutor (Admin)
- **POST** `/tutors`
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`
- **Body:**
```
fullName: string
email: string
phone: string
location: string
expertise: string
experience: string (optional)
bio: string (optional)
image: file (optional)
```

#### Update Tutor (Admin)
- **PUT** `/tutors/:id`
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`

#### Delete Tutor (Admin)
- **DELETE** `/tutors/:id`
- **Auth Required:** Yes

---

## Subject Management

#### Get All Subjects (Public)
- **GET** `/subjects`

#### Get Subject by ID (Public)
- **GET** `/subjects/:id`

#### Create Subject (Admin)
- **POST** `/subjects`
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`
- **Body:**
```
name: string
description: string (optional)
image: file (optional)
```

#### Update Subject (Admin)
- **PUT** `/subjects/:id`
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`

#### Delete Subject (Admin)
- **DELETE** `/subjects/:id`
- **Auth Required:** Yes

---

## Blog Management

#### Get All Blogs (Public - Published Only)
- **GET** `/blogs`

#### Get Blog by ID (Public)
- **GET** `/blogs/:id`

#### Get Blog by Slug (Public)
- **GET** `/blogs/slug/:slug`

#### Create Blog (Admin)
- **POST** `/blogs`
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`
- **Body:**
```
title: string
slug: string
content: string
excerpt: string (optional)
author: string (optional)
published: boolean
coverImage: file (optional)
```

#### Update Blog (Admin)
- **PUT** `/blogs/:id`
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`

#### Delete Blog (Admin)
- **DELETE** `/blogs/:id`
- **Auth Required:** Yes

---

## Enquiry Forms

#### Submit Hire Tutor Enquiry (Public)
- **POST** `/enquiries/hire-tutor`
- **Body:**
```json
{
  "fullName": "John Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "location": "New York",
  "subject": "Mathematics",
  "message": "Optional message"
}
```

#### Get Hire Tutor Enquiries (Admin)
- **GET** `/enquiries/hire-tutor`
- **Auth Required:** Yes

#### Submit Join as Tutor Enquiry (Public)
- **POST** `/enquiries/join-as-tutor`
- **Body:**
```json
{
  "fullName": "Jane Doe",
  "phone": "+1234567890",
  "email": "jane@example.com",
  "location": "New York",
  "expertise": "Physics Teacher",
  "message": "Optional message"
}
```

#### Get Join as Tutor Enquiries (Admin)
- **GET** `/enquiries/join-as-tutor`
- **Auth Required:** Yes

#### Update Enquiry Status (Admin)
- **PUT** `/enquiries/:type/:id/status`
- **Auth Required:** Yes
- **type:** `hire` or `join`
- **Body:**
```json
{
  "status": "pending|contacted|resolved"
}
```

---

## Contact Us

#### Submit Contact Form (Public)
- **POST** `/contact`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Your message here"
}
```

#### Get All Contact Submissions (Admin)
- **GET** `/contact`
- **Auth Required:** Yes

#### Update Contact Status (Admin)
- **PUT** `/contact/:id/status`
- **Auth Required:** Yes
- **Body:**
```json
{
  "status": "pending|contacted|resolved"
}
```

---

## File Upload

#### Upload File (Admin)
- **POST** `/upload`
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`
- **Body:**
```
file: file (max 5MB, images only)
```

---

## Health Check

#### API Health
- **GET** `/health`
- Returns server status and timestamp

---

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Setup Instructions

1. Update `.env` file with your database credentials
2. Install dependencies: `npm install`
3. Start server: `npm start` (or `npm run dev` for development)
4. API will be available at `http://localhost:3000`

---

## Database

The API uses Supabase (PostgreSQL) with the following tables:
- admins
- tutors
- subjects
- blogs
- hire_tutor_enquiries
- join_as_tutor_enquiries
- contact_us

All tables have Row Level Security (RLS) enabled with appropriate policies.
