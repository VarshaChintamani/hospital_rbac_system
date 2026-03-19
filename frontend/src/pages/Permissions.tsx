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
import { getPermissions, createPermission, updatePermission, deletePermission } from "../services/permissionService";

interface Permission {
  permission_id: number;
  permission_name: string;
}

export default function Permissions() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
  const [formData, setFormData] = useState({ permission_name: "" });

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getPermissions();
      setPermissions(data);
    } catch (e) {
      setError("Failed to fetch permissions");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingPermission(null);
    setFormData({ permission_name: "" });
    setOpenDialog(true);
  };

  const handleEdit = (perm: Permission) => {
    setEditingPermission(perm);
    setFormData({ permission_name: perm.permission_name });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (editingPermission) {
        await updatePermission(editingPermission.permission_id, formData.permission_name);
      } else {
        await createPermission(formData.permission_name);
      }
      setOpenDialog(false);
      fetchPermissions();
    } catch (e) {
      setError("Failed to save permission");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      try {
        await deletePermission(id);
        fetchPermissions();
      } catch (e) {
        setError("Failed to delete permission");
      }
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Permissions</Typography>
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
                <TableCell>Permission Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.map((perm) => (
                <TableRow key={perm.permission_id}>
                  <TableCell>{perm.permission_id}</TableCell>
                  <TableCell>{perm.permission_name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(perm)} sx={{ mr: 1 }}>
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(perm.permission_id)}>
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
          <Typography variant="h6" sx={{ mb: 2 }}>{editingPermission ? "Edit Permission" : "Add Permission"}</Typography>
          <TextField
            fullWidth
            label="Permission Name"
            value={formData.permission_name}
            onChange={(e) => setFormData({ permission_name: e.target.value })}
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
