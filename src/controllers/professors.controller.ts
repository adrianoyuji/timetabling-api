import { Request, Response } from "express";
import Professor from "../models/Professor";
import Joi from "joi";

const professorSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  code: Joi.string().required(),
  workload: Joi.object({ min: Joi.number(), max: Joi.number() }),
  preferences: Joi.object({
    schedule: Joi.object(),
    subjects: Joi.array(),
  }),
  active: Joi.bool(),
  courses: Joi.array(),
  user_id: Joi.string().required(),
});

const list = async (req: Request, res: Response) => {
  const professors = await Professor.find({ user_id: req.params.id });
  if (professors) {
    return res.status(200).send({ data: professors });
  } else {
    return res.status(400).send({ data: {}, error: "User not found" });
  }
};

const store = async (req: Request, res: Response) => {
  const { error } = professorSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send({ data: {}, error: error });
  }

  const professorExists = await Professor.findOne({ code: req.body.code });

  if (!!professorExists) {
    return res
      .status(400)
      .send({ data: {}, error: "professor code already exists" });
  }

  const professor = new Professor({
    name: req.body.name,
    email: req.body.email,
    code: req.body.code,
    workload: req.body.workload,
    preferences: req.body.preferences,
    active: req.body.active,
    courses: req.body.courses,
    user_id: req.body.user_id,
  });

  await professor.save();

  res.status(201).send({ data: professor });
};

const show = async (req: Request, res: Response) => {
  const professor = await Professor.findOne({ code: req.params.id });

  if (professor) {
    res.status(200).send({ data: professor });
  } else {
    res.status(404).send({ error: "Professor not found", data: {} });
  }
};

const update = async (req: Request, res: Response) => {
  let professor = await Professor.findOne({ code: req.params.id });
  if (professor) {
    const updates = {
      name: req.body.name,
      email: req.body.email,
      workload: req.body.workload,
      preferences: req.body.preferences,
      active: req.body.active,
      courses: req.body.courses,
    };

    await Professor.updateOne({ code: req.params.id }, { ...updates });
    professor = await Professor.findOne({ code: req.params.id });
    res.status(200).send({ data: professor });
  } else {
    res.status(404).send({ error: "Professor not found", data: {} });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    await Professor.deleteOne({
      code: req.query.code,
      user_id: req.query.user_id,
    });
    res.status(200).send({ data: {} });
  } catch (err) {
    res.status(404).send({ error: "Course not found", data: {} });
  }
};

export default {
  store,
  list,
  show,
  update,
  destroy,
};
