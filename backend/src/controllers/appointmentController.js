const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");
const patientModel = require("../models/patientModel");

exports.createAppointment = async (req, res) => {

  try {

    const { patient_id, doctor_id, appointment_date } = req.body;

    // Validate patient exists
    const patient = await patientModel.getPatientById(patient_id);
    if (!patient) {
      return res.status(400).json({ error: "Patient not found" });
    }

    // Validate doctor exists
    const doctor = await userModel.getUserById(doctor_id);
    if (!doctor) {
      return res.status(400).json({ error: "Doctor not found" });
    }

    const appointment = await appointmentModel.createAppointment(patient_id, doctor_id, appointment_date);

    res.json(appointment);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.getAppointments = async (req, res) => {

  const result = await appointmentModel.getAppointments();

  res.json(result);

};

exports.getAppointment = async (req, res) => {
  const appointment = await appointmentModel.getAppointmentById(req.params.id);
  if (!appointment) return res.status(404).json({ error: "Appointment not found" });
  res.json(appointment);
};

exports.updateAppointment = async (req, res) => {
  const { patient_id, doctor_id, appointment_date, status } = req.body;
  const appointment = await appointmentModel.updateAppointment(req.params.id, patient_id, doctor_id, appointment_date, status);
  if (!appointment) return res.status(404).json({ error: "Appointment not found" });
  res.json(appointment);
};

exports.deleteAppointment = async (req, res) => {
  await appointmentModel.deleteAppointment(req.params.id);
  res.json({ message: "Appointment deleted" });
};