import { Router } from "express";
const ProjectRouter=Router();
import { upload } from "../Middleware/multermiddleware.js";
import { Addfile,deleteproject,viewproject,editproject } from "../Controllers/ProjectController.js";
import { authmiddleware } from "../Middleware/authmiddleware.js";
import { adminmiddleware } from "../Middleware/adminmiddleware.js";

ProjectRouter.post("/addfile",authmiddleware,upload.single("thumbnail"),Addfile);
ProjectRouter.get('/view/:userid',authmiddleware,viewproject)
ProjectRouter.delete("/deleteproject/:projectid",authmiddleware,deleteproject);
ProjectRouter.post("/editproject/:projectid",authmiddleware,editproject);
export {ProjectRouter}