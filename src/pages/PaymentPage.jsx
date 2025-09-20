import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, ArrowRight } from "lucide-react";
import { PageMetadata } from "../components/PageMetadata";

const currencyOptions = [
  { code: "RWF", symbol: "₣", name: "Rwandan Franc", minAmount: 1000 },
  { code: "USD", symbol: "$", name: "US Dollar", minAmount: 1 },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", minAmount: 100 },
  { code: "AED", symbol: "DH", name: "UAE Dirham", minAmount: 5 },
  { code: "EUR", symbol: "€", name: "Euro", minAmount: 1 },
  { code: "GBP", symbol: "£", name: "British Pound", minAmount: 1 },
];

const PaymentPage = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("parentToken");
  const navigate = useNavigate();
  const { childTempId } = useParams();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [subscriptionData, setSubscriptionData] = useState({
    amount: 1000,
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
  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    const currencyOption = currencyOptions.find(
      (opt) => opt.code === newCurrency
    );

    setSubscriptionData({
      ...subscriptionData,
      currency: newCurrency,
      amount: currencyOption.minAmount, // Reset to minimum amount for new currency
    });
  };

  const currentCurrency = currencyOptions.find(
    (opt) => opt.code === subscriptionData.currency
  );

  const generatePaymentLink = async () => {
    if (!childTempId) {
      alert("Invalid registration session. Please start again.");
      return;
    }

    if (subscriptionData.amount < currentCurrency.minAmount) {
      alert(
        `Minimum amount is ${currentCurrency.code} ${currentCurrency.minAmount}`
      );
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
              <p className="text-red-400 text-sm">
                This is for pilot purposes, you are not getting debited for now
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
                Subscription Amount
              </label>
              <div className="flex gap-3">
                {/* Currency Dropdown */}
                <div className="w-40">
                  <select
                    value={subscriptionData.currency}
                    onChange={handleCurrencyChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-white"
                  >
                    {currencyOptions.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Input */}
                <div className="flex-1">
                  <input
                    type="number"
                    value={subscriptionData.amount}
                    onChange={handleAmountChange}
                    min={currentCurrency.minAmount}
                    step={
                      subscriptionData.currency === "RWF" ||
                      subscriptionData.currency === "KES"
                        ? "100"
                        : "0.01"
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
                    placeholder={`Enter amount (${currentCurrency.symbol})`}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Minimum amount: {currentCurrency.minAmount}{" "}
                {currentCurrency.code}
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
                  {currentCurrency.symbol}
                  {subscriptionData.amount.toLocaleString()}{" "}
                  {subscriptionData.currency}
                </span>
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={generatePaymentLink}
                disabled={
                  loading || subscriptionData.amount < currentCurrency.minAmount
                }
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
