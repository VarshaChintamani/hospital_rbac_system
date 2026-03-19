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
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from "../services/departmentService";

interface Department {
  department_id: number;
  department_name: string;
}

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState({ department_name: "" });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (e) {
      setError("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingDept(null);
    setFormData({ department_name: "" });
    setOpenDialog(true);
  };

  const handleEdit = (dept: Department) => {
    setEditingDept(dept);
    setFormData({ department_name: dept.department_name });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (editingDept) {
        await updateDepartment(editingDept.department_id, formData.department_name);
      } else {
        await createDepartment(formData.department_name);
      }
      setOpenDialog(false);
      fetchDepartments();
    } catch (e) {
      setError("Failed to save department");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      try {
        await deleteDepartment(id);
        fetchDepartments();
      } catch (e) {
        setError("Failed to delete department");
      }
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Departments</Typography>
        <Button variant="contained" onClick={handleOpenCreate}>
          +
        </Button>
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
                <TableCell>Department Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.department_id}>
                  <TableCell>{dept.department_id}</TableCell>
                  <TableCell>{dept.department_name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(dept)} sx={{ mr: 1 }}>
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(dept.department_id)}>
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
          <Typography variant="h6" sx={{ mb: 2 }}>{editingDept ? "Edit Department" : "Add Department"}</Typography>
          <TextField
            fullWidth
            label="Department Name"
            value={formData.department_name}
            onChange={(e) => setFormData({ department_name: e.target.value })}
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
