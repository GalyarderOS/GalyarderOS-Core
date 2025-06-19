import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth/useAuth";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Trash2,
  ImageIcon
} from "lucide-react";
import { PlusCircle, ChevronDown, ChevronRight, Zap } from "lucide-react";
import { CreateGoalModal } from "./vision/CreateGoalModal";
import VisionStatementSection from './vision/VisionStatementSection';
import StrategicGoalsSection from './vision/StrategicGoalsSection';
import VisionBoardSection from './vision/VisionBoardSection';
import { Goal as GoalType } from '@/stores/useVisionStore';

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

interface GoalDB {
  id: string;
  title: string;
  description: string | null;
  priority: 'high' | 'medium' | 'low';
  progress: number | null;
  deadline: string | null;
  status: string | null;
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

const mapGoalDBtoApp = (g: GoalDB): Goal => ({
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
    onError: (error: Error) => {
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
    onError: (error: Error) => {
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
    onError: (error: Error) => {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<GoalType | undefined>(undefined);

  const handleOpenModal = (goal?: GoalType) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingGoal(undefined);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Vision Architecture</h1>
                <p className="text-muted-foreground mt-1">Design, track, and manifest your long-term life vision.</p>
            </div>
            <Button onClick={() => handleOpenModal()}>
                <Plus className="mr-2 h-4 w-4" /> New Goal
            </Button>
        </header>

        <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1
                    }
                }
            }}
        >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <VisionStatementSection />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <Card className="bg-card/50 border-border backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-gradient-to-br from-vision-primary to-vision-secondary rounded-lg flex items-center justify-center shadow-md">
                                <Target className="h-6 w-6 text-white/90" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">Strategic Goals</CardTitle>
                                <CardDescription>The milestones on your path to greatness.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <StrategicGoalsSection onEditGoal={handleOpenModal} />
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <Card className="bg-card/50 border-border backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                         <div className="flex items-center gap-3">
                             <div className="w-11 h-11 bg-gradient-to-br from-secondary to-primary/50 rounded-lg flex items-center justify-center shadow-md">
                                <ImageIcon className="h-6 w-6 text-white/90" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">Vision Board</CardTitle>
                                <CardDescription>Visual inspirations for your desired future.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <VisionBoardSection />
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>


      <CreateGoalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        goal={editingGoal}
      />
    </div>
  );
};

export default VisionArchitecture;
