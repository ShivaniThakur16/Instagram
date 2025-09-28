import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createUser, findOneUser } from "../dao/user.dao.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
export async function registerController(req, res) {
  const { username, email, password } = req.body;
  const isUserexist = await findOneUser({
    $or: [
      {
        username,
      },
      {
        email,
      },
    ],
  });
  if (isUserexist) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedpassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    username,
    email,
    password: hashedpassword,
  });
  const token = jwt.sign({ _id: user._id }, config.JWT_SECRET);

  res.cookie("token", token);
  return res.status(201).json({
    message: "User created successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      image: user.image,
    },
  });
}



export async function loginController(req, res) {
  const { email, password, username } = req.body;
  const user = await findOneUser({
    $or: [
      {
        email,
      },
      {
        username,
      },
    ],
  });
  if (!user) {
    return res.status(400).json({
      message: " Invalid email or password",
    });
  }
  const ispasswordValid = await bcrypt.compare(password, user.password);
  if (!ispasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      image: user.image,
    },
  });
}
