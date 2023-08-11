const User = require("../models/user");

const getAllProducts = async(req, res) =>{
  const mydata = await User.find();
  res.status(200).json(mydata);
};

const loginuser = (req, res)=> {
  const {emailid,password} = req.body
  User.findOne({email: emailid })
 .then((user)=>{
  if(user){
    console.log();
    if(password === user.password){
      res.send({message: "Login Successful", user: user})
    }else{
      res.send({message: "Password didn't match"})
    }
  }
  else{
    res.send({message:"User not found"});
  }
 })
 .catch((err)=>{
     return err;
 });
}

const registerUser = async(req,res) =>{
  const data = req.body;
  User.findOne({email: data.emailid })
 .then((docs)=>{
  if(docs){
    res.send({message: "user already registered"});
  }
  else{
    saveuser(data);
  }
 })
 .catch((err)=>{
     return err;
 });
 async function saveuser(data){
      const { firstname,lastname,emailid,phoneno,password} = data;
      const Formdata = new User({
        firstName:firstname,
        lastName:lastname,
        email:emailid,
        phoneno:phoneno,
        password:password
      });
      try{
        console.log(Formdata);
        await User.insertMany(Formdata);
        console.log("successfully registed");
        res.send({ message : "successfully registed"});
      }catch(error){
        res.send({ message : "there is an error"})
      }
    }
  }

const getAllProductsTesting = async(req, res) =>{
  res.status(200).json({
    msg:"getting all the productsTesting"
  });
};

module.exports = {getAllProducts,getAllProductsTesting,registerUser,loginuser};