const express = require("express");

const authRouter = express.Router();
const User= require("../model/user");
const bcrypt = require("bcrypt");
const {validateSignupData} =require("../util/validation");
const jwt = require("jsonwebtoken");

authRouter.post("/signup",async(req,res)=>{
    try{
        validateSignupData(req)
        const{name,email,password}= req.body
        const hashedPassword = await bcrypt.hash(password,10)
        console.log(hashedPassword,"hash password")
        const user = new User({name,email,password:hashedPassword})
        await user.save()
        res.send("user signn up successfully")
    }catch(err){ 
        res.status(400).send("ERROR SINGUP DATA  "  + err.message)
    }
})

authRouter.post("/login",async(req,res)=>{
    try{
        const{email,password} = req.body;
        const user = await User.findOne({email:email})
        if(!user){
            throw new Error("invalid login credentials");
        }
       const ispasswordValid =await bcrypt.compare(password,user.password);

       if(ispasswordValid){
        // token have  hidden user_id, password:"DEV@TINDER$790"
        const token = await jwt.sign({_id: user._id},"DEV@Tinder$790");
        console.log(token)
        res.cookie("token",token);
        res.send("login successfully")
       }
       
        else{
            throw new Error('invalid password')
        }
    }catch(err){
     res.status(400).send("error: " +err.message)
    }
    })

authRouter.post("/logout",(req,res)=>{
    try{

    }catch(err){
       res.status(400).send("ERROR LOG OUT " + err.message)
    }
})

module.exports= authRouter;