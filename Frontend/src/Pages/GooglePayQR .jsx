import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Correct import

const GooglePayQR = () => {
  const [showQR, setShowQR] = useState(false);
  const upiId = "prajapatiaryan306@okicici"; // Replace with your UPI ID
  const amount = 100000; // Payment amount
  const upiUrl = `upi://pay?pa=${upiId}&pn=Ecommercestore&am=${amount}&cu=INR`;

  return (
    <div className="flex flex-col items-center gap-4 p-6 border border-gray-300 rounded-lg shadow-lg bg-white w-[90%] md:w-[50%] mx-auto text-center">
      <h2 className="text-2xl font-semibold text-gray-800">
        Pay ${amount} using UPI
      </h2>

      {/* Button to Show QR Code */}
      <button
        onClick={() => setShowQR(true)}
        className="bg-blue-500 text-white p-3 rounded"
      >
        Generate QR Code
      </button>

      {/* QR Code (Shown only when button is clicked) */}
      {showQR && (
        <div className="mt-4">
          <QRCodeCanvas value={upiUrl} size={220} />
          <p className="text-gray-600 text-lg mt-2">
            Scan with any UPI app to pay
          </p>
        </div>
      )}
    </div>
  );
};

export default GooglePayQR;
