const express=require("express");


const profileRouter = express.Router();
const jwt = require ("jsonwebtoken");
const User=require('../model/user');
const userAuth = require("../middleware/AuthMiddleware");

profileRouter.get("/profile",userAuth, async(req,res)=>{
    try{
        const user= req.user 
        res.send(user)
    }catch(err){
        res.status(400).send('error: '+err.message)
    }

})

module.exports= profileRouter

