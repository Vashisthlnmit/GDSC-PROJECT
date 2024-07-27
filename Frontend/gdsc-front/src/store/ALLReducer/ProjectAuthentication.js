import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import toast from "react-hot-toast"
export const createproject=createAsyncThunk('/addproject',async(data)=>{
    console.log(data);
    const form=new FormData;
    form.append("projectname",data.projectname);
    form.append("githubprojectlink",data.githubprojectlink);
    form.append("livehostedlink",data.livehostedlink);
    form.append("techstackused",data.techstackused);
    form.append("thumbnail",data.thumbnail);
    try{
     const response=axios.post('https://gdsc-project-1.onrender.com/project/addfile',form,{withCredentials:true})
     toast.promise(response,{
        loading:"wait creating the project",
        success: "your project has been created successfully",
        error:"failed to project"
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const viewproject=createAsyncThunk('/viewproject',async(data)=>{
    console.log(data);
    try{
     const response=axios.get(`https://gdsc-project-1.onrender.com/project/view/${data}`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait showing all the project",
        success: "your project has been fetched successfully",
        error:"failed to project"
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const deleteproject=createAsyncThunk('/deleteproject',async(data)=>{
    console.log(data);
    try{
     const response=axios.delete(`https://gdsc-project-1.onrender.com/project/deleteproject/${data}`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait while deleting the project",
        success: "your project has been deleted successfully",
        error:"failed to delete project"
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const editproject=createAsyncThunk('/deleteproject',async(data)=>{
    try{
     const response=axios.post(`https://gdsc-project-1.onrender.com/project/deleteproject/${data.projectid}`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait while updating the project",
        success: "your project has been updated successfully",
        error:"failed to edit project"
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})


