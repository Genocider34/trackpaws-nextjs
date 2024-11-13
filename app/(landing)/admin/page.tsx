"use client";

import React, { useEffect, useState } from 'react';
import UserStats from './_components/UsersComponents'; // Import UserStats component

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex-1 p-6">
    <UserStats />
   </div>
  );
};

export default AdminDashboard;
