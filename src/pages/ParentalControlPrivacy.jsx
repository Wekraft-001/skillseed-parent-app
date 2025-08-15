import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Lock,
  Key,
  Bell,
  Clock,
  ChevronRight,
  ChevronDown,
  Smartphone,
  Eye,
  MessageCircle,
  Calendar,
  Users,
  Settings,
  AlertCircle,
  HelpCircle,
  LogOut,
  User,
  LockKeyhole,
  FileText,
  Download,
  Trash2,
} from "lucide-react";
import { PageMetadata } from "../components/PageMetadata";

const ParentalControlPrivacy = () => {
  const [activeTab, setActiveTab] = useState("parental");
  const [expandedSection, setExpandedSection] = useState(null);
  const [controls, setControls] = useState({
    mentorSessions: true,
    excursions: true,
    videoChat: false,
    audioChat: true,
    profileVisibility: true,
    dailyAppTime: "2 hours",
  });

  const toggleControl = (controlName) => {
    setControls((prev) => ({
      ...prev,
      [controlName]: !prev[controlName],
    }));
  };

  const handleTimeChange = (e) => {
    setControls((prev) => ({
      ...prev,
      dailyAppTime: e.target.value,
    }));
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const securitySettings = [
    {
      id: "password",
      icon: <Key className="w-5 h-5 text-[#1A73E8]" />,
      title: "Change Password",
      description: "Update your account password",
      action: "Change",
      onClick: () => console.log("Change Password"),
    },
    // {
    //   id: "2fa",
    //   icon: <LockKeyhole className="w-5 h-5 text-[#1A73E8]" />,
    //   title: "Two-Factor Authentication",
    //   description: "Add an extra layer of security",
    //   action: "Enable",
    //   onClick: () => console.log("Enable 2FA"),
    // },
    {
      id: "notifications",
      icon: <Bell className="w-5 h-5 text-[#1A73E8]" />,
      title: "Notification Settings",
      description: "Manage your notification preferences",
      action: "Manage",
      onClick: () => console.log("Notification Settings"),
    },
    // {
    //   id: "activity",
    //   icon: <Clock className="w-5 h-5 text-[#1A73E8]" />,
    //   title: "Activity Log",
    //   description: "View account activity history",
    //   action: "View",
    //   onClick: () => console.log("Activity Log"),
    // },
  ];

  const privacyFeatures = [
    {
      title: "Data Collection",
      description: "Learn what data we collect and why",
      icon: <Eye className="w-5 h-5 text-purple-600" />,
    },
    {
      title: "Third-Party Sharing",
      description: "Control how your data is shared",
      icon: <Users className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Location Services",
      description: "Manage location tracking settings",
      icon: <Calendar className="w-5 h-5 text-green-600" />,
    },
    {
      title: "Communication Preferences",
      description: "Choose how we contact you",
      icon: <MessageCircle className="w-5 h-5 text-yellow-600" />,
    },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-[800px] p-6">
      <PageMetadata
        title="Parental Controls & Privacy | SkillSeed"
        description="Manage your child's account settings and privacy preferences"
      />

      {/* Back Navigation */}
      <div className="mb-6">
        <Link to="/" className="text-[#1A73E8] flex items-center gap-2 w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Child Selector with Enhanced Bubble Effect */}
      <div
        id="child-selector"
        className="mb-8 flex items-center gap-4 relative"
      >
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FFC107] rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-2 right-2 w-10 h-10 bg-pink-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#1A73E8] rounded-full opacity-10 animate-pulse delay-150"></div>
        <div className="bg-white p-4 rounded-full flex items-center gap-4 shadow-lg cursor-pointer border-2 border-[#1A73E8] relative z-10">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
            className="w-14 h-14 rounded-full border-4 border-[#FFC107]"
            alt="Child Avatar"
          />
          <div>
            <h3 className="font-semibold">Emma Johnson</h3>
            <p className="text-sm text-gray-500">Age 12</p>
          </div>
          <ChevronDown className="text-gray-400 ml-2 w-4 h-4" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm p-1 mb-8 max-w-2xl">
        <div className="flex">
          <button
            onClick={() => setActiveTab("parental")}
            className={`flex-1 py-3 px-4 text-center font-medium rounded-xl transition-colors ${
              activeTab === "parental"
                ? "bg-[#1A73E8] text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Parental Controls
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex-1 py-3 px-4 text-center font-medium rounded-xl transition-colors ${
              activeTab === "privacy"
                ? "bg-[#1A73E8] text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Privacy Settings
          </button>
        </div>
      </div>

      {activeTab === "parental" ? (
        <>
          {/* Parental Controls Section */}
          <div id="parental-controls" className="mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-50 rounded-full -ml-12 -mb-12"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Shield className="text-[#1A73E8] mr-2 w-5 h-5" />
                    Parental Controls
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Consent Management */}
                  <div
                    id="consent-controls"
                    className="bg-blue-50 p-5 rounded-2xl"
                  >
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-600" />
                      Activity Permissions
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">
                          Mentor Sessions
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={controls.mentorSessions}
                            onChange={() => toggleControl("mentorSessions")}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A73E8]"></div>
                        </label>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Excursions</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={controls.excursions}
                            onChange={() => toggleControl("excursions")}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A73E8]"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Communication Controls */}
                  {/* <div
                    id="communication-controls"
                    className="bg-purple-50 p-5 rounded-2xl"
                  >
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2 text-purple-600" />
                      Communication
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Video Chat</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={controls.videoChat}
                            onChange={() => toggleControl("videoChat")}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Audio Chat</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={controls.audioChat}
                            onChange={() => toggleControl("audioChat")}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div> */}

                  {/* Access Controls */}
                  <div
                    id="access-controls"
                    className="bg-yellow-50 p-5 rounded-2xl"
                  >
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                      <Settings className="w-4 h-4 mr-2 text-yellow-600" />
                      Access Controls
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">
                          Profile Visibility
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={controls.profileVisibility}
                            onChange={() => toggleControl("profileVisibility")}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFC107]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          Daily App Time
                        </span>
                        <select
                          className="bg-white rounded-full px-3 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
                          value={controls.dailyAppTime}
                          onChange={handleTimeChange}
                        >
                          <option value="1 hour">1 hour</option>
                          <option value="2 hours">2 hours</option>
                          <option value="3 hours">3 hours</option>
                          <option value="4 hours">4 hours</option>
                          <option value="Unlimited">Unlimited</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div
            id="security-settings"
            className="bg-white p-6 rounded-2xl shadow-sm mb-8"
          >
            <h3 className="font-semibold text-lg mb-6 flex items-center">
              <Lock className="text-[#1A73E8] mr-2 w-5 h-5" />
              Account Security
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {securitySettings.map((setting) => (
                <button
                  key={setting.id}
                  onClick={setting.onClick}
                  className="w-full flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="flex items-center">
                    <div className="mr-3">{setting.icon}</div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {setting.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {setting.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-[#1A73E8] mr-2">
                      {setting.action}
                    </span>
                    <ChevronRight className="text-gray-400 w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Privacy Settings Tab */
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg mb-6 flex items-center">
              <Eye className="text-[#1A73E8] mr-2 w-5 h-5" />
              Privacy Settings
            </h3>
            <div className="space-y-4">
              {privacyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <button
                    className="w-full flex items-center justify-between"
                    onClick={() => toggleSection(`privacy-${index}`)}
                  >
                    <div className="flex items-center">
                      <div
                        className="p-2 rounded-lg bg-opacity-20 mr-3"
                        style={{
                          backgroundColor: `${
                            feature.icon.props.className.includes("text-")
                              ? feature.icon.props.className.match(
                                  /text-(\w+)-600/
                                )[1] + "10"
                              : "#1A73E810"
                          }`,
                        }}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-left">
                          {feature.title}
                        </p>
                        <p className="text-xs text-gray-500 text-left">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`text-gray-400 w-5 h-5 transition-transform ${
                        expandedSection === `privacy-${index}`
                          ? "rotate-90"
                          : ""
                      }`}
                    />
                  </button>
                  {expandedSection === `privacy-${index}` && (
                    <div className="mt-3 pl-12 pr-4">
                      <p className="text-sm text-gray-600">
                        {feature.title === "Data Collection" &&
                          "We collect basic usage data to improve our services. This includes activity logs, interaction data, and performance metrics. No personal information is shared without your consent."}
                        {feature.title === "Third-Party Sharing" &&
                          "We only share necessary information with trusted partners who assist in providing our services. You can control what information is shared in the settings below."}
                        {feature.title === "Location Services" &&
                          "Location data is used to provide location-based features and ensure safety during excursions. You can disable location tracking at any time."}
                        {feature.title === "Communication Preferences" &&
                          "Choose how you receive updates, notifications, and communications from us. Manage your email, SMS, and in-app notification preferences."}
                      </p>
                      <div className="mt-3 flex justify-end">
                        <button className="text-sm text-[#1A73E8] hover:underline">
                          Learn More
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <AlertCircle className="text-yellow-500 mr-2 w-5 h-5" />
              Data & Privacy
            </h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Privacy Policy</span>
                </div>
                <ChevronRight className="text-gray-400 w-5 h-5" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Terms of Service</span>
                </div>
                <ChevronRight className="text-gray-400 w-5 h-5" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <Download className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Download Your Data</span>
                </div>
                <ChevronRight className="text-gray-400 w-5 h-5" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg text-red-600 hover:bg-red-50">
                <div className="flex items-center">
                  <Trash2 className="w-5 h-5 mr-3" />
                  <span>Delete Account</span>
                </div>
                <ChevronRight className="text-red-400 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentalControlPrivacy;
