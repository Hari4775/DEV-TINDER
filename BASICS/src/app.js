const express= require("express")
const connectDB = require("../config/mongodb")
const app=express()
const User=require('../model/user')
app.use(express.json())

app.post("/signup",async(req,res)=>{
    const user= new User(req.body)
    await user.save();
    try{
        res.send("user registerd successfully")
    }catch(err){ 
        res.status(400).send("Error for saving the data"+err.message)
    }
})

app.get("/getuser",async(req,res)=>{
  try{
    const getUsers=await User.find()
    res.send(getUsers)
  }catch(err){
    res.status(400).send("error getting users data")
  }

})
app.get("/getuserbymail",async(req,res)=>{
    const userMail= req.body.email
    try{
       const uniqueUser= await User.findOne({email:userMail})
       res.send(uniqueUser)
    }catch(err){
        res.status(400).send("error getting the specified user dataSDFSD")
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