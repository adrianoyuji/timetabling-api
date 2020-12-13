import { Router } from "express";
import professorsRouter from "./professors.routes";
import userRouter from "./users.routes";

const routes = Router();

routes.use("/professors", professorsRouter);
routes.use("/user", userRouter);

export default routes;
