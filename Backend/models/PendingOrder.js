const mongoose = require("mongoose");

const pendingOrderSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  orderData: { type: Object, required: true },
});

module.exports = mongoose.model("PendingOrder", pendingOrderSchema);