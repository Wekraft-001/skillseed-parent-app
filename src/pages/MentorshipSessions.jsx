import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Edit,
  Trash2,
  BookOpen,
  CheckCircle,
  Clock as ClockIcon,
} from "lucide-react";
import { PageMetadata } from "../components/PageMetadata";

const MentorshipSessions = () => {
  // Mock data for mentorship sessions
  const upcomingSessions = [
    {
      id: 1,
      month: "MAY",
      day: "15",
      mentorName: "Dr. Michael Brown",
      mentorTitle: "Computer Science Professor",
      mentorAvatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      time: "3:00 PM - 4:00 PM",
      type: "virtual",
      location: "Virtual Meeting",
      isUpcoming: true,
    },
    {
      id: 2,
      month: "MAY",
      day: "22",
      mentorName: "Prof. David Chen",
      mentorTitle: "Software Engineer",
      mentorAvatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
      time: "2:00 PM - 3:00 PM",
      type: "in-person",
      location: "Tech Hub, Room 204",
      isUpcoming: true,
    },
  ];

  const availableMentors = [
    {
      id: 1,
      name: "Alex Turner",
      title: "Game Developer",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    },
    {
      id: 2,
      name: "Sarah Lee",
      title: "Data Scientist",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
    },
  ];

  const sessionStats = {
    completed: 8,
    upcoming: 2,
  };

  return (
    <div className="bg-[#F5F7FA] min-h-[800px] p-6">
      <PageMetadata
        title="Mentorship Sessions | SkillSeed"
        description="Manage and schedule mentorship sessions for your child"
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

      <div id="mentorship-dashboard" className="grid grid-cols-12 gap-6">
        {/* Calendar Section */}
        <div id="calendar-section" className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <h3 className="font-semibold text-lg">Mentorship Calendar</h3>
              <div className="flex flex-wrap gap-3">
                <button className="bg-[#1A73E8] text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Schedule Session
                </button>
                <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  May 2025
                </button>
              </div>
            </div>

            <div id="upcoming-sessions" className="space-y-4">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl ${
                    session.isUpcoming ? "bg-blue-50" : "bg-gray-50"
                  }`}
                >
                  <div
                    className={`${
                      session.isUpcoming
                        ? "bg-[#1A73E8] text-white"
                        : "bg-gray-200 text-gray-600"
                    } p-3 rounded-xl text-center min-w-[70px]`}
                  >
                    <p className="text-sm">{session.month}</p>
                    <p className="text-xl font-bold">{session.day}</p>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                      <img
                        src={session.mentorAvatar}
                        className="w-10 h-10 rounded-full flex-shrink-0"
                        alt={`${session.mentorName}'s avatar`}
                      />
                      <div className="min-w-0">
                        <p className="font-semibold truncate">
                          {session.mentorName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {session.mentorTitle}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm mt-2">
                      <span className="flex items-center gap-2">
                        <Clock
                          className={`w-4 h-4 ${
                            session.isUpcoming
                              ? "text-[#1A73E8]"
                              : "text-gray-500"
                          }`}
                        />
                        {session.time}
                      </span>
                      <span className="flex items-center gap-2">
                        {session.type === "virtual" ? (
                          <Video className="w-4 h-4 text-[#1A73E8]" />
                        ) : (
                          <MapPin className="w-4 h-4 text-gray-500" />
                        )}
                        {session.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 self-end sm:self-center">
                    <button className="p-2 rounded-full bg-white text-[#1A73E8] hover:bg-blue-50">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full bg-white text-red-500 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div
          id="mentorship-sidebar"
          className="col-span-12 lg:col-span-4 space-y-6"
        >
          {/* Available Mentors */}
          <div
            id="available-mentors"
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="font-semibold text-lg mb-4">Available Mentors</h3>
            <div className="space-y-4">
              {availableMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <img
                    src={mentor.avatar}
                    className="w-12 h-12 rounded-full flex-shrink-0"
                    alt={`${mentor.name}'s avatar`}
                  />
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{mentor.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {mentor.title}
                    </p>
                  </div>
                  <button className="bg-[#1A73E8] text-white px-3 py-1 rounded-full text-sm whitespace-nowrap ml-auto">
                    Book
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Session Stats */}
          <div id="session-stats" className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4">Session Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <p className="text-2xl font-bold text-[#1A73E8]">
                  {sessionStats.completed}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl text-center">
                <p className="text-2xl font-bold text-[#FFC107]">
                  {sessionStats.upcoming}
                </p>
                <p className="text-sm text-gray-600">Upcoming</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipSessions;
