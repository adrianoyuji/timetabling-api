import { Router } from "express";
import professorController from "../controllers/professors.controller";

const professorsRouter = Router();

professorsRouter.route("/").post(professorController.store);
professorsRouter.route("/").get(professorController.list);

export default professorsRouter;
