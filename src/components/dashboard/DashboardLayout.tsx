
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  LogOut, 
  Menu, 
  X, 
  BarChart3, 
  User, 
  Target, 
  Calendar, 
  Clock, 
  BookOpen, 
  Settings,
  MessageCircle
} from 'lucide-react';
import AIAssistant from './AIAssistant';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <BarChart3 className="h-5 w-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <User className="h-5 w-5" />, label: 'Profile & Ethos', path: '/dashboard/profile' },
    { icon: <Target className="h-5 w-5" />, label: 'Vision & Roadmap', path: '/dashboard/vision' },
    { icon: <Calendar className="h-5 w-5" />, label: 'Daily Rituals', path: '/dashboard/habits' },
    { icon: <Clock className="h-5 w-5" />, label: 'Focus Timer', path: '/dashboard/focus' },
    { icon: <BookOpen className="h-5 w-5" />, label: 'Memory Vault', path: '/dashboard/memory' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FCFCF9] flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-gray-200 flex flex-col shadow-lg"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-[#1a1a1a]" />
            </div>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-bold text-[#1a1a1a]"
                style={{ fontFamily: 'Playfair Display' }}
              >
                GalyarderOS
              </motion.span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={location.pathname === item.path ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                location.pathname === item.path 
                  ? 'bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1a1a1a]' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="ml-3"
                >
                  {item.label}
                </motion.span>
              )}
            </Button>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <p className="text-sm font-medium text-[#1a1a1a]">
                {user?.user_metadata?.full_name || user?.email}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </motion.div>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start h-10 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span className="ml-3">Sign Out</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="hidden lg:block">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <Button
            onClick={() => setShowAIAssistant(true)}
            className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1a1a1a]"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistant 
        isOpen={showAIAssistant} 
        onClose={() => setShowAIAssistant(false)} 
      />
    </div>
  );
};

export default DashboardLayout;
