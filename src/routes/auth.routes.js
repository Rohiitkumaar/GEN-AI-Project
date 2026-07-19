import { Router } from "express";
import { loginUserController, RegisterUserController } from "../controller/auth.controller.js";

const authRouter = Router();

/**
     * @route POST /api/auth/register
     * @description To register the user
     * @access public
     */

authRouter.post("/register", RegisterUserController);
    
 /**
     * @route POST /api/auth/login
     * @description To login the user with email and password
     * @access public
     */

authRouter.post("/login",loginUserController)

export default authRouter;