import React from "react";
import {
  ChevronRight,
  Plus,
  Pen,
  Atom,
  Lightbulb,
  Brain,
  Users,
  Palette,
  Star,
  Check,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const LearningGoals = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div
          id="breadcrumb"
          className="flex items-center space-x-2 mb-8 text-sm"
        >
          <Link to="/" className="text-[#1A73E8] cursor-pointer">
            Dashboard
          </Link>
          <ChevronRight className="text-gray-400 w-4 h-4" />
          <span className="text-gray-600">Learning Goals</span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column */}
          <div className="col-span-1 md:col-span-2 space-y-4 sm:space-y-6">
            {/* Current Programs */}
            <div
              id="current-programs"
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                <h2 className="text-xl font-bold">Active Learning Programs</h2>
                <button className="bg-[#1A73E8] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-1 inline" />
                  New Program
                </button>
              </div>

              <div className="space-y-4">
                <div
                  id="steam-program"
                  className="border border-gray-100 rounded-xl p-3 sm:p-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-3 sm:gap-0">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                        <Atom className="text-[#1A73E8] w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">STEAM Week</h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Grades 6-8
                        </p>
                      </div>
                    </div>
                    <button className="text-[#1A73E8] hover:bg-blue-50 p-1.5 sm:p-2 rounded-full">
                      <Pen className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                    <div className="bg-gray-50 p-2 sm:p-3 rounded-xl">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Focus Areas
                      </span>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
                        <span className="bg-blue-100 text-[#1A73E8] text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          Science
                        </span>
                        <span className="bg-blue-100 text-[#1A73E8] text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          Technology
                        </span>
                        <span className="bg-blue-100 text-[#1A73E8] text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          Engineering
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-2 sm:p-3 rounded-xl">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Learning Goals
                      </span>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
                        <span className="bg-green-100 text-green-600 text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          Problem Solving
                        </span>
                        <span className="bg-green-100 text-green-600 text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          Critical Thinking
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="entrepreneurship-program"
                  className="border border-gray-100 rounded-xl p-3 sm:p-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-3 sm:gap-0">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
                        <Lightbulb className="text-purple-600 w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Entrepreneurship Focus
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Grades 9-10
                        </p>
                      </div>
                    </div>
                    <button className="text-[#1A73E8] hover:bg-blue-50 p-1.5 sm:p-2 rounded-full">
                      <Pen className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                    <div className="bg-gray-50 p-2 sm:p-3 rounded-xl">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Focus Areas
                      </span>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
                        <span className="bg-purple-100 text-purple-600 text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          Business Planning
                        </span>
                        <span className="bg-purple-100 text-purple-600 text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          Innovation
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-2 sm:p-3 rounded-xl">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Learning Goals
                      </span>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
                        <span className="bg-orange-100 text-orange-600 text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          Leadership
                        </span>
                        <span className="bg-orange-100 text-orange-600 text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          Financial Literacy
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Goal Templates */}
            <div
              id="goal-templates"
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold mb-4 sm:mb-6">
                Learning Goal Templates
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="border border-gray-100 rounded-xl p-3 sm:p-4 hover:border-[#1A73E8] cursor-pointer transition-colors">
                  <div className="bg-orange-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                    <Brain className="text-orange-600 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-semibold mb-1 sm:mb-2">
                    Cognitive Skills
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Focus on analytical and critical thinking development
                  </p>
                </div>

                <div className="border border-gray-100 rounded-xl p-3 sm:p-4 hover:border-[#1A73E8] cursor-pointer transition-colors">
                  <div className="bg-green-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                    <Users className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-semibold mb-1 sm:mb-2">Social Skills</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Enhance communication and collaboration abilities
                  </p>
                </div>

                <div className="border border-gray-100 rounded-xl p-3 sm:p-4 hover:border-[#1A73E8] cursor-pointer transition-colors">
                  <div className="bg-purple-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                    <Palette className="text-purple-600 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-semibold mb-1 sm:mb-2">
                    Creative Skills
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Develop imagination and innovative thinking
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Stats */}
            <div
              id="learning-stats"
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold mb-4 sm:mb-6">
                Learning Insights
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-[#1A73E8] w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm">◉</span>
                    </div>
                    <span className="text-xs sm:text-sm">Active Goals</span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold">24</span>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-green-600 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                      <Check className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm">Completed Goals</span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold">18</span>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-[#FFC107] w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                      <Clock className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm">In Progress</span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold">6</span>
                </div>
              </div>
            </div>

            {/* Recent Updates */}
            <div
              id="goal-updates"
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold mb-4 sm:mb-6">
                Recent Goal Updates
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full">
                    <Star className="text-[#1A73E8] w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold">
                      New STEAM goals added
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="bg-green-100 p-1.5 sm:p-2 rounded-full">
                    <Check className="text-green-600 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold">
                      Leadership goal achieved
                    </p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="bg-purple-100 p-1.5 sm:p-2 rounded-full">
                    <Pen className="text-purple-600 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold">
                      Modified Grade 7 objectives
                    </p>
                    <p className="text-xs text-gray-500">2 days ago</p>
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

export default LearningGoals;
