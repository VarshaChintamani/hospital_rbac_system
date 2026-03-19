import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const isLoginPage = location.pathname === "/";

  if (isLoginPage) {
    return null;
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, cursor: "pointer", fontWeight: "bold" }}
          onClick={handleDashboard}
        >
          Hospital RBAC System
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" size="small" onClick={() => navigate("/patients")}>
            Patients
          </Button>
          <Button color="inherit" size="small" onClick={() => navigate("/doctors")}>
            Doctors
          </Button>
          <Button color="inherit" size="small" onClick={() => navigate("/appointments")}>
            Appointments
          </Button>
          <Button color="inherit" size="small" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
