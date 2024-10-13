const express=require("express");


const profileRouter = express.Router();
const jwt = require ("jsonwebtoken");
const User=require('../model/user');

profileRouter.get("/profile",async(req,res)=>{
    try{
        const cookies= req.cookies
        const {token}=cookies;
        if(!token){
            throw new Error("invalid token");
        }

        const decodedMessage= await jwt.verify(token, "DEV@Tinder$790")
  
        console.log(decodedMessage,"tokenss")
        const {_id} = decodedMessage;
        console.log(_id,"iddd")
        const user = await User.findById(_id)
        if(!user){
            throw new Error("User does not exist")
        }
        res.send(user)
    
    }catch(err){
        res.status(400).send('error: '+err.message)
    }

})

module.exports= profileRouter

