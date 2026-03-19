const pool = require("../config/db");

async function getPermissions() {
  const result = await pool.query("SELECT * FROM permissions");
  return result.rows;
}

async function getPermissionById(id) {
  const result = await pool.query("SELECT * FROM permissions WHERE permission_id=$1", [id]);
  return result.rows[0];
}

async function createPermission(permission_name) {
  const result = await pool.query(
    "INSERT INTO permissions(permission_name) VALUES ($1) RETURNING *",
    [permission_name]
  );
  return result.rows[0];
}

async function updatePermission(id, permission_name) {
  const result = await pool.query(
    "UPDATE permissions SET permission_name=$1 WHERE permission_id=$2 RETURNING *",
    [permission_name, id]
  );
  return result.rows[0];
}

async function deletePermission(id) {
  await pool.query("DELETE FROM permissions WHERE permission_id=$1", [id]);
}

module.exports = {
  getPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission
};