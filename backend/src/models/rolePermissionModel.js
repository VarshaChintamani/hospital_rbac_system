const pool = require("../config/db");

async function getRolePermissions() {
  const result = await pool.query("SELECT * FROM role_permissions");
  return result.rows;
}

async function getRolePermissionById(id) {
  const result = await pool.query("SELECT * FROM role_permissions WHERE role_permission_id=$1", [id]);
  return result.rows[0];
}

async function createRolePermission(role_id, permission_id) {
  const result = await pool.query(
    "INSERT INTO role_permissions(role_id, permission_id) VALUES ($1, $2) RETURNING *",
    [role_id, permission_id]
  );
  return result.rows[0];
}

async function updateRolePermission(id, role_id, permission_id) {
  const result = await pool.query(
    "UPDATE role_permissions SET role_id=$1, permission_id=$2 WHERE role_permission_id=$3 RETURNING *",
    [role_id, permission_id, id]
  );
  return result.rows[0];
}

async function deleteRolePermission(id) {
  await pool.query("DELETE FROM role_permissions WHERE role_permission_id=$1", [id]);
}

module.exports = {
  getRolePermissions,
  getRolePermissionById,
  createRolePermission,
  updateRolePermission,
  deleteRolePermission
};