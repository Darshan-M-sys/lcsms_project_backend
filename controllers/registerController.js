const bcrypt = require('bcryptjs');
const User = require('../models/User');
exports.registerUser = async (req, res) => {  
  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword, role: 'customer' });

    await newUser.save(); 
    req.session.userData = { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role };
    
    res.status(201).json({ message: 'User registered successfully',success:true });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};