const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceRequest",
    required: true,
  },

  // 🧾 Service Charge (for labor/work)
  serviceCharge: {
    type: Number,
    default: 0,
  },

  // 🧩 Parts / Items (optional)
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bill", billSchema);