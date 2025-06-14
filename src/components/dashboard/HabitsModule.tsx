
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Check, Plus, Flame, Target } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  streak: number;
  completedToday: boolean;
  totalCompletions: number;
  targetDays: number;
}

const HabitsModule = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Morning Meditation',
      description: '10 minutes of mindfulness practice',
      frequency: 'daily',
      streak: 15,
      completedToday: true,
      totalCompletions: 45,
      targetDays: 365
    },
    {
      id: '2',
      name: 'Exercise',
      description: '30 minutes of physical activity',
      frequency: 'daily',
      streak: 8,
      completedToday: false,
      totalCompletions: 32,
      targetDays: 365
    },
    {
      id: '3',
      name: 'Read Technical Articles',
      description: 'Stay updated with industry trends',
      frequency: 'daily',
      streak: 12,
      completedToday: true,
      totalCompletions: 28,
      targetDays: 365
    },
    {
      id: '4',
      name: 'Weekly Review',
      description: 'Reflect on goals and progress',
      frequency: 'weekly',
      streak: 4,
      completedToday: false,
      totalCompletions: 8,
      targetDays: 52
    }
  ]);

  const toggleHabitCompletion = (habitId: string) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completedToday: !habit.completedToday,
            streak: !habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1),
            totalCompletions: !habit.completedToday ? habit.totalCompletions + 1 : habit.totalCompletions - 1
          }
        : habit
    ));
  };

  const getCompletionRate = (habit: Habit) => {
    return Math.round((habit.totalCompletions / habit.targetDays) * 100);
  };

  const getTotalStreak = () => {
    return habits.reduce((sum, habit) => sum + habit.streak, 0);
  };

  const getCompletedToday = () => {
    return habits.filter(habit => habit.completedToday).length;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'Playfair Display' }}>
            Daily Rituals
          </h1>
          <p className="text-gray-600">Build consistency through powerful habits</p>
        </div>
        <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1a1a1a]">
          <Plus className="h-4 w-4 mr-2" />
          Add Habit
        </Button>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-600" />
                <span>Completed Today</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {getCompletedToday()}/{habits.length}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Flame className="h-5 w-5 text-orange-600" />
                <span>Total Streak</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {getTotalStreak()}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Active Habits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {habits.length}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Habits List */}
      <div className="space-y-4">
        {habits.map((habit, index) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <Card className={`hover:shadow-md transition-all ${
              habit.completedToday ? 'border-green-200 bg-green-50/30' : ''
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant={habit.completedToday ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleHabitCompletion(habit.id)}
                        className={habit.completedToday ? 
                          "bg-green-600 hover:bg-green-700 text-white" : 
                          "border-2 hover:border-green-600"
                        }
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <div>
                        <CardTitle className="text-xl">{habit.name}</CardTitle>
                        <CardDescription>{habit.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-orange-600">
                        <Flame className="h-4 w-4" />
                        <span className="font-bold">{habit.streak}</span>
                      </div>
                      <p className="text-xs text-gray-500">day streak</p>
                    </div>
                    
                    <div className="flex flex-col space-y-1">
                      <Badge variant="outline" className="text-xs">
                        {habit.frequency}
                      </Badge>
                      {habit.completedToday && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          ✓ Done
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Annual Progress</span>
                    <span>{habit.totalCompletions}/{habit.targetDays} ({getCompletionRate(habit)}%)</span>
                  </div>
                  <Progress value={getCompletionRate(habit)} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HabitsModule;
