import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, Star, Code, Bot, Trophy, MessageSquare,
  Lightbulb, BookOpen, Video, Gamepad, Award, Flame,
} from "lucide-react";
import axios from "axios";
import { PageMetadata } from "../components/PageMetadata";

const ChildCareerProfile = () => {
  const { childId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("parentToken");

  useEffect(() => {
    if (!childId) return;
    const fetchChild = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${apiURL}/parent/dashboard/students/${childId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setData(res.data);
      } catch (err) {
        setError("Failed to load child profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchChild();
  }, [childId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error || "Child not found."}</p>
      </div>
    );
  }

  const { profile, careerProfile, learningActivities, learningJourney, badges } = data;

  const getInitials = (first, last) =>
    `${first?.charAt(0) ?? ""}${last?.charAt(0) ?? ""}`.toUpperCase();

  return (
    <>
      <PageMetadata
        title="Child Career Profile | SkillSeed"
        description="Career profile details and learning progress for your child"
      />
      <div className="bg-[#F5F7FA] min-h-screen pb-16">
        {/* Back Navigation */}
        <div className="p-6 flex items-center gap-3">
          <Link to="/home" className="text-[#1A73E8] flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Profile Header */}
        <div className="px-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="relative">
                {profile.image ? (
                  <img
                    src={profile.image}
                    className="w-24 h-24 rounded-full border-4 border-[#FFC107] object-cover"
                    alt={`${profile.firstName} ${profile.lastName}`}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-[#FFC107] bg-gradient-to-br from-[#1A73E8] to-[#4CAF50] flex items-center justify-center text-white text-2xl font-bold">
                    {getInitials(profile.firstName, profile.lastName)}
                  </div>
                )}
                <div className="absolute -bottom-2 right-0 bg-green-500 p-2 rounded-full">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-gray-500">Age {profile.age} • Grade {profile.grade}</p>
                <div className="flex gap-3 mt-3 flex-wrap">
                  {careerProfile.quizCompleted ? (
                    careerProfile.interests.length > 0 ? (
                      careerProfile.interests.map((interest, i) => (
                        <span key={i} className="bg-blue-100 text-[#1A73E8] px-3 py-1 rounded-full text-sm">
                          {interest}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">Quiz completed — no interests yet</span>
                    )
                  ) : (
                    <span className="text-sm text-gray-400">Career quiz not completed yet</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Profile */}
        <div className="px-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Career Profile</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
                <p>
                  <span className="font-medium">Interests:</span>{" "}
                  {careerProfile.interests.length > 0
                    ? careerProfile.interests.join(", ")
                    : <span className="text-gray-400">Not available yet</span>}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Trophy className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
                <p>
                  <span className="font-medium">Skills:</span>{" "}
                  {careerProfile.skills.length > 0
                    ? careerProfile.skills.join(", ")
                    : <span className="text-gray-400">Not available yet</span>}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
                <p>
                  <span className="font-medium">Dream Job:</span>{" "}
                  {careerProfile.dreamJob ?? <span className="text-gray-400">Not determined yet</span>}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="px-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">

            {/* Learning Journey Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Learning Journey</h2>
                <div className="flex items-center gap-2 text-[#FF4081]">
                  <Flame className="w-4 h-4" />
                  <span className="text-sm font-medium">{learningJourney.streak} day streak</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Reading */}
                <div className="bg-[#1A73E8]/5 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-[#1A73E8]/10 flex items-center justify-center">
                        <BookOpen size={18} className="text-[#1A73E8]" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Reading</p>
                        <p className="text-xs text-gray-500">{learningJourney.reading.completed}/{learningJourney.reading.target} books</p>
                      </div>
                    </div>
                    <div className="w-11 h-11 rounded-full border-4 border-[#1A73E8] flex items-center justify-center">
                      <span className="text-xs font-bold text-[#1A73E8]">{learningJourney.reading.percentage}%</span>
                    </div>
                  </div>
                </div>
                {/* Videos */}
                <div className="bg-[#4CAF50]/5 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
                        <Video size={18} className="text-[#4CAF50]" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Videos</p>
                        <p className="text-xs text-gray-500">{learningJourney.videos.watched}/{learningJourney.videos.target} watched</p>
                      </div>
                    </div>
                    <div className="w-11 h-11 rounded-full border-4 border-[#4CAF50] flex items-center justify-center">
                      <span className="text-xs font-bold text-[#4CAF50]">{learningJourney.videos.percentage}%</span>
                    </div>
                  </div>
                </div>
                {/* Problem Solving */}
                <div className="bg-[#FFC107]/5 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-[#FFC107]/10 flex items-center justify-center">
                        <Gamepad size={18} className="text-[#FFC107]" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Problem Solving</p>
                        <p className="text-xs text-gray-500">{learningJourney.problemSolving.completed}/{learningJourney.problemSolving.target} done</p>
                      </div>
                    </div>
                    <div className="w-11 h-11 rounded-full border-4 border-[#FFC107] flex items-center justify-center">
                      <span className="text-xs font-bold text-[#FFC107]">{learningJourney.problemSolving.percentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Activities Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Activity Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Completed", value: learningActivities.totalCompleted, color: "text-[#1A73E8]", bg: "bg-blue-50" },
                  { label: "Books Read", value: learningActivities.booksCompleted, color: "text-[#FF4081]", bg: "bg-pink-50" },
                  { label: "Videos Watched", value: learningActivities.videosWatched, color: "text-[#4CAF50]", bg: "bg-green-50" },
                  { label: "Games Played", value: learningActivities.gamesPlayed, color: "text-[#FFC107]", bg: "bg-yellow-50" },
                ].map((stat, i) => (
                  <div key={i} className={`${stat.bg} rounded-xl p-4 text-center`}>
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Development */}
            {careerProfile.skills.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-6">Skill Development</h2>
                <div className="space-y-4">
                  {careerProfile.skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill}</span>
                        <span className="text-sm text-[#1A73E8]">In progress</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-[#1A73E8] rounded-full w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">

            {/* Badges */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Badges</h2>
                <span className="text-sm text-gray-500">{badges.total} total</span>
              </div>
              {badges.recent.length > 0 ? (
                <div className="space-y-3">
                  {badges.recent.map((badge, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      {badge.imageUrl ? (
                        <img src={badge.imageUrl} alt={badge.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#FFC107]/20 flex items-center justify-center">
                          <Award className="w-5 h-5 text-[#FFC107]" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm">{badge.name}</p>
                        {badge.description && (
                          <p className="text-xs text-gray-500">{badge.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award size={32} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No badges earned yet</p>
                  <p className="text-xs text-gray-400 mt-1">Keep learning to earn badges!</p>
                </div>
              )}
            </div>

            {/* Subscription Info */}
            {profile.subscription && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Subscription</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className={`font-medium ${profile.subscription.isActive ? "text-green-500" : "text-red-500"}`}>
                      {profile.subscription.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-medium">
                      {profile.subscription.amount} {profile.subscription.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expires</span>
                    <span className="font-medium">
                      {new Date(profile.subscription.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Career Interests */}
            {careerProfile.interests.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Career Interests</h2>
                <div className="space-y-3">
                  {careerProfile.interests.map((interest, i) => (
                    <div key={i} className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                      <Code className="w-5 h-5 text-[#1A73E8]" />
                      <span>{interest}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="hidden fixed bottom-6 right-6 bg-[#1A73E8] text-white p-4 rounded-full shadow-lg hover:bg-blue-600">
        <MessageSquare className="w-5 h-5" />
      </button>
    </>
  );
};

export default ChildCareerProfile;