import mongoose,{model,Schema} from "mongoose";
const ProjectSchema=new Schema({
    projectname:{
        type:String,
        required:true
    },
    githubprojectlink:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    livehostedlink:{
        type:String
    },
    techstackused:{
        type:String
    },
    userid:{
        type:Schema.Types.ObjectId,
        ref:"Usermodel"
    }
})
export const ProjectModel=model("ProjectModel",ProjectSchema)
