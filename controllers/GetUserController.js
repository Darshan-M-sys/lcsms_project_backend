const User = require('../models/User');
exports.getUser = async (req, res) => {
  try {
    if (!req.session.userData) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { id } = req.session.userData;
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }   
    res.status(200).json({data:user});
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};  
