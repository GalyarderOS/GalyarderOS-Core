import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Target,
  Flame, 
  Clock, 
  Plus, 
  Check, 
  X,
  RotateCcw,
  Zap,
  Award,
  TrendingUp,
  Star,
  ChevronRight,
  Play,
  Pause 
} from "lucide-react";
import { ModuleHeader } from "@/components/ui/module-header";
import { ModuleCard } from "@/components/ui/module-card";

interface Habit {
  id: string;
  name: string;
  description: string;
  category: 'health' | 'productivity' | 'personal' | 'learning' | 'social';
  frequency: 'daily' | 'weekly' | 'custom';
  targetDays: number;
  streak: number;
  longestStreak: number;
  completedToday: boolean;
  totalCompletions: number;
  createdAt: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Ritual {
  id: string;
  name: string;
  description: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  duration: number; // in minutes
  habits: string[]; // habit IDs
  isActive: boolean;
  completedToday: boolean;
}

const RitualEngine = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Morning Meditation',
      description: '10 minutes of mindfulness practice',
      category: 'health',
      frequency: 'daily',
      targetDays: 365,
      streak: 15,
      longestStreak: 28,
      completedToday: true,
      totalCompletions: 45,
      createdAt: '2024-01-01',
      difficulty: 'easy'
    },
    {
      id: '2',
      name: 'Exercise',
      description: '30 minutes of physical activity',
      category: 'health',
      frequency: 'daily',
      targetDays: 365,
      streak: 8,
      longestStreak: 15,
      completedToday: false,
      totalCompletions: 32,
      createdAt: '2024-01-15',
      difficulty: 'medium'
    },
    {
      id: '3',
      name: 'Read Tech Articles',
      description: 'Stay updated with industry trends',
      category: 'learning',
      frequency: 'daily',
      targetDays: 365,
      streak: 12,
      longestStreak: 20,
      completedToday: true,
      totalCompletions: 28,
      createdAt: '2024-02-01',
      difficulty: 'easy'
    },
    {
      id: '4',
      name: 'Weekly Planning',
      description: 'Plan upcoming week goals',
      category: 'productivity',
      frequency: 'weekly',
      targetDays: 52,
      streak: 4,
      longestStreak: 8,
      completedToday: false,
      totalCompletions: 8,
      createdAt: '2024-01-01',
      difficulty: 'medium'
    }
  ]);

  const [rituals, setRituals] = useState<Ritual[]>([
    {
      id: '1',
      name: 'Morning Power Hour',
      description: 'Start the day with intention and energy',
      timeOfDay: 'morning',
      duration: 60,
      habits: ['1', '2'], // meditation + exercise
      isActive: true,
      completedToday: false
    },
    {
      id: '2',
      name: 'Evening Wind Down',
      description: 'Prepare mind and body for rest',
      timeOfDay: 'evening',
      duration: 30,
      habits: ['3'], // reading
      isActive: true,
      completedToday: true
    }
  ]);

  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    category: 'personal' as Habit['category'],
    frequency: 'daily' as Habit['frequency'],
    difficulty: 'medium' as Habit['difficulty']
  });

  const [showNewHabitForm, setShowNewHabitForm] = useState(false);

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newCompletedStatus = !habit.completedToday;
        const newStreak = newCompletedStatus ? habit.streak + 1 : Math.max(0, habit.streak - 1);
        const newTotalCompletions = newCompletedStatus ? habit.totalCompletions + 1 : habit.totalCompletions - 1;
        const newLongestStreak = Math.max(habit.longestStreak, newStreak);
        
        return {
          ...habit,
          completedToday: newCompletedStatus,
          streak: newStreak,
          totalCompletions: Math.max(0, newTotalCompletions),
          longestStreak: newLongestStreak
        };
      }
      return habit;
    }));
  };

  const addHabit = () => {
    if (!newHabit.name.trim()) return;
    
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      description: newHabit.description,
      category: newHabit.category,
      frequency: newHabit.frequency,
      targetDays: newHabit.frequency === 'daily' ? 365 : 52,
      streak: 0,
      longestStreak: 0,
      completedToday: false,
      totalCompletions: 0,
      createdAt: new Date().toISOString().split('T')[0],
      difficulty: newHabit.difficulty
    };

    setHabits([...habits, habit]);
    setNewHabit({ name: '', description: '', category: 'personal', frequency: 'daily', difficulty: 'medium' });
    setShowNewHabitForm(false);
  };

  const getCategoryColor = (category: string | undefined) => {
    switch(category) {
      case 'health': return 'bg-green-100 text-green-800 border-green-200';
      case 'productivity': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'personal': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'learning': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'social': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string | undefined) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTimeOfDayIcon = (timeOfDay: string) => {
    switch(timeOfDay) {
      case 'morning': return '🌅';
      case 'afternoon': return '☀️';
      case 'evening': return '🌇';
      case 'night': return '🌙';
      default: return '⏰';
    }
  };

  const completedHabitsToday = habits.filter(h => h.completedToday).length;
  const totalActiveHabits = habits.length;
  const overallCompletionRate = totalActiveHabits > 0 ? (completedHabitsToday / totalActiveHabits) * 100 : 0;
  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const averageStreak = totalActiveHabits > 0 ? totalStreak / totalActiveHabits : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <ModuleHeader
            title="Ritual Engine"
            description="Automate excellence through consistent habits"
            icon={<Calendar className="h-8 w-8 text-white" />}
            module="ritual"
            className="justify-center"
          />

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{completedHabitsToday}/{totalActiveHabits}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Today's Habits</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{Math.round(overallCompletionRate)}%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Completion Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{totalStreak}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Streaks</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{Math.round(averageStreak)}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Avg Streak</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Today's Progress */}
        <ModuleCard
          title="Today's Progress"
          module="ritual"
          delay={0.2}
          headerContent={
            <Badge className="bg-orange-100 text-orange-800">
              {completedHabitsToday} of {totalActiveHabits} completed
            </Badge>
          }
        >
          <div className="space-y-4">
            <Progress value={overallCompletionRate} className="h-3" />
            <div className="text-center text-sm text-slate-600 dark:text-slate-400">
              {Math.round(overallCompletionRate)}% of today's habits completed
            </div>
          </div>
        </ModuleCard>

        {/* Habits Management */}
        <ModuleCard
          title="Active Habits"
          module="ritual"
          delay={0.3}
          headerContent={
            <Button
              onClick={() => setShowNewHabitForm(!showNewHabitForm)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Habit
            </Button>
          }
        >
          <div className="space-y-6">
              
              {/* New Habit Form */}
              {showNewHabitForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-700/50"
                >
                  <h4 className="font-semibold mb-4">Create New Habit</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Input
                        placeholder="Habit name"
                        value={newHabit.name}
                        onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
                      />
                      <Input
                        placeholder="Description"
                        value={newHabit.description}
                        onChange={(e) => setNewHabit({...newHabit, description: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <select
                        value={newHabit.category}
                        onChange={(e) => setNewHabit({...newHabit, category: e.target.value as Habit['category']})}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-slate-800"
                      >
                        <option value="personal">Personal</option>
                        <option value="health">Health</option>
                        <option value="productivity">Productivity</option>
                        <option value="learning">Learning</option>
                        <option value="social">Social</option>
                      </select>
                      <select
                        value={newHabit.frequency}
                        onChange={(e) => setNewHabit({...newHabit, frequency: e.target.value as Habit['frequency']})}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-slate-800"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </select>
                      <select
                        value={newHabit.difficulty}
                        onChange={(e) => setNewHabit({...newHabit, difficulty: e.target.value as Habit['difficulty']})}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-slate-800"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button onClick={addHabit} className="bg-orange-600 hover:bg-orange-700 text-white">
                      Create Habit
                    </Button>
                    <Button variant="outline" onClick={() => setShowNewHabitForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Habits List */}
              <div className="grid md:grid-cols-2 gap-4">
                {habits.map((habit, index) => (
                  <motion.div
                    key={habit.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Card className={`border-2 transition-all ${
                      habit.completedToday 
                        ? 'border-green-200 bg-green-50 dark:bg-green-900/20' 
                        : 'border-slate-200 bg-slate-50 dark:bg-slate-700/50'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                                {habit.name}
                              </h3>
                              <Badge className={getCategoryColor(habit.category)}>
                                {habit.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                              {habit.description}
                            </p>
                            <div className="flex items-center space-x-3 text-xs text-slate-500">
                              <Badge className={getDifficultyColor(habit.difficulty)}>
                                {habit.difficulty}
                              </Badge>
                              <span>{habit.frequency}</span>
                            </div>
                          </div>
                          
                          <Button
                            variant={habit.completedToday ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleHabit(habit.id)}
                            className={habit.completedToday ? 
                              "bg-green-600 hover:bg-green-700 text-white" : 
                              "border-2 hover:border-green-600"
                            }
                          >
                            {habit.completedToday ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                          </Button>
                        </div>

                        <Separator className="my-3" />

                        {/* Habit Stats */}
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <div className="flex items-center justify-center space-x-1 text-orange-600 mb-1">
                              <Flame className="h-4 w-4" />
                              <span className="font-bold">{habit.streak}</span>
                            </div>
                            <p className="text-xs text-slate-500">Current Streak</p>
                          </div>
                          <div>
                            <div className="flex items-center justify-center space-x-1 text-purple-600 mb-1">
                              <Award className="h-4 w-4" />
                              <span className="font-bold">{habit.longestStreak}</span>
                            </div>
                            <p className="text-xs text-slate-500">Best Streak</p>
                          </div>
                          <div>
                            <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
                              <Target className="h-4 w-4" />
                              <span className="font-bold">{habit.totalCompletions}</span>
                            </div>
                            <p className="text-xs text-slate-500">Total Done</p>
                          </div>
                        </div>

                        {/* Progress towards target */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-slate-600 dark:text-slate-400">Progress</span>
                            <span className="font-medium">
                              {Math.round((habit.totalCompletions / habit.targetDays) * 100)}%
                            </span>
                          </div>
                          <Progress value={(habit.totalCompletions / habit.targetDays) * 100} className="h-1.5" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rituals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <span>Daily Rituals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {rituals.map((ritual, index) => (
                  <motion.div
                    key={ritual.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Card className={`border-2 ${
                      ritual.completedToday 
                        ? 'border-purple-200 bg-purple-50 dark:bg-purple-900/20' 
                        : 'border-slate-200 bg-slate-50 dark:bg-slate-700/50'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{getTimeOfDayIcon(ritual.timeOfDay)}</span>
                            <div>
                              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                                {ritual.name}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {ritual.description}
                              </p>
                            </div>
                          </div>
                          
                          <Button
                            variant={ritual.completedToday ? "default" : "outline"}
                            size="sm"
                            className={ritual.completedToday ? 
                              "bg-purple-600 hover:bg-purple-700 text-white" : 
                              ""
                            }
                          >
                            {ritual.completedToday ? <Check className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                        </div>

                        <div className="text-xs text-slate-500 mb-3">
                          Duration: {ritual.duration} minutes • {ritual.timeOfDay}
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Included Habits:
                          </h4>
                          {ritual.habits.map(habitId => {
                            const habit = habits.find(h => h.id === habitId);
                            return habit ? (
                              <div key={habitId} className="flex items-center space-x-2 text-sm">
                                <ChevronRight className="h-3 w-3 text-slate-400" />
                                <span className="text-slate-600 dark:text-slate-400">{habit.name}</span>
                                {habit.completedToday && <Check className="h-3 w-3 text-green-600" />}
                              </div>
                            ) : null;
                          })}
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

export default RitualEngine;