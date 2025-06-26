
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/global/ui/button';
import { Menu, X } from 'lucide-react';

interface MobileHeaderProps {
  logo: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
  menuItems?: Array<{
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }>;
}

export const MobileHeader = ({ logo, title, actions, menuItems }: MobileHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            {logo}
            <span className="text-xl font-bold font-playfair text-foreground">{title}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {actions}
            {menuItems && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && menuItems && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background border-b border-border md:hidden"
          >
            <div className="p-4 space-y-2">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start font-playfair"
                  onClick={() => {
                    item.onClick();
                    setIsMenuOpen(false);
                  }}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
