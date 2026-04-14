const User = require("../models/User");
const bcrypt = require("bcryptjs");
exports.AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await User.findOne({ email,role:"admin" });
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, existingAdmin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    req.session.userData={ id: existingAdmin._id ,role:existingAdmin.role,username:existingAdmin.username,email:existingAdmin.email }; // Store 
    return res.json({
      success: true,
      message: "Admin login successful",
    });
  }  catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message });
  }
};