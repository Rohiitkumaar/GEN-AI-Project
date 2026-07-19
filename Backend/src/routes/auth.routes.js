import { Router } from "express";
import { loginUserController, RegisterUserController, logoutUserController ,getMeController} from "../controller/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

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


 /**
* @route GET /api/auth/logout
* @description clear the token from the cookie and add the token to the blacklist
* @access public
*/

authRouter.get("/logout", logoutUserController)

 /**
* @route GET /api/auth/get-me
* @description get the detail of the user who is currently logged in
* @access public
*/

authRouter.get("/get-me", authUser,getMeController);

export default authRouter;