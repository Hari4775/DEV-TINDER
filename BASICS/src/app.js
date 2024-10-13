const express= require("express");
const connectDB = require("../config/mongodb");


const app=express();
app.use(cookieparser());
app.use(express.json());


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