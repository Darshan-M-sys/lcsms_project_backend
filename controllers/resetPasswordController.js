const User=  require("../models/User");
const bcrypt=require("bcryptjs")
exports.resetPassword=async(req,res)=>{
  try {
    const {oldPassword,newPassword,email}=req.body;
    const user=await User.findOne({email:email});
    if(!user){
      return res.status(400).json({message:"User not yet registered!"});
    }
    const is_match = await bcrypt.compare(oldPassword,user.password);

    if(!is_match){
      return res.status(400).json({message:"Password Doesn't match!"});
    }
    const hashPassword=await bcrypt.hash(newPassword,10);
    user.password=hashPassword;
    await user.save();
    res.status(200).json({ success:true,message:"Password Reset Successful!"})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
}

