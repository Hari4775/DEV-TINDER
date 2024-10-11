
const validator = require("validator")
// npm i validator--- for validating external module

const validateSignupData = (req)=>{
    const {name,email,password} =req.body;

    if(!name){
        throw new Error("name is not valid")
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid")
    }
    else if (!validator.isStrongPassword(password)){
        throw  new Error("Please enter a strong Password")
    }
}

const validationLogin=(req)=>{
    if(!validator.isEmail(email)){
        throw new Error("Email is not valid")
    }
}

module.exports={validateSignupData,validationLogin}
