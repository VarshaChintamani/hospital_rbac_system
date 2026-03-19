const permissionModel = require("../models/permissionModel");

exports.getPermissions = async (req, res) => {
  const permissions = await permissionModel.getPermissions();
  res.json(permissions);
};

exports.getPermission = async (req, res) => {
  const permission = await permissionModel.getPermissionById(req.params.id);
  if (!permission) return res.status(404).json({ error: "Permission not found" });
  res.json(permission);
};

exports.createPermission = async (req, res) => {
  const { permission_name } = req.body;
  const permission = await permissionModel.createPermission(permission_name);
  res.json(permission);
};

exports.updatePermission = async (req, res) => {
  const { permission_name } = req.body;
  const permission = await permissionModel.updatePermission(req.params.id, permission_name);
  if (!permission) return res.status(404).json({ error: "Permission not found" });
  res.json(permission);
};

exports.deletePermission = async (req, res) => {
  await permissionModel.deletePermission(req.params.id);
  res.json({ message: "Permission deleted" });
};