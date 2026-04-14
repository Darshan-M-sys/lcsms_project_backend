const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    // 👤 CUSTOMER INFO
    fullName: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },

    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },

    // 💻 DEVICE DETAILS
    deviceType: { type: String, required: true },
    brand: { type: String },
    model: { type: String },
    serialNumber: { type: String },

    // ⚙️ HARDWARE SPECS
    os: { type: String },
    ram: { type: String },
    processor: { type: String },
    storage: { type: String },

    // ⚠️ ISSUE INFO
    category: {
      type: String,
      enum: ["Hardware", "Software", "Network"],
    },
    issueType: { type: String },
    urgency: {
      type: String,
      enum: ["Low", "Normal", "High", "Critical"],
      default: "Normal",
    },
    description: { type: String },

    // 🖼️ IMAGES
    images: [
      {
        url: String,
        public_id: String,
      },
    ],

    // 📊 STATUS SYSTEM
    status: {
      type: String,
      enum: ["Pending", "Assigned", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },

    // 🔥 STATUS TIMELINE
    statusHistory: [
      {
        status: String,
        title: String,
        changedAt: { type: Date, default: Date.now },
        note: String,
      },
    ],

    // 👨‍🔧 TECHNICIAN ASSIGNMENT
    assignedTechnician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "technicianProfile",
    },

    // 👤 CREATED BY (Customer ID)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 💬 CHAT SYSTEM
    messages: [
      {
        sender: {
          type: String,
          enum: ["Customer", "Technician", "Admin"],
        },
        text: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // ⭐ FEEDBACK
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: { type: String },

    // 🔔 FLAGS
    isViewedByCustomer: {
      type: Boolean,
      default: false,
    },

    // 📅 COMPLETION
    completedAt: { type: Date },
  },
  { timestamps: true }
);

const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);

module.exports = ServiceRequest;