"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from './_components/Sidebar';
import TopBar from './_components/Topbar';
import { db, auth } from '../functions/firebase';
import { doc, getDoc } from 'firebase/firestore';

const AdminDashboard: React.FC = () => {
  const [adminName, setAdminName] = useState<string>(''); // Replace with actual admin name from Firebase or your context
  const [adminAvatar, setAdminAvatar] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const userRef = doc(db, 'user_profile', currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.get('username');
            const userAvatar = userSnap.get('avatar');
            setAdminAvatar(userAvatar);
            setAdminName(userData);
          } else {
            console.error('User profile not found');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        console.warn('No authenticated user found');
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <TopBar adminName={adminName} adminAvatar={adminAvatar}/>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        <Sidebar adminName={adminName} logoTrackpaws="/images/logo.png" />
        {/* Main content can go here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
