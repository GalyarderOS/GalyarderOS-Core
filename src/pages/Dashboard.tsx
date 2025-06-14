
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHome from '@/components/dashboard/DashboardHome';
import ProfileModule from '@/components/dashboard/ProfileModule';
import VisionModule from '@/components/dashboard/VisionModule';
import HabitsModule from '@/components/dashboard/HabitsModule';
import FocusTimer from '@/components/dashboard/FocusTimer';
import MemoryVault from '@/components/dashboard/MemoryVault';
import Settings from '@/components/dashboard/Settings';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/profile" element={<ProfileModule />} />
        <Route path="/vision" element={<VisionModule />} />
        <Route path="/habits" element={<HabitsModule />} />
        <Route path="/focus" element={<FocusTimer />} />
        <Route path="/memory" element={<MemoryVault />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
