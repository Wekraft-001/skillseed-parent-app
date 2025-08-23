import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentVerify = () => {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("parentToken");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const status = params.get("status");
      const txRef = params.get("tx_ref");
      const transactionId = params.get("transaction_id");

      if (!status || status !== "successful") {
        setMessage("Payment failed or cancelled.");
        setLoading(false);
        return;
      }

      try {
        // STEP 1: Verify payment
        const res = await axios.get(
          `${apiURL}/subscriptions/success?status=${status}&tx_ref=${txRef}&transaction_id=${transactionId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(res.data, "checking the respoinse from here");
        if (res.data?.subscriptionStatus === "ACTIVE") {
          setMessage("Payment verified! Student registration completed.");
        } else {
          setMessage("Payment verification failed. Please contact support.");
        }

        setTimeout(() => navigate("/home"), 3000); // redirect after 3s
      } catch (err) {
        console.error(err);
        setMessage("Error verifying payment. Please try again.");
        // setTimeout(() => navigate("/home"), 3000);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {loading ? (
        <p className="text-lg font-semibold text-gray-700">
          Verifying payment, please wait...
        </p>
      ) : (
        <p className="text-lg font-semibold text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default PaymentVerify;
