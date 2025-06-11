import React, { useState } from "react";
import {
  Plus,
  Star,
  Trophy,
  Rocket,
  Users,
  Brain,
  Map,
  Code,
  Bot,
  Lightbulb,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState("emma");

  // Mock data for children
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

  const currentChild = childrenData[selectedChild];

  const handleViewProfile = (childId) => {
    navigate(`/child-career-profile/${childId}`);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-[800px] p-6">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, Parent!
        </h1>
        <p className="text-gray-600">
          Track your child's learning journey and stay updated on their
          progress.
        </p>
      </div>

      {/* Child Selector */}
      <div id="child-selector" className="mb-8 flex flex-wrap gap-4">
        {Object.values(childrenData).map((child) => (
          <div
            key={child.id}
            className={`bg-white p-4 rounded-xl flex flex-col gap-3 shadow-sm cursor-pointer transition-all ${
              selectedChild === child.id
                ? "border-2 border-[#1A73E8]"
                : "border border-gray-200"
            }`}
            onClick={() => setSelectedChild(child.id)}
          >
            <div className="flex items-center gap-4">
              <img
                src={child.avatar}
                className="w-12 h-12 rounded-full object-cover"
                alt={`${child.name}'s avatar`}
              />
              <div>
                <h3 className="font-semibold">{child.name}</h3>
                <p className="text-sm text-gray-500">Age {child.age}</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewProfile(child.id);
              }}
              className="mt-2 w-full flex items-center justify-center gap-2 text-sm text-[#1A73E8] hover:bg-blue-50 py-1.5 px-3 rounded-md transition-colors"
            >
              <User className="w-4 h-4" />
              View Profile
            </button>
          </div>
        ))}
        <div
          className="bg-gray-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm cursor-pointer border-2 border-dashed border-gray-300 hover:border-[#1A73E8] hover:bg-blue-50 transition-colors min-h-[120px] w-full max-w-[200px]"
          onClick={() => navigate("/add-child")}
        >
          <Plus className="w-6 h-6 text-gray-400" />
          <span className="text-sm text-gray-500">Add Child</span>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Career Profile Summary */}
        <div id="career-profile" className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Career Profile</h3>
            <Star className="w-5 h-5 text-[#FFC107]" />
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
              <p>
                <span className="font-medium">Interests:</span>{" "}
                {currentChild.interests.join(", ")}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Trophy className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
              <p>
                <span className="font-medium">Skills:</span>{" "}
                {currentChild.skills.join(", ")}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
              <p>
                <span className="font-medium">Dream Job:</span>{" "}
                {currentChild.dreamJob}
              </p>
            </div>
          </div>
        </div>

        {/* Learning Activities */}
        <div
          id="learning-activities"
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Learning Activities</h3>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
              {currentChild.completedActivities.length} Completed
            </span>
          </div>
          <div className="space-y-4">
            {currentChild.completedActivities.map((activity, index) => (
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
            {currentChild.inProgressActivities.map((activity, index) => (
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

        {/* Mentorship Sessions */}
        <div id="mentorship" className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Upcoming Sessions</h3>
            <button className="text-[#1A73E8] hover:underline text-sm">
              Book New
            </button>
          </div>
          <div className="space-y-4">
            {currentChild.upcomingSessions.length > 0 ? (
              currentChild.upcomingSessions.map((session, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-blue-50 p-3 rounded-lg"
                >
                  <img
                    src={session.avatar}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={`${session.mentor}'s avatar`}
                  />
                  <div>
                    <p className="font-semibold">{session.mentor}</p>
                    <p className="text-sm text-gray-500">{session.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No upcoming sessions scheduled
              </p>
            )}
          </div>
        </div>

        {/* Excursions */}
        <div id="excursions" className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Scheduled Excursions</h3>
            <Map className="w-5 h-5 text-[#FFC107]" />
          </div>
          <div className="space-y-4">
            {currentChild.scheduledExcursions.length > 0 ? (
              currentChild.scheduledExcursions.map((excursion, index) => (
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
              <p className="text-gray-500 text-sm">No scheduled excursions</p>
            )}
          </div>
        </div>

        {/* Badges */}
        <div id="badges" className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Recent Badges</h3>
            <span className="text-sm text-gray-500">12 Total</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <Trophy className="w-6 h-6 text-[#FFC107] mx-auto" />
              <p className="text-xs mt-1">Problem Solver</p>
            </div>
            <div className="text-center">
              <Brain className="w-6 h-6 text-[#1A73E8] mx-auto" />
              <p className="text-xs mt-1">Critical Thinker</p>
            </div>
            <div className="text-center">
              <Rocket className="w-6 h-6 text-purple-500 mx-auto" />
              <p className="text-xs mt-1">Innovation</p>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 text-green-500 mx-auto" />
              <p className="text-xs mt-1">Team Player</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
