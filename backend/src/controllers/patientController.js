const patientModel = require("../models/patientModel");

exports.getPatients = async (req, res) => {

  const patients = await patientModel.getPatients();

  res.json(patients);

};

exports.getPatient = async (req, res) => {
  const patient = await patientModel.getPatientById(req.params.id);
  if (!patient) return res.status(404).json({ error: "Patient not found" });
  res.json(patient);
};

exports.createPatient = async (req, res) => {

  const patient = await patientModel.createPatient(req.body);

  res.json(patient);

};

exports.updatePatient = async (req, res) => {
  const patient = await patientModel.updatePatient(req.params.id, req.body);
  if (!patient) return res.status(404).json({ error: "Patient not found" });
  res.json(patient);
};

exports.deletePatient = async (req, res) => {
  await patientModel.deletePatient(req.params.id);
  res.json({ message: "Patient deleted" });
};