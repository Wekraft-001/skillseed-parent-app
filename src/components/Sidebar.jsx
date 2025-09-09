import React, { useState, useEffect } from "react";
import {
  BarChart3,
  HelpCircle,
  MoreHorizontal,
  Users,
  LayoutDashboard,
  BookOpen,
  Users2,
  Bus,
  MessageSquare,
  TrendingUp,
  Shield,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { useSidebar } from "../context/SidebarContext";
import { GrMoney, GrResources } from "react-icons/gr";

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeToggle, setActiveToggle] = useState("add-ons"); // Default to Add-Ons selected
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const location = useLocation();

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (
        !target.closest(".sidebar-submenu") &&
        !target.closest(".sidebar-icon")
      ) {
        setShowSubmenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check if the current path is within a dropdown section
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.startsWith("/support")) {
      setActiveDropdown("/support");
    } else if (currentPath.startsWith("/more")) {
      setActiveDropdown("/more");
    }
  }, [location]);

  const toggleDropdown = (path, e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    setActiveDropdown(activeDropdown === path ? null : path);
  };

  const isDropdownActive = (path) => activeDropdown === path;

  const toggleSubmenu = (e, path) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    setSubmenuPosition({
      top: rect.top,
      left: rect.right + 10, // Position to the right of the icon
    });

    if (showSubmenu && activeDropdown === path) {
      setShowSubmenu(false);
      setActiveDropdown(null);
    } else {
      setShowSubmenu(true);
      setActiveDropdown(path);
    }
  };

  const navItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5 mr-2" />,
      label: "Dashboard",
      path: "/home",
    },
    {
      icon: <Users className="w-5 h-5 mr-2" />,
      label: "Add Child",
      path: "/add-child",
    },
    {
      icon: <BookOpen className="w-5 h-5 mr-2" />,
      label: "Learning Activities",
      path: "/learning-activities",
    },
    {
      icon: <MessageSquare className="w-5 h-5 mr-2" />,
      label: "Reflections",
      path: "/reflections",
    },
    {
      icon: <TrendingUp className="w-5 h-5 mr-2" />,
      label: "Reports",
      path: "/reports",
    },
    {
      icon: <Users2 className="w-5 h-5 mr-2" />,
      label: "Mentorship",
      path: "/mentorship-sessions",
    },
    {
      icon: <Bus className="w-5 h-5 mr-2" />,
      label: "Excursions",
      path: "/scheduled-excursions",
    },
    {
      icon: <Shield className="w-5 h-5 mr-2" />,
      label: "Parental Controls",
      path: "/parental-controls",
    },
    {
      icon: <GrResources className="w-5 h-5 mr-2" />,
      label: "Parental Resources",
      path: "/parent-resources",
    },
    {
      icon: <GrMoney className="w-5 h-5 mr-2" />,
      label: "Manage Subscription",
      path: "/subscription-management",
    },
  ];

  const renderSubMenu = (path, item) => {
    return null;
  };

  // Define the renderSubmenuPopup function
  const renderSubmenuPopup = () => {
    return null;
  };

  const handleToggleValueChange = (value) => {
    if (value) setActiveToggle(value);
  };

  // Desktop sidebar - full width
  const desktopSidebarClasses = cn(
    "w-[259px] bg-white border-r border-gray-200 h-[calc(100vh-4rem)] fixed top-16 left-0 z-40 hidden md:block transition-transform duration-300",
    !isOpen && "transform -translate-x-full"
  );

  // Mobile sidebar with only icons
  const mobileSidebarClasses = cn(
    "w-[60px] bg-gray-100 border-r border-gray-200 h-screen fixed top-0 left-0 z-40 flex flex-col items-center py-6 md:hidden transition-transform duration-300",
    !isOpen && "transform -translate-x-full"
  );

  return (
    <>
      {/* Desktop sidebar - full width */}
      <div className={desktopSidebarClasses}>
        <ScrollArea className="flex-1 h-[calc(100vh-16rem)]">
          <div className="p-4 space-y-1">
            {navItems.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "relative w-full",
                  isDropdownActive(item.path) && "mb-0"
                )}
              >
                {item.hasDropdown ? (
                  <div
                    className={cn(
                      "flex items-center px-3 py-3 text-base font-medium cursor-pointer w-full",
                      isDropdownActive(item.path)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={(e) => toggleDropdown(item.path, e)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-3 py-3 text-base font-medium w-full",
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      )
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                )}
                {isDropdownActive(item.path) && (
                  <div
                    className="absolute left-0 w-1 top-0 h-full bg-blue-500"
                    aria-hidden="true"
                  ></div>
                )}
                {renderSubMenu(item.path, item)}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Learning Resources Section */}
        {/* <div className="border-t border-gray-200 absolute bottom-0 left-0 right-0 bg-white">
          <div className="p-4">
            <div className="font-medium text-gray-700 mb-4">
              Learning Resources
            </div>
            <div className="space-y-1">
              <NavLink
                to="/learning-tools"
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )
                }
              >
                <BookOpen className="w-5 h-5 mr-2 text-gray-500" />
                Learning Tools
              </NavLink>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )
                }
              >
                <Users2 className="w-5 h-5 mr-2 text-gray-500" />
                Community Resources
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )
                }
              >
                <UserPlus className="w-5 h-5 mr-2 text-gray-500" />
                Parent Sign Up
              </NavLink>
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )
                }
              >
                <HelpCircle className="w-5 h-5 mr-2 text-gray-500" />
                Help & Support
              </NavLink>
            </div>
          </div>
        </div> */}
      </div>

      {/* Mobile sidebar with only icons */}
      <div className={mobileSidebarClasses}>
        {navItems.map((item, index) => (
          <div key={index} className="mb-6">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center text-base font-medium w-full",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                )
              }
            >
              <button
                className={cn(
                  "sidebar-icon flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm",
                  isDropdownActive(item.path) && "text-blue-600"
                )}
                onClick={(e) =>
                  item.hasDropdown ? toggleSubmenu(e, item.path) : null
                }
              >
                {React.isValidElement(item.icon)
                  ? React.cloneElement(item.icon, { className: "w-5 h-5" })
                  : item.icon}
              </button>
            </NavLink>
          </div>
        ))}
      </div>

      {/* Popup menu */}
      {renderSubmenuPopup()}
    </>
  );
};

export default Sidebar;
