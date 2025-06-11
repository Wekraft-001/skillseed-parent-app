import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Code,
  Bot,
  Trophy,
  MessageSquare,
  Lightbulb,
} from "lucide-react";
import { PageMetadata } from "../components/PageMetadata";

// Mock data for children - this should ideally come from a shared source or API
const childrenData = {
  emma: {
    id: "emma",
    name: "Emma Johnson",
    age: 12,
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    interests: ["Science", "Technology", "Robotics"],
    skills: ["Problem Solving", "Creativity", "Coding"],
    dreamJob: "Software Engineer",
    completedActivities: ["Intro to Coding", "Math Basics", "Science Fair"],
    inProgressActivities: ["AI Basics", "Robotics 101"],
    upcomingSessions: [
      {
        mentor: "Dr. Michael Brown",
        time: "Tomorrow, 3:00 PM",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      },
    ],
    scheduledExcursions: [
      {
        title: "Tech Museum Visit",
        date: "Jun 15, 2025",
        location: "City Science Center",
      },
    ],
  },
  tom: {
    id: "tom",
    name: "Tom Johnson",
    age: 9,
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    interests: ["Art", "Music", "Nature"],
    skills: ["Drawing", "Creativity", "Teamwork"],
    dreamJob: "Artist",
    completedActivities: ["Art Basics", "Music Theory"],
    inProgressActivities: ["Painting Techniques", "Guitar Lessons"],
    upcomingSessions: [
      {
        mentor: "Ms. Sarah Wilson",
        time: "Friday, 2:00 PM",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
      },
    ],
    scheduledExcursions: [
      {
        title: "Art Gallery Tour",
        date: "Jun 20, 2025",
        location: "Modern Art Museum",
      },
    ],
  },
};

const ChildCareerProfile = () => {
  const { childId } = useParams();
  const [child, setChild] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch the child's data from an API
    if (childId && childrenData[childId]) {
      setChild(childrenData[childId]);
    }
  }, [childId]);

  if (!child) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <>
      <PageMetadata
        title="Child Career Profile | SkillSeed"
        description="Career profile details and learning progress for your child"
      />
      <div className="bg-[#F5F7FA] min-h-[800px]">
        {/* Back Navigation */}
        <div className="p-6 flex items-center gap-3">
          <Link
            to="/"
            className="text-[#1A73E8] flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Profile Header */}
        <div id="profile-header" className="px-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={child.avatar}
                  className="w-24 h-24 rounded-full border-4 border-[#FFC107]"
                  alt={`${child.name}'s Avatar`}
                />
                <div className="absolute -bottom-2 right-0 bg-green-500 p-2 rounded-full">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{child.name}</h1>
                <p className="text-gray-500">
                  Age {child.age} • Grade {child.age - 6}
                </p>
                <div className="flex gap-3 mt-3">
                  {child.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-[#1A73E8] px-3 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Profile */}
        <div id="career-profile" className="px-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Career Profile</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
                <p>
                  <span className="font-medium">Interests:</span>{" "}
                  {child.interests.join(", ")}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Trophy className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
                <p>
                  <span className="font-medium">Skills:</span>{" "}
                  {child.skills.join(", ")}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
                <p>
                  <span className="font-medium">Dream Job:</span>{" "}
                  {child.dreamJob}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="px-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Takes 8/12 columns on large screens */}
          <div className="lg:col-span-8 space-y-6">
            {/* Progress Overview */}
            <div
              id="progress-overview"
              className="bg-white rounded-xl p-6 shadow-sm w-full"
            >
              <h2 className="text-lg font-semibold mb-6">Learning Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-[#1A73E8] text-2xl font-bold">
                    {child.completedActivities.length}
                  </div>
                  <p className="text-sm text-gray-600">Completed Activities</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <div className="text-[#FFC107] text-2xl font-bold">
                    {child.inProgressActivities.length}
                  </div>
                  <p className="text-sm text-gray-600">
                    In Progress Activities
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-green-500 text-2xl font-bold">
                    {child.upcomingSessions.length}
                  </div>
                  <p className="text-sm text-gray-600">Upcoming Sessions</p>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div
              id="recent-achievements"
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-6">
                Recent Achievements
              </h2>
              <div className="space-y-4">
                {child.completedActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl"
                  >
                    <div className="bg-[#1A73E8] p-3 rounded-full text-white">
                      <Code className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{activity}</h3>
                      <p className="text-sm text-gray-500">
                        Achieved 95% score in final assessment
                      </p>
                      <p className="text-xs text-[#1A73E8] mt-1">
                        May 12, 2025
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Development */}
            <div
              id="skill-development"
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-6">Skill Development</h2>
              <div className="space-y-4">
                {child.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill}</span>
                      <span className="text-sm text-[#1A73E8]">85%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 bg-[#1A73E8] rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Takes 4/12 columns on large screens */}
          <div className="lg:col-span-4 space-y-6">
            {/* Career Interests */}
            <div
              id="career-interests"
              className="bg-white rounded-xl p-6 shadow-sm w-full"
            >
              <h2 className="text-lg font-semibold mb-4">Career Interests</h2>
              <div className="space-y-3">
                {child.interests.map((interest, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg"
                  >
                    <Code className="w-5 h-5 text-[#1A73E8]" />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scheduled Excursions */}
            <div id="scheduled-excursions" className="mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Scheduled Excursions
                </h2>
                <div className="space-y-4">
                  {child.scheduledExcursions.length > 0 ? (
                    child.scheduledExcursions.map((excursion, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 p-3 rounded-lg"
                      >
                        <p className="font-semibold">{excursion.title}</p>
                        <p className="text-sm text-gray-500">
                          Date: {excursion.date}
                        </p>
                        <p className="text-sm text-gray-500">
                          Location: {excursion.location}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <svg
                            className="w-5 h-5 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                          <p className="text-sm">{excursion.location}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No scheduled excursions
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Upcoming Activities */}
            <div
              id="upcoming-activities"
              className="bg-white rounded-xl p-6 shadow-sm w-full"
            >
              <h2 className="text-lg font-semibold mb-4">
                Upcoming Activities
              </h2>
              <div className="space-y-4">
                {child.upcomingSessions.length > 0 ? (
                  child.upcomingSessions.map((session, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-[#1A73E8] pl-3"
                    >
                      <p className="font-medium">{session.mentor}</p>
                      <p className="text-sm text-gray-500">
                        Time: {session.time}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No upcoming activities
                  </p>
                )}
              </div>
            </div>

            {/* Learning Progress */}
            <div id="learning-progress" className="mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Learning Progress</h2>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                    {child.completedActivities.length} Completed
                  </span>
                </div>
                <div className="space-y-4">
                  {child.completedActivities.map((activity, index) => (
                    <div
                      key={`completed-${index}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Code className="w-5 h-5 text-[#1A73E8]" />
                        <p>{activity}</p>
                      </div>
                      <span className="text-green-500">✓</span>
                    </div>
                  ))}
                  {child.inProgressActivities.map((activity, index) => (
                    <div
                      key={`inprogress-${index}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Bot className="w-5 h-5 text-[#1A73E8]" />
                        <p>{activity}</p>
                      </div>
                      <span className="text-blue-500 text-sm font-medium">
                        In Progress
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-[#1A73E8] text-white p-4 rounded-full shadow-lg hover:bg-blue-600">
        <MessageSquare className="w-5 h-5" />
      </button>
    </>
  );
};

export default ChildCareerProfile;
