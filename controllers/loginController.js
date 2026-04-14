const User = require('../models/User');
const bcrypt = require('bcryptjs');
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email' });
    }
    const isMatch = await bcrypt.compare(password, user.password);  
    if (!isMatch) { 
      return res.status(400).json({ message: 'Invalid credentials' });
    } 
    req.session.userData = { id: user._id, username: user.username, email: user.email, role: user.role };
    res.status(200).json({ message: 'Login successful',success:true });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};