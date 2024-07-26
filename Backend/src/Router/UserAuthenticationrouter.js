import Router from "express"
import { signup,signin,verifyemail,viewalluser, Logout } from "../Controllers/Authentication.js";
import { upload } from "../Middleware/multermiddleware.js";
import { authmiddleware } from "../Middleware/authmiddleware.js";
const authRouter=Router();
authRouter.post('/signup',signup);
authRouter.post('/signin',signin);
authRouter.post('/verify',verifyemail);
authRouter.get('/alluser',authmiddleware,viewalluser);
authRouter.post('/logout',authmiddleware,Logout);
export {authRouter}
