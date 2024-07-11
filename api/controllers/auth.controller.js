import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

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
  const hashPassword = bcryptjs.hashSync(password, 10);
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
