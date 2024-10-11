const   mongoose  = require("mongoose");
const validate= require("validator")
const userSchema= new mongoose.Schema({
    name:{
        type:String,
 
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
    password:{
        type:String
    }

})

module.exports = mongoose.model("users",userSchema)