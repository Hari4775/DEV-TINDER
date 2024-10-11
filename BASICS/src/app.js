const express= require("express")
const connectDB = require("../config/mongodb")
const app=express()

connectDB()

app.listen(3000,()=>{
    console.log("server is connected to  3000 port")
})