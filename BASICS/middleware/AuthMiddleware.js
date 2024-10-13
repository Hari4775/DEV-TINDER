const jwt = require("jsonwebtoken");
const User= require("../model/user");
const userAuth= async (req,res,next)=>{

    try{
        const {token} = req.cookies
        if(!token){
            throw new Error("Token is not valid")
        }
        const decodedMessage= await jwt.verify(token,"DEV@Tinder$790");
        const{_id} = decodedMessage;
        const user= await User.findById(_id)
        if(!user){
            throw new Error("User is not available")
        }
        req.user= user
        next()

    }catch(err){
       res.status(404).send("ERROR"+err.message)
    }
}

module.exports=userAuth