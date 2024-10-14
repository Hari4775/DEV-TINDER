const express= require("express");
const connectDB = require("../config/mongodb");
<<<<<<< 6-LOGICAL-DB_QUERY
const cookieparser= require("cookie-parser");

const authRouter = require("../routes/auth");
const profileRouter =require("../routes/profile");
const requestRouter =require("../routes/requests");
=======

>>>>>>> BASIC-EXPRESS-MONGODB-CONNECTION

const app=express();
app.use(cookieparser());
app.use(express.json());

<<<<<<< 6-LOGICAL-DB_QUERY
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
=======
>>>>>>> BASIC-EXPRESS-MONGODB-CONNECTION

connectDB()
.then(()=>{
    console.log("data base connection is established")
    app.listen(3000,()=>{
        console.log("server is connected to  3000 portS0000")
    })
})
.catch((err)=>{
    console.log("data base connection is error")
});