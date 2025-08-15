import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Microscope,
  Rocket,
  Palette,
  Cpu,
  ArrowRight,
  CalendarDays,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
} from "lucide-react";
import { PageMetadata } from "../components/PageMetadata";

const ScheduledExcursions = () => {
  // Mock data for upcoming excursions
  const upcomingExcursions = [
    {
      id: 1,
      title: "Tech Museum Visit",
      date: "June 15, 2025",
      time: "9:00 AM - 2:00 PM",
      location: "Science Center, Downtown",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/c890fee62c-ea13ba48cf888a216917.png",
      status: "Upcoming",
      statusColor: "bg-green-500",
      category: "STEM",
      categoryColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Robotics Workshop",
      date: "June 22, 2025",
      time: "1:00 PM - 4:00 PM",
      location: "Tech Hub Labs",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/d1bd03ea15-524f612798693dbe5e14.png",
      status: "Next Week",
      statusColor: "bg-orange-500",
      category: "Technology",
      categoryColor: "bg-purple-100 text-purple-600",
    },
    {
      id: 3,
      title: "Creative Arts Studio",
      date: "July 5, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Community Art Center",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/b5652ae71d-7f27b6f8f484d9742480.png",
      status: "Next Month",
      statusColor: "bg-blue-500",
      category: "Arts",
      categoryColor: "bg-pink-100 text-pink-600",
    },
  ];

  // Mock data for past excursions
  const pastExcursions = [
    {
      id: 1,
      title: "Bio Lab Experience",
      date: "May 20, 2025",
      icon: Microscope,
      iconColor: "text-[#1A73E8]",
    },
    {
      id: 2,
      title: "Space Center Tour",
      date: "April 15, 2025",
      icon: Rocket,
      iconColor: "text-[#1A73E8]",
    },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-[800px] p-6">
      <PageMetadata
        title="Scheduled Excursions | SkillSeed"
        description="View and manage your child's scheduled educational excursions"
      />
      <div className="bg-[#1A73E8] text-white text-3xl font-extrabold text-center py-6 rounded-2xl shadow-lg tracking-wider animate-bounce my-10">
        🚧 COMING SOON 🚧
      </div>
      {/* Child Selector */}
      {/* <div id="child-selector" className="mb-8">
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
      </div> */}

      {/* Header */}
      <div
        id="excursions-header"
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6"
      >
        <h2 className="text-2xl font-semibold">Scheduled Excursions</h2>
        <button
          className="bg-[#1A73E8] text-white px-6 py-2 rounded-full hover:bg-blue-600 flex items-center gap-2 w-full md:w-auto justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled
        >
          <Plus className="w-4 h-4" />
          Book New Excursion
        </button>
      </div>

      {/* Upcoming Excursions Grid */}
      <div
        id="excursions-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {upcomingExcursions.map((excursion) => (
          <div
            key={excursion.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col"
          >
            <div className="h-[200px] relative">
              <img
                className="w-full h-full object-cover"
                src={excursion.image}
                alt={`${excursion.title} excursion`}
              />
              <div
                className={`absolute top-4 right-4 ${excursion.statusColor} text-white px-3 py-1 rounded-full text-sm`}
              >
                {excursion.status}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-semibold text-lg mb-2">{excursion.title}</h3>
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-4 h-4 text-[#1A73E8] flex-shrink-0" />
                  <p className="text-gray-600">{excursion.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <ClockIcon className="w-4 h-4 text-[#1A73E8] flex-shrink-0" />
                  <p className="text-gray-600">{excursion.time}</p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-4 h-4 text-[#1A73E8] mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600">{excursion.location}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
                <span
                  className={`${excursion.categoryColor} px-3 py-1 rounded-full text-xs font-medium`}
                >
                  {excursion.category}
                </span>
                <button className="text-[#1A73E8] hover:underline text-sm flex items-center gap-1">
                  View Details
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Past Excursions */}
      <div id="past-excursions" className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Past Excursions</h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y">
            {pastExcursions.map((excursion) => {
              const Icon = excursion.icon;
              return (
                <div
                  key={excursion.id}
                  className="p-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-5 h-5 ${excursion.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{excursion.title}</h4>
                      <p className="text-sm text-gray-500">{excursion.date}</p>
                    </div>
                  </div>
                  <button className="text-[#1A73E8] hover:underline text-sm flex items-center gap-1">
                    View Report
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduledExcursions;
