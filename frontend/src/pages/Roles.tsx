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
import { getRoles, createRole, updateRole, deleteRole } from "../services/roleService";

interface Role {
  role_id: number;
  role_name: string;
}

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({ role_name: "" });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (e) {
      setError("Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingRole(null);
    setFormData({ role_name: "" });
    setOpenDialog(true);
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setFormData({ role_name: role.role_name });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (editingRole) {
        await updateRole(editingRole.role_id, formData.role_name);
      } else {
        await createRole(formData.role_name);
      }
      setOpenDialog(false);
      fetchRoles();
    } catch (e) {
      setError("Failed to save role");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      try {
        await deleteRole(id);
        fetchRoles();
      } catch (e) {
        setError("Failed to delete role");
      }
    }
  };
  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Roles</Typography>
        <Button variant="contained" onClick={handleOpenCreate}>+</Button>
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
                <TableCell>Role Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.role_id}>
                  <TableCell>{role.role_id}</TableCell>
                  <TableCell>{role.role_name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(role)} sx={{ mr: 1 }}>
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(role.role_id)}>
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
          <Typography variant="h6" sx={{ mb: 2 }}>{editingRole ? "Edit Role" : "Add Role"}</Typography>
          <TextField
            fullWidth
            label="Role Name"
            value={formData.role_name}
            onChange={(e) => setFormData({ role_name: e.target.value })}
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
