import { Router } from "express";
import professorsRouter from "./professors.routes";
import userRouter from "./users.routes";
import courseRouter from "./courses.routes";

const routes = Router();

routes.use("/professors", professorsRouter);
routes.use("/user", userRouter);
routes.use("/courses", courseRouter);

export default routes;
