// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const PaymentVerify = () => {
//   const navigate = useNavigate();
//   const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
//   const token = localStorage.getItem("parentToken");
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const verifyPayment = async () => {
//       const params = new URLSearchParams(window.location.search);
//       const status = params.get("status");
//       const txRef = params.get("tx_ref");
//       const transactionId = params.get("transaction_id");

//       if (!status || status !== "successful") {
//         setMessage("Payment failed or cancelled.");
//         setLoading(false);
//         return;
//       }

//       try {
//         // STEP 1: Verify payment
//         const res = await axios.get(
//           `${apiURL}/subscriptions/success?status=${status}&tx_ref=${txRef}&transaction_id=${transactionId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         console.log(res.data, "checking the respoinse from here");
//         if (res.data?.subscriptionStatus === "ACTIVE") {
//           setMessage("Payment verified! Student registration completed.");
//         } else {
//           setMessage("Payment verification failed. Please contact support.");
//         }

//         setTimeout(() => navigate("/home"), 3000); // redirect after 3s
//       } catch (err) {
//         console.error(err);
//         setMessage("Error verifying payment. Please try again.");
//         // setTimeout(() => navigate("/home"), 3000);
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyPayment();
//   }, []);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       {loading ? (
//         <p className="text-lg font-semibold text-gray-700">
//           Verifying payment, please wait...
//         </p>
//       ) : (
//         <p className="text-lg font-semibold text-gray-700">{message}</p>
//       )}
//     </div>
//   );
// };

// export default PaymentVerify;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Cute Loader Component
const ProcessingLoader = ({ message }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="relative mb-6">
      <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl animate-pulse">✨</span>
      </div>
    </div>
    <div className="text-gray-700 font-medium text-lg mb-2 text-center">
      {message}
    </div>
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
      <div
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
    </div>
  </div>
);

const PaymentVerify = () => {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("parentToken");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [currentStep, setCurrentStep] = useState("verifying"); // verifying, finalizing, completed, error

  useEffect(() => {
    const processPaymentAndRegistration = async () => {
      const params = new URLSearchParams(window.location.search);
      const status = params.get("status");
      const txRef = params.get("tx_ref");
      const transactionId = params.get("transaction_id");

      // Extract childTempId from tx_ref (assuming it's formatted like "child_temp_123" or similar)
      // You might need to adjust this based on how you format your tx_ref in the AddChild component
      const childTempId = txRef?.split("_").pop() || txRef;

      if (!status || status !== "successful") {
        setCurrentStep("error");
        setMessage("Payment failed or cancelled.");
        setLoading(false);
        setTimeout(() => navigate("/home"), 3000);
        return;
      }

      try {
        // STEP 1: Verify payment
        setCurrentStep("verifying");
        setMessage("Verifying your payment...");

        const verificationRes = await axios.get(
          `${apiURL}/subscriptions/success?status=${status}&tx_ref=${txRef}&transaction_id=${transactionId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(verificationRes.data, "Payment verification response");

        if (verificationRes.data?.subscriptionStatus !== "ACTIVE") {
          setCurrentStep("error");
          setMessage("Payment verification failed. Please contact support.");
          setLoading(false);
          setTimeout(() => navigate("/home"), 3000);
          return;
        }

        // STEP 2: Finalize student registration
        setCurrentStep("finalizing");
        setMessage("Completing student registration...");

        const finalizationRes = await axios.post(
          `${apiURL}/parent/dashboard/students/${childTempId}/finalize`,
          {}, // Empty body since the service gets data from tempStudentData
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(
          finalizationRes.data,
          "Student registration completion response"
        );

        // STEP 3: Success
        setCurrentStep("completed");
        setMessage(
          "🎉 Student registration completed successfully! Welcome to SkillSeed!"
        );

        // Redirect to home after showing success message
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } catch (err) {
        console.error("Error in payment verification/finalization:", err);
        setCurrentStep("error");

        const errorMessage =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong";

        if (err?.response?.status === 400) {
          setMessage(`Registration Error: ${errorMessage}`);
        } else if (err?.response?.status === 404) {
          setMessage(
            "Student registration data not found. Please try adding the child again."
          );
        } else {
          setMessage(
            "Error completing registration. Please contact support if payment was successful."
          );
        }

        // For errors, redirect back to home after showing error
        setTimeout(() => navigate("/home"), 5000);
      } finally {
        setLoading(false);
      }
    };

    processPaymentAndRegistration();
  }, [apiURL, navigate, token]);

  const getStepMessage = () => {
    switch (currentStep) {
      case "verifying":
        return "Verifying your payment...";
      case "finalizing":
        return "Setting up student profile...";
      case "completed":
        return "Registration Complete!";
      case "error":
        return "Something went wrong";
      default:
        return "Processing...";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        {loading && <ProcessingLoader message={getStepMessage()} />}

        {!loading && (
          <div className="text-center">
            <div className="mb-4">
              {currentStep === "completed" ? (
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">✅</span>
                </div>
              ) : (
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">❌</span>
                </div>
              )}
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-4">
              {message}
            </p>
            {currentStep === "completed" && (
              <div className="text-sm text-gray-500">
                Redirecting to dashboard in 3 seconds...
              </div>
            )}
            {currentStep === "error" && (
              <div className="text-sm text-gray-500">
                Redirecting to dashboard in 5 seconds...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentVerify;
