"use client";

import React, {useState, useEffect} from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { auth, db } from '../../functions/firebase';
import { signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { onSnapshot, doc, getDoc } from 'firebase/firestore';
import AvatarUploaderModal from './AvatarUpload';



const TopBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalConfirm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAvatarOpen, setIsModalAvatarOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [adminName, setAdminName] = useState<string | null>(null);
    const router = useRouter();

    const toggleDropdown = () => {
      setIsDropdownOpen(prev => !prev);
    };

    useEffect(() => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;
  
      const userDocRef = doc(db, 'user_profile', userId);

      const fetchDataLoaded = async () => {
        try {
          const userSnap = await getDoc(userDocRef);
  
          if (userSnap.exists()) {
            const userData = userSnap.get('username');
            const userAvatar = userSnap.get('avatar');
            setAvatarUrl(userAvatar);
            setAdminName(userData);
          }
        }
        catch (error) {
          console.error("Fetching data interrupted. Reason: ", error);
        }
      }
      
      // Real-time listener for the avatar field
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setAvatarUrl(doc.data()?.avatar || null);
          setAdminName(doc.data()?.username || null);
        }
      });
      
      fetchDataLoaded();
      return () => unsubscribe(); // Clean up listener on unmount
    }, []);
  
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
        setIsConfirmModalConfirm(false);
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
      src={`${avatarUrl}`}
      alt="Avatar Icon"
      className="w-[35px] h-[35px] rounded-full object-cover border-2 border-white-400"
      onClick={toggleDropdown}
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
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-sm"
              onClick={() => setIsModalAvatarOpen(true)}
            >
              Edit Avatar
            </button>
            <AvatarUploaderModal isOpen={isModalAvatarOpen} onClose={() => setIsModalAvatarOpen(false)}/>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-md w-96">
          <div className="absolute top-[23%] left-[41.7%] bg-blue-500 text-white rounded-md p-4 text-center z-10">
                <h2 className="text-2xl font-bold text-white">Renew Password</h2>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsConfirmModalConfirm(true);
            }}>
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
      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4 text-black">Confirm Password Change</h2>
            <p className="mb-6 text-black text-center" style={{fontSize: '12px'}}>Are you sure you want to change your password?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsConfirmModalConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400" style={{fontSize: '12px'}}
              >
                Yes, Change Password
              </button>
            </div>
          </div>
        </div>
      )}
</div>
  );
};

export default TopBar;
