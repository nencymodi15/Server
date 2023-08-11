require("dotenv").config();
const connectDB = require("./db/connect");
const User = require("./models/user");
const userjson = require("./user.json");


const start = async ()=>{
  try{
    await connectDB(process.env.MONGODB_URL);
    await User.create(userjson);
    console.log("success");
  }catch(error){
    console.log(error);
  }
}