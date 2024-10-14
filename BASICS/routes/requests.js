const express= require("express");
const userAuth = require("../middleware/AuthMiddleware");
const User= require("../model/user")

const ConnectionRequest = require("../model/connectionRequest");
const requestRouter = express.Router();

// : means dynamic routes can change the values
// userAuth will help to check the token
// status dynamica ayi use cheythan  interested,ignored url same route il access cheyyam

requestRouter.post("/requests/send/:status/:toUserId", userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user.id; //requesed user id
        const toUserId = req.params.toUserId; //we using dynamic :toUserId so get toUserId from routes by using params method
        const status = req.params.status;  //staus also provided dynamically. access staus buy using params method
       

        // allowing only for "ignored", "interest" status conditions
        const allowedStatus =["ignored", "interested"];
        if(!allowedStatus){
            return res.status(400).json({message:"invalid status type"+status})
        }

        // checking the userID is available in the DB if not available then pop up the error "user is not found"
        const toUser= await User.findById(toUserId);
        console.log(toUser,'to user')
        if(!toUser){
            return res.status(404).json({message:"user not found"})
        }

        // condition for checking connection request is existing or not
        const existingConnectionRequest= await ConnectionRequest.findOne({
            $or:[    // is a mongodb operation for checking the or condition
                {fromUserId,toUserId}, //eg: hari,elonMusk
                {fromUserId:toUserId, toUserId:fromUserId} // vice versa
            ]
        })

        if(existingConnectionRequest){
          return res.status(400).send({message:"Connection Request already exists"});
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save()
       res.json({
        message:req.user.fristName+" is "+status+" in "+toUser.fristName ,
        data,
       })

    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})                

module.exports= requestRouter;