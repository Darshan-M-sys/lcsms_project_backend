const CustomerMessage = require('../models/customerMessage');

exports.saveCustomerMessage = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: name, email, phone, subject, message',
    });
  }

  try {
    const customerMessage = new CustomerMessage({
      name,
      email,
      phone,
      subject,
      message,
    });

    await customerMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message saved successfully',
      data: customerMessage,
    });
  } catch (error) {
    console.error('Error saving customer message:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving customer message',
    });
  }
};