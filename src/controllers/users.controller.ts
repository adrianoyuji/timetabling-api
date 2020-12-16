import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import Joi from "joi";

const UserSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6),
});

const authSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6),
});

const login = async (req: Request, res: Response) => {
  const { error } = authSchema.validate(req.body);
  if (!!error) {
    return res.status(400).json({ error: error });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "invalid email" });
  }

  const validPwd = await bcrypt.compare(req.body.password, user.password);
  if (!validPwd) {
    return res.status(400).json({ error: "Invalid password" });
  }

  return res
    .status(200)
    .json({ data: { email: user.email, name: user.name, _id: user._id } });
};

const register = async (req: Request, res: Response) => {
  const { error } = UserSchema.validate(req.body);
  if (!!error) {
    return res.status(400).json({ error: error });
  }

  const validEmail = await User.findOne({ email: req.body.email });
  if (validEmail) {
    return res.status(400).json({ error: "email already exists!" });
  }

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  await user.save();
  return res
    .status(201)
    .send({ data: { name: user.name, email: user.email, _id: user._id } });
};

export default { login, register };
