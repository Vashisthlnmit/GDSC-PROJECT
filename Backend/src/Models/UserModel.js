import mongoose,{Schema,model} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const usertype=[
    "Admin",
    "Student"
];
const userSchema= new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["Admin", "Student"]
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    verificationcode:{
        type:String,
        default:null
    },
    verificationtime:{
        type:Date,
        default:null
    }


},{timestamps:true})
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
};
userSchema.methods.generateaccesstoken=function(){
    const accesstoken= jwt.sign({
        _id:this._id,
       fullName:this.fullName,
       email:this.email,
       role:this.role

    },process.env.JWT_SECRET,{expiresIn:process.env.JWT_CODEEXPIRY})
    return accesstoken;
};
export const Usermodel=model("Usermodel",userSchema)