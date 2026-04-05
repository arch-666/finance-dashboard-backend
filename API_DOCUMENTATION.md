# 📚 FinTrack API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
All endpoints (except login) require a JWT token passed via HTTP-only cookie `access_token`.

**Authentication Header:**
```
Cookie: access_token=<JWT_TOKEN>
```

**Token obtained from:** `POST /auth/login`

---

## 📋 API Endpoints

### 🔑 Authentication

#### Login
**Endpoint:** `POST /auth/login`
- **Authentication:** None (Public)
- **Role:** All users
- **Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response:**
```json
{
  "message": "login successful"
}
```

**Status Codes:**
- `201` - Login successful (token set in cookie)
- `400` - Bad Request (invalid email/password format)
- `401` - Unauthorized (incorrect credentials)
- `500` - Server Error

**Example:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

---

### 👤 User Management

#### Create User
**Endpoint:** `POST /user/create`
- **Authentication:** Required (JWT)
- **Role:** ADMIN only
- **Description:** Create a new user with specified role

**Request Body:**
```json
{
  "email": "string (required)",
  "name": "string (required)",
  "password": "string (required)",
  "role": "ADMIN | ANALYST | VIEWER (required)",
  "isActive": "boolean (required)"
}
```

**Response:**
```json
{
  "message": "User created successfully"
}
```

**Status Codes:**
- `201` - User created successfully
- `400` - Bad Request (validation error)
- `403` - Forbidden (insufficient permissions)
- `500` - Server Error

**Example:**
```bash
curl -X POST http://localhost:3000/api/v1/user/create \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "email": "analyst@example.com",
    "name": "John Analyst",
    "password": "securepass123",
    "role": "ANALYST",
    "isActive": true
  }'
```

#### Get All Users
**Endpoint:** `GET /user/all`
- **Authentication:** Required (JWT)
- **Role:** ADMIN only
- **Description:** Retrieve all users in the system

**Response:**
```json
{
  "users": [
    {
      "id": "uuid",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "ADMIN",
      "isActive": true,
      "createdAt": "2026-04-05T10:00:00Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `403` - Forbidden (insufficient permissions)
- `500` - Server Error

**Example:**
```bash
curl -X GET http://localhost:3000/api/v1/user/all \
  -b cookies.txt
```

#### Get User by ID
**Endpoint:** `GET /user/:id`
- **Authentication:** Required (JWT)
- **Role:** ADMIN only
- **Description:** Retrieve a specific user by ID

**URL Parameters:**
- `id` - User UUID (required)

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "analyst@example.com",
    "name": "John Analyst",
    "role": "ANALYST",
    "isActive": true,
    "createdAt": "2026-04-05T10:00:00Z"
  }
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid ID format)
- `403` - Forbidden (insufficient permissions)
- `404` - User not found
- `500` - Server Error

**Example:**
```bash
curl -X GET http://localhost:3000/api/v1/user/550e8400-e29b-41d4-a716-446655440000 \
  -b cookies.txt
```

---

### 💰 Financial Records

#### Create Financial Record
**Endpoint:** `POST /financialRecord`
- **Authentication:** Required (JWT)
- **Role:** ADMIN only
- **Description:** Create a new financial record (income or expense)

**Request Body:**
```json
{
  "amount": "number (required, float32)",
  "type": "INCOME | EXPENSE (required)",
  "category": "string (required)",
  "date": "ISO 8601 date string (required)",
  "notes": "string (required)"
}
```

**Response:**
```json
{
  "financialRecord": {
    "id": "uuid",
    "amount": 5000.50,
    "type": "INCOME",
    "category": "Salary",
    "date": "2026-04-05",
    "notes": "Monthly salary",
    "createdAt": "2026-04-05T10:00:00Z"
  }
}
```

**Status Codes:**
- `200` - Record created successfully
- `400` - Bad Request (validation error)
- `403` - Forbidden (insufficient permissions)
- `500` - Server Error

**Example:**
```bash
curl -X POST http://localhost:3000/api/v1/financialRecord \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "amount": 5000.50,
    "type": "INCOME",
    "category": "Salary",
    "date": "2026-04-05",
    "notes": "Monthly salary payment"
  }'
```

#### Get Financial Record by ID
**Endpoint:** `GET /financialRecord/:id`
- **Authentication:** Required (JWT)
- **Role:** ADMIN, ANALYST, VIEWER
- **Description:** Retrieve a specific financial record

**URL Parameters:**
- `id` - Record UUID (required)

**Query Parameters (Optional Filters):**
- `type` - "INCOME" or "EXPENSE"
- `category` - Filter by category name
- `minDate` - Minimum date (ISO 8601)
- `maxDate` - Maximum date (ISO 8601)
- `minAmount` - Minimum amount
- `maxAmount` - Maximum amount

**Response:**
```json
{
  "financialRecord": {
    "id": "uuid",
    "amount": 5000.50,
    "type": "INCOME",
    "category": "Salary",
    "date": "2026-04-05",
    "notes": "Monthly salary",
    "createdAt": "2026-04-05T10:00:00Z"
  }
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid ID format)
- `403` - Forbidden (insufficient permissions)
- `404` - Record not found
- `500` - Server Error

**Example:**
```bash
curl -X GET http://localhost:3000/api/v1/financialRecord/550e8400-e29b-41d4-a716-446655440000 \
  -b cookies.txt
```

#### Get Filtered Financial Records
**Endpoint:** `GET /financialRecord/filter`
- **Authentication:** Required (JWT)
- **Role:** ADMIN, ANALYST, VIEWER
- **Description:** Retrieve financial records with filtering options

**Query Parameters (All Optional):**
- `type` - "INCOME" or "EXPENSE"
- `category` - Filter by category name
- `minDate` - Minimum date (ISO 8601 format)
- `maxDate` - Maximum date (ISO 8601 format)
- `minAmount` - Minimum amount (numeric)
- `maxAmount` - Maximum amount (numeric)

**Response:**
```json
{
  "financialRecord": [
    {
      "id": "uuid",
      "amount": 5000.50,
      "type": "INCOME",
      "category": "Salary",
      "date": "2026-04-05",
      "notes": "Monthly salary",
      "createdAt": "2026-04-05T10:00:00Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid query parameters)
- `403` - Forbidden (insufficient permissions)
- `500` - Server Error

**Example:**
```bash
curl -X GET "http://localhost:3000/api/v1/financialRecord/filter?type=INCOME&category=Salary&minAmount=1000" \
  -b cookies.txt
```

#### Update Financial Record
**Endpoint:** `PATCH /financialRecord/:id`
- **Authentication:** Required (JWT)
- **Role:** ADMIN only
- **Description:** Update an existing financial record (all fields optional)

**URL Parameters:**
- `id` - Record UUID (required)

**Request Body (All Optional):**
```json
{
  "amount": "number (optional)",
  "type": "INCOME | EXPENSE (optional)",
  "category": "string (optional)",
  "date": "ISO 8601 date string (optional)",
  "notes": "string (optional)"
}
```

**Response:**
```json
{
  "financialRecord": {
    "id": "uuid",
    "amount": 5500.00,
    "type": "INCOME",
    "category": "Salary",
    "date": "2026-04-05",
    "notes": "Updated monthly salary",
    "createdAt": "2026-04-05T10:00:00Z",
    "updatedAt": "2026-04-05T11:00:00Z"
  }
}
```

**Status Codes:**
- `200` - Record updated successfully
- `400` - Bad Request (validation error)
- `403` - Forbidden (insufficient permissions)
- `404` - Record not found
- `500` - Server Error

**Example:**
```bash
curl -X PATCH http://localhost:3000/api/v1/financialRecord/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "amount": 5500.00,
    "notes": "Updated monthly salary"
  }'
```

#### Delete Financial Record
**Endpoint:** `DELETE /financialRecord/:id`
- **Authentication:** Required (JWT)
- **Role:** ADMIN only
- **Description:** Delete a financial record

**URL Parameters:**
- `id` - Record UUID (required)

**Response:**
```json
{
  "financialRecord": {
    "id": "uuid",
    "amount": 5000.50,
    "type": "INCOME",
    "category": "Salary",
    "date": "2026-04-05",
    "notes": "Monthly salary",
    "createdAt": "2026-04-05T10:00:00Z"
  }
}
```

**Status Codes:**
- `200` - Record deleted successfully
- `400` - Bad Request (invalid ID format)
- `403` - Forbidden (insufficient permissions)
- `404` - Record not found
- `500` - Server Error

**Example:**
```bash
curl -X DELETE http://localhost:3000/api/v1/financialRecord/550e8400-e29b-41d4-a716-446655440000 \
  -b cookies.txt
```

---

### 📊 Dashboard Analytics

#### Get Total Income
**Endpoint:** `GET /dashboard/income`
- **Authentication:** Required (JWT)
- **Role:** ADMIN, ANALYST
- **Description:** Get total income across all records

**Response:**
```json
{
  "income": 50000.75
}
```

**Status Codes:**
- `200` - Success
- `403` - Forbidden (insufficient permissions)
- `500` - Server Error

**Example:**
```bash
curl -X GET http://localhost:3000/api/v1/dashboard/income \
  -b cookies.txt
```

#### Get Total Expense
**Endpoint:** `GET /dashboard/expense`
- **Authentication:** Required (JWT)
- **Role:** ADMIN, ANALYST
- **Description:** Get total expenses across all records

**Response:**
```json
{
  "expense": 25000.50
}
```

**Status Codes:**
- `200` - Success
- `403` - Forbidden (insufficient permissions)
- `500` - Server Error

**Example:**
```bash
curl -X GET http://localhost:3000/api/v1/dashboard/expense \
  -b cookies.txt
```

#### Get Net Balance
**Endpoint:** `GET /dashboard/netBalance`
- **Authentication:** Required (JWT)
- **Role:** ADMIN, ANALYST
- **Description:** Get net balance (income - expenses)

**Response:**
```json
{
  "netBalance": 25000.25
}
```

**Status Codes:**
- `200` - Success
- `403` - Forbidden (insufficient permissions)
- `500` - Server Error

**Example:**
```bash
curl -X GET http://localhost:3000/api/v1/dashboard/netBalance \
  -b cookies.txt
```

#### Get Transaction Summary
**Endpoint:** `GET /dashboard/summary`
- **Authentication:** Required (JWT)
- **Role:** ADMIN, ANALYST, VIEWER
- **Description:** Get summary of all transactions (total count and basic stats)

**Response:**
```json
{
  "transactionSummary": {
    "totalTransactions": 150,
    "totalIncome": 50000.75,
    "totalExpense": 25000.50,
    "netBalance": 25000.25
  }
}
```

**Status Codes:**
- `200` - Success
- `403` - Forbidden (insufficient permissions)
- `500` - Server Error

**Example:**
```bash
curl -X GET http://localhost:3000/api/v1/dashboard/summary \
  -b cookies.txt
```

#### Get Recent Transactions
**Endpoint:** `GET /dashboard/recent`
- **Authentication:** Required (JWT)
- **Role:** ADMIN, ANALYST
- **Description:** Get most recent financial transactions

**Response:**
```json
{
  "recentTransaction": [
    {
      "id": "uuid",
      "amount": 1000.50,
      "type": "EXPENSE",
      "category": "Food",
      "date": "2026-04-05",
      "notes": "Lunch expense",
      "createdAt": "2026-04-05T12:00:00Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `403` - Forbidden (insufficient permissions)
- `500` - Server Error

**Example:**
```bash
curl -X GET http://localhost:3000/api/v1/dashboard/recent \
  -b cookies.txt
```

#### Get Monthly Trends
**Endpoint:** `GET /dashboard/monthlyTrend`
- **Authentication:** Required (JWT)
- **Role:** ADMIN, ANALYST
- **Description:** Get income and expense trends by month

**Response:**
```json
{
  "monthlyTrend": [
    {
      "month": "2026-04",
      "income": 15000.00,
      "expense": 8000.50,
      "netBalance": 6999.50
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `403` - Forbidden (insufficient permissions)
- `500` - Server Error

**Example:**
```bash
curl -X GET http://localhost:3000/api/v1/dashboard/monthlyTrend \
  -b cookies.txt
```

#### Get Category-wise Balance
**Endpoint:** `GET /dashboard/categoryGroupedBalance`
- **Authentication:** Required (JWT)
- **Role:** ADMIN, ANALYST
- **Description:** Get income and expense aggregated by category

**Response:**
```json
{
  "categoryGroupedBalance": [
    {
      "category": "Salary",
      "incomeAmount": 50000.00,
      "expenseAmount": 0.00,
      "netAmount": 50000.00
    },
    {
      "category": "Food",
      "incomeAmount": 0.00,
      "expenseAmount": 5000.50,
      "netAmount": -5000.50
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `403` - Forbidden (insufficient permissions)
- `500` - Server Error

**Example:**
```bash
curl -X GET http://localhost:3000/api/v1/dashboard/categoryGroupedBalance \
  -b cookies.txt
```

---

## 🔐 Role-Based Access Control (RBAC)

### Roles and Permissions

| Endpoint | VIEWER | ANALYST | ADMIN |
|----------|--------|---------|-------|
| POST /auth/login | ✅ | ✅ | ✅ |
| POST /user/create | ❌ | ❌ | ✅ |
| GET /user/all | ❌ | ❌ | ✅ |
| GET /user/:id | ❌ | ❌ | ✅ |
| POST /financialRecord | ❌ | ❌ | ✅ |
| GET /financialRecord/:id | ✅ | ✅ | ✅ |
| GET /financialRecord/filter | ✅ | ✅ | ✅ |
| PATCH /financialRecord/:id | ❌ | ❌ | ✅ |
| DELETE /financialRecord/:id | ❌ | ❌ | ✅ |
| GET /dashboard/income | ❌ | ✅ | ✅ |
| GET /dashboard/expense | ❌ | ✅ | ✅ |
| GET /dashboard/netBalance | ❌ | ✅ | ✅ |
| GET /dashboard/summary | ✅ | ✅ | ✅ |
| GET /dashboard/recent | ❌ | ✅ | ✅ |
| GET /dashboard/monthlyTrend | ❌ | ✅ | ✅ |
| GET /dashboard/categoryGroupedBalance | ❌ | ✅ | ✅ |

---

## ⚠️ Error Handling

### Standard Error Responses

**400 - Bad Request**
```json
{
  "error": "Invalid request payload",
  "details": "amount must be a number"
}
```

**401 - Unauthorized**
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

**403 - Forbidden**
```json
{
  "error": "Forbidden",
  "message": "You do not have permission to access this resource"
}
```

**404 - Not Found**
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

**500 - Server Error**
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## 📝 Request Validation

All requests are validated using Zod schemas. Common validation errors:

- `amount`: Must be a valid number (float32)
- `type`: Must be either "INCOME" or "EXPENSE"
- `category`: Must be a non-empty string
- `date`: Must be a valid ISO 8601 date string
- `notes`: Must be a non-empty string
- `email`: Must be a valid email string
- `password`: Must be a non-empty string
- `role`: Must be "ADMIN", "ANALYST", or "VIEWER"
- `isActive`: Must be a boolean

---

## 🔗 Authentication Flow

1. **Login** → `POST /auth/login` with email & password
2. **Receive JWT** → Token is set in `access_token` HTTP-only cookie
3. **Use in Requests** → Cookie is automatically sent with subsequent requests
4. **Token Expiry** → 1 hour (3600000 ms)

---

## 🧪 Testing the API

### Using cURL

```bash
# Step 1: Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password"
  }' \
  -c cookies.txt

# Step 2: Use authenticated endpoints
curl -X GET http://localhost:3000/api/v1/dashboard/summary \
  -b cookies.txt
```

### Using Postman

1. Set up a POST request to `http://localhost:3000/api/v1/auth/login`
2. Add credentials in request body
3. In Postman settings, enable "automatically follow redirects"
4. Cookies will be stored automatically
5. Use stored cookies in subsequent requests

---

## 📦 Environment Setup

Required environment variables:
```
DATABASE_URL=sqlite:./dev.db
JWT_SECRET=your_secret_key_here
```

---

## 🚀 Development Server

```bash
npm install
npx prisma migrate dev
npm run dev
```

Server runs on `http://localhost:3000`