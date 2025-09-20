import React, { useState, useEffect } from "react";
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
  const [activeTab, setActiveTab] = useState("account");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Account Information State
  const [accountInfo, setAccountInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+250788123456",
  });

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    subscriptionReminders: true,
    paymentNotifications: true,
    childProgressUpdates: true,
  });

  // Children and Subscriptions State
  const [children, setChildren] = useState([
    {
      id: 1,
      name: "Alice Doe",
      age: 12,
      grade: "Grade 7",
      image: "https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=AD",
      subscription: {
        id: "sub_001",
        status: "active",
        plan: "Monthly Premium",
        amount: 15000,
        currency: "RWF",
        startDate: "2024-08-01",
        endDate: "2024-09-01",
        nextBilling: "2024-09-01",
        autoRenew: true,
        paymentMethod: "Mobile Money",
        daysLeft: 22,
      },
    },
    {
      id: 2,
      name: "Bob Doe",
      age: 9,
      grade: "Grade 4",
      image: "https://via.placeholder.com/60x60/10B981/FFFFFF?text=BD",
      subscription: {
        id: "sub_002",
        status: "expiring_soon",
        plan: "Monthly Basic",
        amount: 10000,
        currency: "RWF",
        startDate: "2024-08-01",
        endDate: "2024-09-03",
        nextBilling: "2024-09-03",
        autoRenew: false,
        paymentMethod: "Credit Card",
        daysLeft: 3,
      },
    },
    {
      id: 3,
      name: "Carol Doe",
      age: 15,
      grade: "Grade 10",
      image: "https://via.placeholder.com/60x60/F59E0B/FFFFFF?text=CD",
      subscription: {
        id: "sub_003",
        status: "cancelled",
        plan: "Monthly Premium",
        amount: 15000,
        currency: "RWF",
        startDate: "2024-07-01",
        endDate: "2024-08-15",
        nextBilling: null,
        autoRenew: false,
        paymentMethod: "Mobile Money",
        daysLeft: 0,
      },
    },
  ]);

  const [selectedChild, setSelectedChild] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to update account info
      // await updateAccountInfo(accountInfo);
      setTimeout(() => {
        setLoading(false);
        alert("Account information updated successfully!");
      }, 1500);
    } catch (error) {
      setLoading(false);
      alert("Failed to update account information. Please try again.");
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
      // await changePassword(passwordData);
      setTimeout(() => {
        setLoading(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        alert("Password changed successfully!");
      }, 1500);
    } catch (error) {
      setLoading(false);
      alert("Failed to change password. Please check your current password.");
    }
  };

  const handleNotificationUpdate = async () => {
    setLoading(true);
    try {
      // API call to update notification settings
      // await updateNotificationSettings(notificationSettings);
      setTimeout(() => {
        setLoading(false);
        alert("Notification settings updated successfully!");
      }, 1000);
    } catch (error) {
      setLoading(false);
      alert("Failed to update notification settings.");
    }
  };

  const handleRenewSubscription = async (childId) => {
    setLoading(true);
    try {
      // API call to renew subscription
      // await renewSubscription(childId);
      setTimeout(() => {
        setLoading(false);
        setShowRenewModal(false);
        alert("Subscription renewed successfully!");
        // Update the child's subscription status
        setChildren((prev) =>
          prev.map((child) =>
            child.id === childId
              ? {
                  ...child,
                  subscription: {
                    ...child.subscription,
                    status: "active",
                    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0],
                    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0],
                    daysLeft: 30,
                  },
                }
              : child
          )
        );
      }, 2000);
    } catch (error) {
      setLoading(false);
      alert("Failed to renew subscription. Please try again.");
    }
  };

  const handleCancelSubscription = async (childId) => {
    setLoading(true);
    try {
      // API call to cancel subscription
      // await cancelSubscription(childId);
      setTimeout(() => {
        setLoading(false);
        setShowCancelModal(false);
        alert("Subscription cancelled successfully!");
        // Update the child's subscription status
        setChildren((prev) =>
          prev.map((child) =>
            child.id === childId
              ? {
                  ...child,
                  subscription: {
                    ...child.subscription,
                    status: "cancelled",
                    autoRenew: false,
                  },
                }
              : child
          )
        );
      }, 1500);
    } catch (error) {
      setLoading(false);
      alert("Failed to cancel subscription. Please try again.");
    }
  };

  const toggleAutoRenew = async (childId) => {
    const child = children.find((c) => c.id === childId);
    setLoading(true);
    try {
      // API call to toggle auto-renew
      // await toggleAutoRenew(childId, !child.subscription.autoRenew);
      setTimeout(() => {
        setLoading(false);
        setChildren((prev) =>
          prev.map((c) =>
            c.id === childId
              ? {
                  ...c,
                  subscription: {
                    ...c.subscription,
                    autoRenew: !c.subscription.autoRenew,
                  },
                }
              : c
          )
        );
      }, 1000);
    } catch (error) {
      setLoading(false);
      alert("Failed to update auto-renewal setting.");
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
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
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
    .reduce((total, child) => total + child.subscription.amount, 0);

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
                    {formatCurrency(totalSubscriptionValue, "RWF")}
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
                { id: "notifications", label: "Notifications", icon: Bell },
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
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={accountInfo.firstName}
                          onChange={(e) =>
                            setAccountInfo({
                              ...accountInfo,
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
                          value={accountInfo.lastName}
                          onChange={(e) =>
                            setAccountInfo({
                              ...accountInfo,
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
                          value={accountInfo.email}
                          onChange={(e) =>
                            setAccountInfo({
                              ...accountInfo,
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
                          value={accountInfo.phone}
                          onChange={(e) =>
                            setAccountInfo({
                              ...accountInfo,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleAccountUpdate}
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
                  </div>
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
                            className="w-12 h-12 rounded-full mr-3"
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
                            <span className="text-gray-600">Next Billing:</span>
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
                              <span className="text-gray-600">Days Left:</span>
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

                        {child.subscription.status !== "cancelled" && (
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <span className="text-sm font-medium text-blue-700">
                              Auto-Renewal
                            </span>
                            <button
                              onClick={() => toggleAutoRenew(child.id)}
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
                        )}
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
                            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center text-sm font-medium transition-colors"
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
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center text-sm transition-colors"
                            >
                              <Settings className="w-4 h-4 mr-1" />
                              Modify
                            </button>
                            <button
                              onClick={() => {
                                setSelectedChild(child);
                                setShowCancelModal(true);
                              }}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center text-sm transition-colors"
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
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Notification Settings
                  </h2>
                  <p className="text-gray-600">
                    Choose how you want to be notified about important updates
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="space-y-6">
                    {Object.entries({
                      emailNotifications: {
                        title: "Email Notifications",
                        description: "Receive notifications via email",
                        icon: Mail,
                      },
                      smsNotifications: {
                        title: "SMS Notifications",
                        description: "Receive notifications via SMS",
                        icon: Phone,
                      },
                      subscriptionReminders: {
                        title: "Subscription Reminders",
                        description: "Get reminded about subscription renewals",
                        icon: Calendar,
                      },
                      paymentNotifications: {
                        title: "Payment Notifications",
                        description: "Get notified about payment transactions",
                        icon: CreditCard,
                      },
                      childProgressUpdates: {
                        title: "Child Progress Updates",
                        description:
                          "Receive updates about your child's progress",
                        icon: User,
                      },
                    }).map(([key, config]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center">
                          <config.icon className="w-5 h-5 text-gray-500 mr-3" />
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {config.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {config.description}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setNotificationSettings({
                              ...notificationSettings,
                              [key]: !notificationSettings[key],
                            })
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notificationSettings[key]
                              ? "bg-blue-600"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notificationSettings[key]
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}

                    <div className="flex justify-end pt-4">
                      <button
                        onClick={handleNotificationUpdate}
                        disabled={loading}
                        className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? (
                          <Loader className="w-5 h-5 animate-spin mr-2" />
                        ) : (
                          <Save className="w-5 h-5 mr-2" />
                        )}
                        {loading ? "Saving..." : "Save Settings"}
                      </button>
                    </div>
                  </div>
                </div>
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
                  <div className="max-w-md space-y-6">
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
                        onClick={handlePasswordChange}
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
                  </div>
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
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
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
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
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
                      price: 10000,
                      features: ["Basic features", "Email support"],
                    },
                    {
                      name: "Monthly Premium",
                      price: 15000,
                      features: [
                        "All features",
                        "Priority support",
                        "Advanced analytics",
                      ],
                    },
                    {
                      name: "Annual Premium",
                      price: 150000,
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
                          {formatCurrency(plan.price, "RWF")}
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
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
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
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center font-medium transition-colors"
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
