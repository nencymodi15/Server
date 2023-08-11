const { query } = require("express");
const Budget = require("../models/budget");
const mongoose = require("mongoose")

//path('localhost:6000/api/budget/findBudget')
const findBudget = (req, res)=> {
  console.log("coming here");
  const {userid} = req.body
  console.log(userid);
  if(userid){
      Budget.find({userid:userid})
      .then((budget)=>{
        console.log(userid);
      if(budget.length > 0){
        console.log(budget);
        res.send({message: "budgets Successfully", budget: budget})
      }
      else{
        res.send({message:"Budget not found"});
      }
    })
    .catch((err)=>{
        return err;
    });
  }else{
    res.send({message:"useris not available"})
  }
  
}

//Add Budget
const addbudget = (req,res)=>{
  const {userid,budgetCategory,description,amount,enddate,createdAt} = req.body;
  if(userid && amount && description){
    savebudget();
    async function savebudget(){
      const insertdata = new Budget({
        userid,
        budgetCategory,
        description,
        amount,
        enddate,
        createdAt
      })
      try{
        await Budget.insertMany(insertdata);
        res.send({ message : "successfully budget Created"});
      }catch{
        res.send({ message : "there is an error"});
      }
    }
  }
    else{
      res.send({ message : "there is an error"});
    }
}

//find one budget
const findeoneBudget = (req,res)=>{
  console.log("coming here");
  const {_id} = req.body
  console.log(_id);
  Budget.findOne({_id:_id})
  .then((budget)=>{
    console.log(_id);
  if(budget){
    console.log(budget);
    res.send({message: "budgets found", budget: budget})
  }
  else{
    res.send({message:"Budget not found"});
  }
 })
 .catch((err)=>{
     return err;
 });
}

//delete the budget
const deleteoneBudget = (req,res)=>{
  console.log("coming here");
  const {_id} = req.body
  console.log(_id);
  Budget.findOneAndDelete({_id:_id})
  .then((budget)=>{
    console.log(_id);
  if(budget){
    console.log(budget);
    res.send({message: "budgets Successfully deleted", budget: budget})
  }
  else{
    res.send({message:"Budget not found"});
  }
 })
 .catch((err)=>{
     return err;
 });
}


//update the budget
const updateBudget = (req,res)=>{
  const { userid, budgetCategory, description, amount, enddate, createdAt, _id } = req.body;

  if (userid && amount && description && _id) {
    try {
      const updatedBudget =  Budget.findOneAndUpdate(
        { _id: _id }, // Filter based on the _id field
        { userid, budgetCategory, description, amount, enddate, createdAt }, // Update the fields
        { new: true } // Return the updated document
      );

      if (updatedBudget) {
        res.send({ message: "Budget successfully updated",budget:updatedBudget });
      } else {
        res.send({ message: "Budget not found" });
      }
    } catch (error) {
      res.send({ message: "There was an error updating the budget" });
    }
  } else {
    res.send({ message: "Missing required fields" });
  }
}



module.exports = {findBudget,addbudget,findeoneBudget,deleteoneBudget,updateBudget}
