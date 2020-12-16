import { Router } from "express";
import professorController from "../controllers/professors.controller";

const professorsRouter = Router();

professorsRouter.route("/").post(professorController.store);
professorsRouter.route("/all/:id").get(professorController.list);
professorsRouter.route("/:id").get(professorController.show);
professorsRouter.route("/:id").patch(professorController.update);
professorsRouter.route("/").delete(professorController.destroy);

export default professorsRouter;
