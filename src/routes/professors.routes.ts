import { Router } from "express";
import professorController from "../controllers/professors.controller";

const professorsRouter = Router();

professorsRouter.route("/").post(professorController.store);
professorsRouter.route("/").get(professorController.list);
professorsRouter.route("/:id").get(professorController.show);
professorsRouter.route("/:id").patch(professorController.update);

export default professorsRouter;
