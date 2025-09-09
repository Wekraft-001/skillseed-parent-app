import React, { Fragment } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { IoMenu } from "react-icons/io5";
import {
  Menu,
  MenuItems,
  MenuButton,
  MenuItem,
  Transition,
} from "@headlessui/react";
import Logo from "../assets/logo.svg";

const Header = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("parentToken");
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "Emma completed her Math assignment",
      child: "Emma",
      subject: "Mathematics",
      date: "May 22, 10:30 AM",
      daysAgo: "2 hours ago",
      isNew: true,
      type: "assignment_complete",
      score: "95%",
    },
    {
      id: 2,
      title: "Weekly Progress Report Available",
      child: "Noah",
      subject: "All Subjects",
      date: "May 21, 3:45 PM",
      daysAgo: "1 day ago",
      isNew: true,
      type: "report",
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting Reminder",
      child: "Olivia",
      subject: "Science",
      date: "May 20, 11:20 AM",
      daysAgo: "2 days ago",
      isNew: false,
      type: "reminder",
    },
    {
      id: 4,
      title: "New Learning Resources Added",
      child: "Liam",
      subject: "Reading",
      date: "May 19, 2:15 PM",
      daysAgo: "3 days ago",
      isNew: false,
      type: "resources",
    },
    {
      id: 5,
      title: "Behavior Alert",
      child: "Sophia",
      subject: "Classroom",
      date: "May 18, 9:30 AM",
      daysAgo: "4 days ago",
      isNew: false,
      type: "alert",
    },
  ];
  const getNotificationIcon = (type) => {
    switch (type) {
      case "assignment_complete":
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "report":
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "reminder":
        return (
          <div className="bg-amber-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-amber-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "alert":
        return (
          <div className="bg-red-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
        );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("parentToken");
    navigate("/signin");
  };

  const fetchUserDetails = async () => {
    const { data } = await axios.get(`${apiURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // console.log(data);
    return data;
  };
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: fetchUserDetails,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const getInitials = (firstName, lastName) => {
    if (!firstName && !lastName) return "NN";
    const firstInitial = firstName ? firstName[0].toUpperCase() : "";
    const lastInitial = lastName ? lastName[0].toUpperCase() : "";
    return firstInitial + lastInitial;
  };

  return (
    <header className="h-16 border-b border-gray-200 flex items-center justify-between px-4 fixed top-0 left-0 right-0 bg-white z-50">
      <div className="flex items-center">
        <button
          className="mr-2"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <IoMenu size={30} />
        </button>

        <Link to="/home" className="flex items-center">
          <img src={Logo} className="w-16 h-16" />
          <span className="font-bold text-xl text-[#3C91BA]">
            SkillSeed Parent
          </span>
        </Link>
      </div>

      <div className="flex items-center md:space-x-3">
        {/* Notification Menu */}
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="flex rounded-full text-sm focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <div className="relative">
                {/* <div className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                  92
                </div> */}
                <Bell className="h-6 w-6 text-gray-700" />
              </div>
            </MenuButton>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-50 mt-2 w-[320px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-primaryRegular">
              <MenuItem>
                <div className="p-4 pb-2 flex justify-between items-center border-b">
                  <h3 className="text-xl font-bold">Notifications</h3>
                </div>
              </MenuItem>
              <hr />
              <MenuItem>
                <div className="flex p-2 gap-2 border-b overflow-x-auto">
                  <button className="whitespace-nowrap bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
                    All
                  </button>
                  <button className="whitespace-nowrap text-gray-500 px-4 py-1 rounded-full text-sm hover:bg-gray-100">
                    Unread
                  </button>
                  <button className="whitespace-nowrap text-gray-500 px-4 py-1 rounded-full text-sm hover:bg-gray-100">
                    Assignments
                  </button>
                  <button className="whitespace-nowrap text-gray-500 px-4 py-1 rounded-full text-sm hover:bg-gray-100">
                    Reports
                  </button>
                  <button className="whitespace-nowrap text-gray-500 px-4 py-1 rounded-full text-sm hover:bg-gray-100">
                    Alerts
                  </button>
                </div>
              </MenuItem>
              <MenuItem>
                <div className="bg-blue-50 flex items-center p-4 gap-4">
                  <div className="bg-white p-2 rounded-full">
                    <Bell className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Enable push notifications</p>
                  </div>
                  <button className="rounded-full bg-black hover:bg-gray-800">
                    Manage
                  </button>
                </div>
              </MenuItem>
              <MenuItem>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex p-4 border-l-4 border-transparent hover:bg-gray-50 border-b"
                    >
                      <div className="mr-3 flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-sm truncate">
                            {notification.title}
                          </p>
                          {notification.isNew && (
                            <span className="ml-2 flex-shrink-0 inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.child} • {notification.subject}
                          {notification.score && (
                            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                              {notification.score} Score
                            </span>
                          )}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                          <span>{notification.date}</span>
                          <span>•</span>
                          <span>{notification.daysAgo}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>

        {/* Profile Menu */}
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="flex rounded-full text-sm focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <div className="bg-[#3C91BA] w-10 h-10 text-lg font-semibold text-white text-center p-2 rounded-full mx-4 my-2 flex items-center justify-center">
                <div className="bg-[#3C91BA] w-10 h-10 text-lg font-semibold text-white text-center p-2 rounded-full mx-4 my-2 flex items-center justify-center">
                  {getInitials(userData?.firstName, userData?.lastName)}
                </div>
              </div>
            </MenuButton>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-50 mt-2 w-[300px] origin-top-right rounded-md bg-white py-1 shadow-lg focus:outline-none font-primaryRegular">
              <MenuItem>
                <div className="p-4 flex items-center gap-4 border-b">
                  <div className="h-14 w-14 rounded-full flex items-center justify-center bg-[#3C91BA]">
                    <div className="text-xl font-medium text-white">
                      {userData
                        ? getInitials(userData.firstName, userData.lastName)
                        : "NN"}
                    </div>
                  </div>
                  <div>
                    <h3 className="md:text-lg md:font-semibold">
                      {userData?.firstName + " " + userData?.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      3 children connected
                    </p>
                  </div>
                </div>
              </MenuItem>

              <MenuItem className="px-4 py-3 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3 text-base">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <Link to="/add-child">
                    <div className="font-medium">Add a Child</div>
                    <div className="text-xs text-gray-500">
                      Connect a new account
                    </div>
                  </Link>
                </div>
              </MenuItem>
              <MenuItem className="px-4 py-3 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3 text-base">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-600"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <Link to="reports">
                    <div className="font-medium">Progress Reports</div>
                    <div className="text-xs text-gray-500">
                      View all children's progress
                    </div>
                  </Link>
                </div>
              </MenuItem>

              <MenuItem className="px-4 py-3 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3 text-base">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-amber-600"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Achievements</div>
                    <div className="text-xs text-gray-500">
                      Your children's milestones
                    </div>
                  </div>
                </div>
              </MenuItem>
              <MenuItem className="px-4 py-3 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3 text-base">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-600"
                    >
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <Link to="/parental-controls">
                    <div className="font-medium">Parental Controls</div>
                    <div className="text-xs text-gray-500">
                      Manage settings & restrictions
                    </div>
                  </Link>
                </div>
              </MenuItem>
              <MenuItem className="px-4 py-3 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3 text-base">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <Link to="/parent-resources">
                    <div className="font-medium">Parent Resources</div>
                    <div className="text-xs text-gray-500">
                      Guides & support
                    </div>
                  </Link>
                </div>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-base w-full justify-center py-3 cursor-pointer"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
