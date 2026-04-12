# Academic Module Tracker (v2)

> 🚧 **Currently in development** — Transitioning from a basic version to an industry-standard architecture using Next.js, NestJS, and Prisma.

---

## 📖 Overview

**Academic Module Tracker** is an industry-style academic management and analytics system designed to manage syllabus coverage, attendance, internal marks, and academic reports in a modular and scalable architecture.

This project is built using a modern full-stack architecture with **Next.js (SSR)** for the frontend and **NestJS with Prisma ORM** for the backend, following a **monorepo structure**.

The system supports multiple user roles such as **Admin**, **HOD**, **Teacher**, and **Student**, with secure authentication and role-based access control.

---

## ✨ Features

### 📚 Academic Management

- Syllabus Topic & Subtopic Coverage Tracking
- Attendance Management
- Internal Marks Management
- Result & Grade Calculation
- Academic Progress Tracking

### 👥 User Roles

- Admin
- HOD (Head of Department)
- Teacher / Faculty
- Student

### ⚙️ System Features

- Role-Based Access Control (RBAC)
- Analytics Dashboard
- Excel Report Export
- Audit Logging
- Secure Authentication (JWT + Passport)
- REST API Architecture
- Server-Side Rendering (Next.js)
- Modular Backend Architecture

---

## 🛠️ Tech Stack

### Frontend

| Technology                | Purpose              |
| ------------------------- | -------------------- |
| Next.js (App Router, SSR) | Framework            |
| TypeScript                | Language             |
| Tailwind CSS              | Styling              |
| Shadcn UI                 | UI Components        |
| TanStack Table            | Data Tables          |
| TanStack Query            | Server State         |
| React Hook Form + Zod     | Forms & Validation   |
| Recharts                  | Charts               |
| nuqs                      | URL State Management |
| sonner                    | Toast Notifications  |
| lucide-react              | Icons                |

### Backend

| Technology        | Purpose           |
| ----------------- | ----------------- |
| NestJS            | Framework         |
| Prisma ORM        | Database ORM      |
| MySQL             | Database          |
| JWT + Passport.js | Authentication    |
| ExcelJS           | Excel Reports     |
| Multer            | File Upload       |
| Nodemailer        | Email Service     |
| Winston           | Logging           |
| Swagger           | API Documentation |
| Throttler         | Rate Limiting     |
| Helmet            | Security          |

### DevOps

| Technology            | Purpose           |
| --------------------- | ----------------- |
| Docker                | Containerization  |
| GitHub Actions        | CI/CD             |
| Monorepo Architecture | Project Structure |

---

## 📁 Project Structure

```
academic-module-tracker/
│
├── frontend/      # Next.js Frontend (SSR)
├── backend/       # NestJS Backend (API + Business Logic)
├── docs/          # Diagrams, documentation, screenshots
├── docker/        # Docker configuration
├── .gitattributes
├── .gitignore
└── README.md
```

---

## 🏗️ Backend Architecture

```
Controller → Service → Prisma → MySQL
            ↓
           DTO
            ↓
        Validation
            ↓
          Guards (RBAC)
```

---

## 📦 Modules

### Core Modules

- ⬜ Auth Module
- ⬜ Users Module
- ⬜ Roles / RBAC Module
- ⬜ Department Module
- ⬜ Course Module
- ⬜ Semester Module
- ⬜ Academic Year Module

### Academic Modules

- ⬜ Student Module
- ⬜ Faculty Module
- ⬜ Subject Module
- ⬜ Topic & Subtopic Module
- ⬜ Topic Coverage Module
- ⬜ Attendance Module
- ⬜ Internal Marks Module
- ⬜ Result Module

### System Modules

- ⬜ Reports Module (Excel Export)
- ⬜ Dashboard / Analytics Module
- ⬜ Audit Log Module
- ⬜ Notification Module

---

## 🚀 Installation & Setup

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/academic-module-tracker-v2.git
cd academic-module-tracker-v2
```

### Backend Setup

```bash
cd backend
npm install
npx prisma init
npm run start:dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📝 Commit Convention

| Type       | Description   |
| ---------- | ------------- |
| `setup`    | Project setup |
| `feat`     | New feature   |
| `fix`      | Bug fix       |
| `refactor` | Code refactor |
| `docs`     | Documentation |

### Example Commit Messages

```
setup: project monorepo setup
feat: add auth module
feat: add student module
fix: login validation issue
refactor: student service logic
docs: update README
```

---

## 🔮 Future Improvements

- ⬜ Redis Caching
- ⬜ Queue System (BullMQ)
- ⬜ AWS S3 File Storage
- ⬜ Real-time Notifications
- ⬜ Docker Deployment
- ⬜ CI/CD Pipeline
- ⬜ Unit & Integration Testing

---

## 👤 Author

**Kaushik Rajbongshi**  
_MSc Computer Science Project — Academic Module Tracker (Industry Version)_

---

## 📄 License

This project is for **educational and academic purposes** only.
