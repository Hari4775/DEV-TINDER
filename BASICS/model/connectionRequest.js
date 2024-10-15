const mongoose =require("mongoose");

const connectionRequestSchema= new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId, //FOR ACCESSING THE DATABASE ID
        ref:"users", //reference to the user collection
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId, //FOR ACCESSING THE DATABASE ID
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{   //enum is a mongoose property for selctive values, only able to select values from the list others  will get error
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        },
    },
},
{
    timestamps:true, // FOR KNOWING THE TIME FOR THE CONNECTION REQUEST
}
);

// pre is mongoose functionality for checking . 
connectionRequestSchema.pre("save",function (next){
    const connectionRequest =this;
    // if fromUserId is equal toUserId then throw new error
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("canot send connection request to yourself")
    }
    next()
})

module.exports = mongoose.model("connectionRequests",connectionRequestSchema) // Exporting the model & creating  a collection in the name of "connectionRequests"

