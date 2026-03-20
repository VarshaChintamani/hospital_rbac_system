# Hospital RBAC System

A comprehensive Role-Based Access Control (RBAC) system for hospital management built with modern web technologies. This system provides complete management of patients, doctors, appointments, medical records, roles, permissions, departments, and emergency access with a professional UI and secure backend.

For Website URL:- [CLick Here](https://hospitalrbacsystem-production.up.railway.app/)

## 🏥 Features

### Core Functionality
- ✅ User Authentication (Login/Register with JWT)
- ✅ Patient Management (CRUD operations)
- ✅ Doctor/User Management
- ✅ Appointment Scheduling
- ✅ Medical Records Management
- ✅ Emergency Access Control
- ✅ Role-Based Access Control (RBAC)
- ✅ Department Management
- ✅ Permissions Management
- ✅ Audit Logging

### Technical Features
- 🔐 Secure JWT Authentication
- 🗄️ PostgreSQL Database with referential integrity
- 🎨 Material-UI Professional Frontend
- 📱 Responsive Design
- 🔍 Complete CRUD API
- 📊 Audit Trail & Logging
- ⚡ Fast & Scalable Architecture

## 📋 Project Structure

```
hospital-rbac-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   ├── .env
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   └── index.html
├── database/
├── docs/
├── FRONTEND_DOCUMENTATION.md
├── BACKEND_API_DOCUMENTATION.md
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ 
- npm or yarn
- PostgreSQL 10+
- Git

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```
DATABASE_URL=postgresql://user:password@localhost:5432/hospital_db
JWT_SECRET=your_very_secret_key_here_change_in_production
```

4. **Create database and tables**
```bash
# Run the SQL schema provided in database/ folder
```

5. **Start the server**
```bash
npm start
# Or with nodemon for development
nodemon src/server.js
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

4. **Build for production**
```bash
npm run build
```

## 🔑 Default Login Credentials

After setting up the database and running seed data:

```
Email: test@example.com
Password: password123
```

(These are demo credentials - change in production!)

## 📚 Documentation

### Detailed Documentation Files
- [**Frontend Documentation**](./FRONTEND_DOCUMENTATION.md) - Complete guide to frontend components, services, and features
- [**Backend API Documentation**](./BACKEND_API_DOCUMENTATION.md) - Complete API reference and database schema

### Key Sections
- Project structure
- Dependencies and installation
- API endpoints and usage
- Database schema
- Authentication flow
- Error handling
- Deployment instructions

## 🏗️ Architecture

### Frontend (React + TypeScript + Material-UI)
```
User Interface
    ↓
Services Layer (axios, API calls)
    ↓
Components & Pages (React)
    ↓
State Management (useState, localStorage)
```

### Backend (Node.js + Express + PostgreSQL)
```
HTTP Request
    ↓
Router (Express)
    ↓
Middleware (auth, rbac)
    ↓
Controller (business logic)
    ↓
Model (database operations)
    ↓
PostgreSQL Database
```

## 🔐 Security Features

### Authentication
- JWT token-based authentication
- Password hashing with bcryptjs (10 rounds)
- Secure token storage in localStorage

### Authorization
- Role-Based Access Control (RBAC)
- Role-Permission mapping
- Protected API endpoints

### Data Protection
- CORS enabled for safe cross-origin requests
- Input validation on all endpoints
- Prepared statements to prevent SQL injection
- Foreign key constraints for data integrity

### Audit & Logging
- Complete audit trail of all actions
- Automatic logging of critical operations
- Timestamps for all records

## 🗄️ Database

### Connected Tables
1. **users** - System users (doctors, admins, etc.)
2. **patients** - Patient records
3. **appointments** - Appointment scheduling
4. **roles** - User roles
5. **permissions** - System permissions
6. **role_permissions** - Role-permission assignments
7. **departments** - Hospital departments
8. **medical_records** - Patient medical history
9. **emergency_access** - Emergency access logs
10. **audit_logs** - System activity logs

### Database Relationships
- Users ← Patients (doctor assignment)
- Appointments ← Users (doctor) ← Patients
- Medical Records ← Patients, Users
- Emergency Access ← Users, Patients
- Role ← Permission (many-to-many via role_permissions)

## 📱 Pages & Modules

### Public Pages
- **Login** - User authentication

### Protected Pages (Require Authentication)
- **Dashboard** - Central hub with module navigation
- **Patients** - Patient CRUD operations
- **Doctors** - Doctor/user management
- **Appointments** - Schedule and manage appointments
- **Medical Records** - Patient medical history
- **Roles** - Role management
- **Departments** - Department management
- **Permissions** - Permission management
- **Role Permissions** - Map permissions to roles
- **Emergency Access** - Emergency access requests
- **Audit Logs** - System activity logs

## 🔄 API Endpoints Summary

### Authentication (No Auth Required)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Protected Endpoints (Require JWT Token)
- `GET/POST /api/patients` - Patient list and create
- `GET/PUT/DELETE /api/patients/:id` - Patient operations
- `GET/POST /api/users` - User management
- `GET/POST /api/appointments` - Appointment management
- `GET/POST /api/roles` - Role management
- `GET/POST /api/departments` - Department management
- `GET/POST /api/permissions` - Permission management
- `GET/POST /api/role-permissions` - Role-permission mapping
- `GET/POST /api/medical-records` - Medical record management
- `POST/GET /api/emergency` - Emergency access
- `GET/POST /api/audit-logs` - Audit logs

See [Backend API Documentation](./BACKEND_API_DOCUMENTATION.md) for detailed endpoints.

## 🛠️ Technology Stack

### Frontend
- **React** 19.2.0 - UI library
- **TypeScript** 5.9 - Type safety
- **Material-UI** 7.3.9 - UI components
- **React Router** 7.13.1 - Routing
- **Axios** 1.13.6 - HTTP client
- **Vite** 7.3.1 - Build tool
- **Emotion** - CSS-in-JS styling

### Backend
- **Node.js** - JavaScript runtime
- **Express** 5.2.1 - Web framework
- **PostgreSQL** - Primary database
- **jsonwebtoken** 9.0.3 - JWT auth
- **bcryptjs** 3.0.3 - Password hashing
- **dotenv** 17.3.1 - Environment configuration
- **CORS** - Cross-origin requests
- **pg** 8.20.0 - PostgreSQL client

## 📦 Installation Summary

### Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Install Backend Dependencies
```bash
cd backend
npm install
```

### Databases Setup
```bash
# Create PostgreSQL database
createdb hospital_db

# Run schema from database/schema.sql
psql hospital_db < ../database/schema.sql
```

## 🚦 Running the Application

### Terminal 1 - Backend
```bash
cd backend
npm start
# Runs on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

### Access Application
Open browser and navigate to `http://localhost:5173`

## 📊 Sample Data

To populate with sample data, run the provided SQL seed file:
```bash
psql hospital_db < database/seed.sql
```

## 🔍 Testing API

### Using Thunder Client
1. Set base URL: `http://localhost:5000/api`
2. Login first to get token
3. Add token to Authorization header: `Bearer <token>`
4. Test endpoints

### Using cURL
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get token from response and use it:
curl -X GET http://localhost:5000/api/patients \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🐛 Troubleshooting

### Backend Issues
- **Port already in use**: Change port in .env or kill process on port 5000
- **Database connection error**: Check PostgreSQL is running and DATABASE_URL is correct
- **CORS errors**: Verify CORS is enabled in app.js

### Frontend Issues
- **API not responding**: Ensure backend is running on port 5000
- **Token errors**: Check localStorage and verify token format
- **Components not rendering**: Check console for import errors

### Database Issues
- **Connection refused**: Start PostgreSQL service
- **Table doesn't exist**: Run database schema setup
- **Permission denied**: Check database user permissions

## 📝 License

MIT License - feel free to use for educational and commercial purposes

## 👥 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For issues, questions, or suggestions:
1. Check the documentation files
2. Review the troubleshooting section
3. Check existing issues
4. Create a new issue with detailed information

## 🎯 Future Enhancements

- [ ] Advanced search and filtering
- [ ] Data pagination
- [ ] PDF/CSV export
- [ ] Real-time notifications
- [ ] Dashboard analytics
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Two-factor authentication
- [ ] Advanced reporting
- [ ] API rate limiting
- [ ] Data backup automation
- [ ] Performance monitoring

## ✅ Checklist

- [x] Complete CRUD API for all modules
- [x] Professional Material-UI frontend
- [x] JWT authentication
- [x] RBAC implementation
- [x] Database schema with referential integrity
- [x] Error handling and validation
- [x] Audit logging
- [x] Comprehensive documentation
- [x] Responsive design
- [x] Form validation

## 📄 Documentation Files

1. **FRONTEND_DOCUMENTATION.md** - Complete frontend guide
2. **BACKEND_API_DOCUMENTATION.md** - API reference and database schema
3. **README.md** (this file) - Project overview and quick start

---

**Last Updated**: March 10, 2026
**Status**: Production Ready
**Version**: 1.0.0
