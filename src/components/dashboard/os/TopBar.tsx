
import { motion } from 'framer-motion';
import { Search, Wifi, Battery, Volume2, Moon, Sun, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopBarProps {
  user: any;
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  onSearch: () => void;
  onSignOut: () => void;
}

const TopBar = ({ user, theme, setTheme, language, onSearch, onSignOut }: TopBarProps) => {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-md border-b border-border z-40"
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo and App Name */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
            <img 
              src="/lovable-uploads/1933874e-bfc3-4397-b239-859be4a5d342.png" 
              alt="GalyarderOS Logo" 
              className="w-6 h-6 object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground font-playfair">GalyarderOS</h1>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <Button
            variant="ghost"
            onClick={onSearch}
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <Search className="h-4 w-4 mr-2" />
            Search modules...
          </Button>
        </div>

        {/* Right Section - Status and Controls */}
        <div className="flex items-center space-x-4">
          {/* System Status */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
            <Wifi className="h-4 w-4" />
            <Volume2 className="h-4 w-4" />
            <Battery className="h-4 w-4" />
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* User Menu */}
          {user && (
            <div className="flex items-center space-x-2">
              <div className="hidden md:block text-sm">
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
              <Button variant="ghost" size="sm">
                <UserIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Time and Date */}
          <div className="text-sm text-foreground font-medium">
            <div>{getCurrentTime()}</div>
            <div className="text-xs text-muted-foreground">{getCurrentDate()}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopBar;
