const express= require("express")
const connectDB = require("../config/mongodb")
const app=express()
const User=require('../model/user')

app.post("/signup",async(req,res)=>{
    const user= new User({
        name:"hari",
        email:"hari@gmail,com",
        password:"asdfhkj34"
    })
    await user.save();
    try{
        res.send("user registerd successfully")
    }catch(err){ 
        // error handling
        res.status(400).send("Error for saving the data"+err.message)
    }
})
connectDB()
.then(()=>{
    console.log("data base connection is established")
    app.listen(3000,()=>{
        console.log("server is connected to  3000 portSSS")
    })
})
.catch((err)=>{
    console.log("data base connection is error")
});