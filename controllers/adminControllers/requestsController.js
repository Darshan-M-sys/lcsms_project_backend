const Bill = require("../../models/Bill");
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
exports.getRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await ServiceRequest.findById(id)
      .populate("messages.senderId") // 🔥 populate user inside messages
      .populate({
        path: "assignedTechnician",
        populate: { path: "userId" }, // 🔥 technician → user
      });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ data: request });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


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
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
};

exports.addMessages=async(req,res)=>{
  try {
    const {id}=req.params;
    const {text}=req.body;
    const request= await ServiceRequest.findOne({_id:id});
    const senderId= req.session.userData.id;
      request.messages.push({
        senderId:senderId,
        text:text
      })
      await request.save();
      res.status(200).json({message:"Send",success:true});
  } catch (error) {
   res.status(500).json({message:error.message}) 
  }
}

exports.deleteRequest=async(req,res)=>{
  try {
  const {requestId}=req.params;
   await ServiceRequest.findOneAndDelete({_id:requestId});
   await Bill.findOneAndDelete({requestId:requestId})
   res.status(200).json({success:true,message:"Deleted!"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}