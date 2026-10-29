import React from "react";
import axios from "axios";

export const RazorpayPayment = () => {
  const createOrder = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/create-order", {
        amount: 5000,
        currency: "INR",
        receipt: "order_123",
      });

      if (data?.id) {
        initiatePayment(data);
      } else {
        throw new Error("Invalid order response");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  const initiatePayment = (order) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || process.env.REACT_APP_RAZORPAY_KEY_ID, 
      amount: order.amount,
      currency: order.currency,
      name: "Your Company",
      description: "Test Transaction",
      order_id: order.id,
      handler: (response) => {
        console.log("Payment Success:", response);
        alert("Payment Successful!");
      },
      prefill: {
        name: "Shubham",
        email: "shubham.srivastava@mobigarage.com",
        contact: "7838988511",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    
    rzp.on("payment.failed", function (response) {
      console.error("Payment failed:", response.error);
      alert("Payment failed: " + response.error.description);
    });

    rzp.open();
  };

  return <button onClick={createOrder}>Pay Now</button>;
};
