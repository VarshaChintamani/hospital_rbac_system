import { useEffect, useState } from "react";
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
  IconButton,
  Dialog,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { getPatients, createPatient, updatePatient, deletePatient } from "../services/patientService";

interface Patient {
  patient_id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  medical_history: string;
  assigned_doctor: number | null;
}

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    gender: "",
    phone: "",
    address: "",
    medical_history: "",
    assigned_doctor: null as number | null
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (e) {
      setError("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingPatient(null);
    setFormData({
      name: "",
      age: 0,
      gender: "",
      phone: "",
      address: "",
      medical_history: "",
      assigned_doctor: null
    });
    setOpenDialog(true);
  };

  const handleEdit = async (patient: Patient) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      address: patient.address,
      medical_history: patient.medical_history,
      assigned_doctor: patient.assigned_doctor
    });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (editingPatient) {
        await updatePatient(editingPatient.patient_id, formData);
      } else {
        await createPatient(formData);
      }
      setOpenDialog(false);
      fetchPatients();
    } catch (e) {
      setError("Failed to save patient");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      try {
        await deletePatient(id);
        fetchPatients();
      } catch (e) {
        setError("Failed to delete patient");
      }
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Patients</Typography>
        <Button variant="contained" onClick={handleOpenCreate}>+</Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.patient_id}>
                  <TableCell>{patient.patient_id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(patient)} sx={{ mr: 1 }}>
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(patient.patient_id)}>
                      <Trash2 size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{editingPatient ? "Edit Patient" : "Add Patient"}</Typography>
          <TextField fullWidth label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} margin="normal" />
          <TextField fullWidth label="Age" type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })} margin="normal" />
          <TextField fullWidth label="Gender" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} margin="normal" />
          <TextField fullWidth label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} margin="normal" />
          <TextField fullWidth label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} margin="normal" multiline rows={2} />
          <TextField fullWidth label="Medical History" value={formData.medical_history} onChange={(e) => setFormData({ ...formData, medical_history: e.target.value })} margin="normal" multiline rows={2} />
          <TextField fullWidth label="Assigned Doctor" type="number" value={formData.assigned_doctor || ""} onChange={(e) => setFormData({ ...formData, assigned_doctor: e.target.value ? parseInt(e.target.value) : null })} margin="normal" />
          <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
            <Button variant="contained" onClick={handleSave}>Save</Button>
            <Button variant="outlined" onClick={() => setOpenDialog(false)}>Cancel</Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
}
