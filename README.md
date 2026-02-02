# 🧓 SeniorCare Connect – Elderly Healthcare Assistance Platform

SeniorCare Connect is a **full-stack MERN web application** that connects senior citizens and their families with verified caregivers for home-based healthcare services such as nursing, physiotherapy, and elderly assistance.

This project is inspired by platforms like **Care24** and was developed as part of an **internship project under Unified Mentor**.

---

## 🚀 Features Overview

### 👤 User (Patient / Family)
- Register & Login (JWT Authentication)
- Add and manage patient profiles
- Browse available healthcare services
- Book services for a patient
- Track booking status in real time

### 🧑‍⚕️ Caregiver
- Register and login
- View assigned bookings
- Accept service requests
- Update service status:
  - ACCEPTED
  - IN_PROGRESS
  - COMPLETED

### 🛠️ Admin
- Login with admin role
- View all bookings
- View all caregivers
- Verify caregivers
- Assign caregivers to bookings

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- Role-based Access Control

---

## 📁 Project Structure

seniorcare-connect/
│
├── client/ # Frontend (React + Tailwind)
│ ├── src/
│ │ ├── api/ # Axios API calls
│ │ ├── components/ # Layout, ProtectedRoute, Navbar
│ │ ├── pages/ # Login, Register, Dashboards
│ │ ├── routes/ # AppRoutes
│ │ └── main.jsx
│ └── package.json
│
├── server/ # Backend (Node + Express)
│ ├── src/
│ │ ├── config/ # DB config
│ │ ├── controllers/ # Business logic
│ │ ├── routes/ # API routes
│ │ ├── models/ # MongoDB schemas
│ │ ├── middlewares/ # Auth & role checks
│ │ └── server.js
│ └── package.json
│
├── README.md
└── .gitignore


---

## 🔐 Authentication & Authorization

- JWT based authentication
- Token stored in `localStorage`
- Role-based protected routes:
  - USER
  - CAREGIVER
  - ADMIN

Unauthorized users are redirected automatically.

---

## 🔄 Application Workflow

1. **User registers & logs in**
2. User adds **patient profile**
3. User books a **healthcare service**
4. Booking status = `PENDING`
5. **Admin verifies caregiver**
6. Admin assigns caregiver to booking
7. **Caregiver accepts & completes service**
8. User tracks booking status

---

## ▶️ How to Run the Project Locally

### 1️⃣ Clone the repository
```bash
git clone <repository-url>
cd seniorcare-connect
2️⃣ Backend Setup
cd server
npm install
npm run dev


Create .env file in server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Backend runs on:

http://localhost:5000

3️⃣ Frontend Setup
cd client
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🧪 Test Credentials (Example)

You can create users manually from the Register page.

Roles available:

USER

CAREGIVER

ADMIN

Each role redirects to its respective dashboard after login.

📌 Key Highlights

Clean MERN architecture

Real-world healthcare workflow

Role-based dashboards

Secure APIs

Care24-style booking system

Internship-grade project structure

📈 Future Enhancements

Online payments

Care notes by caregivers

Notifications

Mobile application

Deployment (Vercel + Render)

👨‍💻 Author

Your Name
Internship Project – Unified Mentor
Year: 2026

⭐ Acknowledgements

Unified Mentor

MongoDB Atlas

Care24 (inspiration)


---

## ✅ What to do next
1. Save this as **`README.md`** in your root folder
2. Commit & push to GitHub
3. Use this README for:
   - Internship submission
   - Portfolio
   - Resume project link

If you want next:
- 📦 **Deployment guide**
- 🎨 **UI polish**
- 📄 **Project report / PPT**
- 🧠 **Interview explanation**

Just tell me 👍
::contentReference[oaicite:0]{index=0}