const isTechnician=(req,res,next)=>{
  if(req.session.userData.role==="technician"){
    next();
  }else{
    res.status(401).json({message:"Access denied!"})
  }
}

module.exports=isTechnician