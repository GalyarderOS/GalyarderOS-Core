import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
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
  description: string | null;
  category: "career" | "health" | "relationships" | "personal" | "financial";
  timeframe: "short" | "medium" | "long";
  progress: number;
  deadline: string;
  milestones: Milestone[];
  status: "active" | "completed" | "paused";
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

const mockGoals: Goal[] = [
    {
        id: '1',
        title: 'Launch Galyarder OS',
        description: 'Successfully launch the first version of the operating system.',
        category: 'career',
        timeframe: 'medium',
        progress: 75,
        deadline: '2024-12-31',
        milestones: [],
        status: 'active',
    },
    {
        id: '2',
        title: 'Achieve Financial Independence',
        description: 'Build a sustainable business that generates passive income.',
        category: 'financial',
        timeframe: 'long',
        progress: 20,
        deadline: '2030-01-01',
        milestones: [],
        status: 'active',
    },
];

const mapGoalDBtoApp = (g: any): Goal => ({
  id: g.id,
  title: g.title,
  description: g.description,
  category: ((g.priority as string) === 'high' ? 'career' : (g.priority === 'low' ? 'personal' : 'health')) as
    | "career"
    | "health"
    | "relationships"
    | "personal"
    | "financial",
  timeframe: "medium", // default, improve mapping if adds to db
  progress: (g.progress ?? 0),
  deadline: g.deadline ?? "",
  milestones: [], // not implemented in db
  status: ((g.status as string) ?? "active") as "active" | "completed" | "paused"
});

const VisionArchitecture = () => {
  const [visionStatement, setVisionStatement] = useState(
    "To become a leading force in life optimization technology, creating systems that help millions of people design and live their ideal lives while maintaining deep connections and contributing meaningfully to society."
  );

  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "personal" as Goal["category"],
    timeframe: "medium" as Goal["timeframe"],
    deadline: ""
  });

  // Static vision board data (will be connected to database later)
  const visionBoard: VisionBoard[] = [
    {
      id: "1",
      title: "Financial Freedom",
      description: "Achieve complete financial independence",
      priority: 1
    },
    {
      id: "2", 
      title: "Health & Wellness",
      description: "Maintain optimal physical and mental health",
      priority: 2
    },
    {
      id: "3",
      title: "Career Growth",
      description: "Become a leader in my field",
      priority: 3
    },
    {
      id: "4",
      title: "Relationships",
      description: "Build meaningful connections with others",
      priority: 4
    }
  ];

  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // 1. REACT QUERY - Fetch Goals from Supabase
  const { data: goalsData, isLoading, isError } = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      // TODO: Replace with Bolt API
      console.log("Fetching goals...");
      return new Promise(resolve => setTimeout(() => resolve(mockGoals), 1000));
    },
    enabled: !!user
  });

  // 2. REACT QUERY - Add New Goal
  const addGoalMutation = useMutation({
    mutationFn: async (goal: typeof newGoal) => {
      // TODO: Replace with Bolt API
      console.log("Adding new goal:", goal);
      return new Promise(resolve => setTimeout(() => resolve({ id: 'new-mock-id', ...goal, progress: 0, status: 'active', milestones: [] }), 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      setShowNewGoalForm(false);
      setNewGoal({
        title: "",
        description: "",
        category: "personal",
        timeframe: "medium",
        deadline: ""
      });
      toast({ title: "Goal created!" });
    },
    onError: (error: any) => {
      toast({ title: "Failed to create goal", description: error.message, variant: "destructive" });
    }
  });

  // 3. REACT QUERY - Delete Goal
  const deleteGoalMutation = useMutation({
    mutationFn: async (goalId: string) => {
      // TODO: Replace with Bolt API
      console.log("Deleting goal:", goalId);
      return new Promise(resolve => setTimeout(() => resolve(goalId), 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast({ title: "Goal deleted" });
    },
    onError: (error: any) => {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    }
  });

  // 4. REACT QUERY - Update Progress (NOTE: No milestone on DB)
  const updateGoalProgressMutation = useMutation({
    mutationFn: async ({ goalId, progress }: { goalId: string; progress: number }) => {
      // TODO: Replace with Bolt API
      console.log("Updating progress for goal:", goalId, "to", progress);
      return new Promise(resolve => setTimeout(() => resolve(goalId), 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast({ title: "Progress updated!" });
    },
    onError: (error: any) => {
      toast({ title: "Failed to update progress", description: error.message, variant: "destructive" });
    }
  });

  // Color and mapping helpers
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "career":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "health":
        return "bg-green-100 text-green-800 border-green-200";
      case "relationships":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "personal":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "financial":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  const getTimeframeIcon = (timeframe: string) => {
    switch (timeframe) {
      case "short":
        return Clock;
      case "medium":
        return Calendar;
      case "long":
        return Mountain;
      default:
        return Clock;
    }
  };

  // Derived values
  const goals = goalsData ?? [];
  const totalGoals = goals.length;
  const completedGoals = goals.filter((g: Goal) => g.status === "completed").length;
  const averageProgress = goals.length
    ? goals.reduce((sum: number, goal: Goal) => sum + (goal.progress ?? 0), 0) / goals.length
    : 0;

  // UI event handlers
  const handleAddGoal = () => {
    if (!newGoal.title.trim()) return;
    addGoalMutation.mutate(newGoal);
  };
  const handleDeleteGoal = (goalId: string) => {
    deleteGoalMutation.mutate(goalId);
  };

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
                onChange={e => setVisionStatement(e.target.value)}
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
                  animate={{ opacity: 1, height: "auto" }}
                  className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-700/50"
                >
                  <h4 className="font-semibold mb-4">Create New Goal</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="Goal title"
                        value={newGoal.title}
                        onChange={e => setNewGoal({ ...newGoal, title: e.target.value })}
                        className="mb-3"
                      />
                      <Textarea
                        placeholder="Goal description"
                        value={newGoal.description}
                        onChange={e => setNewGoal({ ...newGoal, description: e.target.value })}
                        className="mb-3"
                      />
                    </div>
                    <div className="space-y-3">
                      <select
                        value={newGoal.category}
                        onChange={e =>
                          setNewGoal({ ...newGoal, category: e.target.value as Goal["category"] })
                        }
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
                        onChange={e =>
                          setNewGoal({ ...newGoal, timeframe: e.target.value as Goal["timeframe"] })
                        }
                        className="w-full p-2 border rounded-lg bg-white dark:bg-slate-800"
                      >
                        <option value="short">Short-term (1-6 months)</option>
                        <option value="medium">Medium-term (6-18 months)</option>
                        <option value="long">Long-term (1+ years)</option>
                      </select>
                      <Input
                        type="date"
                        value={newGoal.deadline}
                        onChange={e => setNewGoal({ ...newGoal, deadline: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button
                      onClick={handleAddGoal}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      disabled={addGoalMutation.isPending}
                    >
                      {addGoalMutation.isPending ? "Creating..." : "Create Goal"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowNewGoalForm(false)}
                      disabled={addGoalMutation.isPending}
                    >
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              )}
              {/* Loading and error states */}
              {isLoading ? (
                <div className="text-center p-4 text-slate-400">Loading goals...</div>
              ) : isError ? (
                <div className="text-center p-4 text-red-500">Failed to load goals.</div>
              ) : goals.length === 0 ? (
                <div className="p-4 text-center text-slate-500">No goals yet. Start by adding one!</div>
              ) : (
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
                                    <span className="font-medium">{goal.progress ?? 0}%</span>
                                  </div>
                                  <Progress value={goal.progress ?? 0} className="h-2" />
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 ml-4">
                                {/* Edit button pending implementation */}
                                <Button variant="ghost" size="sm" disabled>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600"
                                  onClick={() => handleDeleteGoal(goal.id)}
                                  disabled={deleteGoalMutation.isPending}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        {/* Vision Board (static for now) */}
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
