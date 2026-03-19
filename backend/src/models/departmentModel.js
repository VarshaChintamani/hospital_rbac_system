const pool = require("../config/db");

async function getDepartments() {
  const result = await pool.query("SELECT * FROM departments");
  return result.rows;
}

async function getDepartmentById(id) {
  const result = await pool.query("SELECT * FROM departments WHERE department_id=$1", [id]);
  return result.rows[0];
}

async function createDepartment(department_name) {
  const result = await pool.query(
    "INSERT INTO departments(department_name) VALUES ($1) RETURNING *",
    [department_name]
  );
  return result.rows[0];
}

async function updateDepartment(id, department_name) {
  const result = await pool.query(
    "UPDATE departments SET department_name=$1 WHERE department_id=$2 RETURNING *",
    [department_name, id]
  );
  return result.rows[0];
}

async function deleteDepartment(id) {
  await pool.query("DELETE FROM departments WHERE department_id=$1", [id]);
}

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
};