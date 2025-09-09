import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, ArrowRight } from "lucide-react";
import { PageMetadata } from "../components/PageMetadata";

const PaymentPage = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("parentToken");
  const navigate = useNavigate();
  const { childTempId } = useParams();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [subscriptionData, setSubscriptionData] = useState({
    amount: 5000, // Default amount in RWF
    currency: "RWF",
    redirect_url: `${window.location.origin}/payment-success`,
  });

  const childData = location.state?.childData;

  useEffect(() => {
    if (!childTempId || !childData) {
      navigate("/add-child");
    }
  }, [childTempId, childData, navigate]);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleAmountChange = (e) => {
    setSubscriptionData({
      ...subscriptionData,
      amount: parseInt(e.target.value) || 0,
    });
  };

  const generatePaymentLink = async () => {
    if (!childTempId) {
      alert("Invalid registration session. Please start again.");
      return;
    }

    if (subscriptionData.amount < 1000) {
      alert("Minimum amount is 1000 RWF");
      return;
    }

    setLoading(true);

    try {
      const paymentPayload = {
        ...subscriptionData,
        payment_options: selectedPaymentMethod,
        redirect_url: `${window.location.origin}/payment-success/${childTempId}`,
        childTempId: childTempId,
      };
      console.log(paymentPayload, "checking payload");
      const response = await axios.post(
        `${apiURL}/parent/dashboard/students/${childTempId}/payment-link`,
        paymentPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.paymentLink) {
        // Store childTempId for success page
        localStorage.setItem("pendingChildTempId", childTempId);
        // Redirect to payment gateway
        window.location.href = response.data.paymentLink;
      } else {
        throw new Error("Payment link not generated");
      }
    } catch (error) {
      console.error("Error generating payment link:", error);

      if (error.response?.status === 404) {
        alert("Registration session expired. Please start again.");
        navigate("/add-child");
      } else if (error.response?.status === 401) {
        alert("Please log in again");
        navigate("/login");
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to generate payment link. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!childData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageMetadata
        title={`Payment - ${childData.firstName} | SkillSeed`}
        description="Complete payment to finalize your child's registration"
      />
      <div className="min-h-[800px] bg-[#F5F7FA] p-6">
        <div className="max-w-2xl mx-auto">
          {/* Back Navigation */}
          <div className="flex items-center gap-2 mb-4">
            <Link
              to="/add-child"
              className="text-[#0A1F44] hover:text-[#1A73E8] flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Child Info</span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-sm p-8 relative overflow-hidden">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-[#0A1F44] mb-2">
                Complete Registration
              </h1>
              <p className="text-gray-600">
                Finalizing registration for{" "}
                <span className="font-semibold text-[#0A1F44]">
                  {childData.firstName} {childData.lastName}
                </span>
              </p>
            </div>

            {/* Registration Summary */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-[#0A1F44] mb-2">
                Registration Summary
              </h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Child Name:</span>{" "}
                  {childData.firstName} {childData.lastName}
                </p>
                <p>
                  <span className="font-medium">Registration ID:</span>{" "}
                  {childTempId}
                </p>
              </div>
            </div>

            {/* Subscription Amount */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Subscription Amount (RWF)
              </label>
              <input
                type="number"
                value={subscriptionData.amount}
                onChange={handleAmountChange}
                min="1000"
                step="100"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                placeholder="Enter amount"
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimum amount: 1000 RWF
              </p>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#0A1F44] mb-4">
                Select Payment Method
              </h3>
              <div className="space-y-3">
                <div
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod === "mobilemoneyrwanda"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handlePaymentMethodChange("mobilemoneyrwanda")}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold">Mobile Money</h4>
                      <p className="text-sm text-gray-600">
                        Pay using MTN Mobile Money or Airtel Money
                      </p>
                    </div>
                    <div className="ml-auto">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedPaymentMethod === "mobilemoneyrwanda"
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-300"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>

                <div
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod === "card"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handlePaymentMethodChange("card")}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="font-semibold">Credit/Debit Card</h4>
                      <p className="text-sm text-gray-600">
                        Pay using Visa, Mastercard, or other cards
                      </p>
                    </div>
                    <div className="ml-auto">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedPaymentMethod === "card"
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-300"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-xl font-bold text-[#0A1F44]">
                  {subscriptionData.amount.toLocaleString()} RWF
                </span>
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={generatePaymentLink}
                disabled={loading || subscriptionData.amount < 1000}
                className="px-6 py-3 bg-[#3C91BA] text-white rounded-full font-semibold hover:bg-blue-600/90 flex items-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Generating..." : "Proceed to Payment"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
