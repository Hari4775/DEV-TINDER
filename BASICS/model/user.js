const   mongoose  = require("mongoose");
const validate= require("validator");
const jwt= require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema= new mongoose.Schema({
    fristName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String
    },
    age:{
        type:String
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validator(value){
            if(!validate.isEmail(value)){
                throw new Error("invalid mail id entered")
            }
        }

    },
    photoURL:{
        type:String
    },
    gender:{
        type:String
    },
    password:{
        type:String,
        required:true,
    },
    about:{
        type:String
    },
    skills:{
        Type:String
    }

})

userSchema.methods.getJWT =async function (){
    const user = this;
    //  this keyword refers to the same id of the user
    const token = await jwt.sign({_id: user._id},"DEV@Tinder$790",{expiresIn:"1h"});
    return token;
} 

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user= this;
    const passwordHash = user.password;
    const ispasswordValid =await bcrypt.compare(passwordInputByUser,passwordHash);
    return ispasswordValid;
}
module.exports = mongoose.model("users",userSchema)