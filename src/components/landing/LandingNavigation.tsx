
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface LandingNavigationProps {
  theme: string;
  setTheme: (theme: string) => void;
  onSignIn: () => void;
  onGetStarted: () => void;
}

const LandingNavigation = ({ theme, setTheme, onSignIn, onGetStarted }: LandingNavigationProps) => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img 
              src="/lovable-uploads/1933874e-bfc3-4397-b239-859be4a5d342.png" 
              alt="GalyarderOS Logo" 
              className="w-6 h-6 object-contain"
            />
          </motion.div>
          <span className="text-xl font-bold font-playfair text-foreground">GalyarderOS</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </Button>
          <Button variant="outline" onClick={onSignIn}>
            Sign In
          </Button>
          <Button onClick={onGetStarted} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default LandingNavigation;
