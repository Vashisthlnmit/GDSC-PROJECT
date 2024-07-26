import nodemailer from "nodemailer"
import { ApiError } from "./apierror.js";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: process.env.MAILPORT,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});
export async function emailverificationmail(email,code) {
    try{
        const info = await transporter.sendMail({
            from: 'gdsclnmiitworkspace.email', // sender address
            to: email, // list of receivers
            subject: "User Verification", // Subject line
            html:`<div>To complete your registration and verify your email address, please use the following One-Time Password ${code}:</div>`, 
          });
        
          console.log("Message sent: %s", info.messageId);
    }
    catch(error){
        console.log(error);
        throw new ApiError(500,"some problem in sending email");
    }
}
export async function changescommittedbyadmin(email,data){
  try{
    const info=await transporter.sendMail({
      from: 'gdsclnmiitworkspace.email', // sender address
      to: email, // list of receivers
      subject: "Changes Committed by Admin", // Subject line
      html:`<div>Admin ${data?.admin} has committed ${data?.task} in your project ${data?.projectname}</div>`,
    })
  }
  catch(err){
        console.log(err);
        throw new ApiError(500,"some problem in sending email");
  }
}