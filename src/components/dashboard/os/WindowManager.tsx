
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface WindowManagerProps {
  openWindows: string[];
  activeWindow: string | null;
  modules: any[];
  onClose: (moduleId: string) => void;
  onActivate: (moduleId: string) => void;
}

const WindowManager = ({ openWindows, activeWindow, modules, onClose, onActivate }: WindowManagerProps) => {
  return (
    <AnimatePresence>
      {openWindows.map((windowId, index) => {
        const module = modules.find(m => m.id === windowId);
        if (!module) return null;

        const Icon = module.icon;
        const isActive = activeWindow === windowId;
        const zIndex = isActive ? 50 : 40 - index;

        return (
          <motion.div
            key={windowId}
            initial={{ opacity: 0, scale: 0.8, x: -200, y: -200 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 100 + (index * 50), 
              y: 100 + (index * 50) 
            }}
            exit={{ opacity: 0, scale: 0.8, x: -200, y: -200 }}
            className="fixed"
            style={{ zIndex }}
            drag
            dragMomentum={false}
            onClick={() => onActivate(windowId)}
          >
            <Card className={`w-96 h-64 overflow-hidden shadow-2xl ${
              isActive ? 'ring-2 ring-primary' : ''
            }`}>
              {/* Window Header */}
              <div className={`flex items-center justify-between p-3 bg-card border-b border-border ${
                isActive ? 'bg-primary/5' : 'bg-muted/30'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 bg-gradient-to-br ${module.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{module.label}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                    <Minimize2 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-6 h-6 p-0 hover:bg-red-500/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose(windowId);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Window Content */}
              <div className="p-4 h-full bg-card">
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground">{module.label}</h3>
                    <p className="text-sm text-muted-foreground">Module window</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export default WindowManager;
