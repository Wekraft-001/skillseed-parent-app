import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentError = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const message =
    searchParams.get("message") || "Payment failed. Please try again.";

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center max-w-md mx-auto p-6 bg-red-50 rounded-lg">
        <div className="text-red-500 text-5xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-red-700 mb-4">Payment Failed</h2>
        <p className="text-red-600 mb-4">{decodeURIComponent(message)}</p>
        <button
          onClick={() => navigate("/home")}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg mr-2"
        >
          Return to Dashboard
        </button>
        <button
          onClick={() => window.history.back()}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentError;
