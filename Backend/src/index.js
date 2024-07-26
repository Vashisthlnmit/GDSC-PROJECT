import { app } from "./app.js";
import { DBConnection } from "./Connection/dbconnection.js";
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
function startserver(){
    app.listen(process.env.PORT,()=>{
        console.log("the server has started successfully");
    })
}
DBConnection()
.then(()=>{
    startserver();
})
.catch((e)=>{
    console.log(e);
    process.exit(1);
})