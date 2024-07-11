import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !email ||
    !password ||
    !username ||
    email === "" ||
    password === "" ||
    username === ""
  ) {
    next(errorHandler(400, "All Fields Required"));
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
    next(err);
  }
};
