const Ordermodel = require("../models/Ordermodel");

const addtoorder = async (req, res) => {
  try {
    const { items, totalAmount, paymentStatus, orderStatus, shippingAddress } = req.body;
    const userId = req.user.id;

    // Validate request data
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item." });
    }
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone) {
      return res.status(400).json({ message: "Shipping address is required." });
    }

    // Create a new order
    let newOrder = new Ordermodel({
      userId,
      items,
      totalAmount,
      paymentStatus: paymentStatus || "Pending",
      orderStatus: orderStatus || "Placed",
      shippingAddress,
    });

     // Save order in the database
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.log("addtoorder error", error);
    res.status(500).json({ message: "Failed to place order", error });
  }
};


const getorder = async (req, res) => {
  const userId = req.user.id;
  try {
    const order = await Ordermodel.find({ userId });
    if (!order) return res.status(201).json({ message: "order not found" });
    res.status(200).json({ message: "here is your all orders", order });
  } catch (error) {
    res.status(201).json({ message: "getorderserror", error });
    console.log("getorder error", error);
  }
};

module.exports = { getorder, addtoorder };
