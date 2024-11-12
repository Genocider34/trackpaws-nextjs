"use client";

import React, {useState} from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { auth } from '../../functions/firebase';
import { signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface TopBarProps {
  adminName: string;
  adminAvatar: string | null;
}

const TopBar: React.FC<TopBarProps> = ({ adminName, adminAvatar }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const router = useRouter();

    const toggleDropdown = () => {
      setIsDropdownOpen(prev => !prev);
    };
  
    const handleLogout = async () => {
      // Implement logout logic here (e.g., using Firebase auth)
      console.log("Logging out...");

      await signOut(auth);
      router.push('/');
    };
  
    const handleChangePassword = async(e: React.FormEvent) => {
      // Implement password change logic here
      console.log("Changing password...");

      e.preventDefault();

      try {
        const user = auth.currentUser;

        if (!user) {
            console.log("No user is currently logged in.");
            return;
        }

        const credential = EmailAuthProvider.credential(user.email!, oldPassword);
        await reauthenticateWithCredential(user, credential);

        await updatePassword(user, newPassword);
        console.log("Password changed successfully!");

        await signOut(auth);
        router.push('/');

        setIsModalOpen(false);
      }
      catch (error) {
        console.error("Error changing password: ", error);
      }
    };

  return (
    <div className="w-full h-16 bg-blue-500 text-white flex items-center justify-between p-4">
  {/* Text content */}
  <div className="text-xl font-semibold ml-5">Admin Dashboard</div>
  
  {/* Hello, adminName with avatar (right-aligned) */}
  <div className="flex items-center space-x-3 mr-5"> {/* space-x-3 adds space between the avatar and the text */}
    <div className="text-lg">Hello, <b>{adminName}! </b></div>
    <img
      src={`${adminAvatar}`}
      alt="Avatar Icon"
      className="w-[35px] h-[35px] rounded-full"
    />
    {/* Menu icon for dropdown */}
    <button
          onClick={toggleDropdown}
          className="relative text-white focus:outline-none"
        >
          {/* Toggle dropdown with Chevron icon */}
          {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-[130px] w-30 bg-white text-black shadow-lg rounded-md">
            <button
              onClick={() => setIsModalOpen(true)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-sm"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-red-400 hover:text-white text-sm"
            >
              Log Out
            </button>
          </div>
        )}
    </div>
    {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-md w-96">
          <div className="absolute top-[23%] left-[41.7%] bg-blue-500 text-white rounded-md p-4 text-center z-10">
                <h2 className="text-2xl font-bold text-white">Renew Password</h2>
            </div>
            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <label htmlFor="oldPassword" className="block text-sm font-medium mt-[20px] text-black">Current Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-2 border border-black rounded-md text-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-black">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-black rounded-md text-black"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-7 mr-5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-400 text-white rounded-md"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
</div>
  );
};

export default TopBar;
