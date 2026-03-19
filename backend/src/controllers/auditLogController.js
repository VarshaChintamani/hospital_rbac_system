const auditLogModel = require("../models/auditLogModel");

exports.getAuditLogs = async (req, res) => {
  const logs = await auditLogModel.getAuditLogs();
  res.json(logs);
};

exports.getAuditLog = async (req, res) => {
  const log = await auditLogModel.getAuditLogById(req.params.id);
  if (!log) return res.status(404).json({ error: "Audit log not found" });
  res.json(log);
};

exports.createAuditLog = async (req, res) => {
  const { user_id, action, patient_id } = req.body;
  const log = await auditLogModel.createAuditLog(user_id, action, patient_id);
  res.json(log);
};

exports.updateAuditLog = async (req, res) => {
  const { user_id, action, patient_id } = req.body;
  const log = await auditLogModel.updateAuditLog(req.params.id, user_id, action, patient_id);
  if (!log) return res.status(404).json({ error: "Audit log not found" });
  res.json(log);
};

exports.deleteAuditLog = async (req, res) => {
  await auditLogModel.deleteAuditLog(req.params.id);
  res.json({ message: "Audit log deleted" });
};