import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Code,
  Bot,
  Beaker,
  Puzzle,
  Trophy,
  Check,
  Star,
} from "lucide-react";
import { PageMetadata } from "../components/PageMetadata";

const LearningActivities = () => {
  // Mock data for activities
  const activities = [
    {
      id: 1,
      month: "May 2025",
      items: [
        {
          id: "python",
          title: "Introduction to Python Programming",
          date: "May 14, 2025",
          description:
            "Completed basic programming concepts and created first program",
          status: "Completed",
          badge: "Gold Badge",
          icon: Code,
          iconBg: "bg-[#1A73E8]",
          badgeColor: "text-[#1A73E8]",
          cardBg: "bg-blue-50",
        },
        {
          id: "ai",
          title: "AI for Kids Workshop",
          date: "May 10, 2025",
          description:
            "Learned about artificial intelligence basics and applications",
          status: "Completed",
          badge: "Silver Badge",
          icon: Bot,
          iconBg: "bg-purple-500",
          badgeColor: "text-purple-500",
          cardBg: "bg-purple-50",
        },
      ],
    },
    {
      id: 2,
      month: "April 2025",
      items: [
        {
          id: "science",
          title: "Science Lab Experiments",
          date: "April 25, 2025",
          description:
            "Conducted three experiments on basic chemistry concepts",
          status: "Completed",
          badge: "Bronze Badge",
          icon: Beaker,
          iconBg: "bg-green-500",
          badgeColor: "text-green-500",
          cardBg: "bg-green-50",
        },
        {
          id: "problem-solving",
          title: "Problem Solving Challenge",
          date: "April 15, 2025",
          description:
            "Solved advanced logic puzzles and mathematical problems",
          status: "Completed",
          badge: "Gold Badge",
          icon: Puzzle,
          iconBg: "bg-[#FFC107]",
          badgeColor: "text-[#FFC107]",
          cardBg: "bg-yellow-50",
        },
      ],
    },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-[800px] p-6">
      <PageMetadata
        title="Learning Activities | SkillSeed"
        description="Track your child's learning activities and achievements"
      />

      {/* Back Navigation */}
      <div className="mb-6">
        <Link
          to="/home"
          className="text-[#1A73E8] flex items-center gap-2 w-fit"
        >
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

      {/* Activities Header */}
      <div
        id="activities-header"
        className="bg-white p-6 rounded-xl shadow-sm mb-6"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#212121]">
              Learning Activities
            </h2>
            <p className="text-gray-500">
              All completed activities and achievements
            </p>
          </div>
          <div className="flex items-center">
            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <Star className="w-4 h-4 mr-2" />
              12 Activities Completed
            </span>
          </div>
        </div>
      </div>

      {/* Activities Timeline */}
      <div
        id="activities-timeline"
        className="bg-white p-6 rounded-xl shadow-sm"
      >
        <div className="space-y-8">
          {activities.map((monthGroup) => (
            <div
              key={monthGroup.id}
              id={`${monthGroup.month
                .toLowerCase()
                .replace(" ", "-")}-activities`}
              className="relative"
            >
              <h3 className="text-lg font-semibold mb-4 text-[#0A1F44]">
                {monthGroup.month}
              </h3>
              <div className="space-y-4">
                {monthGroup.items.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className={`${activity.cardBg} p-4 rounded-xl`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`${activity.iconBg} p-3 rounded-full text-white flex-shrink-0`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <h4 className="font-semibold">{activity.title}</h4>
                            <span className="text-sm text-gray-500 whitespace-nowrap">
                              {activity.date}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1">
                            {activity.description}
                          </p>
                          <div className="flex flex-wrap gap-3 mt-3">
                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                              <Check className="w-3 h-3 mr-1" />
                              {activity.status}
                            </span>
                            <span
                              className={`${activity.badgeColor} text-xs font-medium flex items-center`}
                            >
                              <Trophy className="w-3 h-3 mr-1" />
                              {activity.badge}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningActivities;
