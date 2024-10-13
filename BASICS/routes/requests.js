const express= require("express");

const requestRouter = express.Router();

requestRouter.get("/requests",async(req,res)=>{
    res.send("requested success")
})

module.exports= requestRouter;