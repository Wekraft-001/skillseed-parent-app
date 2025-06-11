import React from "react";
import {
  CalendarCheck,
  UserCheck,
  Clock,
  Route,
  Plus,
  CheckCircle,
  Info,
  Download,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const MentorSessions = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div
          id="breadcrumb"
          className="flex items-center space-x-2 mb-8 text-sm"
        >
          <Link to="/home" className="text-[#1A73E8] cursor-pointer">
            Dashboard
          </Link>
          <ChevronRight className="text-gray-400 w-4 h-4" />
          <span className="text-gray-600">Mentor Sessions</span>
        </div>

        {/* Session Overview Stats */}
        <div
          id="session-stats"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CalendarCheck className="text-green-600 w-5 h-5" />
              </div>
              <span className="text-sm text-gray-500">Active Sessions</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">24</h3>
            <p className="text-green-500 text-sm mt-2">Running Now</p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <UserCheck className="text-[#1A73E8] w-5 h-5" />
              </div>
              <span className="text-sm text-gray-500">Attendance Rate</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">92%</h3>
            <p className="text-green-500 text-sm mt-2">Above Target</p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Clock className="text-purple-600 w-5 h-5" />
              </div>
              <span className="text-sm text-gray-500">Hours Completed</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">456</h3>
            <p className="text-purple-500 text-sm mt-2">This Month</p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Route className="text-orange-600 w-5 h-5" />
              </div>
              <span className="text-sm text-gray-500">Excursions</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">8</h3>
            <p className="text-orange-500 text-sm mt-2">Planned This Week</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Sessions */}
          <div className="lg:col-span-2 space-y-6">
            <div
              id="live-sessions"
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                <h2 className="text-xl font-bold">Live Sessions</h2>
                <button className="bg-[#1A73E8] text-white px-4 py-2 rounded-full text-sm flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  New Session
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-green-50 border border-green-100 rounded-xl gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                        alt="Mentor"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Robotics Workshop</h3>
                      <p className="text-sm text-gray-500">
                        Mr. Johnson • Grade 8
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-green-600 text-sm font-medium flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>{" "}
                      Live Now
                    </span>
                    <button className="bg-[#1A73E8] text-white px-4 py-2 rounded-full text-sm">
                      Join
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                        alt="Mentor"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Art & Design</h3>
                      <p className="text-sm text-gray-500">
                        Ms. Thompson • Grade 6
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-green-600 text-sm font-medium flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>{" "}
                      Live Now
                    </span>
                    <button className="bg-[#1A73E8] text-white px-4 py-2 rounded-full text-sm">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Excursion Summary */}
            <div
              id="excursion-summary"
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                <h2 className="text-xl font-bold">Recent Excursions</h2>
                <button className="text-[#1A73E8] px-4 py-2 rounded-full text-sm hover:bg-blue-50">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
                    <div>
                      <h3 className="font-semibold">Science Museum Visit</h3>
                      <p className="text-sm text-gray-500">
                        Grade 7 • 32 Students
                      </p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                      Completed
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex -space-x-2">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                        className="w-6 h-6 rounded-full border-2 border-white"
                        alt="Teacher"
                      />
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
                        className="w-6 h-6 rounded-full border-2 border-white"
                        alt="Teacher"
                      />
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg"
                        className="w-6 h-6 rounded-full border-2 border-white"
                        alt="Teacher"
                      />
                    </div>
                    <span className="text-sm text-gray-500">3 Teachers</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
                    <div>
                      <h3 className="font-semibold">Tech Company Tour</h3>
                      <p className="text-sm text-gray-500">
                        Grade 9 • 28 Students
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      Upcoming
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex -space-x-2">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                        className="w-6 h-6 rounded-full border-2 border-white"
                        alt="Teacher"
                      />
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
                        className="w-6 h-6 rounded-full border-2 border-white"
                        alt="Teacher"
                      />
                    </div>
                    <span className="text-sm text-gray-500">2 Teachers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Attendance Tracking */}
            <div
              id="attendance-tracking"
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold mb-6">Today's Attendance</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg"
                      className="w-8 h-8 rounded-full"
                      alt="Grade"
                    />
                    <span className="font-medium">Grade 6A</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-green-600">28/30</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                      className="w-8 h-8 rounded-full"
                      alt="Grade"
                    />
                    <span className="font-medium">Grade 7B</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-yellow-600">25/28</span>
                    <Info className="w-4 h-4 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Reports */}
            <div
              id="quick-reports"
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold mb-6">Quick Reports</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="font-medium">Monthly Summary</span>
                  <Download className="w-4 h-4 text-[#1A73E8]" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="font-medium">Attendance Report</span>
                  <Download className="w-4 h-4 text-[#1A73E8]" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="font-medium">Session Logs</span>
                  <Download className="w-4 h-4 text-[#1A73E8]" />
                </button>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div
              id="upcoming-sessions"
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold mb-6">Upcoming Sessions</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FFC107] rounded-xl flex flex-col items-center justify-center text-white">
                    <span className="text-sm font-bold">2:30</span>
                    <span className="text-xs">PM</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Creative Writing</h3>
                    <p className="text-sm text-gray-500">Grade 7C • Room 204</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-xl flex flex-col items-center justify-center text-white">
                    <span className="text-sm font-bold">3:45</span>
                    <span className="text-xs">PM</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Math Tutoring</h3>
                    <p className="text-sm text-gray-500">Grade 8B • Room 110</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorSessions;
