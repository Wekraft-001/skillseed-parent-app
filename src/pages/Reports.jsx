import React from "react";
import { Link } from "react-router-dom";
import {
  Download,
  BarChart3,
  Star,
  Lightbulb,
  Bell,
  Trophy,
  MessageSquare,
  ArrowRight,
  Target,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { PageMetadata } from "../components/PageMetadata";

const Reports = () => {
  // Mock data for progress metrics
  const progressMetrics = [
    {
      id: 1,
      value: "85%",
      label: "Engagement",
      icon: <BarChart3 className="w-5 h-5 text-green-600" />,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 2,
      value: "4.8",
      label: "Mentor Rating",
      icon: <Star className="w-5 h-5 text-purple-600" />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 3,
      value: "12",
      label: "New Skills",
      icon: <Lightbulb className="w-5 h-5 text-yellow-600" />,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  // Mock data for interest trends
  const interestTrends = [
    { id: 1, name: "Technology", percentage: 85, color: "bg-[#1A73E8]" },
    { id: 2, name: "Arts", percentage: 70, color: "bg-[#FFC107]" },
    { id: 3, name: "Science", percentage: 65, color: "bg-green-500" },
  ];

  // Mock data for discussion prompts
  const discussionPrompts = [
    {
      id: 1,
      icon: <MessageSquare className="w-4 h-4 text-[#1A73E8]" />,
      text: "Ask about their favorite part of the robotics workshop",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      id: 2,
      icon: <Lightbulb className="w-4 h-4 text-purple-600" />,
      text: "Discuss their creative process in digital art",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      id: 3,
      icon: <Target className="w-4 h-4 text-green-600" />,
      text: "Explore their goals for next month",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
  ];

  // Mock data for recent updates
  const recentUpdates = [
    {
      id: 1,
      icon: <Bell className="w-4 h-4 text-white" />,
      title: "New Mentor Match!",
      description: "Ms. Sarah is available for robotics mentoring",
      timeAgo: "2h ago",
      bgColor: "bg-blue-50",
      iconBg: "bg-[#1A73E8]",
    },
    {
      id: 2,
      icon: <Trophy className="w-4 h-4 text-white" />,
      title: "Achievement Unlocked!",
      description: "Completed 10 programming challenges",
      timeAgo: "1d ago",
      bgColor: "bg-green-50",
      iconBg: "bg-green-500",
    },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-[800px] p-6">
      <PageMetadata
        title="Reports & Progress | SkillSeed"
        description="Track your child's learning progress and achievements"
      />

      {/* Back Navigation */}
      <div className="mb-6">
        <Link to="/home" className="text-[#1A73E8] flex items-center gap-2 w-fit">
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

      {/* Child Selector with Bubble Effect */}
      <div
        id="child-selector"
        className="mb-8 flex items-center gap-4 relative"
      >
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FFC107] rounded-full opacity-10 animate-pulse"></div>
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
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> */}
      <div className="grid gap-6">
        {/* Left Column */}
        <div id="progress-column" className="lg:col-span-2 space-y-6">
          {/* Progress Header */}
          <div
            id="progress-header"
            className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-50 rounded-full -ml-12 -mb-12"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold">Learning Progress</h2>
                <button className="bg-[#1A73E8] text-white px-6 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors flex items-center gap-2 w-full md:w-auto justify-center">
                  <Download className="w-4 h-4" />
                  <span>Report</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {progressMetrics.map((metric) => (
                  <div
                    key={metric.id}
                    className={`${metric.bgColor} p-4 rounded-2xl relative overflow-hidden`}
                  >
                    <div
                      className="absolute top-0 right-0 w-8 h-8 rounded-full -mr-4 -mt-4"
                      style={{
                        backgroundColor: `${metric.bgColor
                          .replace("bg-", "")
                          .replace("-50", "-100")}`,
                      }}
                    ></div>
                    <div className="flex flex-col items-center text-center">
                      <div className={`${metric.iconBg} p-2 rounded-full mb-2`}>
                        {metric.icon}
                      </div>
                      <p className={`text-2xl font-bold ${metric.textColor}`}>
                        {metric.value}
                      </p>
                      <p className={`text-sm ${metric.textColor}`}>
                        {metric.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interest Trends */}
          <div
            id="interest-trends"
            className="bg-white p-6 rounded-2xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Interest Trends</h3>
              <button className="text-[#1A73E8] text-sm flex items-center gap-1">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {interestTrends.map((trend) => (
                <div
                  key={trend.id}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm text-gray-600 w-24">
                    {trend.name}
                  </span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${trend.color}`}
                      style={{ width: `${trend.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 w-10 text-right">
                    {trend.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div id="discussion-column" className="space-y-6">
          {/* Discussion Prompts */}
          {/* <div
            id="discussion-prompts"
            className="bg-white p-6 rounded-2xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Discussion Prompts</h3>
              <button className="text-[#1A73E8] text-sm flex items-center gap-1">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {discussionPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className={`${prompt.bgColor} p-4 rounded-xl flex items-start gap-3`}
                >
                  <div
                    className={`p-2 rounded-lg ${prompt.bgColor.replace(
                      "50",
                      "100"
                    )}`}
                  >
                    {prompt.icon}
                  </div>
                  <p className="text-sm text-gray-700">{prompt.text}</p>
                </div>
              ))}
            </div>
          </div> */}

          {/* Recent Updates */}
          {/* <div
            id="notifications"
            className="bg-white p-6 rounded-2xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Recent Updates</h3>
              <button className="text-[#1A73E8] text-sm flex items-center gap-1">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {recentUpdates.map((update) => (
                <div
                  key={update.id}
                  className={`${update.bgColor} p-4 rounded-xl flex items-start gap-3`}
                >
                  <div
                    className={`p-2 rounded-full ${update.iconBg} flex-shrink-0`}
                  >
                    {update.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">
                      {update.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {update.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {update.timeAgo}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Reports;
