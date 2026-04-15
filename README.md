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
- PostgreSQL (Docker / Railway)  
- Drizzle ORM  
- JWT Authentication  
- Tailwind (basic frontend)

---

## ⚙️ Setup Instructions

### 1. Clone repo
```bash
git clone <your-repo-url>
cd book-my-ticket
2. Run PostgreSQL (Docker)
docker-compose up -d
3. Create DB tables
CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  isbooked INT DEFAULT 0
);

INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20);
4. Install dependencies
npm install
5. Run server
npm run dev
🔐 Authentication Flow
User registers
Logs in → gets:
Access Token (response)
Refresh Token (httpOnly cookie)
Access protected routes using:
Authorization: Bearer <accessToken>
🎟️ Booking Flow
Login required
Select seat
Booking API called
Seat gets locked
Duplicate booking prevented
📡 API Base URL
https://book-my-ticket-production.up.railway.app
🔐 Auth Routes
POST https://book-my-ticket-production.up.railway.app/auth/register
POST https://book-my-ticket-production.up.railway.app/auth/login
POST https://book-my-ticket-production.up.railway.app/auth/refresh-token
POST https://book-my-ticket-production.up.railway.app/auth/logout



🧪 Example Request
{
  "firstName": "Kunal",
  "lastName": "Madoliya",
  "email": "kunal@example.com",
  "password": "Kunal@1234"
}
🌐 Deployment
Backend → Railway
Database → PostgreSQL (Docker / Railway)
Frontend → Vercel (optional)
🧠 Learnings
Real-world backend extension
JWT auth + refresh strategy
DB consistency (no double booking)
Production-style API design
📌 Note

Frontend is minimal. Focus is on backend logic and API design as per hackathon requirements.

👨‍💻 Author

Kunal Madoliya

🔥 Summary

Production-style backend with authentication and secure booking built on an existing system.