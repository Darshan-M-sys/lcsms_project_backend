const ServiceRequest = require("../models/serviceRequests");
const User = require("../models/User")

exports.getAllCustomer=async(req,res)=>{
  try {
    const data= await User.find({role:"customer"})
    res.status(200).json({data:data});
  } catch (error) {
     res.status(500).json({message:error.message})
  }
}

exports.deleteCustomer=async(req,res)=>{
  try {
    const customerId=req.params.customerId;
     await User.findOneAndDelete({_id:customerId})
     await ServiceRequest.deleteMany({createdBy:customerId})
     res.status(200).json({success:true,message:"Deleted!"})
  } catch (error) {
    res.status(200).json({message:error.message})
  }
}