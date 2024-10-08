import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import toast from "react-hot-toast"
import axiosInstance from "../../Helper/axiosinstance";
export const createproject=createAsyncThunk('/addproject',async(data)=>{
    console.log(data);
    const form=new FormData;
    form.append("projectname",data.projectname);
    form.append("githubprojectlink",data.githubprojectlink);
    form.append("livehostedlink",data.livehostedlink);
    form.append("techstackused",data.techstackused);
    form.append("thumbnail",data.thumbnail);
    try{
     const response=axiosInstance.post('project/addfile',form)
     toast.promise(response,{
        loading:"wait creating the project",
        success: "your project has been created successfully",
        error:(err)=>{
            return err?.message
        }
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
     const response=axiosInstance.get(`project/view/${data}`)
     toast.promise(response,{
        loading:"wait showing all the project",
        success: "your project has been fetched successfully",
        error:(err)=>{
           return err?.message
        }
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
     const response=axiosInstance.delete(`project/deleteproject/${data}`)
     toast.promise(response,{
        loading:"wait while deleting the project",
        success: "your project has been deleted successfully",
        error:(err)=>{
           return err?.message
        }
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
     const response=axiosInstance.post(`project/deleteproject/${data.projectid}`)
     toast.promise(response,{
        loading:"wait while updating the project",
        success: "your project has been updated successfully",
        error:(err)=>{
            return err?.message
        }
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


