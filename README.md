# 🚀 FinTrack API – Role-Based Finance Dashboard Backend

A robust backend system for managing financial data with **Role-Based Access Control (RBAC)** and comprehensive dashboard analytics.

---

## 📌 Overview

This project simulates an enterprise-grade finance dashboard backend where financial records are securely shared and accessed based on user roles.

### ✨ Core Features

- 💳 **Financial Record Management** – Full CRUD operations
- 🔐 **Role-Based Permissions** – Viewer, Analyst, Admin roles
- 📊 **Dashboard Analytics** – Summaries, trends, category insights
- 🛡️ **Secure Authentication** – JWT-based with HTTP-only cookies

---

## ⚙️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime |
| **TypeScript** | Type Safety |
| **Express.js** | REST Framework |
| **Prisma ORM** | Database Layer |
| **SQLite** | Database |
| **Zod** | Schema Validation |
| **JWT** | Authentication |

---

## 🏗️ Project Structure

```
src/
├── modules/
│   ├── user/
│   ├── financialRecord/
│   ├── dashboard/
│   └── auth/
├── middleware/
├── utils/
├── types/
└── prisma/
```

---

## 🔐 Authentication

All endpoints (except login) require a **JWT token** via HTTP-only cookie.

```
Cookie: access_token=<JWT_TOKEN>
```

---

## 📚 API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

---

### 🔑 Authentication

#### `POST /auth/login`
Authenticate user and issue JWT token via cookie.

**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "login successful"
}
```

---

### 👤 User Management (ADMIN Only)

#### `POST /user/create`
Create a new user with a specific role.
- Admin controls system access
- Used for onboarding users

#### `PATCH /user/:id`
Update user details partially.

**Request:**
```json
{
  "email": "string",
  "name": "string",
  "password": "string",
  "role": "ADMIN | ANALYST | VIEWER",
  "isActive": "boolean"
}
```

- Supports partial updates
- Password is never returned

#### `GET /user/all`
Fetch all users (admin management)

#### `GET /user/:id`
Fetch user by ID (inspection/debugging)

---

### 💰 Financial Records

#### `POST /financialRecord`
Create a financial entry (income or expense)

#### `GET /financialRecord/:id`
Fetch a single record

#### `GET /financialRecord/filter`
Filter records dynamically

**Supports:**
- Date range filtering
- Amount range filtering
- Category/type filtering
- Perfect for analytics & dashboards

#### `PATCH /financialRecord/:id`
Update a record (Admin only)
- Ensures data integrity

#### `DELETE /financialRecord/:id`
Delete a record (Admin only, hard delete)

---

### 📊 Dashboard Analytics

#### `GET /dashboard/summary` ⭐
**Main dashboard endpoint**

Returns:
- Total income
- Total expense
- Net balance

#### `GET /dashboard/income` & `/dashboard/expense`
Aggregated totals (used for charts)

#### `GET /dashboard/monthlyTrend`
Month-wise grouped data (visualize trends)

#### `GET /dashboard/categoryGroupedBalance`
Group by category (useful for insights)

#### `GET /dashboard/recent`
Latest transactions (activity feed)

---

## ⚖️ Design Assumptions

| Assumption | Details |
|-----------|---------|
| **Global Data Model** | Financial records are shared across users, not user-specific |
| **Write Access** | Only ADMIN can modify data |
| **Auth Storage** | JWT stored in HTTP-only cookies |
| **Data Scale** | Small dataset (no pagination needed) |
| **Date Format** | ISO 8601 standard |

---

## ⚙️ Trade-offs Analysis

| Trade-off | Pros | Cons |
|-----------|------|------|
| **Global Data Model** | ✅ Simpler design | ❌ Not scalable for multi-user ownership |
| **No Pagination** | ✅ Faster implementation | ❌ Poor scalability for large datasets |
| **Hard Deletes** | ✅ Simple logic | ❌ No recovery / audit trail |
| **No Refresh Tokens** | ✅ Easy auth implementation | ❌ Less secure long sessions |
| **Admin-Only Writes** | ✅ Strong consistency | ❌ Reduced flexibility |

---

## 📦 Environment Variables

```bash
DATABASE_URL=sqlite:./dev.db
JWT_SECRET=your_secret_key
```

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev

# Build the project
npm run build

# Seed admin user
npm run seedAdmin

# Start the server
npm run start
```

> 👉 **This project demonstrates engineering thinking, not just coding skills**

---

## 👨‍💻 Author

**Hardik Gupta**
