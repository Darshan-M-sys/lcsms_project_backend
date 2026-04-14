const mongoose = require("mongoose");

const technicianProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    skills: [{ type: String }],
    experience: { type: String },
    city: { type: String },
    phone: { type: String },
    reviews: [
      {
        customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        review: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ]
  },

  { timestamps: true }
);

const technicianModel= mongoose.model("technicianProfile",technicianProfileSchema)
module.exports=technicianModel;