const pool = require("../config/db");

async function requestAccess(user_id, patient_id, reason) {

  const result = await pool.query(
    `INSERT INTO emergency_access
     (user_id,patient_id,reason,start_time,end_time)
     VALUES ($1,$2,$3,NOW(),NOW()+INTERVAL '30 minutes')
     RETURNING *`,
    [user_id, patient_id, reason]
  );

  return result.rows[0];

}

async function checkAccess(user_id, patient_id) {

  const result = await pool.query(
    `SELECT * FROM emergency_access
     WHERE user_id=$1
     AND patient_id=$2
     AND end_time > NOW()`,
    [user_id, patient_id]
  );

  return result.rows;

}

async function getAllEmergencyLogs() {

  const result = await pool.query("SELECT * FROM emergency_access ORDER BY start_time DESC");

  return result.rows;

}

async function getEmergencyAccessById(id) {
  const result = await pool.query("SELECT * FROM emergency_access WHERE access_id=$1", [id]);
  return result.rows[0];
}

async function updateEmergencyAccess(id, user_id, patient_id, reason, status) {
  const result = await pool.query(
    "UPDATE emergency_access SET user_id=$1, patient_id=$2, reason=$3, status=$4 WHERE access_id=$5 RETURNING *",
    [user_id, patient_id, reason, status, id]
  );
  return result.rows[0];
}

async function deleteEmergencyAccess(id) {
  await pool.query("DELETE FROM emergency_access WHERE access_id=$1", [id]);
}

module.exports = {
  requestAccess,
  checkAccess,
  getAllEmergencyLogs,
  getEmergencyAccessById,
  updateEmergencyAccess,
  deleteEmergencyAccess
};