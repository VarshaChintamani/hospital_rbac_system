const medicalRecordModel = require("../models/medicalRecordModel");

exports.getMedicalRecords = async (req, res) => {
  const records = await medicalRecordModel.getMedicalRecords();
  res.json(records);
};

exports.getMedicalRecord = async (req, res) => {
  const record = await medicalRecordModel.getMedicalRecordById(req.params.id);
  if (!record) return res.status(404).json({ error: "Medical record not found" });
  res.json(record);
};

exports.createMedicalRecord = async (req, res) => {
  const { patient_id, doctor_id, diagnosis, prescription, notes } = req.body;
  const record = await medicalRecordModel.createMedicalRecord(patient_id, doctor_id, diagnosis, prescription, notes);
  res.json(record);
};

exports.updateMedicalRecord = async (req, res) => {
  const { patient_id, doctor_id, diagnosis, prescription, notes } = req.body;
  const record = await medicalRecordModel.updateMedicalRecord(req.params.id, patient_id, doctor_id, diagnosis, prescription, notes);
  if (!record) return res.status(404).json({ error: "Medical record not found" });
  res.json(record);
};

exports.deleteMedicalRecord = async (req, res) => {
  await medicalRecordModel.deleteMedicalRecord(req.params.id);
  res.json({ message: "Medical record deleted" });
};