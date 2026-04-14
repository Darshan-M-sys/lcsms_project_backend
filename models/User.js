const mongoose = require('mongoose');
require('dotenv').config(); 
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin', 'technician'], default: 'customer' }
}, { timestamps: true }); 

module.exports = mongoose.model('User', userSchema);