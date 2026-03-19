const pool = require("../config/db");

async function createAppointment(patient_id, doctor_id, date, status = 'scheduled') {

  const result = await pool.query(
    `INSERT INTO appointments(patient_id,doctor_id,appointment_date,status)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [patient_id, doctor_id, date, status]
  );

  return result.rows[0];

}

async function getAppointments() {

  const result = await pool.query("SELECT * FROM appointments");

  return result.rows;

}

async function getAppointmentById(id) {
  const result = await pool.query("SELECT * FROM appointments WHERE appointment_id=$1", [id]);
  return result.rows[0];
}

async function updateAppointment(id, patient_id, doctor_id, date, status) {
  const result = await pool.query(
    "UPDATE appointments SET patient_id=$1, doctor_id=$2, appointment_date=$3, status=$4 WHERE appointment_id=$5 RETURNING *",
    [patient_id, doctor_id, date, status, id]
  );
  return result.rows[0];
}

async function deleteAppointment(id) {
  await pool.query("DELETE FROM appointments WHERE appointment_id=$1", [id]);
}

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
};