import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app=express();
app.use(urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))
// Authentication Router
import { authRouter } from "./Router/UserAuthenticationrouter.js";
import { ProjectRouter } from "./Router/Projectrouter.js";
app.use('/auth',authRouter);
app.use('/project',ProjectRouter)
export {app};