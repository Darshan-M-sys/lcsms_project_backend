const technicianModel = require("../../models/TechnicianProfileModel");
const User = require("../../models/User");
const bcrypt= require("bcryptjs")

exports.addTechnician=async(req,res)=>{
  try {
    const {email,fullname,password,skills,experience,city,phone}=req.body;
    const existingUser=await User.findOne({email:email});
    if(existingUser){
      return res.status(401).json({message:"Already Registered!"})
    }
    const hashPassword= await bcrypt.hash(password,10);
     const newUser= await User.create({
      username:fullname,email:email,password:hashPassword,role:"technician"
     })
     const profile= await technicianModel.create({
      userId:newUser._id,
      skills,
      experience,
      city,
      phone
     })
     res.status(201).json({success:true,message:"Registered Successful!"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}
 

exports.updateTechnician = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      email,
      fullname,
      skills,
      experience,
      city,
      phone,
    } = req.body;
    
    // 🔍 Find technician profile
    const profile = await technicianModel.findOne({ _id: id });

    if (!profile) {
      return res.status(404).json({ message: "Technician not found" });
    }

    // 🔄 Update User (NO PASSWORD)
    await User.findByIdAndUpdate(
      profile.userId,
      {
        username: fullname,
        email: email,
      },
      { returnDocument: "after"}
    );

    // 🔄 Update Technician Profile
    profile.skills = skills || profile.skills;
    profile.experience = experience || profile.experience;
    profile.city = city || profile.city;
    profile.phone = phone || profile.phone;

    await profile.save();

    res.status(200).json({
      success: true,
      message: "Technician updated successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};