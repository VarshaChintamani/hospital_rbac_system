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
import { getRolePermissions, createRolePermission, updateRolePermission, deleteRolePermission } from "../services/rolePermissionService";

interface RolePermission {
  role_permission_id: number;
  role_id: number;
  permission_id: number;
}

export default function RolePermissions() {
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRP, setEditingRP] = useState<RolePermission | null>(null);
  const [formData, setFormData] = useState({ role_id: 0, permission_id: 0 });

  useEffect(() => {
    fetchRolePermissions();
  }, []);

  const fetchRolePermissions = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getRolePermissions();
      setRolePermissions(data);
    } catch (e) {
      setError("Failed to fetch role permissions");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingRP(null);
    setFormData({ role_id: 0, permission_id: 0 });
    setOpenDialog(true);
  };

  const handleEdit = (rp: RolePermission) => {
    setEditingRP(rp);
    setFormData({ role_id: rp.role_id, permission_id: rp.permission_id });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (editingRP) {
        await updateRolePermission(editingRP.role_permission_id, formData.role_id, formData.permission_id);
      } else {
        await createRolePermission(formData.role_id, formData.permission_id);
      }
      setOpenDialog(false);
      fetchRolePermissions();
    } catch (e) {
      setError("Failed to save role permission");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      try {
        await deleteRolePermission(id);
        fetchRolePermissions();
      } catch (e) {
        setError("Failed to delete role permission");
      }
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Role Permissions</Typography>
        <Button variant="contained" onClick={handleOpenCreate}>Assign Permission</Button>
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
                <TableCell>Role ID</TableCell>
                <TableCell>Permission ID</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rolePermissions.map((rp) => (
                <TableRow key={rp.role_permission_id}>
                  <TableCell>{rp.role_permission_id}</TableCell>
                  <TableCell>{rp.role_id}</TableCell>
                  <TableCell>{rp.permission_id}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(rp)} sx={{ mr: 1 }}>
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(rp.role_permission_id)}>
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
          <Typography variant="h6" sx={{ mb: 2 }}>{editingRP ? "Edit Role Permission" : "Assign Permission"}</Typography>
          <TextField fullWidth label="Role ID" type="number" value={formData.role_id} onChange={(e) => setFormData({ ...formData, role_id: parseInt(e.target.value) })} margin="normal" />
          <TextField fullWidth label="Permission ID" type="number" value={formData.permission_id} onChange={(e) => setFormData({ ...formData, permission_id: parseInt(e.target.value) })} margin="normal" />
          <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
            <Button variant="contained" onClick={handleSave}>Save</Button>
            <Button variant="outlined" onClick={() => setOpenDialog(false)}>Cancel</Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
}
