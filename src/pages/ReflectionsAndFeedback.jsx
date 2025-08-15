import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MessageSquare,
  Award,
  Bot,
  Palette,
  Clock,
  User,
  Star,
  MessageCircle,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import { PageMetadata } from "../components/PageMetadata";

const ReflectionsAndFeedback = () => {
  // Mock data for reflections
  const reflections = [
    {
      id: 1,
      content:
        "Today's robotics workshop was amazing! I learned how to program a robot to follow simple commands. It was challenging but fun!",
      timeAgo: "2h ago",
      tags: [
        { label: "Robotics", color: "bg-blue-100 text-[#1A73E8]" },
        { label: "Programming", color: "bg-green-100 text-green-600" },
      ],
    },
    {
      id: 2,
      content:
        "I completed my first art project using digital tools. It was different from traditional drawing but I enjoyed exploring new techniques!",
      timeAgo: "1d ago",
      tags: [
        { label: "Digital Art", color: "bg-pink-100 text-pink-600" },
        { label: "Creativity", color: "bg-purple-100 text-purple-600" },
      ],
    },
  ];

  // Mock data for badges
  const recentBadges = [
    {
      id: 1,
      icon: <Bot className="w-8 h-8 text-[#FFC107] mx-auto mb-2" />,
      title: "Robot Master",
      date: "May 12, 2025",
    },
    {
      id: 2,
      icon: <Palette className="w-8 h-8 text-[#1A73E8] mx-auto mb-2" />,
      title: "Digital Artist",
      date: "May 10, 2025",
    },
  ];

  // Mock data for teacher feedback
  const teacherFeedback = [
    {
      id: 1,
      teacherName: "Mr. Anderson",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      comment:
        "Emma shows great enthusiasm in robotics class. Her problem-solving skills are impressive!",
      date: "May 12, 2025",
    },
    {
      id: 2,
      teacherName: "Ms. Thompson",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      comment:
        "Great progress in digital art! Emma is becoming more confident with digital tools.",
      date: "May 10, 2025",
    },
  ];

  // Stats data
  const stats = [
    {
      count: "12",
      label: "Activities",
      icon: <BookOpen className="w-5 h-5" />,
      color: "bg-green-100 text-green-600",
    },
    {
      count: "8",
      label: "Reflections",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      count: "5",
      label: "Badges",
      icon: <Award className="w-5 h-5" />,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-[800px] p-6">
      <PageMetadata
        title="Reflections & Feedback | SkillSeed"
        description="Track your child's learning journey through reflections and feedback"
      />

      {/* Back Navigation */}
      <div className="mb-6">
        <Link to="/home" className="text-[#1A73E8] flex items-center gap-2 w-fit">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Child Selector */}
      <div id="child-selector" className="mb-8">
        <div className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm cursor-pointer border-2 border-[#1A73E8] w-fit">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
            className="w-12 h-12 rounded-full"
            alt="Child Avatar"
          />
          <div>
            <h3 className="font-semibold">Emma Johnson</h3>
            <p className="text-sm text-gray-500">Age 12</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div id="reflections-column" className="lg:col-span-2 space-y-6">
          <div
            id="reflection-header"
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold">Learning Journey</h2>
              <div className="flex gap-2">
                <button className="bg-blue-100 text-[#1A73E8] px-4 py-2 rounded-full text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  This Week
                </button>
                <button className="bg-blue-100 text-[#1A73E8] px-4 py-2 rounded-full text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  This Month
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`${stat.color
                    .replace("text-", "bg-")
                    .replace("600", "100")} p-4 rounded-xl text-center`}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className={stat.color}>{stat.icon}</div>
                    <p className="text-2xl font-bold">{stat.count}</p>
                  </div>
                  <p className="text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            id="reflections-list"
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Recent Reflections</h3>
              <button className="text-[#1A73E8] text-sm flex items-center gap-1">
                View All
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
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              {reflections.map((reflection) => (
                <div
                  key={reflection.id}
                  className="border-l-4 border-[#1A73E8] pl-4 py-2"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm">{reflection.content}</p>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {reflection.timeAgo}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {reflection.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`${tag.color} text-xs px-3 py-1 rounded-full`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div id="achievements-column" className="space-y-6">
          <div id="badges-earned" className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Recent Badges</h3>
              <button className="text-[#1A73E8] text-sm flex items-center gap-1">
                View All
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
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {recentBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="text-center bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {badge.icon}
                  <p className="text-sm font-medium mt-2">{badge.title}</p>
                  <p className="text-xs text-gray-500">{badge.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            id="teacher-feedback"
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Mentor Feedback</h3>
              <button className="text-[#1A73E8] text-sm flex items-center gap-1">
                View All
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
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              {teacherFeedback.map((feedback) => (
                <div
                  key={feedback.id}
                  className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <img
                    src={feedback.avatar}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                    alt={`${feedback.teacherName}'s avatar`}
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {feedback.teacherName}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      "{feedback.comment}"
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {feedback.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReflectionsAndFeedback;
