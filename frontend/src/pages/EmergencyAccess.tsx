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
import { getEmergencyAccess, requestEmergencyAccess, updateEmergencyAccess, deleteEmergencyAccess } from "../services/emergencyService";

interface EmergencyAccess {
  access_id: number;
  user_id: number;
  patient_id: number;
  reason: string;
  start_time: string;
  end_time: string;
  status: string;
}

export default function EmergencyAccessPage() {
  const [accesses, setAccesses] = useState<EmergencyAccess[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAccess, setEditingAccess] = useState<EmergencyAccess | null>(null);
  const [formData, setFormData] = useState({ patient_id: 0, reason: "", user_id: 0, status: "active" });

  useEffect(() => {
    fetchAccess();
  }, []);

  const fetchAccess = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getEmergencyAccess();
      setAccesses(data);
    } catch (e) {
      setError("Failed to fetch emergency access records");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingAccess(null);
    setFormData({ patient_id: 0, reason: "", user_id: 0, status: "active" });
    setOpenDialog(true);
  };

  const handleEdit = (access: EmergencyAccess) => {
    setEditingAccess(access);
    setFormData({ patient_id: access.patient_id, reason: access.reason, user_id: access.user_id, status: access.status });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (editingAccess) {
        await updateEmergencyAccess(editingAccess.access_id, { user_id: formData.user_id, patient_id: formData.patient_id, reason: formData.reason, status: formData.status });
      } else {
        await requestEmergencyAccess({ patient_id: formData.patient_id, reason: formData.reason });
      }
      setOpenDialog(false);
      fetchAccess();
    } catch (e) {
      setError("Failed to save emergency access");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      try {
        await deleteEmergencyAccess(id);
        fetchAccess();
      } catch (e) {
        setError("Failed to delete emergency access");
      }
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Emergency Access</Typography>
        <Button variant="contained" color="error" onClick={handleOpenCreate}>Request Emergency Access</Button>
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
                <TableCell>User ID</TableCell>
                <TableCell>Patient ID</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accesses.map((access) => (
                <TableRow key={access.access_id}>
                  <TableCell>{access.access_id}</TableCell>
                  <TableCell>{access.user_id}</TableCell>
                  <TableCell>{access.patient_id}</TableCell>
                  <TableCell>{access.reason}</TableCell>
                  <TableCell>{access.status}</TableCell>
                  <TableCell>{new Date(access.start_time).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(access)} sx={{ mr: 1 }}>
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(access.access_id)}>
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
          <Typography variant="h6" sx={{ mb: 2 }}>{editingAccess ? "Edit Emergency Access" : "Request Emergency Access"}</Typography>
          <TextField fullWidth label="Patient ID" type="number" value={formData.patient_id} onChange={(e) => setFormData({ ...formData, patient_id: parseInt(e.target.value) })} margin="normal" />
          <TextField fullWidth label="Reason" value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} margin="normal" multiline rows={3} />
          {editingAccess && (
            <>
              <TextField fullWidth label="User ID" type="number" value={formData.user_id} onChange={(e) => setFormData({ ...formData, user_id: parseInt(e.target.value) })} margin="normal" />
              <TextField fullWidth label="Status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} margin="normal" />
            </>
          )}
          <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
            <Button variant="contained" onClick={handleSave}>Save</Button>
            <Button variant="outlined" onClick={() => setOpenDialog(false)}>Cancel</Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
}
