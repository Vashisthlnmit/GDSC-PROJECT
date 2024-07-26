import { Usermodel } from "../Models/UserModel.js";
import { ProjectModel } from "../Models/ProjectModel.js";
import { ApiResponse } from "../Helper/apiresponse.js";
import { ApiError } from "../Helper/apierror.js";
import { uploadfile } from "../Helper/cloudinary.js";
import { deletefile } from "../Helper/cloudinary.js";
import { asynchandler } from "../Helper/asynchandler.js";
import { changescommittedbyadmin } from "../Helper/mail.js";
import mongoose from "mongoose";

export const Addfile=asynchandler(async(req,res,next)=>{
    const { projectname,githubprojectlink, livehostedlink, techstackused}=req.body
    if(!projectname || !githubprojectlink){
        throw new ApiError(400,"Project name and github project link are required")
    }
    if(!req.file){
        throw new ApiError(400,"thumbnail is missing")
    }
    const cloudinaryresponse = await uploadfile(req.file.path);
    console.log(cloudinaryresponse);
    if (!cloudinaryresponse) {
        throw new ApiError(500, "failed to upload on server");
    }
    const createproject=await ProjectModel.create({
        projectname:projectname,
        githubprojectlink:githubprojectlink,
        thumbnail:cloudinaryresponse.url,
        livehostedlink: livehostedlink ? livehostedlink :null,
        techstackused:techstackused ? techstackused : null,
        userid:req.user._id
    })
    return res.json(new ApiResponse(200, true, "project has created successfully"));
})
export const viewproject=asynchandler(async(req,res,next)=>{
    const {userid}=req.params;
    if(!userid){
        throw new ApiError(400,"userid is required")
    }
    const mongooseuserid=new mongoose.Types.ObjectId(userid)
    if(!mongooseuserid.equals(req.user._id)){
        if(req.user.role=="Student"){
            throw new ApiError(403,"you are not authorized to view this project")
        }
    }
    const projectdetails=await ProjectModel.find({userid:mongooseuserid})
    if(!projectdetails){
        throw new ApiError(500,"internal service while viewing the project")
    }
   
    return res.json(new ApiResponse(200,true,"user post fetched successfully",projectdetails))
})
export const deleteproject=asynchandler(async(req,res,next)=>{
    const {projectid}=req.params;
    if(!projectid){
        throw new ApiError(400,"projectid is required")
    }
    const findproject=await ProjectModel.findById(projectid);
    const projectname=findproject.projectname;
    if(!findproject){
        throw new ApiError(404,"project not found")
    }
    const checkuser=findproject.userid.equals(req.user._id);
    if(!checkuser){
        if(req.user.role=="Student"){
            throw new ApiError(403,"you are not authorized to delete this project")
        }
    }
    
    const deleteproject=await ProjectModel.findByIdAndDelete(projectid);
    if(!deleteproject){
        throw new ApiError(500,"internal service while deleting the project")
    }
    if(!checkuser){
        const finduser=await Usermodel.findById(findproject.userid);
        const data={admin:req.user.fullName,task:"delete",projectname:projectname}
        changescommittedbyadmin(finduser.email,data)
    }
    return res.json(new ApiResponse(200,true,"user post delete successfully"));
})
export const editproject=asynchandler(async(req,res,next)=>{
    const { projectid}=req.params;
    const {projectname,githubprojectlink, livehostedlink, techstackused}=req.body
    console.log(req.body);
    if(!projectid){
        throw new ApiError(400,"projectid is required")
    }
    const findproject=await ProjectModel.findById(projectid);
    if(!findproject){
        throw new ApiError(404,"project not found")
    }
    const checkuser=findproject.userid.equals(req.user._id);
    if(!checkuser){
        if(req.user.role=="Student"){
            throw new ApiError(403,"you are not authorized to edit this project")
        }
    }
    
    const updatentity=await ProjectModel.findByIdAndUpdate(projectid,{
        $set:{
           projectname:projectname==null? findproject.projectname :projectname,
           githubprojectlink:githubprojectlink==null? findproject.githubprojectlink:githubprojectlink,
           livehostedlink:livehostedlink==null ? findproject.livehostedlink : livehostedlink,
           techstackused:techstackused==null ? findproject.techstackused: techstackused
        }
    },{new:true})
    if(!updatentity){
        throw new ApiError(500,"failed to update the fields")
    }
    if(req.file){
        await deletefile(findproject.thumbnail);
        const cloudinaryresponse = await uploadfile(req.file.path);
        if (!cloudinaryresponse) {
            throw new ApiError(500, "failed to upload on server");
        }
        updatentity.thumbnail=cloudinaryresponse.url;
        await updatentity.save();
    }
    if(!checkuser){
        const finduser=await Usermodel.findById(findproject.userid);
        const data={admin:req.user.fullName,task:"edit",projectname:projectname}
        changescommittedbyadmin(finduser.email,data)
    }
    return res.json(new ApiResponse(200, true, "project has updated successfully"));
    
})