"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserAlt, FaClipboardList, FaRegHeart, FaChevronUp, FaChevronDown, FaTachometerAlt } from "react-icons/fa";

interface SidebarProps {
  logoTrackpaws: string;
}

const Sidebar: React.FC<SidebarProps> = ({ logoTrackpaws }) => {
  const [isMissingPetsDropdownOpen, setIsMissingPetsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleMissingPetsDropdown = () => {
    setIsMissingPetsDropdownOpen((prev) => !prev);
  };

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <div className="flex">
  {/* Sidebar */}
  <div className="w-64 h-full bg-gray-300 text-gray-800 flex flex-col p-4 rounded-r-lg">
    <div className="flex items-center space-1 mb-6 text-center">
      <div className="text-2xl font-bold">Trackpaws</div>
      <img
        src={`${logoTrackpaws}`}
        alt="Avatar Icon"
        className="w-[75px] h-[75px] rounded-full"
      />
    </div>

    {/* Sidebar links */}
    <div className="flex flex-col space-y-4">
      {/* Manage Accounts button with dropdown */}
      <button
        className="flex items-center space-x-2 hover:bg-gray-400 p-2 rounded"
        onClick={() => handleNavigation("/admin")}
      >
        <FaTachometerAlt />
        <span>Dashboard</span>
      </button>

      <div className={`flex flex-col mb-0`}>
        <button
          className="flex items-center space-x-2 hover:bg-gray-400 p-2 rounded w-full"
          onClick={() => handleNavigation("/admin/user_accounts")}
        >
          <FaUserAlt />
          <span>Manage Accounts</span>
        </button>
      </div>

      {/* Other sidebar buttons */}
      <button
        className="flex items-center space-x-2 hover:bg-gray-400 p-2 rounded"
        onClick={() => handleNavigation("/request-of-ownership")}
      >
        <FaClipboardList />
        <span>Request of Ownership</span>
      </button>

      {/* View Missing Pets button with dropdown */}
      <div className={`flex flex-col ${isMissingPetsDropdownOpen ? 'mb-0' : ''}`}>
        <button
          className="flex items-center space-x-2 hover:bg-gray-400 p-2 rounded w-full"
          onClick={toggleMissingPetsDropdown}
        >
          <FaRegHeart />
          <span>View Missing Pets</span>
          {isMissingPetsDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {/* View Missing Pets Dropdown menu */}
        {isMissingPetsDropdownOpen && (
          <div className="bg-gray-200 rounded-md mt-2 p-2">
            <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-300 text-sm"
            onClick={() => handleNavigation("/admin/lost_pets")}>
              Lost Pets
            </a>
            <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-300 text-sm"
            onClick={() => handleNavigation("/admin/found_pets")}>
              Found Pets
            </a>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Main content area */}
  <div className="flex-1">
    {/* Add main content here */}
  </div>
</div>
  );
};

export default Sidebar;
