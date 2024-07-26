import { ApiError } from "./apierror.js";

// export const asynchandler=(fn)=>async(req,res,next)=>{
//     try{
//         await fn(req,res,next);
//     }
//     catch(err){
//         console.log(err);
//         throw new ApiError(400,err.ApiError)
//     }
// }
export const asynchandler=(fn)=>{
    return (req,res,next)=>{
        Promise.resolve(fn(req,res,next)).catch((err)=>next(err))
    }
}