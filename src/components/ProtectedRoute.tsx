import { useAuth } from '@/contexts/auth/useAuth';
import { Navigate } from 'react-router-dom';
import DashboardLoader from './dashboard/home/DashboardLoader';
import React from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <DashboardLoader />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
