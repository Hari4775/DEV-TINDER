const express = require("express")
const userAuth = require("../middleware/AuthMiddleware")
const ConnectionRequests= require("../model/connectionRequest")
const userRouter= express.Router()

const userSaferData = "fristName lastName photURL age gender about skills";

//FOR FETCHING ALL REQUESTS FOR A SPECIFIED USER. 
userRouter.get("/user/requests/recieved",userAuth,async (req,res)=>{
    
    try{
        const loggedInUser = req.user;
        const viewRequests= await ConnectionRequests.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["fristName","lastName","gender", "phoURL","about","skills"]); // populate is a method in mongoDB  for connecting different collections.
        //  fromUserId is available in request schema , in the rquest scema we provided a reference to tne user schema so can able to access the user schema from here
        res.json({
            message:"all requests are fetched successfully",
            data:viewRequests,
        });

    }catch(err){
        res.status(400).send("error: "+err.message)
    }
})


// FOR CONNECTIONS
userRouter.get("/user/connection",userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user
        const connectionRequests= await ConnectionRequests.find({
            $or:[
                {toUserId: loggedInUser._id, status:"accepted"},
                {fromUserId:loggedInUser._id, status:"accepted"}
            ]
        }).populate("fromUserId", userSaferData);
    
        // map the user data 
        const data = connectionRequests.map((row)=>{
           if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId;
           }
           return row.fromUserId;
        });

      res.json({ data })
    }catch(err){
        res.status(400).send("error: "+err.message)
    }
})

module.exports = userRouter