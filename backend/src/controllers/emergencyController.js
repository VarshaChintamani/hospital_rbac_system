const emergencyModel = require("../models/emergencyAccessModel");
const logAction = require("../utils/logger");
const patientModel = require("../models/patientModel");

exports.requestEmergencyAccess = async (req, res) => {

  const user_id = req.user.id;
  const { patient_id, reason } = req.body;

  // Validate patient exists
  const patient = await patientModel.getPatientById(patient_id);
  if (!patient) {
    return res.status(400).json({ error: "Patient not found" });
  }

  const access = await emergencyModel.requestAccess(
    user_id,
    patient_id,
    reason
  );

  await logAction(user_id, "Emergency access requested", patient_id);

  res.json(access);

};

exports.getEmergencyLogs = async (req, res) => {

  const logs = await emergencyModel.getAllEmergencyLogs();

  res.json(logs);

};

exports.getEmergencyAccess = async (req, res) => {
  const access = await emergencyModel.getEmergencyAccessById(req.params.id);
  if (!access) return res.status(404).json({ error: "Emergency access not found" });
  res.json(access);
};

exports.updateEmergencyAccess = async (req, res) => {
  const { user_id, patient_id, reason, status } = req.body;
  const access = await emergencyModel.updateEmergencyAccess(req.params.id, user_id, patient_id, reason, status);
  if (!access) return res.status(404).json({ error: "Emergency access not found" });
  res.json(access);
};

exports.deleteEmergencyAccess = async (req, res) => {
  await emergencyModel.deleteEmergencyAccess(req.params.id);
  res.json({ message: "Emergency access deleted" });
};