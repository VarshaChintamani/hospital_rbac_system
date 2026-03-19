const pool = require("../config/db");

async function getAuditLogs() {
  const result = await pool.query("SELECT * FROM audit_logs ORDER BY created_at DESC");
  return result.rows;
}

async function getAuditLogById(id) {
  const result = await pool.query("SELECT * FROM audit_logs WHERE log_id=$1", [id]);
  return result.rows[0];
}

async function createAuditLog(user_id, action, patient_id) {
  const result = await pool.query(
    "INSERT INTO audit_logs(user_id, action, patient_id) VALUES ($1, $2, $3) RETURNING *",
    [user_id, action, patient_id]
  );
  return result.rows[0];
}

async function updateAuditLog(id, user_id, action, patient_id) {
  const result = await pool.query(
    "UPDATE audit_logs SET user_id=$1, action=$2, patient_id=$3 WHERE log_id=$4 RETURNING *",
    [user_id, action, patient_id, id]
  );
  return result.rows[0];
}

async function deleteAuditLog(id) {
  await pool.query("DELETE FROM audit_logs WHERE log_id=$1", [id]);
}

module.exports = {
  getAuditLogs,
  getAuditLogById,
  createAuditLog,
  updateAuditLog,
  deleteAuditLog
};