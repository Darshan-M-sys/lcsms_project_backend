const Bill = require("../../models/Bill");
const ServiceRequest = require("../../models/serviceRequests");


exports.getAdminStats = async (req, res) => {
  try {
    const totalRequests = await ServiceRequest.countDocuments();

    const pendingRequests = await ServiceRequest.countDocuments({
      status: "Pending",
    });

    const completedRequests = await ServiceRequest.countDocuments({
      status: "Completed",
    });

    const totalRevenueData = await Bill.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = totalRevenueData[0]?.total || 0;

    res.json({
      totalRequests,
      pendingRequests,
      completedRequests,
      totalRevenue,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};