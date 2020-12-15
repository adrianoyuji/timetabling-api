import { Request, Response } from "express";
import Course from "../models/Course";
import Joi from "joi";

const courseSchema = Joi.object({
  name: Joi.string().min(4).required(),
  tag: Joi.string().required(),
  periods: Joi.object({
    morning: Joi.boolean().required(),
    afternoon: Joi.boolean().required(),
    evening: Joi.boolean().required(),
  }),
  semesters: Joi.number().required(),
  subjects: Joi.array(),
  user_id: Joi.string().required(),
});

const list = async (req: Request, res: Response) => {
  const courses = await Course.find({ user_id: req.body.user_id });
  if (courses) {
    return res.status(200).send({ data: courses });
  } else {
    return res.status(400).send({ data: {}, error: "User not found" });
  }
};

const store = async (req: Request, res: Response) => {
  const { error } = courseSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ data: {}, error: error });
  }

  const courseExists = await Course.findOne({ tag: req.body.tag });
  console.log(courseExists);
  if (!!courseExists) {
    return res
      .status(400)
      .send({ data: {}, error: "course tag already exists" });
  }

  const course = new Course({
    name: req.body.name,
    tag: req.body.tag,
    periods: req.body.periods,
    semesters: req.body.semesters,
    subjects: req.body.subjects,
    active: req.body.active,
    user_id: req.body.user_id,
  });

  await course.save();

  res.status(201).send({ data: course });
};

const show = async (req: Request, res: Response) => {
  const course = await Course.findOne({ tag: req.params.id });

  if (course) {
    res.status(200).send({ data: course });
  } else {
    res.status(404).send({ error: "Course not found", data: {} });
  }
};

const update = async (req: Request, res: Response) => {
  let course = await Course.findOne({ tag: req.params.id });
  if (course) {
    const updates = {
      name: req.body.name,
      periods: req.body.periods,
      semesters: req.body.semester,
      subjects: req.body.subjects,
      active: req.body.active,
    };

    await Course.updateOne({ tag: req.params.id }, { ...updates });
    course = await Course.findOne({ tag: req.params.id });
    res.status(200).send({ data: course });
  } else {
    res.status(404).send({ error: "Course not found", data: {} });
  }
};

export default {
  store,
  list,
  show,
  update,
};
