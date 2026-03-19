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
} from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { getMedicalRecords, createMedicalRecord, updateMedicalRecord, deleteMedicalRecord } from "../services/medicalRecordService";

interface MedicalRecord {
  record_id: number;
  patient_id: number;
  doctor_id: number;
  diagnosis: string;
  prescription: string;
  notes: string;
  created_at: string;
}

export default function MedicalRecords() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MedicalRecord | null>(null);
  const [formData, setFormData] = useState({ patient_id: 0, doctor_id: 0, diagnosis: "", prescription: "", notes: "" });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMedicalRecords();
      setRecords(data);
    } catch (e) {
      setError("Failed to fetch medical records");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingRecord(null);
    setFormData({ patient_id: 0, doctor_id: 0, diagnosis: "", prescription: "", notes: "" });
    setOpenDialog(true);
  };

  const handleEdit = (record: MedicalRecord) => {
    setEditingRecord(record);
    setFormData({ patient_id: record.patient_id, doctor_id: record.doctor_id, diagnosis: record.diagnosis, prescription: record.prescription, notes: record.notes });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (editingRecord) {
        await updateMedicalRecord(editingRecord.record_id, formData);
      } else {
        await createMedicalRecord(formData);
      }
      setOpenDialog(false);
      fetchRecords();
    } catch (e) {
      setError("Failed to save medical record");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      try {
        await deleteMedicalRecord(id);
        fetchRecords();
      } catch (e) {
        setError("Failed to delete medical record");
      }
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Medical Records</Typography>
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
                <TableCell>Patient ID</TableCell>
                <TableCell>Doctor ID</TableCell>
                <TableCell>Diagnosis</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.record_id}>
                  <TableCell>{record.record_id}</TableCell>
                  <TableCell>{record.patient_id}</TableCell>
                  <TableCell>{record.doctor_id}</TableCell>
                  <TableCell>{record.diagnosis}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(record)} sx={{ mr: 1 }}>
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(record.record_id)}>
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
          <Typography variant="h6" sx={{ mb: 2 }}>{editingRecord ? "Edit Medical Record" : "Add Medical Record"}</Typography>
          <TextField fullWidth label="Patient ID" type="number" value={formData.patient_id} onChange={(e) => setFormData({ ...formData, patient_id: parseInt(e.target.value) })} margin="normal" />
          <TextField fullWidth label="Doctor ID" type="number" value={formData.doctor_id} onChange={(e) => setFormData({ ...formData, doctor_id: parseInt(e.target.value) })} margin="normal" />
          <TextField fullWidth label="Diagnosis" value={formData.diagnosis} onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })} margin="normal" />
          <TextField fullWidth label="Prescription" value={formData.prescription} onChange={(e) => setFormData({ ...formData, prescription: e.target.value })} margin="normal" multiline rows={2} />
          <TextField fullWidth label="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} margin="normal" multiline rows={2} />
          <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
            <Button variant="contained" onClick={handleSave}>Save</Button>
            <Button variant="outlined" onClick={() => setOpenDialog(false)}>Cancel</Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
}
