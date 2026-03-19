const userModel = require("../models/userModel");

exports.getUsers = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await userModel.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const user = await userModel.updateUser(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await userModel.deleteUser(req.params.id);
  res.json({ message: "User deleted" });
};