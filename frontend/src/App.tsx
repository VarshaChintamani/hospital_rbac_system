import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Roles from "./pages/Roles";
import Departments from "./pages/Departments";
import Permissions from "./pages/Permissions";
import RolePermissions from "./pages/RolePermissions";
import MedicalRecords from "./pages/MedicalRecords";
import EmergencyAccess from "./pages/EmergencyAccess";
import AuditLogs from "./pages/AuditLogs";
import Navbar from "./components/Navbar";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/patients" element={isAuthenticated ? <Patients /> : <Navigate to="/" />} />
        <Route path="/doctors" element={isAuthenticated ? <Doctors /> : <Navigate to="/" />} />
        <Route path="/appointments" element={isAuthenticated ? <Appointments /> : <Navigate to="/" />} />
        <Route path="/roles" element={isAuthenticated ? <Roles /> : <Navigate to="/" />} />
        <Route path="/departments" element={isAuthenticated ? <Departments /> : <Navigate to="/" />} />
        <Route path="/permissions" element={isAuthenticated ? <Permissions /> : <Navigate to="/" />} />
        <Route path="/role-permissions" element={isAuthenticated ? <RolePermissions /> : <Navigate to="/" />} />
        <Route path="/medical-records" element={isAuthenticated ? <MedicalRecords /> : <Navigate to="/" />} />
        <Route path="/emergency" element={isAuthenticated ? <EmergencyAccess /> : <Navigate to="/" />} />
        <Route path="/audit-logs" element={isAuthenticated ? <AuditLogs /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;