import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Update import

function UpiPayment() {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");

  const generateQrCode = () => {
    if (!upiId || !amount) {
      alert("Please fill in both UPI ID and amount.");
      return;
    }
    const upiLink = `upi://pay?pa=${upiId}&pn=YourName&am=${amount}&cu=INR`;
    setQrCodeData(upiLink);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>UPI Payment QR Code Generator</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          style={{ padding: "10px", width: "300px", margin: "10px" }}
        />
        <br />
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: "10px", width: "300px", margin: "10px" }}
        />
        <br />
        <button
          onClick={generateQrCode}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Generate QR Code
        </button>
      </div>
      {qrCodeData && (
        <div>
          <h3>Scan to Pay</h3>
          <QRCodeCanvas value={qrCodeData} size={200} /> {/* Use QRCodeCanvas */}
          <p style={{ marginTop: "10px" }}>{qrCodeData}</p>
        </div>
      )}
    </div>
  );
}

export default UpiPayment;
