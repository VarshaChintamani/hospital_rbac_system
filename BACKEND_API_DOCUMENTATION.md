# Hospital RBAC System - Backend API Documentation

## Overview

A Node.js + Express + PostgreSQL backend providing comprehensive REST APIs for hospital management with Role-Based Access Control (RBAC). All endpoints require JWT authentication except login and register.

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                    # Database configuration
│   ├── controllers/
│   │   ├── authController.js        # Authentication endpoints
│   │   ├── patientController.js     # Patient management
│   │   ├── userController.js        # User/Doctor management
│   │   ├── appointmentController.js # Appointments
│   │   ├── emergencyController.js   # Emergency access
│   │   ├── roleController.js        # Roles
│   │   ├── departmentController.js  # Departments
│   │   ├── permissionController.js  # Permissions
│   │   ├── rolePermissionController.js # Role-permissions
│   │   ├── medicalRecordController.js  # Medical records
│   │   └── auditLogController.js    # Audit logs
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── rbacMiddleware.js        # Role-based access control
│   ├── models/
│   │   ├── userModel.js             # User database operations
│   │   ├── patientModel.js          # Patient database operations
│   │   ├── appointmentModel.js      # Appointment database operations
│   │   ├── roleModel.js             # Role database operations
│   │   ├── departmentModel.js       # Department database operations
│   │   ├── permissionModel.js       # Permission database operations
│   │   ├── rolePermissionModel.js   # Role-permission database operations
│   │   ├── medicalRecordModel.js    # Medical record database operations
│   │   ├── emergencyAccessModel.js  # Emergency access database operations
│   │   └── auditLogModel.js         # Audit log database operations
│   ├── routes/
│   │   ├── authRoutes.js            # Auth routes
│   │   ├── userRoutes.js            # User routes
│   │   ├── patientRoutes.js         # Patient routes
│   │   ├── appointmentRoutes.js     # Appointment routes
│   │   ├── emergencyRoutes.js       # Emergency access routes
│   │   ├── roleRoutes.js            # Role routes
│   │   ├── departmentRoutes.js      # Department routes
│   │   ├── permissionRoutes.js      # Permission routes
│   │   ├── rolePermissionRoutes.js  # Role-permission routes
│   │   ├── medicalRecordRoutes.js   # Medical record routes
│   │   └── auditLogRoutes.js        # Audit log routes
│   ├── services/
│   │   ├── rbacService.js           # RBAC utility functions
│   │   └── emergencyService.js      # Emergency access service
│   ├── utils/
│   │   └── logger.js                # Audit logging utility
│   ├── app.js                       # Express app configuration
│   └── server.js                    # Server entry point
├── package.json
├── .env                             # Environment variables
└── README.md
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create `.env` file:
```
DATABASE_URL=postgresql://user:password@localhost:5432/hospital_db
JWT_SECRET=your_jwt_secret_key
```

### 3. Database Setup
```sql
-- Create the database and tables using the schema
-- (See database/schema in the project root)
```

### 4. Start Server
```bash
npm start
# Or with nodemon for development
nodemon src/server.js
```

Server runs on `http://localhost:5000`

## Dependencies

- **express**: ^5.2.1 - Web framework
- **pg**: ^8.20.0 - PostgreSQL client
- **mysql2**: ^3.19.1 - MySQL client (alternative)
- **jsonwebtoken**: ^9.0.3 - JWT authentication
- **bcryptjs**: ^3.0.3 - Password hashing
- **cors**: ^2.8.6 - Cross-origin resource sharing
- **dotenv**: ^17.3.1 - Environment variables

## Database Schema

### Tables

#### users
```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### patients
```sql
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender VARCHAR(10),
    phone VARCHAR(20),
    address TEXT,
    medical_history TEXT,
    assigned_doctor INT REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### appointments
```sql
CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(patient_id),
    doctor_id INT REFERENCES users(user_id),
    appointment_date TIMESTAMP,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### roles
```sql
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);
```

#### departments
```sql
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);
```

#### permissions
```sql
CREATE TABLE permissions (
    permission_id SERIAL PRIMARY KEY,
    permission_name VARCHAR(100) NOT NULL
);
```

#### role_permissions
```sql
CREATE TABLE role_permissions (
    role_permission_id SERIAL PRIMARY KEY,
    role_id INT REFERENCES roles(role_id) ON DELETE CASCADE,
    permission_id INT REFERENCES permissions(permission_id) ON DELETE CASCADE
);
```

#### medical_records
```sql
CREATE TABLE medical_records (
    record_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(patient_id),
    doctor_id INT REFERENCES users(user_id),
    diagnosis TEXT,
    prescription TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### emergency_access
```sql
CREATE TABLE emergency_access (
    access_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    patient_id INT REFERENCES patients(patient_id),
    reason TEXT NOT NULL,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active'
);
```

#### audit_logs
```sql
CREATE TABLE audit_logs (
    log_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    action TEXT NOT NULL,
    patient_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role_id": 2
}
Response: {
  "message": "User registered successfully",
  "user": { user_id, name, email, role_id }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json
Body: {
  "email": "john@example.com",
  "password": "password123"
}
Response: {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Patients

```
GET /api/patients              # Get all patients
POST /api/patients             # Create patient
GET /api/patients/:id          # Get patient by ID
PUT /api/patients/:id          # Update patient
DELETE /api/patients/:id       # Delete patient
```

**Create/Update Body**:
```json
{
  "name": "Jane Smith",
  "age": 28,
  "gender": "Female",
  "phone": "987-654-3210",
  "address": "123 Main St",
  "medical_history": "Diabetes",
  "assigned_doctor": 2
}
```

### Users (Doctors)

```
GET /api/users                 # Get all users
POST /api/users                # Create user (admin)
GET /api/users/:id             # Get user by ID
PUT /api/users/:id             # Update user
DELETE /api/users/:id          # Delete user
```

**Create/Update Body**:
```json
{
  "name": "Dr. Robert",
  "email": "doctor@example.com",
  "role_id": 2
}
```

### Appointments

```
GET /api/appointments          # Get all appointments
POST /api/appointments         # Create appointment
GET /api/appointments/:id      # Get appointment by ID
PUT /api/appointments/:id      # Update appointment
DELETE /api/appointments/:id   # Delete appointment
```

**Create/Update Body**:
```json
{
  "patient_id": 1,
  "doctor_id": 2,
  "appointment_date": "2026-03-15T10:00:00Z",
  "status": "scheduled"
}
```

### Roles

```
GET /api/roles                 # Get all roles
POST /api/roles                # Create role
GET /api/roles/:id             # Get role by ID
PUT /api/roles/:id             # Update role
DELETE /api/roles/:id          # Delete role
```

**Create/Update Body**:
```json
{
  "role_name": "Doctor"
}
```

### Departments

```
GET /api/departments           # Get all departments
POST /api/departments          # Create department
GET /api/departments/:id       # Get department by ID
PUT /api/departments/:id       # Update department
DELETE /api/departments/:id    # Delete department
```

**Create/Update Body**:
```json
{
  "department_name": "Cardiology"
}
```

### Permissions

```
GET /api/permissions           # Get all permissions
POST /api/permissions          # Create permission
GET /api/permissions/:id       # Get permission by ID
PUT /api/permissions/:id       # Update permission
DELETE /api/permissions/:id    # Delete permission
```

**Create/Update Body**:
```json
{
  "permission_name": "Read Patient Records"
}
```

### Role-Permissions

```
GET /api/role-permissions      # Get all role-permissions
POST /api/role-permissions     # Create role-permission
GET /api/role-permissions/:id  # Get role-permission by ID
PUT /api/role-permissions/:id  # Update role-permission
DELETE /api/role-permissions/:id # Delete role-permission
```

**Create/Update Body**:
```json
{
  "role_id": 2,
  "permission_id": 1
}
```

### Medical Records

```
GET /api/medical-records       # Get all medical records
POST /api/medical-records      # Create medical record
GET /api/medical-records/:id   # Get medical record by ID
PUT /api/medical-records/:id   # Update medical record
DELETE /api/medical-records/:id # Delete medical record
```

**Create/Update Body**:
```json
{
  "patient_id": 1,
  "doctor_id": 2,
  "diagnosis": "Hypertension",
  "prescription": "Lisinopril 10mg daily",
  "notes": "Monitor BP regularly"
}
```

### Emergency Access

```
POST /api/emergency            # Request emergency access
GET /api/emergency             # Get all emergency access logs
GET /api/emergency/:id         # Get emergency access by ID
PUT /api/emergency/:id         # Update emergency access
DELETE /api/emergency/:id      # Delete emergency access
```

**Request Body**:
```json
{
  "patient_id": 1,
  "reason": "Life-threatening emergency"
}
```

**Update Body**:
```json
{
  "user_id": 1,
  "patient_id": 1,
  "reason": "ICU monitoring required",
  "status": "granted"
}
```

### Audit Logs

```
GET /api/audit-logs            # Get all audit logs
POST /api/audit-logs           # Create audit log
GET /api/audit-logs/:id        # Get audit log by ID
PUT /api/audit-logs/:id        # Update audit log
DELETE /api/audit-logs/:id     # Delete audit log
```

**Create/Update Body**:
```json
{
  "user_id": 1,
  "action": "Viewed patient record",
  "patient_id": 5
}
```

## Authentication

All endpoints except `/api/auth/login` and `/api/auth/register` require JWT authentication.

### Authorization Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### JWT Token Structure
```json
{
  "id": 1,
  "role": 2,
  "iat": 1234567890,
  "exp": 1234571490
}
```

## Middleware

### authMiddleware.js
- Verifies JWT token
- Extracts user ID and role from token
- Attaches user info to request object
- Returns 401 if token is invalid or missing

### rbacMiddleware.js
- Checks if user has required role
- Enforces role-based access control
- Returns 403 if user lacks permission

## Error Handling

All errors return appropriate HTTP status codes:
- **400**: Bad request (validation error)
- **401**: Unauthorized (missing/invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not found
- **500**: Server error

Error Response Format:
```json
{
  "error": "Error message describing the issue"
}
```

## Security Features

1. **Password Hashing**: bcryptjs with 10 salt rounds
2. **JWT Tokens**: Secure token-based authentication
3. **CORS**: Configured to allow frontend requests
4. **Validation**: Input validation on all endpoints
5. **Audit Logging**: All critical actions logged
6. **Foreign Keys**: Database-level referential integrity

## Example Usage

### 1. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Smith",
    "email": "smith@hospital.com",
    "password": "secure123",
    "role_id": 2
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "smith@hospital.com",
    "password": "secure123"
  }'
```

### 3. Get All Patients
```bash
curl -X GET http://localhost:5000/api/patients \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Create Patient
```bash
curl -X POST http://localhost:5000/api/patients \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 45,
    "gender": "Male",
    "phone": "555-1234",
    "address": "123 Main St",
    "medical_history": "None",
    "assigned_doctor": 2
  }'
```

## Performance Considerations

1. **Database Indexing**: Add indexes on frequently queried columns
2. **Pagination**: Implement pagination for large datasets
3. **Caching**: Consider caching for read-heavy operations
4. **Connection Pooling**: PostgreSQL connection pool configured in db.js

## Future Enhancements

1. Advanced search and filtering
2. Pagination support
3. Data export functionality
4. Real-time notifications
5. Backup and recovery procedures
6. API rate limiting
7. Advanced logging and monitoring
8. Webhook support for integrations

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure user has correct permissions

### JWT Token Errors
- Verify JWT_SECRET matches on login and other endpoints
- Check token hasn't expired
- Ensure token is included in Authorization header

### Port Already in Use
- Change PORT in .env (default: 5000)
- Or kill the process using port 5000

## Notes

- All timestamps use CURRENT_TIMESTAMP from database
- Patient IDs must exist before creating appointments or medical records
- Delete operations cascade appropriately for role_permissions table
- Emergency access grants 30-minute default access (configurable)
- Audit logs are automatically created for critical operations
