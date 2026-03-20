import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

interface ModuleCard {
  title: string;
  description: string;
  path: string;
  color: string;
}

const modules: ModuleCard[] = [
  { title: "Patients", description: "Manage patient records and information", path: "/patients", color: "#1976d2" },
  { title: "Doctors", description: "Manage doctor profiles and details", path: "/doctors", color: "#388e3c" },
  { title: "Appointments", description: "Schedule and manage appointments", path: "/appointments", color: "#d32f2f" },
  { title: "Medical Records", description: "Maintain patient medical history", path: "/medical-records", color: "#7b1fa2" },
  { title: "Emergency Access", description: "Handle emergency access requests", path: "/emergency", color: "#e64a19" },
  { title: "Roles", description: "Manage user roles", path: "/roles", color: "#00838f" },
  { title: "Departments", description: "Manage hospital departments", path: "/departments", color: "#455a64" },
  { title: "Permissions", description: "Manage system permissions", path: "/permissions", color: "#1565c0" },
  { title: "Audit Logs", description: "View system activity logs", path: "/audit-logs", color: "#6a1b9a" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   navigate("/");
  // };

  return (
    <>
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Hospital RBAC System
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar> */}

      <Container sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Welcome to the Hospital RBAC Management System. Select a module below to get started.
          </Typography>
        </Box>

        {/* use flex box instead of grid to avoid TS errors */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {modules.map((module, index) => (
            <Box key={index} sx={{ width: { xs: "100%", sm: "48%", md: "31%" } }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 20px rgba(0,0,0,0.15)",
                  },
                  borderLeft: `5px solid ${module.color}`,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" sx={{ color: module.color, fontWeight: "bold" }}>
                    {module.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {module.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: module.color }}
                    onClick={() => navigate(module.path)}
                  >
                    Open
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}
