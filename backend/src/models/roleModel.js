const pool = require("../config/db");

async function getRoles() {
  const result = await pool.query("SELECT * FROM roles");
  return result.rows;
}

async function getRoleById(id) {
  const result = await pool.query("SELECT * FROM roles WHERE role_id=$1", [id]);
  return result.rows[0];
}

async function createRole(role_name) {
  const result = await pool.query(
    "INSERT INTO roles(role_name) VALUES ($1) RETURNING *",
    [role_name]
  );
  return result.rows[0];
}

async function updateRole(id, role_name) {
  const result = await pool.query(
    "UPDATE roles SET role_name=$1 WHERE role_id=$2 RETURNING *",
    [role_name, id]
  );
  return result.rows[0];
}

async function deleteRole(id) {
  await pool.query("DELETE FROM roles WHERE role_id=$1", [id]);
}

module.exports = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};