import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  User,
  CreditCard,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader,
  Save,
  Trash2,
  RefreshCw,
  Settings,
  Phone,
  Mail,
  Shield,
  DollarSign,
} from "lucide-react";

const SubscriptionManagement = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("parentToken");
  const [activeTab, setActiveTab] = useState("account");
  const [updateAccount, setUpdateAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fetchAccountInfo = async () => {
    const { data } = await axios.get(`${apiURL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return data;
  };

  const {
    data: accountInfo,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ["account-info"],
    queryFn: fetchAccountInfo,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const fetchSubscriptions = async () => {
    const { data } = await axios.get(
      `${apiURL}/parent/dashboard/subscriptions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    console.log(data.subscriptions);
    return data.subscriptions;
  };

  const { data: subscriptions = [] } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  // Transform API subscription data to match component structure
  const transformSubscriptionData = (subscriptions) => {
    return subscriptions.map((sub) => ({
      id: sub._id,
      name: `${sub?.child?.firstName} ${sub?.child?.lastName}`.trim(),
      age: sub?.child?.age,
      grade: `Grade ${sub?.child?.grade}`,
      image:
        sub?.child?.image ||
        `https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=${sub?.child?.firstName.charAt(
          0
        )}${sub?.child?.lastName.charAt(0)}`,
      subscription: {
        id: sub._id,
        status: getSubscriptionStatus(sub),
        plan: getPlanName(sub?.amount, sub?.currency),
        amount: sub.amount,
        currency: sub.currency,
        startDate: sub.startDate,
        endDate: sub.endDate,
        nextBilling: sub.endDate,
        autoRenew: sub.isActive,
        paymentMethod: getPaymentMethodName(sub.payment_options),
        daysLeft: calculateDaysLeft(sub.endDate),
        paymentStatus: sub.paymentStatus,
        maxChildren: sub.maxChildren,
      },
    }));
  };

  const getSubscriptionStatus = (subscription) => {
    if (!subscription.isActive || subscription.deletedAt) {
      return "cancelled";
    }

    const endDate = new Date(subscription.endDate);
    const now = new Date();
    const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) {
      return "expired";
    } else if (daysLeft <= 7) {
      return "expiring_soon";
    } else {
      return "active";
    }
  };

  const getPlanName = (amount, currency) => {
    const monthlyPlans = {
      USD: {
        50: "Monthly Premium",
        30: "Monthly Basic",
        25: "Monthly Starter",
      },
      RWF: {
        15000: "Monthly Premium",
        10000: "Monthly Basic",
        7500: "Monthly Starter",
      },
    };

    return (
      monthlyPlans[currency]?.[amount] || `Monthly Plan (${amount} ${currency})`
    );
  };

  const getPaymentMethodName = (paymentOption) => {
    const paymentMethods = {
      card: "Credit Card",
      mobile_money: "Mobile Money",
      bank_transfer: "Bank Transfer",
    };

    return paymentMethods[paymentOption] || "Credit Card";
  };

  const calculateDaysLeft = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Transform subscriptions data
  const children = transformSubscriptionData(subscriptions);

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to update account info
      await axios.put(`${apiURL}/auth/profile`, updateAccount, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      setLoading(false);
      alert("Account information updated successfully!");
    } catch (error) {
      setLoading(false);
      alert("Failed to update account information. Please try again.");
      console.error("Update error:", error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }
    setLoading(true);
    try {
      // API call to change password
      await axios.put(
        `${apiURL}/auth/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      setLoading(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      alert("Password changed successfully!");
    } catch (error) {
      setLoading(false);
      alert("Failed to change password. Please check your current password.");
      console.error("Password change error:", error);
    }
  };

  const handleRenewSubscription = async (childId) => {
    setLoading(true);
    try {
      // API call to renew subscription
      await axios.post(
        `${apiURL}/parent/dashboard/subscriptions/${childId}/renew`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      setLoading(false);
      setShowRenewModal(false);
      alert("Subscription renewed successfully!");
      // Refetch subscriptions to get updated data
      window.location.reload(); // Or use react-query's refetch
    } catch (error) {
      setLoading(false);
      alert("Failed to renew subscription. Please try again.");
      console.error("Renew error:", error);
    }
  };

  const handleCancelSubscription = async (childId) => {
    setLoading(true);
    try {
      // API call to cancel subscription
      await axios.delete(
        `${apiURL}/parent/dashboard/subscriptions/${childId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      setLoading(false);
      setShowCancelModal(false);
      alert("Subscription cancelled successfully!");
      // Refetch subscriptions to get updated data
      window.location.reload(); // Or use react-query's refetch
    } catch (error) {
      setLoading(false);
      alert("Failed to cancel subscription. Please try again.");
      console.error("Cancel error:", error);
    }
  };

  const toggleAutoRenew = async (childId) => {
    const child = children.find((c) => c.id === childId);
    setLoading(true);
    try {
      // API call to toggle auto-renew
      await axios.put(
        `${apiURL}/parent/dashboard/subscriptions/${childId}/auto-renew`,
        {
          autoRenew: !child.subscription.autoRenew,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      setLoading(false);
      // Refetch subscriptions to get updated data
      window.location.reload(); // Or use react-query's refetch
    } catch (error) {
      setLoading(false);
      alert("Failed to update auto-renewal setting.");
      console.error("Auto-renew error:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50 border-green-200";
      case "expiring_soon":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      case "expired":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "expiring_soon":
        return <AlertTriangle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      case "expired":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount, currency) => {
    const currencyMap = {
      USD: "en-US",
      RWF: "en-RW",
    };

    return new Intl.NumberFormat(currencyMap[currency] || "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: currency === "RWF" ? 0 : 2,
    }).format(amount);
  };

  const activeChildren = children.filter(
    (child) => child.subscription.status === "active"
  );
  const expiringChildren = children.filter(
    (child) => child.subscription.status === "expiring_soon"
  );
  const totalSubscriptionValue = children
    .filter(
      (child) =>
        child.subscription.status === "active" ||
        child.subscription.status === "expiring_soon"
    )
    .reduce((total, child) => {
      // Convert to USD for total calculation if needed
      let amount = child.subscription.amount;
      if (child.subscription.currency === "RWF") {
        amount = amount / 1450;
      }
      return total + amount;
    }, 0);

  useEffect(() => {
    if (accountInfo) {
      setUpdateAccount({
        firstName: accountInfo.firstName || "",
        lastName: accountInfo.lastName || "",
        email: accountInfo.email || "",
        phoneNumber: accountInfo.phoneNumber || "",
      });
    }
  }, [accountInfo]);

  // Show loading state while fetching data
  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your account information...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (userError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 mb-4">
            Failed to load account information
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div id="content-header">
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-yellow-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full -ml-16 -mt-16"></div>
              <div className="absolute top-4 right-8 w-8 h-8 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>
              <div
                className="absolute bottom-6 right-16 w-6 h-6 bg-blue-300 rounded-full opacity-40 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>

              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h2 className="text-3xl font-bold text-deep-navy mb-2">
                    Account & Subscription Management
                  </h2>
                  <p className="text-gray-600">
                    Manage your account settings and children's subscriptions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 px-4 ">
            <div className="bg-green-500 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center">
                <User className="w-8 h-8 text-white mr-3" />
                <div>
                  <p className="text-white text-sm font-medium">
                    Active Children
                  </p>
                  <p className="text-white text-xl font-bold">
                    {activeChildren.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-500 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-900/70 mr-3" />
                <div>
                  <p className="text-white text-sm font-medium">
                    Expiring Soon
                  </p>
                  <p className="text-white text-xl font-bold">
                    {expiringChildren.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-500 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-white mr-3" />
                <div>
                  <p className="text-white text-sm font-medium">
                    Monthly Total
                  </p>
                  <p className="text-white text-xl font-bold">
                    ${totalSubscriptionValue.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {[
                { id: "account", label: "Account Info", icon: User },
                {
                  id: "subscriptions",
                  label: "Subscriptions",
                  icon: CreditCard,
                },
                { id: "security", label: "Security", icon: Lock },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === id
                      ? "border-blue-500 text-blue-600 bg-blue-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Account Information Tab */}
            {activeTab === "account" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Account Information
                  </h2>
                  <p className="text-gray-600">
                    Update your personal information and contact details
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <form onSubmit={handleAccountUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={updateAccount.firstName || ""}
                          onChange={(e) =>
                            setUpdateAccount({
                              ...updateAccount,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={updateAccount.lastName || ""}
                          onChange={(e) =>
                            setUpdateAccount({
                              ...updateAccount,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your last name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={updateAccount.email || ""}
                          onChange={(e) =>
                            setUpdateAccount({
                              ...updateAccount,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your email address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={updateAccount.phoneNumber || ""}
                          onChange={(e) =>
                            setUpdateAccount({
                              ...updateAccount,
                              phoneNumber: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? (
                          <Loader className="w-5 h-5 animate-spin mr-2" />
                        ) : (
                          <Save className="w-5 h-5 mr-2" />
                        )}
                        {loading ? "Updating..." : "Update Account"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Subscriptions Tab */}
            {activeTab === "subscriptions" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Children & Subscriptions
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Manage individual subscriptions for each child
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Children</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {children.length}
                    </p>
                  </div>
                </div>

                {children.length === 0 ? (
                  <div className="text-center py-12">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No subscriptions found
                    </h3>
                    <p className="text-gray-600">
                      You don't have any active subscriptions yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {children.map((child) => (
                      <div
                        key={child.id}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <img
                              src={child.image}
                              alt={child.name}
                              className="w-12 h-12 rounded-full mr-3 object-cover"
                              onError={(e) => {
                                e.target.src = `https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=${child.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}`;
                              }}
                            />
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {child.name}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {child.grade} • Age {child.age}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              child.subscription.status
                            )}`}
                          >
                            {getStatusIcon(child.subscription.status)}
                            <span className="ml-1">
                              {child.subscription.status
                                .replace("_", " ")
                                .toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Plan:</span>
                              <span className="font-medium">
                                {child.subscription.plan}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Amount:</span>
                              <span className="font-medium text-green-600">
                                {formatCurrency(
                                  child.subscription.amount,
                                  child.subscription.currency
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                Next Billing:
                              </span>
                              <span className="font-medium">
                                {formatDate(child.subscription.nextBilling)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                Payment Method:
                              </span>
                              <span className="font-medium">
                                {child.subscription.paymentMethod}
                              </span>
                            </div>
                            {child.subscription.daysLeft > 0 && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  Days Left:
                                </span>
                                <span
                                  className={`font-medium ${
                                    child.subscription.daysLeft <= 7
                                      ? "text-red-600"
                                      : "text-green-600"
                                  }`}
                                >
                                  {child.subscription.daysLeft} days
                                </span>
                              </div>
                            )}
                          </div>

                          {/* {child.subscription.status !== "cancelled" && (
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                              <span className="text-sm font-medium text-blue-700">
                                Auto-Renewal
                              </span>
                              <button
                                onClick={() => toggleAutoRenew(child.id)}
                                disabled={loading}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  child.subscription.autoRenew
                                    ? "bg-blue-600"
                                    : "bg-gray-300"
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    child.subscription.autoRenew
                                      ? "translate-x-6"
                                      : "translate-x-1"
                                  }`}
                                />
                              </button>
                            </div>
                          )} */}
                        </div>

                        <div className="space-y-2">
                          {child.subscription.status === "expiring_soon" ||
                          child.subscription.status === "expired" ||
                          child.subscription.status === "cancelled" ? (
                            <button
                              onClick={() => {
                                setSelectedChild(child);
                                setShowRenewModal(true);
                              }}
                              disabled={loading}
                              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center text-sm font-medium transition-colors"
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Renew Subscription
                            </button>
                          ) : (
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => {
                                  setSelectedChild(child);
                                  setShowModifyModal(true);
                                }}
                                disabled={loading}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center text-sm transition-colors"
                              >
                                <Settings className="w-4 h-4 mr-1" />
                                Modify
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedChild(child);
                                  setShowCancelModal(true);
                                }}
                                disabled={loading}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center text-sm transition-colors"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Security Settings
                  </h2>
                  <p className="text-gray-600">
                    Keep your account secure by updating your password regularly
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <form
                    onSubmit={handlePasswordChange}
                    className="max-w-md space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Shield className="w-4 h-4 inline mr-2" />
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your current password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Lock className="w-4 h-4 inline mr-2" />
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your new password"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 6 characters long
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Lock className="w-4 h-4 inline mr-2" />
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Confirm your new password"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? (
                          <Loader className="w-5 h-5 animate-spin mr-2" />
                        ) : (
                          <Lock className="w-5 h-5 mr-2" />
                        )}
                        {loading ? "Updating..." : "Change Password"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Renew Subscription Modal */}
      {showRenewModal && selectedChild && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <RefreshCw className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold">Renew Subscription</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Renew subscription for <strong>{selectedChild.name}</strong>?
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Plan:</span>
                  <span className="font-medium text-green-800">
                    {selectedChild.subscription.plan}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Amount:</span>
                  <span className="font-semibold text-green-800">
                    {formatCurrency(
                      selectedChild.subscription.amount,
                      selectedChild.subscription.currency
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Duration:</span>
                  <span className="font-medium text-green-800">1 Month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Payment Method:</span>
                  <span className="font-medium text-green-800">
                    {selectedChild.subscription.paymentMethod}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRenewModal(false)}
                disabled={loading}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRenewSubscription(selectedChild.id)}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center font-medium transition-colors"
              >
                {loading ? (
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                {loading ? "Processing..." : "Renew Now"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Subscription Modal */}
      {showCancelModal && selectedChild && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-xl font-semibold">Cancel Subscription</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel the subscription for{" "}
              <strong>{selectedChild.name}</strong>?
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-800 text-sm font-medium mb-1">
                    Important:
                  </p>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• This action cannot be undone</li>
                    <li>
                      • Access will continue until{" "}
                      {formatDate(selectedChild.subscription.endDate)}
                    </li>
                    <li>• No refund will be issued for unused time</li>
                    <li>• All premium features will be lost</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                disabled={loading}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 font-medium transition-colors"
              >
                Keep Subscription
              </button>
              <button
                onClick={() => handleCancelSubscription(selectedChild.id)}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center font-medium transition-colors"
              >
                {loading ? (
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <XCircle className="w-4 h-4 mr-2" />
                )}
                {loading ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modify Subscription Modal */}
      {showModifyModal && selectedChild && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <div className="flex items-center mb-6">
              <Settings className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold">Modify Subscription</h3>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">
                Current Plan: {selectedChild.subscription.plan}
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Child: <strong>{selectedChild.name}</strong>
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Change Plan
                </label>
                <div className="space-y-2">
                  {[
                    {
                      name: "Monthly Basic",
                      price:
                        selectedChild.subscription.currency === "USD"
                          ? 30
                          : 10000,
                      features: ["Basic features", "Email support"],
                    },
                    {
                      name: "Monthly Premium",
                      price:
                        selectedChild.subscription.currency === "USD"
                          ? 50
                          : 15000,
                      features: [
                        "All features",
                        "Priority support",
                        "Advanced analytics",
                      ],
                    },
                    {
                      name: "Annual Premium",
                      price:
                        selectedChild.subscription.currency === "USD"
                          ? 500
                          : 150000,
                      features: [
                        "All features",
                        "Priority support",
                        "2 months free",
                      ],
                    },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedChild.subscription.plan === plan.name
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900">
                          {plan.name}
                        </h5>
                        <span className="font-bold text-green-600">
                          {formatCurrency(
                            plan.price,
                            selectedChild.subscription.currency
                          )}
                        </span>
                      </div>
                      <ul className="text-sm text-gray-600">
                        {plan.features.map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  {["Mobile Money", "Credit Card"].map((method) => (
                    <label key={method} className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        defaultChecked={
                          selectedChild.subscription.paymentMethod === method
                        }
                        className="mr-3 text-blue-600"
                      />
                      <span className="text-sm">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModifyModal(false)}
                disabled={loading}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle plan modification
                  setShowModifyModal(false);
                  alert(
                    "Plan modification functionality will redirect to payment page"
                  );
                }}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center font-medium transition-colors"
              >
                <Settings className="w-4 h-4 mr-2" />
                Update Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;
