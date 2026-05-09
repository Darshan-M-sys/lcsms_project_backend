const express = require('express');
const { saveCustomerMessage } = require('../controllers/customerMessageController');

const router = express.Router();

// POST /api/customer-message
router.post('/', saveCustomerMessage);

module.exports = router;
