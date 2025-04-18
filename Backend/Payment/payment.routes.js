// // let salt_key = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399'
// // let merchant_id = 'PGTESTPAYUAT'
// let salt_key = "96434309-7796-489d-8924-ab56988a6076";
// let merchant_id = "PGTESTPAYUAT86";

const express = require("express");
const router = express.Router();
const axios = require("axios");
const crypto = require("crypto");
const Ordermodel = require("../models/Ordermodel");
const PendingOrder = require("../models/PendingOrder");
const verifytoken = require("../middleware/verifytokenmiddleware");


let salt_key = "96434309-7796-489d-8924-ab56988a6076";
let merchant_id = "PGTESTPAYUAT86";

// INITIATE PAYMENT
router.post("/order", verifytoken,async (req, res) => {
  try {
    const { name, amount, number, MID, transactionId, orderData  } = req.body;

    const updatedOrderData = {
      ...orderData,
      userId: req.user.id, // Add the userId from the token
    };


    const payUrl = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay`;

    const payload = {
      merchantId:merchant_id,
      merchantTransactionId: transactionId,
      merchantUserId: number,
      amount: amount * 100,
      redirectUrl: `http://localhost:4000/payment/status/${transactionId}`,
      redirectMode: "REDIRECT",
      callbackUrl: `http://localhost:4000/payment/status/${transactionId}`,
      mobileNumber: number,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payloadString = JSON.stringify(payload);
    const base64Payload = Buffer.from(payloadString).toString("base64");
    const saltKey = salt_key;
    const saltIndex = 1;
    const stringToHash = base64Payload + "/pg/v1/pay" + saltKey;
    const sha256 = crypto.createHash("sha256").update(stringToHash).digest("hex");
    const checksum = sha256 + "###" + saltIndex;

    // Save pending order in DB
    await PendingOrder.create({
      transactionId,
      orderData: updatedOrderData,
    });

    const response = await axios.post(
      payUrl,
      { request: base64Payload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          accept: "application/json",
        },
      }
    );

    return res.status(200).json({ success: true, data: response.data.data });
  } catch (error) {
    console.log("PhonePe Payment Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to initiate payment", error });
  }
});

// CALLBACK AFTER PAYMENT
router.get("/status/:transactionId", async (req, res) => {
  const { transactionId } = req.params;

  try {
    const pending = await PendingOrder.findOne({ transactionId });

    if (!pending) {
      return res.send("Payment failed or order not found.");
    }

    // ✅ Step 1: Call PhonePe Status API to verify
    const statusUrl = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchant_id}/${transactionId}`;

    const stringToHash = `/pg/v1/status/${merchant_id}/${transactionId}` + salt_key;
    const sha256 = crypto.createHash("sha256").update(stringToHash).digest("hex");
    const checksum = sha256 + "###1";

    const statusResponse = await axios.get(statusUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchant_id,
      },
    });

    const paymentStatus = statusResponse?.data?.data?.paymentInstrument?.type || "";
    const statusCode = statusResponse?.data?.code;

    // ✅ Step 2: Check if status is truly successful
    if (statusCode === "PAYMENT_SUCCESS") {
      const { orderData } = pending;

      const newOrder = new Ordermodel({
        userId: orderData.userId,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        paymentStatus: "Paid",
        orderStatus: "Placed",
        shippingAddress: orderData.shippingAddress,
      });

      await newOrder.save();
      await PendingOrder.deleteOne({ transactionId });

      // return res.send("✅ Payment Successful! Order has been placed.");
      // alert("order placed successfully 🤩")
      return res.redirect("http://localhost:5173/profile/myorders?status=success")
    } else {
      // ❌ Failed payment - just delete the pending order
      await PendingOrder.deleteOne({ transactionId });

      return res.redirect("http://localhost:5173/?status=failed")
      // return res.send("❌ Payment failed. Order not placed.");
    }
  } catch (error) {
    console.log("Order creation after payment error:", error.message);
    return res.send("Payment status check failed. Please try again.");
  }
});


module.exports = router;
