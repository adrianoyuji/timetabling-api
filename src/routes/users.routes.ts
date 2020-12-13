import { Router } from "express";
import userController from "../controllers/users.controller";

const professorsRouter = Router();

professorsRouter.route("/login").post(userController.login);
professorsRouter.route("/register").post(userController.register);

export default professorsRouter;
