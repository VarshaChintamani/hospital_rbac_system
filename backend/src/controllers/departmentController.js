const departmentModel = require("../models/departmentModel");

exports.getDepartments = async (req, res) => {
  const departments = await departmentModel.getDepartments();
  res.json(departments);
};

exports.getDepartment = async (req, res) => {
  const department = await departmentModel.getDepartmentById(req.params.id);
  if (!department) return res.status(404).json({ error: "Department not found" });
  res.json(department);
};

exports.createDepartment = async (req, res) => {
  const { department_name } = req.body;
  const department = await departmentModel.createDepartment(department_name);
  res.json(department);
};

exports.updateDepartment = async (req, res) => {
  const { department_name } = req.body;
  const department = await departmentModel.updateDepartment(req.params.id, department_name);
  if (!department) return res.status(404).json({ error: "Department not found" });
  res.json(department);
};

exports.deleteDepartment = async (req, res) => {
  await departmentModel.deleteDepartment(req.params.id);
  res.json({ message: "Department deleted" });
};