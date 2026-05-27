# Mini CRM - Lead Management System

A simple full-stack Lead Management System built using React, Node.js, Express, and PostgreSQL.

---

## Features

- Add new leads
- View all leads
- Update lead status
- Delete leads
- Search leads by name
- Dashboard cards for lead statistics
- Form validation
- Responsive UI

---

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL (Neon)

---

## Project Structure

```txt
lead-management-system/

├── Frontend/
│   ├── src/
│   └── public/
│
├── Backend/
│   ├── routes/
│   ├── db.js
│   └── server.js
│
└── README.md
```

---

## Environment Variables

### Frontend (`Frontend/.env`)

```env
VITE_BACKEND_URL=http://localhost:5000
```

### Backend (`Backend/.env`)

```env
NEON_POSTGRES_DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

---

## Installation & Setup

### Clone Repository

```bash
git clone <your-repository-url>

```

---

## Backend Setup

```bash
cd Backend

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

---

## Database Setup

Create PostgreSQL table:

```sql
CREATE TABLE leads(

id SERIAL PRIMARY KEY,

name VARCHAR(100) NOT NULL,

phone VARCHAR(20) NOT NULL,

source VARCHAR(30) NOT NULL,

status VARCHAR(30) DEFAULT 'Interested',

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
```

---

## API Endpoints

### Get All Leads

```txt
GET /api/leads
```

### Add Lead

```txt
POST /api/leads
```

### Update Lead Status

```txt
PUT /api/leads/:id
```

### Delete Lead

```txt
DELETE /api/leads/:id
```

---

## Live Demo

```txt
Frontend: <your-vercel-link>

Backend: <your-render-link>
```

---

## Author

Ranjan Singh
