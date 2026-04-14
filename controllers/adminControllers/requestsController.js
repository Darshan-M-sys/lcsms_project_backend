const ServiceRequest = require("../../models/serviceRequests");
const technicianModel = require("../../models/TechnicianProfileModel");
const User = require("../../models/User");

exports.getAllRequests=async(req,res)=>{
  try {
     const requests = await ServiceRequest.find({})
      .sort({ createdAt: -1 })
      .populate("assignedTechnician", "name email");
     res.status(200).json({data:requests});
  } catch (error) {
    res.state(500).json({message:error.message})
  }
}
exports.getRequestById=async(req,res)=>{
  try {
    const {id}=req.params;
     const requests = await ServiceRequest.findOne({_id:id})
      .sort({ createdAt: -1 })
      const dataObject=requests.toObject()
      if(requests.assignedTechnician){
     const technician= await technicianModel.findOne({_id:requests.assignedTechnician}).populate("userId"); 
     dataObject['technician']= technician || null; 
      }
     res.status(200).json({data:dataObject});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
}


exports.handleAssignTechnician = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { technicianId } = req.body;
   
    const request = await ServiceRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // 🔄 Assign technician
    request.assignedTechnician = technicianId;
    const technician= await technicianModel.findOne({_id:technicianId}).populate("userId");
   
    // 🔄 Update status
    request.status = "Assigned";

    // 📜 Add to status history
    request.statusHistory.push({
      status: "Assigned",
      title:"Assigned to Technician",
      note: `Technician ${technician.userId?.username} has been assigned to  the request`,
      changedAt: new Date()
    });

    await request.save();

    res.status(200).json({
      success: true,
      message: "Technician assigned successfully",
      data: request,
    });

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
};



exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status} = req.body;

    const request = await ServiceRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // 🔄 Update status
    request.status = status;

    // 📜 Push status history
    request.statusHistory.push({
      status: status,
      title:"Status Updated",
     note: `Status updated to ${status}`,
      changedAt: new Date(),
    });

    await request.save();

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: request,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};