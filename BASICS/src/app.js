const express= require("express");
const connectDB = require("../config/mongodb");
const {userAuth} =require("../middleware/auth");
const User=require('../model/user');
const {validateSignupData} = require("../util/validation");

const bcrypt =require("bcrypt");
const cookieparser= require("cookie-parser");
const jwt = require("jsonwebtoken");

const app=express();
app.use(cookieparser());
app.use(express.json());


app.post("/signup",async(req,res)=>{
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

app.post("/login", async(req,res)=>{
try{
    const{email,password} = req.body;
    const user = await User.findOne({email:email})
    if(!user){
        throw new Error("invalid login credentials");
    }
    const isValidPassword=await bcrypt.compare(password,user.password)
    if(isValidPassword){
    //    providing JWT  token 
    // _id refers the database unique id, and provide a password
    const token = await jwt.sign({_id:user._id},"Hari@1234")
    console.log(token)
    res.cookie("token",token)
    res.send("login successfully")
    }
    else{
        throw new Error('invalid password')
    }
}catch(err){
 res.status(400).send("error: " +err.message)
}
})

app.get("/profile", userAuth,async(req,res)=>{
    try{
       const user= req.user;
        res.send(user)
    }catch(err){
        res.status(400).send('error: '+err.message)
    }

})

connectDB()
.then(()=>{
    console.log("data base connection is established")
    app.listen(3000,()=>{
        console.log("server is connected to  3000 portS0000")
    })
})
.catch((err)=>{
    console.log("data base connection is error")
});