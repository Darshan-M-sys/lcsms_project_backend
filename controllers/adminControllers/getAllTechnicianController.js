const technicianModel = require("../../models/TechnicianProfileModel")
const User = require("../../models/User")

exports.getAllTechnicians=async(req,res)=>{
  try {
    const techniciansProfiles=await technicianModel.find({}).populate("userId");
    res.status(200).json({data:techniciansProfiles})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}


exports.getSingleTechnicians=async(req,res)=>{
  try {
    const technicianId=req.params.technicianId;
    const techniciansProfiles=await technicianModel.findOne({_id:technicianId}).populate("userId");
    res.status(200).json({data:techniciansProfiles})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

exports.deleteTechnician=async(req,res)=>{
  try {
     const userId= req.params.id;
    await User.findOneAndDelete({_id:userId});
    await technicianModel.findOneAndDelete({userId:userId});
    res.status(200).json({message:"Deleted!",success:true});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}