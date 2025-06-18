import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Target } from 'lucide-react';
import EmptyState from './home/EmptyState';
import { CreateGoalModal } from './vision/CreateGoalModal';

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
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [visionStatement, setVisionStatement] = useState('');
  const { toast } = useToast();

  // Load saved vision data on component mount
  useEffect(() => {
    setLoading(true);
    
    // Load vision data from localStorage
    const savedVision = localStorage.getItem('vision-module-data');
    if (savedVision) {
      try {
        const parsedData = JSON.parse(savedVision);
        setGoals(parsedData.goals || []);
        setVisionStatement(parsedData.visionStatement || '');
      } catch (error) {
        console.error('Error parsing saved vision data:', error);
      }
    }
    
    setLoading(false);
  }, []);

  const saveVisionData = () => {
    try {
      const dataToSave = {
        goals,
        visionStatement,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('vision-module-data', JSON.stringify(dataToSave));
      toast({
        title: "Vision saved",
        description: "Your vision and goals have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving vision data:', error);
      toast({
        title: "Error saving",
        description: "There was a problem saving your vision data.",
        variant: "destructive"
      });
    }
  };

  const handleCreateGoal = (newGoal: Omit<Goal, 'id' | 'progress' | 'status'>) => {
    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString(),
      progress: 0,
      status: 'active'
    };
    
    const updatedGoals = [...goals, goal];
    setGoals(updatedGoals);
    
    // Save to localStorage
    localStorage.setItem('vision-module-data', JSON.stringify({
      goals: updatedGoals,
      visionStatement,
      lastUpdated: new Date().toISOString()
    }));
    
    setCreateModalOpen(false);
    
    toast({
      title: "Goal created",
      description: "Your new goal has been added successfully.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-muted border-t-foreground rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (goals.length === 0 && !visionStatement) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="max-w-6xl mx-auto p-6">
            <EmptyState
              icon={Target}
              title="Create Your Vision & Goals"
              description="Define your long-term vision and break it down into actionable goals. Track your progress and celebrate milestones along the way."
              actionLabel="Create First Goal"
              onAction={() => setCreateModalOpen(true)}
              gradient="from-blue-600 to-purple-600"
            />
          </div>
        </div>
        <CreateGoalModal 
          isOpen={isCreateModalOpen} 
          onClose={() => setCreateModalOpen(false)} 
          onCreateGoal={handleCreateGoal}
        />
      </>
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
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white"
            onClick={() => setCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Vision Statement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={visionStatement}
                onChange={(e) => setVisionStatement(e.target.value)}
                className="bg-white/50 dark:bg-slate-700/50 min-h-[100px] text-lg leading-relaxed"
                placeholder="Describe your long-term vision..."
              />
              <Button 
                className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={saveVisionData}
              >
                Save Vision
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Goals List */}
        {goals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span>Your Goals</span>
                </CardTitle>
                <CardDescription>Track progress toward your vision</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {goals.map((goal) => (
                  <Card key={goal.id} className="bg-white/50 dark:bg-slate-700/50 border-0">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{goal.title}</h3>
                          <p className="text-sm text-muted-foreground">{goal.description}</p>
                        </div>
                        <Badge>{goal.priority}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
      <CreateGoalModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
        onCreateGoal={handleCreateGoal}
      />
    </div>
  );
};

export default VisionModule;