
const validator = require("validator")
// npm i validator--- for validating external module

const validateSignupData = (req)=>{
    const {fristName,lastName,email,password,age} =req.body;

    if(!fristName){
        throw new Error("name is not valid")
    }
    else if(!age){
        throw new Error("age is required")
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid")
    }
    else if (!validator.isStrongPassword(password)){
        throw  new Error("Please enter a strong Password")
    }
}

const validateProfileData =(req)=>{
    const allowedEditFields=["fristName","lastName","email","photoURL","about"]
    const isEditAllowed = Object.keys(req.body).every(field=>allowedEditFields.includes(field));
 
    return isEditAllowed;
}


module.exports={validateSignupData,validateProfileData}
