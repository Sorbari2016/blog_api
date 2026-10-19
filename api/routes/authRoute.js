import userController from "../controllers/userController.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", userController.loginUser);
authRouter.post("/signup", userController.createUser);

export default authRouter;
