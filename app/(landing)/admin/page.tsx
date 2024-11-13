"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from './_components/Sidebar';
import TopBar from './_components/Topbar';
import UserStats from './_components/UsersComponents'; // Import UserStats component

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <TopBar />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Sidebar Component */}
        <Sidebar logoTrackpaws="/images/logo.png" />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <UserStats />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
