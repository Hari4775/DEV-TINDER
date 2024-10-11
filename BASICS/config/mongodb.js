const password ="K4v58zrrtFBzZj7Q"

const mongoose = require("mongoose")

const url = 'mongodb+srv://harikumarv9000:xsHSKHncyFyFNRJM@cluster0.ostak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/TESTINGDB';

// const dbName = 'TESTINGDB';

const connectDB= async ()=>{
    await mongoose.connect(url);

}

  module.exports= connectDB;