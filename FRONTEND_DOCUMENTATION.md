# Hospital RBAC System - Frontend Documentation

## Overview

A comprehensive React + TypeScript + Material-UI based frontend for managing hospital operations with Role-Based Access Control (RBAC). The system provides complete CRUD operations for all hospital management modules.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation component
│   │   ├── PatientTable.tsx      # Reusable patient table
│   │   └── Navvbar.tsx           # Alternative navbar
│   ├── pages/
│   │   ├── Login.tsx            # Login page
│   │   ├── Dashboard.tsx        # Main dashboard with module navigation
│   │   ├── Patients.tsx         # Patient CRUD operations
│   │   ├── Doctors.tsx          # Doctor management
│   │   ├── Appointments.tsx     # Appointment scheduling
│   │   ├── Roles.tsx            # Role management
│   │   ├── Departments.tsx      # Department management
│   │   ├── Permissions.tsx      # Permission management
│   │   ├── RolePermissions.tsx  # Role-permission assignments
│   │   ├── MedicalRecords.tsx   # Medical record management
│   │   ├── EmergencyAccess.tsx  # Emergency access requests
│   │   └── AuditLogs.tsx        # System activity logs
│   ├── services/
│   │   ├── api.ts               # Axios instance with authentication
│   │   ├── authService.ts       # Authentication service
│   │   ├── patientService.ts    # Patient API service
│   │   ├── doctorService.ts     # Doctor API service
│   │   ├── appointmentService.ts # Appointment API service
│   │   ├── roleService.ts       # Role API service
│   │   ├── departmentService.ts # Department API service
│   │   ├── permissionService.ts # Permission API service
│   │   ├── rolePermissionService.ts # Role-permission API service
│   │   ├── medicalRecordService.ts  # Medical record API service
│   │   ├── emergencyService.ts  # Emergency access API service
│   │   └── auditLogService.ts   # Audit log API service
│   ├── context/
│   │   └── AuthContext.tsx      # Authentication context (optional)
│   ├── App.tsx                  # Main app component with routing
│   ├── main.tsx                 # Entry point with theme setup
│   └── index.css                # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## Installed Dependencies

### Core Dependencies
- **react**: ^19.2.0 - UI library
- **react-dom**: ^19.2.0 - DOM rendering
- **react-router-dom**: ^7.13.1 - Routing and navigation
- **axios**: ^1.13.6 - HTTP client
- **@mui/material**: ^7.3.9 - Material Design components
- **@emotion/react**: ^11.14.0 - CSS-in-JS styling
- **@emotion/styled**: ^11.14.1 - Styled components

### Dev Dependencies
- **typescript**: ~5.9.3 - Type checking
- **vite**: ^7.3.1 - Build tool
- **eslint**: ^9.39.1 - Code linting

## Setup Instructions

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (default Vite port)

### 3. Build for Production
```bash
npm run build
```

## Key Features

### 1. Authentication
- Login with email and password
- JWT token-based authentication
- Automatic token inclusion in all API requests
- Logout functionality with token cleanup

### 2. Dashboard
- Central hub with quick access to all modules
- Color-coded module cards for easy identification
- Quick navigation to all CRUD operations

### 3. Module Management
All modules include full CRUD operations:

#### Patients
- View all patients
- Create new patient records
- Update patient information (name, age, gender, contact, medical history)
- Delete patient records
- Assign doctors to patients

#### Doctors
- View all doctors/users
- Update doctor information
- Delete doctor accounts
- Manage doctor role assignments

#### Appointments
- Schedule new appointments
- View all appointments
- Update appointment status and details
- Cancel appointments
- Date-time picker for scheduling

#### Medical Records
- Create patient medical records
- Track diagnosis and prescriptions
- Update treatment notes
- View complete medical history

#### Roles
- Create new roles
- View all roles
- Update role names
- Delete roles

#### Departments
- Manage hospital departments
- Add new departments
- Update department information
- Delete departments

#### Permissions
- Create system permissions
- View all permissions
- Update permission details
- Delete permissions

#### Role-Permissions
- Assign permissions to roles
- Modify role-permission relationships
- View permission assignments

#### Emergency Access
- Request emergency access to patient records
- View all emergency access logs
- Update access status
- Manage emergency access records

#### Audit Logs
- View complete system activity logs
- Track user actions and timestamps
- Search and filter logs

### 4. UI/UX Features
- **Material-UI Components**: Professional, modern interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Data Tables**: Sortable, pageable data display
- **Dialog Forms**: Clean modal forms for create/edit operations
- **Error Handling**: User-friendly error messages
- **Loading States**: Loading indicators during data fetching
- **Theme Customization**: Configurable Material-UI theme

## API Integration

All API calls are managed through service files in `src/services/`. The `api.ts` file sets up the Axios instance with:

```typescript
- Base URL: http://localhost:5000/api
- Automatic JWT token injection
- Error handling middleware
```

Example usage:
```typescript
import { getPatients, createPatient } from "../services/patientService";

// Fetch patients
const patients = await getPatients();

// Create patient
const newPatient = await createPatient({
  name: "John Doe",
  age: 30,
  gender: "Male",
  phone: "123-456-7890"
});
```

## Authentication Flow

1. User navigates to login page (`/`)
2. Enters email and password
3. `authService.login()` makes POST request to `/api/auth/login`
4. Backend returns JWT token
5. Token is stored in `localStorage` as `token`
6. Token is automatically included in all subsequent API requests via `api.interceptors.request`
7. User is redirected to dashboard on successful login
8. Protected routes check for token before rendering

## Page Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Login | Login page |
| `/dashboard` | Dashboard | Main dashboard |
| `/patients` | Patients | Patient management |
| `/doctors` | Doctors | Doctor management |
| `/appointments` | Appointments | Appointment scheduling |
| `/roles` | Roles | Role management |
| `/departments` | Departments | Department management |
| `/permissions` | Permissions | Permission management |
| `/role-permissions` | RolePermissions | Role-permission mapping |
| `/medical-records` | MedicalRecords | Medical records |
| `/emergency` | EmergencyAccess | Emergency access management |
| `/audit-logs` | AuditLogs | System activity logs |

## Material-UI Theme Customization

The theme is configured in `src/main.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',    // Blue
    },
    secondary: {
      main: '#388e3c',    // Green
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})
```

## State Management

- **React Hooks**: useState for local component state
- **localStorage**: For token persistence
- **Context API**: Optional AuthContext (prepared in src/context/)

## Form Handling

Forms use controlled components with React state:
```typescript
const [formData, setFormData] = useState({
  name: "",
  email: "",
  role_id: 2
});

<TextField
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
/>
```

## Error Handling

- Try-catch blocks in all async operations
- User-friendly error messages displayed via Alert component
- Error state management per page

## Loading States

- CircularProgress component shown during data fetch
- Buttons disabled during form submission
- Conditional rendering based on loading state

## Best Practices Implemented

1. **TypeScript**: Strong typing for all components and services
2. **Reusable Components**: Dialog forms and tables used across modules
3. **Service Layer**: API calls separated from UI components
4. **Error Handling**: Comprehensive try-catch and error messages
5. **Authentication**: Secure JWT-based authentication
6. **Responsive Design**: Mobile-friendly Material-UI components
7. **Code Organization**: Clear folder structure and naming conventions

## Future Enhancements

- Add search and filter functionality
- Implement pagination for large datasets
- Add data export (PDF, CSV)
- User profile management
- Notifications/alerts system
- Advanced reporting dashboard
- Real-time data updates with WebSockets
- Multi-language support (i18n)

## Troubleshooting

### Token Not Persisting
- Check browser localStorage
- Verify `localStorage.setItem("token", ...)` is executed
- Check if private browsing is enabled

### API Requests Failing
- Verify backend is running on `http://localhost:5000`
- Check token is included in headers
- Review browser Network tab for request details

### Components Not Rendering
- Check route configuration in App.tsx
- Verify component import paths
- Check browser console for errors

## Environment Setup

By default, the frontend connects to `http://localhost:5000`. To change:

Edit `src/services/api.ts`:
```typescript
const api = axios.create({
  baseURL: "http://your-api-url/api"  // Change this
});
```

## Notes

- All timestamps use ISO 8601 format
- Patient IDs and Doctor IDs must exist in database
- Delete operations are permanent
- Audit logs are automatically created for critical actions
