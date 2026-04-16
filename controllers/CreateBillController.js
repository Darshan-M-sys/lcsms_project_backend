const Bill = require("../models/Bill");

exports.createBill = async (req, res) => {
  try {
    const {requestId}=req.params;
    const { serviceCharge = 0, items = [] } = req.body;

    // ❌ validation
    if (!requestId) {
      return res.status(400).json({ message: "Request ID is required" });
    }

    // 💰 calculate items total
    const itemsTotal = items.reduce((sum, item) => {
      return sum + (item.quantity || 0) * (item.price || 0);
    }, 0);

    // 💰 final total
    const totalAmount = itemsTotal + serviceCharge;

    // 🧾 create bill
    const bill = await Bill.create({
      requestId,
      serviceCharge,
      items,
      totalAmount,
    });

    res.status(201).json({
      message: "Bill created successfully",
      data: bill,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


exports.getBill=async(req,res)=>{
  try {
   const {requestId} = req.params;
  const bill= await Bill.findOne({requestId:requestId}).populate("requestId"); 
  res.status(200).json({data:bill})
  } catch (error) {
   res.status(500).json({message:error.message}) 
  }
}

exports.updateBillStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const bill = await Bill.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: 'after' }
    );
    res.status(200).json({ data: bill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};