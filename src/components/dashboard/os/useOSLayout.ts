
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDashboardModules } from '@/components/dashboard/os/modules';
import { Module } from './types';

export const useOSLayout = (onOpenAIAssistant?: () => void, onOpenNotionAI?: () => void) => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { theme, setTheme, language } = useTheme();

  const modules = getDashboardModules(language, onOpenAIAssistant, onOpenNotionAI);

  const handleModuleClick = (module: Module) => {
    if (module.path) {
      navigate(module.path);
    } else if (module.action) {
      module.action();
    }
  };

  const openWindow = (moduleId: string) => {
    if (!openWindows.includes(moduleId)) {
      setOpenWindows(prev => [...prev, moduleId]);
    }
    setActiveWindow(moduleId);
  };

  const closeWindow = (moduleId: string) => {
    setOpenWindows(prev => prev.filter(id => id !== moduleId));
    if (activeWindow === moduleId) {
      setActiveWindow(openWindows.find(id => id !== moduleId) || null);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const currentPath = location.pathname;

  return {
    user,
    theme,
    setTheme,
    language,
    modules,
    currentPath,
    openWindows,
    activeWindow,
    handleModuleClick,
    closeWindow,
    setActiveWindow,
    handleSignOut,
  };
};
