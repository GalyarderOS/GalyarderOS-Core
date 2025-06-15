
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Target, 
  Eye, 
  Lightbulb, 
  Calendar, 
  Trophy, 
  Star,
  Rocket,
  Mountain,
  Flag,
  Clock,
  TrendingUp,
  CheckCircle,
  Circle,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'career' | 'health' | 'relationships' | 'personal' | 'financial';
  timeframe: 'short' | 'medium' | 'long';
  progress: number;
  deadline: string;
  milestones: Milestone[];
  status: 'active' | 'completed' | 'paused';
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

interface VisionBoard {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  priority: number;
}

const VisionArchitecture = () => {
  const [visionStatement, setVisionStatement] = useState(
    "To become a leading force in life optimization technology, creating systems that help millions of people design and live their ideal lives while maintaining deep connections and contributing meaningfully to society."
  );

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Launch GalyarderOS Platform',
      description: 'Build and deploy a comprehensive life management system',
      category: 'career',
      timeframe: 'medium',
      progress: 75,
      deadline: '2024-12-31',
      milestones: [
        { id: '1a', title: 'Complete core modules', completed: true, dueDate: '2024-06-15' },
        { id: '1b', title: 'Beta testing phase', completed: true, dueDate: '2024-08-01' },
        { id: '1c', title: 'Public launch', completed: false, dueDate: '2024-12-31' }
      ],
      status: 'active'
    },
    {
      id: '2', 
      title: 'Achieve Peak Physical Health',
      description: 'Reach optimal fitness and maintain consistent healthy habits',
      category: 'health',
      timeframe: 'long',
      progress: 60,
      deadline: '2025-06-15',
      milestones: [
        { id: '2a', title: 'Establish workout routine', completed: true, dueDate: '2024-02-01' },
        { id: '2b', title: 'Reach target weight', completed: false, dueDate: '2024-09-01' },
        { id: '2c', title: 'Complete fitness assessment', completed: false, dueDate: '2025-06-15' }
      ],
      status: 'active'
    },
    {
      id: '3',
      title: 'Build $100k Emergency Fund',
      description: 'Establish financial security and independence',
      category: 'financial',
      timeframe: 'medium',
      progress: 45,
      deadline: '2025-03-01',
      milestones: [
        { id: '3a', title: 'Save first $25k', completed: true, dueDate: '2024-03-01' },
        { id: '3b', title: 'Optimize investment strategy', completed: false, dueDate: '2024-08-01' },
        { id: '3c', title: 'Reach $100k target', completed: false, dueDate: '2025-03-01' }
      ],
      status: 'active'
    }
  ]);

  const [visionBoard, setVisionBoard] = useState<VisionBoard[]>([
    { id: '1', title: 'Dream Home Office', description: 'A minimalist, tech-optimized workspace', priority: 1 },
    { id: '2', title: 'Travel the World', description: 'Visit 30 countries while working remotely', priority: 2 },
    { id: '3', title: 'Publish a Book', description: 'Write about life optimization and system design', priority: 3 },
    { id: '4', title: 'Mentor Others', description: 'Guide 100+ people in their life design journey', priority: 4 }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'personal' as Goal['category'],
    timeframe: 'medium' as Goal['timeframe'],
    deadline: ''
  });

  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'career': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'health': return 'bg-green-100 text-green-800 border-green-200';
      case 'relationships': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'personal': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'financial': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTimeframeIcon = (timeframe: string) => {
    switch(timeframe) {
      case 'short': return Clock;
      case 'medium': return Calendar;
      case 'long': return Mountain;
      default: return Clock;
    }
  };

  const addGoal = () => {
    if (!newGoal.title.trim()) return;
    
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      timeframe: newGoal.timeframe,
      progress: 0,
      deadline: newGoal.deadline,
      milestones: [],
      status: 'active'
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: '', description: '', category: 'personal', timeframe: 'medium', deadline: '' });
    setShowNewGoalForm(false);
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone =>
          milestone.id === milestoneId 
            ? { ...milestone, completed: !milestone.completed }
            : milestone
        );
        
        const completedMilestones = updatedMilestones.filter(m => m.completed).length;
        const progress = Math.round((completedMilestones / updatedMilestones.length) * 100) || 0;
        
        return { ...goal, milestones: updatedMilestones, progress };
      }
      return goal;
    }));
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const averageProgress = goals.reduce((sum, goal) => sum + goal.progress, 0) / totalGoals || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Vision Architecture
              </h1>
              <p className="text-slate-600 dark:text-slate-400">Design your future with systematic goal achievement</p>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">{totalGoals}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Active Goals</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{Math.round(averageProgress)}%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Average Progress</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{completedGoals}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Completed</div>
              </CardContent>
            </Card>
          </div>
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
                <Eye className="h-5 w-5 text-emerald-600" />
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
              <Button className="mt-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white">
                Update Vision
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Goals Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Rocket className="h-5 w-5 text-blue-600" />
                  <span>Strategic Goals</span>
                </CardTitle>
                <Button
                  onClick={() => setShowNewGoalForm(!showNewGoalForm)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Goal
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* New Goal Form */}
              {showNewGoalForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-700/50"
                >
                  <h4 className="font-semibold mb-4">Create New Goal</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="Goal title"
                        value={newGoal.title}
                        onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                        className="mb-3"
                      />
                      <Textarea
                        placeholder="Goal description"
                        value={newGoal.description}
                        onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                        className="mb-3"
                      />
                    </div>
                    <div className="space-y-3">
                      <select
                        value={newGoal.category}
                        onChange={(e) => setNewGoal({...newGoal, category: e.target.value as Goal['category']})}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-slate-800"
                      >
                        <option value="personal">Personal</option>
                        <option value="career">Career</option>
                        <option value="health">Health</option>
                        <option value="relationships">Relationships</option>
                        <option value="financial">Financial</option>
                      </select>
                      
                      <select
                        value={newGoal.timeframe}
                        onChange={(e) => setNewGoal({...newGoal, timeframe: e.target.value as Goal['timeframe']})}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-slate-800"
                      >
                        <option value="short">Short-term (1-6 months)</option>
                        <option value="medium">Medium-term (6-18 months)</option>
                        <option value="long">Long-term (1+ years)</option>
                      </select>
                      
                      <Input
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button onClick={addGoal} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Create Goal
                    </Button>
                    <Button variant="outline" onClick={() => setShowNewGoalForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Goals List */}
              <div className="space-y-4">
                {goals.map((goal, index) => {
                  const TimeframeIcon = getTimeframeIcon(goal.timeframe);
                  return (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <Card className="bg-slate-50 dark:bg-slate-700/50 border-0">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                                  {goal.title}
                                </h3>
                                <Badge className={getCategoryColor(goal.category)}>
                                  {goal.category}
                                </Badge>
                                <Badge variant="outline" className="flex items-center space-x-1">
                                  <TimeframeIcon className="h-3 w-3" />
                                  <span>{goal.timeframe}-term</span>
                                </Badge>
                              </div>
                              <p className="text-slate-600 dark:text-slate-400 mb-3">{goal.description}</p>
                              
                              {/* Progress Bar */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-slate-600 dark:text-slate-400">Progress</span>
                                  <span className="font-medium">{goal.progress}%</span>
                                </div>
                                <Progress value={goal.progress} className="h-2" />
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 ml-4">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Milestones */}
                          {goal.milestones.length > 0 && (
                            <>
                              <Separator className="my-4" />
                              <div>
                                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center space-x-2">
                                  <Flag className="h-4 w-4" />
                                  <span>Milestones</span>
                                </h4>
                                <div className="space-y-2">
                                  {goal.milestones.map((milestone) => (
                                    <div 
                                      key={milestone.id}
                                      className="flex items-center space-x-3 p-2 rounded-lg bg-white dark:bg-slate-600/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600"
                                      onClick={() => toggleMilestone(goal.id, milestone.id)}
                                    >
                                      {milestone.completed ? (
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                      ) : (
                                        <Circle className="h-4 w-4 text-slate-400" />
                                      )}
                                      <span className={`flex-1 text-sm ${milestone.completed ? 'line-through text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}>
                                        {milestone.title}
                                      </span>
                                      <span className="text-xs text-slate-500">
                                        {new Date(milestone.dueDate).toLocaleDateString()}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vision Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <span>Vision Board</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {visionBoard.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="bg-slate-50 dark:bg-slate-700/50 border-0 h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded-lg mb-3 flex items-center justify-center">
                          <Star className="h-8 w-8 text-slate-500" />
                        </div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            Priority {item.priority}
                          </Badge>
                          <Star className="h-4 w-4 text-yellow-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
};

export default VisionArchitecture;
