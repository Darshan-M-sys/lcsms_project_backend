const ServiceRequest= require("../../models/serviceRequests");
const technicianModel = require("../../models/TechnicianProfileModel");
exports.getAllAssignedRequests=async(req,res)=>{
  try {
    const technicianId=  req.session.userData.id;
    const technicianProfileId=await technicianModel.findOne({userId:technicianId})
   
    const requests= await ServiceRequest.find({assignedTechnician:technicianProfileId._id});
  
  res.status(200).json({data:requests});
  } catch (error) {
   res.status(500).json({message:error.message}) 
  }
}