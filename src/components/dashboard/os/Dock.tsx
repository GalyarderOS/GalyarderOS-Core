
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DockProps {
  modules: any[];
  currentPath: string;
  onModuleClick: (module: any) => void;
}

const Dock = ({ modules, currentPath, onModuleClick }: DockProps) => {
  // Include all Digital Soul modules and frequently used finance modules
  const dockModules = modules.filter(m => 
    [
      'dashboard', 'identity', 'vision', 'balance', 'ritual', 
      'habits', 'focus', 'knowledge', 'reflection', 'analytics', 
      'notion', 'ai-assistant', 'investments', 'wealth', 'settings'
    ].includes(m.id)
  );

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="fixed bottom-6 left-0 right-0 z-30 flex justify-center"
    >
      <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-3 shadow-2xl max-w-6xl overflow-x-auto">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            {dockModules.map((module) => {
              const Icon = module.icon;
              const isActive = module.path === currentPath;
              
              return (
                <Tooltip key={module.id}>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.2, y: -8 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onModuleClick(module)}
                        className={`w-12 h-12 rounded-xl relative ${
                          isActive 
                            ? 'bg-primary/20 text-primary' 
                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {isActive && (
                          <motion.div
                            layoutId="dock-indicator"
                            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                          />
                        )}
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-card border border-border">
                    <p>{module.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>
      </div>
    </motion.div>
  );
};

export default Dock;
