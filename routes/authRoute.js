const express = require('express');
const AuthRouter = express.Router();
const { loginUser } = require('../controllers/loginController');
const { registerUser } = require('../controllers/registerController');
const { getUser } = require('../controllers/GetUserController');
const isAuthenticated = require('../middlewares/isAuthenticated');
AuthRouter.post('/register', registerUser);
AuthRouter.post('/login', loginUser);
AuthRouter.get('/me',isAuthenticated, getUser);
AuthRouter.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {  
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.clearCookie('connect.sid'); 
    res.status(200).json({ message: 'Logout successful',success:true });
  }
);
});
module.exports = AuthRouter;