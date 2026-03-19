const pool = require("../config/db");

async function getUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );
  return result.rows[0];
}

async function createUser(name, email, password, role_id) {
  const result = await pool.query(
    "INSERT INTO users(name,email,password,role_id) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, email, password, role_id]
  );

  return result.rows[0];
}

async function getUserById(id) {
  const result = await pool.query(
    "SELECT * FROM users WHERE user_id=$1",
    [id]
  );
  return result.rows[0];
}

async function getAllUsers() {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
}

async function updateUser(id, data) {
  const { name, email, role_id } = data;
  const result = await pool.query(
    "UPDATE users SET name=$1, email=$2, role_id=$3 WHERE user_id=$4 RETURNING *",
    [name, email, role_id, id]
  );
  return result.rows[0];
}

async function deleteUser(id) {
  await pool.query("DELETE FROM users WHERE user_id=$1", [id]);
}

module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
};