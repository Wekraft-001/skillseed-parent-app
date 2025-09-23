import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
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
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("parentToken");
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState(null);

  const handleViewProfile = (childId) => {
    navigate(`/child-career-profile/${childId}`);
  };

  const fetchUserDetails = async () => {
    const { data } = await axios.get(`${apiURL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return data;
  };

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ["userDetails-home"],
    queryFn: fetchUserDetails,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const fetchMyChildren = async () => {
    const { data } = await axios.get(`${apiURL}/parent/dashboard/students`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log(data, "children info");
    return data;
  };

  const {
    data: children = [],
    isLoading: childrenLoading,
    isError: childrenError,
  } = useQuery({
    queryKey: ["my-children-home"],
    queryFn: fetchMyChildren,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  // Set first child as selected when children data is loaded
  React.useEffect(() => {
    if (children.length > 0 && !selectedChild) {
      setSelectedChild(children[0].id || children[0]._id);
    }
  }, [children, selectedChild]);

  const currentChild = selectedChild
    ? children.find((child) => (child.id || child._id) === selectedChild)
    : null;

  // Loading state
  if (userLoading || childrenLoading) {
    return (
      <div className="bg-[#F5F7FA] min-h-[800px] p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1A73E8] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (userError || childrenError) {
    return (
      <div className="bg-[#F5F7FA] min-h-[800px] p-6 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-sm max-w-md">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">
            We couldn't load your dashboard. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#1A73E8] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // No children state
  if (children.length === 0) {
    return (
      <div className="bg-[#F5F7FA] min-h-[800px] p-6">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Welcome, {userData?.firstName || "Parent"}
          </h1>
          <p className="text-gray-600">
            Get started by adding your first child to track their learning
            journey.
          </p>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-sm">
          <div className="text-center max-w-md">
            <UserPlus className="w-10 h-10 md:w-20 md:h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="md:text-xl font-semibold text-gray-900 mb-2">
              No Children Added Yet
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-6 px-4">
              Start your child's learning journey by adding them to your
              account. You'll be able to track their progress, schedule
              mentorship sessions, and much more.
            </p>
            <button
              onClick={() => navigate("/add-child")}
              className="bg-[#3C91BA] text-white px-6 py-3 rounded-lg hover:bg-[#3C91BA] transition-colors flex items-center gap-2 mx-auto font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add Your First Child
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F7FA] min-h-[800px] p-6">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          Welcome, {userData?.firstName || "Parent"}
        </h1>
        <p className="text-gray-600">
          Track your child's learning journey and stay updated on their
          progress.
        </p>
      </div>

      {/* Child Selector */}
      <div id="child-selector" className="mb-8 flex flex-col md:flex-row gap-4">
        {children.map((child) => {
          const childId = child.id || child._id;
          return (
            <div
              key={childId}
              className={`bg-white p-4 rounded-xl flex flex-col gap-3 shadow-sm cursor-pointer transition-all ${
                selectedChild === childId
                  ? "border-2 border-[#1A73E8]"
                  : "border border-gray-200"
              }`}
              onClick={() => setSelectedChild(childId)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    child?.image ||
                    child.profilePicture ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      child.name || child.firstName + " " + child.lastName
                    )}&background=1A73E8&color=fff`
                  }
                  className="w-12 h-12 rounded-full object-cover"
                  alt={`${child.name || child.firstName}'s avatar`}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      child.name || child.firstName + " " + child.lastName
                    )}&background=1A73E8&color=fff`;
                  }}
                />
                <div>
                  <h3 className="font-semibold">
                    {child.name || `${child.firstName} ${child.lastName}`}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {child.age
                      ? `Age ${child.age}`
                      : child.dateOfBirth
                      ? `Born ${new Date(child.dateOfBirth).getFullYear()}`
                      : ""}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewProfile(childId);
                }}
                className="mt-2 w-full flex items-center justify-center gap-2 text-sm text-[#1A73E8] hover:bg-blue-50 py-1.5 px-3 rounded-md transition-colors"
              >
                <User className="w-4 h-4" />
                View Profile
              </button>
            </div>
          );
        })}
        <div
          className="bg-gray-50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm cursor-pointer border-2 border-dashed border-gray-300 hover:border-[#1A73E8] hover:bg-blue-50 transition-colors min-h-[120px] w-full md:max-w-[200px]"
          onClick={() => navigate("/add-child")}
        >
          <Plus className="w-6 h-6 text-gray-400" />
          <span className="text-sm text-gray-500">Add Child</span>
        </div>
      </div>

      {currentChild && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Career Profile Summary */}
          <div
            id="career-profile"
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Career Profile</h3>
              <Star className="w-5 h-5 text-[#FFC107]" />
            </div>
            <div className="space-y-4">
              {currentChild.interests && currentChild.interests.length > 0 ? (
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Interests:</span>{" "}
                    {Array.isArray(currentChild.interests)
                      ? currentChild.interests.join(", ")
                      : currentChild.interests}
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-500">
                    <span className="font-medium">Interests:</span> Not
                    specified yet
                  </p>
                </div>
              )}

              {currentChild.skills && currentChild.skills.length > 0 ? (
                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Skills:</span>{" "}
                    {Array.isArray(currentChild.skills)
                      ? currentChild.skills.join(", ")
                      : currentChild.skills}
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-500">
                    <span className="font-medium">Skills:</span> Not identified
                    yet
                  </p>
                </div>
              )}

              {currentChild.dreamJob || currentChild.careerGoal ? (
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Dream Job:</span>{" "}
                    {currentChild.dreamJob || currentChild.careerGoal}
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-500">
                    <span className="font-medium">Dream Job:</span> Not set yet
                  </p>
                </div>
              )}
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
                {currentChild.completedActivities?.length || 0} Completed
              </span>
            </div>
            <div className="space-y-4">
              {currentChild.completedActivities &&
              currentChild.completedActivities.length > 0
                ? currentChild.completedActivities.map((activity, index) => (
                    <div
                      key={`completed-${index}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Code className="w-5 h-5 text-[#1A73E8]" />
                        <p>{activity.name || activity.title || activity}</p>
                      </div>
                      <span className="text-green-500">✓</span>
                    </div>
                  ))
                : null}

              {currentChild.inProgressActivities &&
              currentChild.inProgressActivities.length > 0
                ? currentChild.inProgressActivities.map((activity, index) => (
                    <div
                      key={`inprogress-${index}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Bot className="w-5 h-5 text-[#1A73E8]" />
                        <p>{activity.name || activity.title || activity}</p>
                      </div>
                      <span className="text-blue-500 text-sm font-medium">
                        In Progress
                      </span>
                    </div>
                  ))
                : null}

              {(!currentChild.completedActivities ||
                currentChild.completedActivities.length === 0) &&
                (!currentChild.inProgressActivities ||
                  currentChild.inProgressActivities.length === 0) && (
                  <div className="text-center py-4">
                    <Code className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">
                      No activities started yet
                    </p>
                    <button className="text-[#1A73E8] hover:underline text-sm mt-2">
                      Browse Activities
                    </button>
                  </div>
                )}
            </div>
          </div>

          {/* Mentorship Sessions */}
          <div id="mentorship" className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Recommended Mentors</h3>
              <button className="text-[#1A73E8] hover:underline text-sm">
                Book New
              </button>
            </div>
            <div className="space-y-4">
              {currentChild.upcomingSessions &&
              currentChild.upcomingSessions.length > 0 ? (
                currentChild.upcomingSessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-blue-50 p-3 rounded-lg"
                  >
                    <img
                      src={
                        session.mentor?.avatar ||
                        session.mentor?.profilePicture ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          session.mentor?.name || "Mentor"
                        )}&background=34D399&color=fff`
                      }
                      className="w-10 h-10 rounded-full object-cover"
                      alt={`${session.mentor?.name || "Mentor"}'s avatar`}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          session.mentor?.name || "Mentor"
                        )}&background=34D399&color=fff`;
                      }}
                    />
                    <div>
                      <p className="font-semibold">
                        {session.mentor?.name || "Mentor"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {session.scheduledTime
                          ? new Date(session.scheduledTime).toLocaleString()
                          : session.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm mb-2">
                    No upcoming sessions scheduled
                  </p>
                  <button className="text-[#1A73E8] hover:underline text-sm">
                    Schedule a Session
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Badges */}
          <div id="badges" className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Recent Badges</h3>
              <span className="text-sm text-gray-500">
                {currentChild.badges?.length || 0} Total
              </span>
            </div>
            <div className="space-y-4">
              {currentChild.badges && currentChild.badges.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                  {currentChild.badges.slice(0, 4).map((badge, index) => (
                    <div key={index} className="text-center">
                      <div className="w-6 h-6 mx-auto mb-1">
                        {badge.type === "problem-solver" && (
                          <Trophy className="w-6 h-6 text-[#FFC107]" />
                        )}
                        {badge.type === "critical-thinker" && (
                          <Brain className="w-6 h-6 text-[#1A73E8]" />
                        )}
                        {badge.type === "innovation" && (
                          <Rocket className="w-6 h-6 text-purple-500" />
                        )}
                        {badge.type === "team-player" && (
                          <Users className="w-6 h-6 text-green-500" />
                        )}
                        {![
                          "problem-solver",
                          "critical-thinker",
                          "innovation",
                          "team-player",
                        ].includes(badge.type) && (
                          <Star className="w-6 h-6 text-[#FFC107]" />
                        )}
                      </div>
                      <p className="text-xs">
                        {badge.name || badge.title || badge.type}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Trophy className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No badges earned yet</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Complete activities to earn badges!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
