import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/global/ui/card';
import { Button } from '@/components/global/ui/button';
import { Input } from '@/components/global/ui/input'; 
import { Textarea } from '@/components/global/ui/textarea';
import { Progress } from '@/components/global/ui/progress';
import { Badge } from '@/components/global/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Target, Edit, Trash2, Calendar } from 'lucide-react'; 
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModuleCard } from '@/components/shared/ModuleCard';
import EmptyState from './home/EmptyState';
import { CreateGoalModal } from './vision/CreateGoalModal';
import { Label } from '@/components/global/ui/label';

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
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
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

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    const updatedGoals = goals.map(goal => 
      goal.id === goalId ? { ...goal, progress: newProgress } : goal
    );
    
    setGoals(updatedGoals);
    
    // Save to localStorage
    localStorage.setItem('vision-module-data', JSON.stringify({
      goals: updatedGoals,
      visionStatement,
      lastUpdated: new Date().toISOString()
    }));
    
    toast({
      title: "Progress updated",
      description: "Your goal progress has been updated.",
    });
  };

  const deleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    
    setGoals(updatedGoals);
    
    // Save to localStorage
    localStorage.setItem('vision-module-data', JSON.stringify({
      goals: updatedGoals,
      visionStatement,
      lastUpdated: new Date().toISOString()
    }));
    
    toast({
      title: "Goal deleted",
      description: "Your goal has been removed.",
    });
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
        <div className="flex items-center justify-between">
          <ModuleHeader
            title="Vision & Roadmap"
            description="Track your long-term goals and milestones"
            icon={<Target className="h-8 w-8 text-white" />}
            module="vision"
          />
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>

        {/* Vision Statement */}
        <ModuleCard
          title="Vision Statement"
          module="vision"
          delay={0.2}
          headerContent={<Target className="h-5 w-5 text-blue-600" />}
        >
          <Textarea
            value={visionStatement}
            onChange={(e) => setVisionStatement(e.target.value)} 
            className="bg-background/50 min-h-[100px] text-lg leading-relaxed"
            placeholder="Describe your long-term vision..."
          />
          <Button 
            className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={saveVisionData}
          >
            Save Vision
          </Button>
        </ModuleCard>

        {/* Goals List */}
        {goals.length > 0 && (
          <ModuleCard
            title="Your Goals"
            module="vision"
            delay={0.3}
            headerContent={<Target className="h-5 w-5 text-purple-600" />}
          >
            <div className="space-y-4">
              {goals.map((goal) => (
                <Card key={goal.id} className="bg-white/50 dark:bg-slate-700/50 border-0"> 
                  <CardContent className="p-4">
                      {editingGoalId === goal.id ? (
                        <div className="space-y-3">
                          <Input
                            value={goal.title}
                            onChange={(e) => {
                              const updatedGoals = goals.map(g => 
                                g.id === goal.id ? { ...g, title: e.target.value } : g
                              );
                              setGoals(updatedGoals);
                            }}
                            placeholder="Goal title"
                            className="mb-2"
                          />
                          <Textarea
                            value={goal.description}
                            onChange={(e) => {
                              const updatedGoals = goals.map(g => 
                                g.id === goal.id ? { ...g, description: e.target.value } : g
                              );
                              setGoals(updatedGoals);
                            }}
                            placeholder="Goal description"
                            className="mb-2"
                          />
                          <div className="flex items-center space-x-2">
                            <Label htmlFor={`deadline-${goal.id}`}>Deadline:</Label>
                            <Input
                              id={`deadline-${goal.id}`}
                              type="date"
                              value={goal.deadline}
                              onChange={(e) => {
                                const updatedGoals = goals.map(g => 
                                  g.id === goal.id ? { ...g, deadline: e.target.value } : g
                                );
                                setGoals(updatedGoals);
                              }}
                            />
                          </div>
                          <div className="flex justify-end space-x-2 mt-4">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setEditingGoalId(null)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => {
                                saveVisionData();
                                setEditingGoalId(null);
                              }}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{goal.title}</h3>
                              <p className="text-sm text-muted-foreground">{goal.description}</p>
                              {goal.deadline && (
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <Badge>{goal.priority}</Badge>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm" onClick={() => setEditingGoalId(goal.id)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => deleteGoal(goal.id)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2 mt-4">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={goal.progress}
                              onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                              className="w-full mt-2"
                            />
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </ModuleCard>
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