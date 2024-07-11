import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !email ||
    !password ||
    !username ||
    email === "" ||
    password === "" ||
    username === ""
  ) {
    return res.status(400).json({ msg: "all fields are required" });
  }
  const saltRounds = parseInt(process.env.PASSSALT, 10);
  const hashPassword = bcryptjs.hashSync(password, saltRounds);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });
  try {
    await newUser.save();
    res.json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
