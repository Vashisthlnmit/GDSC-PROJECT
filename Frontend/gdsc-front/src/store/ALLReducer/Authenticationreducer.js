import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import toast from "react-hot-toast"
const intialstate={
    isloggedin:localStorage.getItem("isloggedin") || false,
    data:localStorage.getItem("data") || {}
}
export const createaccount=createAsyncThunk('/signup',async(data)=>{
    console.log(data);
    try{
     const response=axios.post('https://gdsc-project-1.onrender.com/auth/signup',data)
     toast.promise(response,{
        loading:"wait creating the account",
        success: "your account has created successfully otp send on your email please verify it",
        error:(err)=>{
            return err?.response?.data
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
export  const Verify=createAsyncThunk('/verify',async(data)=>{
    try{
     const response=axios.post('https://gdsc-project-1.onrender.com/auth/verify',data)
     toast.promise(response,{
        loading:"wait while verify  the account",
        success: "account verified successfully",
        error:(err)=>{
            return err?.response?.data
        }
     })
     const resp=await response;
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const authin=createAsyncThunk('/signin',async(data)=>{
    console.log(data);
    try{
     const response=axios.post('https://gdsc-project-1.onrender.com/auth/signin',data)
     toast.promise(response,{
        loading:"wait signing the account",
        success: "user signed successfully",
        error:(err)=>{
            return err?.response?.data
        }
     })
     const resp=await response;
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const viewmember=createAsyncThunk('/member',async()=>{
    //console.log(data);
    try{
     const response=axios.get('https://gdsc-project-1.onrender.com/auth/alluser',{withCredentials:true})
     toast.promise(response,{
        loading:"wait fetching user",
        success: "user fetched successfully",
        error:(err)=>{
             return err?.response?.data
        }
     })
     const resp=await response;
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const logout=createAsyncThunk('/logout',async()=>{
    //console.log(data);
    try{
     const response=axios.post('https://gdsc-project-1.onrender.com/auth/logout')
     toast.promise(response,{
        loading:"wait logging out user",
        success: "user logout successfully",
        error:(err)=>{
            return err?.response?.data
        }
     })
     const resp=await response;
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
const authoptions=createSlice({
    name:"auth",
    initialState:intialstate,
    extraReducers:(builder)=>{
        builder
        .addCase(authin.fulfilled,(state,action)=>{
            localStorage.setItem("isloggedin",action?.payload?.data?.success)
            localStorage.setItem("data",JSON.stringify(action?.payload?.data?.data))
            state.isloggedin=true
            state.data=action.payload.data.data
        })
        .addCase(logout.fulfilled,(state,action)=>{
            localStorage.removeItem("isloggedin")
            localStorage.removeItem("data")
            state.isloggedin=false
            state.data={}
        })
    }
})
export  default authoptions.reducer