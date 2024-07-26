import { asynchandler } from "../Helper/asynchandler.js";
import { Usermodel } from "../Models/UserModel.js";
import { ApiError } from "../Helper/apierror.js";
import { emailverificationmail } from "../Helper/mail.js";
import { ApiResponse } from "../Helper/apiresponse.js";
import { option } from "../Helper/options.js";
export const signup=asynchandler(async (req,res)=>{
    const { fullName,email,password,role } = req.body;
    if(!fullName || !email || !password || !role){
        throw new ApiError(400,"some fields are missing")
    }
    const finduser = await Usermodel.findOne({ email: email });
    if (finduser && finduser.isVerified) {
        throw new ApiError(400, "user already exist");
    }
    const generatecode = Math.floor(Math.random() * 100000);
    const codexpire = new Date();
    codexpire.setHours(codexpire.getHours() + 1);
    const newuser=await Usermodel.create({
        fullName:fullName,
        email:email,
        password:password,
        role:role,
        verificationcode:generatecode,
        verificationtime:codexpire,
    })
    emailverificationmail(email,generatecode);
    res.json(new ApiResponse(200,true,"user registered successfully verification code has been sent to your email"));
})
export const signin=asynchandler(async(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "some fields are missing");
    }
    const user = await Usermodel.findOne({ email: email });
    if (!user) {
        throw new ApiError(400, "no such user found");
    }
    if (user.isVerified == false) {
        throw new ApiError(400, "user not verified");
    }
    const checkpass = await user.isPasswordCorrect(password)
    if (!checkpass) {
        throw new ApiError(400, "password is incorrect")
    }
    const accesstoken = user.generateaccesstoken();
    const resp = await Usermodel.findById(user._id).select("-isVerified -verificationcode -verificationtime -createdAt -updatedAt -password");
    return res
        .status(200)
        .cookie("Accesstoken", accesstoken, option)
        .json(new ApiResponse(200, true, "user signed in successfully", resp));
})
export const verifyemail=asynchandler(async(req,res)=>{
    const { verifycode, email } = req.body;
    if (!verifycode || !email) {
        throw new ApiError(400, "some detail is missing")
    }
    const finduser = await Usermodel.findOne({ email });
    if (!finduser) {
        throw new ApiError(400, "no such user exist with this email");
    }
    if (finduser.verificationcode == verifycode && finduser.verificationtime > Date.now()) {
        finduser.isVerified = true;
        finduser.verificationcode = null;
        finduser.verificationtime=null;
        await finduser.save();
        return res.json(new ApiResponse(200, true, "user verified successfully"));
    }
    else if (finduser.verificationcode != verifycode) {
        throw new ApiError(400, "verification code is not correct");
    }
    else {
        throw new ApiError(400, "verification timeout");
    }
})
export const viewalluser=asynchandler(async(req,res)=>{
    if(req.user.role=="Student"){
        throw new ApiError(400,"you are not authorized to this request")
    }
    const users = await Usermodel.find({role:"Student"});
    if(!users){
        throw new ApiError(500,"some internal server while fetching user")
    }
    return res.json(new ApiResponse(200,true,"user fetched successfully",users));
})
export const Logout = asynchandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    };
    return res.status(200).clearCookie("Accesstoken", options).json(new ApiResponse(200, true, "user log out successfully"))}
)