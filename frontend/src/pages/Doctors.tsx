import { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { getDoctors, updateDoctor, deleteDoctor } from "../services/doctorService";
import { getRoles } from "../services/roleService";

interface Doctor {
  user_id: number;
  name: string;
  email: string;
  role_id: number;
}

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", role_id: 2 });
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    fetchDoctors();
    fetchRoles();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (e) {
      setError("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (e) {
      setError("Failed to fetch roles");
    }
  };

  const getRoleName = (role_id: number) => {
    const role = roles.find((r) => r.role_id === role_id);
    return role ? role.role_name : "Unknown";
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({ name: doctor.name, email: doctor.email, role_id: doctor.role_id });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    if (editingDoctor) {
      try {
        await updateDoctor(editingDoctor.user_id, formData);
        setOpenDialog(false);
        fetchDoctors();
      } catch (e) {
        setError("Failed to update doctor");
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      try {
        await deleteDoctor(id);
        fetchDoctors();
      } catch (e) {
        setError("Failed to delete doctor");
      }
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Doctors</Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.user_id}>
                  <TableCell>{doctor.user_id}</TableCell>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{getRoleName(doctor.role_id)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(doctor)} sx={{ mr: 1 }}>
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(doctor.user_id)} color="error">
                      <Trash2 size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <Box sx={{ p: 3, minWidth: 400 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Edit Doctor</Typography>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Role ID"
            type="number"
            value={formData.role_id}
            onChange={(e) => setFormData({ ...formData, role_id: parseInt(e.target.value) })}
            margin="normal"
          />
          <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
            <Button variant="contained" onClick={handleSave}>Save</Button>
            <Button variant="outlined" onClick={() => setOpenDialog(false)}>Cancel</Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
}
