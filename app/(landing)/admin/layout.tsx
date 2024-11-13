"use client";

import React from 'react';
import Sidebar from './_components/Sidebar';  // Import Sidebar component
import TopBar from './_components/Topbar';    // Import TopBar component
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode; // The dynamic content that will change for each page
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <TopBar />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Sidebar Component */}
        <Sidebar logoTrackpaws="/images/logo.png" />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {children} {/* Render dynamic content here */}
        </div>
      </div>
    </div>
  );
};

export default Layout;