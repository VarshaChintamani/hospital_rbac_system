const pool = require("../config/db");

async function getPatients() {

  const result = await pool.query("SELECT * FROM patients");

  return result.rows;

}

async function createPatient(data) {

  const { name, age, gender, phone } = data;

  const result = await pool.query(
    `INSERT INTO patients(name,age,gender,phone)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [name, age, gender, phone]
  );

  return result.rows[0];
}

async function getPatientById(id) {

  const result = await pool.query("SELECT * FROM patients WHERE patient_id=$1", [id]);

  return result.rows[0];

}

async function updatePatient(id, data) {
  const { name, age, gender, phone, address, medical_history, assigned_doctor } = data;
  const result = await pool.query(
    "UPDATE patients SET name=$1, age=$2, gender=$3, phone=$4, address=$5, medical_history=$6, assigned_doctor=$7 WHERE patient_id=$8 RETURNING *",
    [name, age, gender, phone, address, medical_history, assigned_doctor, id]
  );
  return result.rows[0];
}

async function deletePatient(id) {
  await pool.query("DELETE FROM patients WHERE patient_id=$1", [id]);
}

module.exports = {
  getPatients,
  createPatient,
  getPatientById,
  updatePatient,
  deletePatient
};