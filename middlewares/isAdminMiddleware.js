const isAdmin=(req,res,next)=>{
  if(req.session.userData.role==="admin"){
    next();
  }else{
    res.status(401).json({message:"Not Access Allowed"});
  }
}

module.exports=isAdmin;