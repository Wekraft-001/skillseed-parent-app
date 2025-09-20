import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader, ArrowRight } from "lucide-react";
import { PageMetadata } from "../components/PageMetadata";

const PaymentSuccess = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("parentToken");
  const navigate = useNavigate();
  const { childTempId } = useParams();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Processing your payment...");
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const finalizeRegistration = async () => {
      try {
        // Get childTempId from URL params or localStorage
        const tempId =
          childTempId || localStorage.getItem("pendingChildTempId");

        if (!tempId) {
          setStatus("error");
          setMessage(
            "Registration session not found. Please start the registration process again."
          );
          return;
        }

        // Check payment data from URL parameters (Provider: Flutterwave)
        const paymentStatus = searchParams.get("status") || "unknown";
        const transactionId = searchParams.get("transaction_id");
        const txRef = searchParams.get("tx_ref");

        // VERIFYING PAYMENT MADE
        if (transactionId) {
          try {
            console.log(
              `Attempting to verify payment: ${apiURL}/payments/verify-transaction/${transactionId}/${tempId}`
            );
            const verifyResponse = await axios.get(
              `${apiURL}/payments/verify-transaction/${transactionId}/${tempId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log("Payment verification response:", verifyResponse.data);

            if (!verifyResponse.data.success) {
              console.warn(
                "Payment verification failed, but will attempt finalization anyway"
              );
            }
          } catch (verifyError) {
            console.error("Error verifying payment:", verifyError);
          }
        }

        // If payment failed, show error
        if (paymentStatus === "failed" || paymentStatus === "cancelled") {
          setStatus("error");
          setMessage("Payment was not completed. Please try again.");
          return;
        }

        // Wait a bit for payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // FINALIZING REGISTERATION
        const response = await axios.post(
          `${apiURL}/parent/dashboard/students/${tempId}/finalize`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          setStudentData(response.data);
          setStatus("success");
          setMessage("Registration completed successfully!");

          // Clean up localStorage
          localStorage.removeItem("pendingChildTempId");

          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        }
      } catch (error) {
        console.error("Error finalizing registration:", error);

        if (error.response?.status === 400) {
          const errorMsg =
            error.response.data?.message ||
            "Registration could not be completed";

          if (errorMsg.includes("Payment not completed")) {
            setMessage(
              "Payment verification failed. Please contact support or try again."
            );
          } else if (errorMsg.includes("Subscription not found")) {
            setMessage("Subscription not found. Please contact support.");
          } else {
            setMessage(errorMsg);
          }
          setStatus("error");
        } else if (error.response?.status === 404) {
          setMessage(
            "Registration session expired. Please start the registration process again."
          );
          setStatus("error");
        } else if (error.response?.status) {
          setMessage(
            "We encountered an error while completing registertion. Please contact support"
          );
          setStatus("error");
        } else {
          setMessage(
            "An unexpected error occurred. Please check your connection and try again."
          );
        }

        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    finalizeRegistration();
  }, [childTempId, searchParams, apiURL, token, navigate]);

  const handleRetry = () => {
    navigate("/add-child");
  };

  const handleGoToDashboard = () => {
    navigate("/home");
  };

  return (
    <>
      <PageMetadata
        title="Registration Status | SkillSeed"
        description="Completing your child's registration"
      />
      <div className="min-h-[800px] bg-[#F5F7FA] p-6 flex items-center justify-center">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            {status === "processing" && (
              <>
                <div className="mb-6">
                  <Loader className="w-16 h-16 text-blue-600 mx-auto animate-spin" />
                </div>
                <h1 className="text-2xl font-bold text-[#0A1F44] mb-2">
                  Processing Registration
                </h1>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-center">
                  <div className="animate-pulse flex space-x-1">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              </>
            )}

            {status === "success" && (
              <>
                <div className="mb-6">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                </div>
                <h1 className="text-2xl font-bold text-[#0A1F44] mb-2">
                  Registration Complete!
                </h1>
                <p className="text-gray-600 mb-6">{message}</p>

                {studentData && (
                  <div className="bg-green-50 rounded-xl p-4 mb-6 text-left">
                    <h3 className="font-semibold text-green-800 mb-2">
                      Student Details:
                    </h3>
                    <div className="space-y-1 text-sm text-green-700">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {studentData.firstName} {studentData.lastName}
                      </p>
                      <p>
                        <span className="font-medium">Grade:</span>{" "}
                        {studentData.grade}
                      </p>
                      <p>
                        <span className="font-medium">Age:</span>{" "}
                        {studentData.age}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleGoToDashboard}
                    className="w-full px-6 py-3 bg-[#3C91BA] text-white rounded-full font-semibold hover:bg-blue-600/90 flex items-center justify-center space-x-2"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-sm text-gray-500">
                    Redirecting automatically in 3 seconds...
                  </p>
                </div>
              </>
            )}

            {status === "error" && (
              <>
                <div className="mb-6">
                  <XCircle className="w-16 h-16 text-red-600 mx-auto" />
                </div>
                <h1 className="text-2xl font-bold text-[#0A1F44] mb-2">
                  Registration Failed
                </h1>
                <p className="text-gray-600 mb-6">{message}</p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleRetry}
                    className="w-full px-6 py-3 bg-[#3C91BA] text-white rounded-full font-semibold hover:bg-blue-600/90"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleGoToDashboard}
                    className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
