const pool = require("../config/db");

async function getMedicalRecords() {
  const result = await pool.query("SELECT * FROM medical_records");
  return result.rows;
}

async function getMedicalRecordById(id) {
  const result = await pool.query("SELECT * FROM medical_records WHERE record_id=$1", [id]);
  return result.rows[0];
}

async function createMedicalRecord(patient_id, doctor_id, diagnosis, prescription, notes) {
  const result = await pool.query(
    "INSERT INTO medical_records(patient_id, doctor_id, diagnosis, prescription, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [patient_id, doctor_id, diagnosis, prescription, notes]
  );
  return result.rows[0];
}

async function updateMedicalRecord(id, patient_id, doctor_id, diagnosis, prescription, notes) {
  const result = await pool.query(
    "UPDATE medical_records SET patient_id=$1, doctor_id=$2, diagnosis=$3, prescription=$4, notes=$5 WHERE record_id=$6 RETURNING *",
    [patient_id, doctor_id, diagnosis, prescription, notes, id]
  );
  return result.rows[0];
}

async function deleteMedicalRecord(id) {
  await pool.query("DELETE FROM medical_records WHERE record_id=$1", [id]);
}

module.exports = {
  getMedicalRecords,
  getMedicalRecordById,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord
};