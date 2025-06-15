
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Target } from 'lucide-react';
import EmptyState from './home/EmptyState';

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
}

const VisionModule = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  if (goals.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-6xl mx-auto p-6">
          <EmptyState
            icon={Target}
            title="Create Your Vision & Goals"
            description="Define your long-term vision and break it down into actionable goals. Track your progress and celebrate milestones along the way."
            actionLabel="Create First Goal"
            onAction={() => {
              // Add goal creation logic here
              console.log('Create first goal');
            }}
            gradient="from-blue-600 to-purple-600"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-playfair">
                Vision & Roadmap
              </h1>
              <p className="text-slate-600 dark:text-slate-400">Track your long-term goals and milestones</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </motion.div>

        {/* Goals content would go here */}
      </div>
    </div>
  );
};

export default VisionModule;
