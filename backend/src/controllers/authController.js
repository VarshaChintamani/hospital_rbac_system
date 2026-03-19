const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.login = async (req, res) => {

  const { email, password } = req.body;

  const user = await userModel.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.user_id, role: user.role_id },
    process.env.JWT_SECRET
  );

  res.json({ token });

};

exports.register = async (req, res) => {

  try {

    const { name, email, password, role_id } = req.body;

    // check if user exists
    const existingUser = await userModel.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const user = await userModel.createUser(name, email, hashedPassword, role_id);

    res.json({
      message: "User registered successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};