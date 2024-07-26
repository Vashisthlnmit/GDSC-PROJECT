import mongoose from "mongoose";
export async function DBConnection(){
    try{
        const connection=await mongoose.connect(`${process.env.DBCONNECTIONSTRING}/${process.env.DBNAME}`);
        console.log("Database connection established. Ready for queries.",connection.connection.host)
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}