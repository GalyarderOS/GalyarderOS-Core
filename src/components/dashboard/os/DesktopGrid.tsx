
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRealTimeData } from '@/hooks/useRealTimeData';

interface DesktopGridProps {
  modules: any[];
  onModuleClick: (module: any) => void;
  onModuleOpen: (moduleId: string) => void;
}

const DesktopGrid = ({ modules, onModuleClick, onModuleOpen }: DesktopGridProps) => {
  const { data: realTimeData, isConnected } = useRealTimeData();

  const groupedModules = {
    personal: modules.filter(m => m.category === 'personal'),
    finance: modules.filter(m => m.category === 'finance'),
    ai: modules.filter(m => m.category === 'ai'),
    system: modules.filter(m => m.category === 'system')
  };

  const categoryLabels = {
    personal: 'Personal Development',
    finance: 'Financial Management', 
    ai: 'AI Tools',
    system: 'System'
  };

  const ModuleCard = ({ module, index }: { module: any; index: number }) => {
    const Icon = module.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="group cursor-pointer"
        onClick={() => onModuleClick(module)}
        onDoubleClick={() => onModuleOpen(module.id)}
      >
        <Card className="relative overflow-hidden border-2 border-border group-hover:border-primary/50 transition-all duration-300 bg-card/60 group-hover:bg-card/80 backdrop-blur-md h-40">
          {/* Static background - only opacity change on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

          <CardContent className="p-6 h-full flex flex-col justify-between relative z-10">
            <div>
              <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <Icon className="h-6 w-6 text-white drop-shadow-lg" />
              </div>
              <h3 className="text-lg font-bold font-playfair text-foreground group-hover:text-primary transition-colors duration-300">
                {module.label}
              </h3>
            </div>
            
            {/* Live indicator for real-time modules - completely static */}
            {isConnected && ['habits', 'focus', 'investments'].includes(module.id) && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-green-600 font-medium">Live</span>
              </div>
            )}
          </CardContent>

          {/* Simple glow effect - only on hover */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${module.color} opacity-20 blur-xl`} />
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-12"
      >
        <h1 className="text-5xl font-bold font-playfair bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          Welcome to GalyarderOS
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your personal operating system for life management and productivity
        </p>
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
            isConnected 
              ? 'bg-green-500/10 border-green-500/20 text-green-600' 
              : 'bg-red-500/10 border-red-500/20 text-red-600'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm font-medium">
              {isConnected ? 'System Online' : 'System Offline'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Module Categories */}
      {Object.entries(groupedModules).map(([category, categoryModules]) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold font-playfair text-foreground">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h2>
              <Badge variant="secondary" className="font-playfair">
                {categoryModules.length} modules
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryModules.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-4 pt-8"
      >
        <p className="text-muted-foreground">
          Double-click modules to open in windows • Press ⌘K for quick search • Drag to customize layout
        </p>
      </motion.div>
    </div>
  );
};

export default DesktopGrid;
