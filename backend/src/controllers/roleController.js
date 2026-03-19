const roleModel = require("../models/roleModel");

exports.getRoles = async (req, res) => {
  const roles = await roleModel.getRoles();
  res.json(roles);
};

exports.getRole = async (req, res) => {
  const role = await roleModel.getRoleById(req.params.id);
  if (!role) return res.status(404).json({ error: "Role not found" });
  res.json(role);
};

exports.createRole = async (req, res) => {
  const { role_name } = req.body;
  const role = await roleModel.createRole(role_name);
  res.json(role);
};

exports.updateRole = async (req, res) => {
  const { role_name } = req.body;
  const role = await roleModel.updateRole(req.params.id, role_name);
  if (!role) return res.status(404).json({ error: "Role not found" });
  res.json(role);
};

exports.deleteRole = async (req, res) => {
  await roleModel.deleteRole(req.params.id);
  res.json({ message: "Role deleted" });
};