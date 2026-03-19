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
import { getAuditLogs, createAuditLog, updateAuditLog, deleteAuditLog } from "../services/auditLogService";

interface AuditLog {
  log_id: number;
  user_id: number;
  action: string;
  patient_id: number | null;
  created_at: string;
}

export default function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingLog, setEditingLog] = useState<AuditLog | null>(null);
  const [formData, setFormData] = useState({ user_id: 0, action: "", patient_id: null as number | null });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAuditLogs();
      setLogs(data);
    } catch (e) {
      setError("Failed to fetch audit logs");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingLog(null);
    setFormData({ user_id: 0, action: "", patient_id: null });  
    setOpenDialog(true);
  };

  const handleEdit = (log: AuditLog) => {
    setEditingLog(log);
    setFormData({ user_id: log.user_id, action: log.action, patient_id: log.patient_id });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (editingLog) {
        await updateAuditLog(editingLog.log_id, formData);
      } else {
        await createAuditLog(formData);
      }
      setOpenDialog(false);
      fetchLogs();
    } catch (e) {
      setError("Failed to save audit log");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      try {
        await deleteAuditLog(id);
        fetchLogs();
      } catch (e) {
        setError("Failed to delete audit log");
      }
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Audit Logs</Typography>
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
                <TableCell>User ID</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Patient ID</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.log_id}>
                  <TableCell>{log.log_id}</TableCell>
                  <TableCell>{log.user_id}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.patient_id}</TableCell>
                  <TableCell>{new Date(log.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(log)} sx={{ mr: 1 }}>
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(log.log_id)}>
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
          <Typography variant="h6" sx={{ mb: 2 }}>{editingLog ? "Edit Audit Log" : "Add Audit Log"}</Typography>
          <TextField fullWidth label="User ID" type="number" value={formData.user_id} onChange={(e) => setFormData({ ...formData, user_id: parseInt(e.target.value) })} margin="normal" />
          <TextField fullWidth label="Action" value={formData.action} onChange={(e) => setFormData({ ...formData, action: e.target.value })} margin="normal" />
          <TextField
            fullWidth
            label="Patient ID"
            type="number"
            value={formData.patient_id || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                patient_id: e.target.value ? parseInt(e.target.value) : null,
              })
            }
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
