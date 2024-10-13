const express=require("express");


const profileRouter = express.Router();
const jwt = require ("jsonwebtoken");
const User = require('../model/user');
const userAuth = require("../middleware/AuthMiddleware");
const {validateProfileData} = require("../util/validation")

profileRouter.get("/profile/view",userAuth, async(req,res)=>{
    try{
        const user= req.user 
        res.send(user)
    }catch(err){
        res.status(400).send('error: '+err.message)
    }

})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateProfileData(req)){
            throw new Error("invalid  edit requests")
        }
        const loggedInUser = req.user

        Object.keys(req.body).forEach((key)=>(loggedInUser[key] = req.body[key] ));
        await loggedInUser.save()
        res.json({
            message: `${loggedInUser.fristName}, Your profile updated  successfully`,
             data:loggedInUser,
            })
        console.log(loggedInUser,"profile edit user")
    }catch(err){
        res.status(400).send("error: "+err.message)
    }
})

module.exports= profileRouter

