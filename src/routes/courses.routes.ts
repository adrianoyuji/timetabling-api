import { Router } from "express";
import coursesController from "../controllers/courses.controller";

const coursesRouter = Router();

coursesRouter.route("/").post(coursesController.store);
coursesRouter.route("/").get(coursesController.list);
coursesRouter.route("/:id").get(coursesController.show);
coursesRouter.route("/:id").patch(coursesController.update);

export default coursesRouter;
