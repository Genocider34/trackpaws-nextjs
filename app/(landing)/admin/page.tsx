"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from './_components/Sidebar';
import TopBar from './_components/Topbar';

const AdminDashboard: React.FC = () => {

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <TopBar/>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        <Sidebar logoTrackpaws="/images/logo.png" />
        {/* Main content can go here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
