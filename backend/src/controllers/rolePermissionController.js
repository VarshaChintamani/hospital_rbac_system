const rolePermissionModel = require("../models/rolePermissionModel");

exports.getRolePermissions = async (req, res) => {
  const rolePermissions = await rolePermissionModel.getRolePermissions();
  res.json(rolePermissions);
};

exports.getRolePermission = async (req, res) => {
  const rolePermission = await rolePermissionModel.getRolePermissionById(req.params.id);
  if (!rolePermission) return res.status(404).json({ error: "Role permission not found" });
  res.json(rolePermission);
};

exports.createRolePermission = async (req, res) => {
  const { role_id, permission_id } = req.body;
  const rolePermission = await rolePermissionModel.createRolePermission(role_id, permission_id);
  res.json(rolePermission);
};

exports.updateRolePermission = async (req, res) => {
  const { role_id, permission_id } = req.body;
  const rolePermission = await rolePermissionModel.updateRolePermission(req.params.id, role_id, permission_id);
  if (!rolePermission) return res.status(404).json({ error: "Role permission not found" });
  res.json(rolePermission);
};

exports.deleteRolePermission = async (req, res) => {
  await rolePermissionModel.deleteRolePermission(req.params.id);
  res.json({ message: "Role permission deleted" });
};