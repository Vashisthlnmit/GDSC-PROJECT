import { ApiError } from "../Helper/apierror.js";
import { asynchandler } from "../Helper/asynchandler.js";

export const adminmiddleware=asynchandler(async(req,res,next)=>{
    const userrole=req.user.role
    if(userrole=="Admin"){
        next();
    }
    else{
        throw new ApiError(500,"sorry you are not admin please login with admin email id")
    }
})
