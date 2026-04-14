# 🎬 Book My Ticket (Backend + Auth + Booking)

A simplified movie ticket booking system built by extending an existing codebase.  
Implements authentication, protected routes, and safe seat booking logic.

---

## 🚀 Features

- 🔐 User Registration & Login (JWT based)
- 🔑 Access Token + Refresh Token flow
- 🛡️ Protected Routes (only logged-in users)
- 🎟️ Seat Booking System
- ❌ Prevent Duplicate Booking
- 👤 Booking linked to authenticated user
- 🧠 Clean and scalable backend structure

---

## 🏗️ Tech Stack

- Node.js + Express  
- PostgreSQL (Docker)  
- Drizzle ORM  
- JWT Authentication  
- Tailwind (basic frontend)

---

## ⚙️ Setup Instructions

### 1. Clone repo
```bash
git clone <your-repo-url>
cd book-my-ticket
```

### 2. Run PostgreSQL (Docker)
```bash
docker-compose up -d
```

### 3. Create DB tables
```sql
CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  isbooked INT DEFAULT 0
);

INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20);
```

### 4. Install dependencies
```bash
npm install
```

### 5. Run server
```bash
npm run dev
```

---

## 🔐 Authentication Flow

1. User registers  
2. Logs in → gets:
   - Access Token (response)
   - Refresh Token (httpOnly cookie)  
3. Access protected routes using:
```bash
Authorization: Bearer <accessToken>
```

---

## 🎟️ Booking Flow

- Login required  
- Select seat  
- Booking API called  
- Seat gets locked  
- Duplicate booking prevented  

---

## 📡 API Endpoints

### Auth
- POST /auth/register  
- POST /auth/login  
- POST /auth/refresh  

### Booking
- GET /seats  
- PUT /:seatId/:name  

---

## 🧪 Example Request

```json
{
  "firstName": "Kunal",
  "lastName": "Madoliya",
  "email": "kunal@example.com",
  "password": "Kunal@1234"
}
```

---

## 🌐 Deployment

- Backend → Railway  
- Database → PostgreSQL (Docker / Railway)  
- Frontend → Vercel (optional)

---

## 🧠 Learnings

- Real-world backend extension  
- JWT auth + refresh strategy  
- DB consistency (no double booking)  
- Production-style API design  

---

## 📌 Note

Frontend is minimal. Focus is on backend logic and API design as per hackathon requirements.

---

## 👨‍💻 Author

Kunal Madoliya

---

## 🔥 Summary
Production-style backend with authentication and secure booking built on an existing system.