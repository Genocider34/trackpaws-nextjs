"use client";

import React, {useEffect, useState} from 'react';
import { collection, Timestamp, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../functions/firebase';
import { deleteUserByAdmin } from './userdeletion';

interface UserAccounts {
  userId: string;
  username: string;
  email: string;
  isAdmin: boolean;
  lastLogin?: Timestamp;
  status: "Active" | "Inactive";
}

const FoundPets: React.FC = () => {
  const [users, setUsers] = useState<UserAccounts[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 10;

  const handleDeleteAccount = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      await deleteUserByAdmin(userId);
    }
  };

  const fetchData = async() => {
    const unsubscribe = onSnapshot(collection(db, "user_profile"), (querySnapshot) => {
      let list: UserAccounts[] = [];
      const oneMonthAgo = Timestamp.fromMillis(Date.now() - 30 * 24 * 60 * 60 * 1000);

      querySnapshot.forEach((doc) => {
        const userData = doc.data() as UserAccounts;
        const status = userData.lastLogin && userData.lastLogin.toMillis() >= oneMonthAgo.toMillis() 
          ? "Active" 
          : "Inactive";
        list.push({ ...userData, status });
      });

      setUsers(list); // Set the updated user list to the state
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }

  const totalUsers = users.length;
  const pageData = users.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleNext = () => {
    if ((currentPage +1) * itemsPerPage < totalUsers) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

return (
<div className="p-8">
  <h2 className="text-3xl font-semibold mb-6">User Management</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">ID</th>
          <th className="py-3 px-6 text-left">Name</th>
          <th className="py-3 px-6 text-left">Email</th>
          <th className="py-3 px-6 text-left">Status</th>
          <th className="py-3 px-6 text-left">Action</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm font-light">
        {pageData.map((user: UserAccounts, index) => (
          <tr
            key={user.userId}
            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-200 hover:bg-gray-100`}
          >
            <td className="py-3 px-6 text-left whitespace-nowrap">{user.userId}</td>
            <td className="py-3 px-6 text-left">{user.username}</td>
            <td className="py-3 px-6 text-left">{user.email}</td>
            <td className="py-3 px-6 text-left">
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {user.status}
              </span>
            </td>
            <td className="py-3 px-6 text-left">
                <button onClick={() => handleDeleteAccount(user.userId)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                  Delete
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="flex justify-between mt-4">
    <button
      onClick={handlePrevious}
      className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none disabled:opacity-50"
      disabled={currentPage === 0}
    >
      Previous
    </button>
    <button
      onClick={handleNext}
      className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none disabled:opacity-50"
      disabled={(currentPage + 1) * itemsPerPage >= totalUsers}
    >
      Next
    </button>
  </div>
</div>
);
};

export default FoundPets;