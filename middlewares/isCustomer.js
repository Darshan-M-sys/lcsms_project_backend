const isCustomer=(req,res,next)=>{
  if(req.session.userData.role==="customer"){
    next();
  }else{
    return res.status(400).json({message:"Access Not allowed!"})
  }
}
module.exports=isCustomer;