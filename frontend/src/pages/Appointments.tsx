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
  IconButton,
  Dialog,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Grid,
  InputAdornment,
} from "@mui/material";
import { Pencil, Trash2, Search, Calendar, User, Stethoscope } from "lucide-react";
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from "../services/appointmentService";
import { getPatients } from "../services/patientService";
import { getDoctors } from "../services/doctorService";

interface Appointment {
  appointment_id: number;
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  status: string;
  created_at: string;
}

interface Patient {
  patient_id: number;
  name: string;
}

interface Doctor {
  user_id: number;
  name: string;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAppt, setEditingAppt] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState({ patient_id: "", doctor_id: "", appointment_date: "", status: "scheduled" });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (e) {
      setError("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (e) {
      console.error("Failed to fetch patients:", e);
    }
  };

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (e) {
      console.error("Failed to fetch doctors:", e);
    }
  };

  const handleOpenCreate = () => {
    setEditingAppt(null);
    setFormData({ patient_id: "", doctor_id: "", appointment_date: "", status: "scheduled" });
    setOpenDialog(true);
  };

  const handleEdit = (appt: Appointment) => {
    setEditingAppt(appt);
    setFormData({
      patient_id: appt.patient_id.toString(),
      doctor_id: appt.doctor_id.toString(),
      appointment_date: appt.appointment_date,
      status: appt.status
    });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      const dataToSave = {
        patient_id: parseInt(formData.patient_id),
        doctor_id: parseInt(formData.doctor_id),
        appointment_date: formData.appointment_date,
        status: formData.status
      };

      if (editingAppt) {
        await updateAppointment(editingAppt.appointment_id, dataToSave);
      } else {
        await createAppointment(dataToSave);
      }
      setOpenDialog(false);
      fetchAppointments();
    } catch (e) {
      setError("Failed to save appointment");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      try {
        await deleteAppointment(id);
        fetchAppointments();
      } catch (e) {
        setError("Failed to delete appointment");
      }
    }
  };

  const getPatientName = (patientId: number) => {
    const patient = patients.find(p => p.patient_id === patientId);
    return patient ? patient.name : `Patient ${patientId}`;
  };

  const getDoctorName = (doctorId: number) => {
    const doctor = doctors.find(d => d.user_id === doctorId);
    return doctor ? doctor.name : `Doctor ${doctorId}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      case 'no-show': return 'warning';
      default: return 'default';
    }
  };

  const filteredAppointments = appointments.filter(appt => {
    const matchesSearch = searchTerm === "" ||
      getPatientName(appt.patient_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getDoctorName(appt.doctor_id).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || appt.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Calendar size={32} />
          Appointments Management
        </Typography>
        <Button variant="contained" onClick={handleOpenCreate} startIcon={<Calendar size={16} />}>
          Schedule Appointment
        </Button>
      </Box>

      {/* Search and Filter Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                placeholder="Search by patient or doctor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Filter by Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="no-show">No Show</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Patient</strong></TableCell>
                <TableCell><strong>Doctor</strong></TableCell>
                <TableCell><strong>Date & Time</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAppointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No appointments found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAppointments.map((appt) => (
                  <TableRow key={appt.appointment_id} hover>
                    <TableCell>{appt.appointment_id}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <User size={16} />
                        {getPatientName(appt.patient_id)}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Stethoscope size={16} />
                        {getDoctorName(appt.doctor_id)}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(appt.appointment_date).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                        color={getStatusColor(appt.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(appt)} sx={{ mr: 1 }} title="Edit Appointment">
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(appt.appointment_id)} title="Delete Appointment">
                        <Trash2 size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Appointment Form Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
            <Calendar size={20} />
            {editingAppt ? "Edit Appointment" : "Schedule New Appointment"}
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Patient</InputLabel>
                <Select
                  value={formData.patient_id}
                  label="Patient"
                  onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
                >
                  {patients.map((patient) => (
                    <MenuItem key={patient.patient_id} value={patient.patient_id.toString()}>
                      {patient.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Doctor</InputLabel>
                <Select
                  value={formData.doctor_id}
                  label="Doctor"
                  onChange={(e) => setFormData({ ...formData, doctor_id: e.target.value })}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.user_id} value={doctor.user_id.toString()}>
                      {doctor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Date & Time"
                type="datetime-local"
                value={formData.appointment_date}
                onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="no-show">No Show</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", gap: 1, mt: 3, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              {editingAppt ? "Update" : "Schedule"} Appointment
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
}
