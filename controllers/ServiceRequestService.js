const ServiceRequest = require("../models/serviceRequests");

// 🔥 1. CREATE SERVICE REQUEST
exports.createRequest = async (req, res) => {
  try {
    const userId = req.session.userData?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 🖼️ Handle images (multer)
    const images = req.files?.map((file) => ({
      url: `/uploads/${file.filename}`,
    })) || [];

    const newRequest = new ServiceRequest({
      ...req.body,
      images,
      createdBy: userId,

      // 🔥 initial status timeline
      statusHistory: [
        {
          title: "Request Created",
          status: "Pending",
          note: "Request created and awaiting assignment",
        },
      ],
    });

    await newRequest.save();

    res.status(201).json({
      success: true,
      message: "Service request created successfully",
      data: newRequest,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create request",
      error: err.message,
    });
  }
};


// 🔥 2. GET ALL REQUESTS OF LOGGED-IN CUSTOMER
exports.getMyRequests = async (req, res) => {
  try {
    const userId = req.session.userData?.id;

    const requests = await ServiceRequest.find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .populate("assignedTechnician", "name email");

    res.json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 🔥 3. GET SINGLE REQUEST DETAILS
exports.getRequestById = async (req, res) => {
  try {
    const { id } = req.params;

const request = await ServiceRequest.findById(id)
  .populate("assignedTechnician", "name email")
  .populate("createdBy", "name email");


    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({
      success: true,
      data: request,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 🔥 4. CANCEL REQUEST (ONLY IF NOT COMPLETED)
exports.cancelRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await ServiceRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Not found" });
    }

    if (request.status === "Completed") {
      return res.status(400).json({
        message: "Cannot cancel completed request",
      });
    }

    request.status = "Cancelled";

    request.statusHistory.push({
      status: "Cancelled",
      note: "Cancelled by customer",
    });

    await request.save();

    res.json({
      success: true,
      message: "Request cancelled",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 🔥 5. ADD MESSAGE (CHAT)
exports.addMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const request = await ServiceRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Not found" });
    }

    request.messages.push({
      sender: "Customer",
      text,
    });

    await request.save();

    res.json({
      success: true,
      message: "Message sent",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 🔥 6. ADD RATING & REVIEW
exports.addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, review } = req.body;

    const request = await ServiceRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Not found" });
    }

    if (request.status !== "Completed") {
      return res.status(400).json({
        message: "You can review only after completion",
      });
    }

    request.rating = rating;
    request.review = review;

    await request.save();

    res.json({
      success: true,
      message: "Review submitted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};