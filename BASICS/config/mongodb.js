const password ="K4v58zrrtFBzZj7Q"

const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://harikumarv9000:xsHSKHncyFyFNRJM@cluster0.ostak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);


const dbName = 'TESTINGDB';

const connectDB= async ()=>{
  try{
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('testColletion2');
    console.log('data base connected successfully');


  }catch(err){
    console.log("data base connection error",err);
    process.exit(1)
  }
}


  module.exports= connectDB;