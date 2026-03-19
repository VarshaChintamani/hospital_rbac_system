const pool = require("../config/db");

async function logAction(user_id, action, patient_id = null) {
  await pool.query(
    "INSERT INTO audit_logs(user_id, action, patient_id) VALUES ($1,$2,$3)",
    [user_id, action, patient_id]
  );
}

module.exports = logAction;