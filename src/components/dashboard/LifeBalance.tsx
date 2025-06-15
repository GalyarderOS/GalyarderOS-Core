
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Heart, 
  Dumbbell, 
  Briefcase, 
  Users, 
  Book, 
  Coffee, 
  Moon,
  Target,
  TrendingUp,
  BarChart3,
  Plus,
  Minus,
  RotateCcw,
  Award,
  Activity
} from "lucide-react";

interface LifeArea {
  id: string;
  name: string;
  icon: any;
  score: number;
  maxScore: number;
  color: string;
  description: string;
  metrics: Metric[];
}

interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  target: number;
  description: string;
}

const LifeBalance = () => {
  const [lifeAreas, setLifeAreas] = useState<LifeArea[]>([
    {
      id: 'health',
      name: 'Physical Health',
      icon: Dumbbell,
      score: 85,
      maxScore: 100,
      color: 'from-green-500 to-emerald-600',
      description: 'Exercise, nutrition, sleep, and physical wellness',
      metrics: [
        { id: 'exercise', name: 'Exercise', value: 5, unit: 'days/week', target: 6, description: 'Workout frequency' },
        { id: 'sleep', name: 'Sleep Quality', value: 8, unit: '/10', target: 9, description: 'Sleep satisfaction' },
        { id: 'nutrition', name: 'Nutrition', value: 7, unit: '/10', target: 9, description: 'Diet quality' }
      ]
    },
    {
      id: 'mental',
      name: 'Mental Wellness',
      icon: Brain,
      score: 78,
      maxScore: 100,
      color: 'from-blue-500 to-indigo-600',
      description: 'Stress management, mindfulness, and mental clarity',
      metrics: [
        { id: 'stress', name: 'Stress Level', value: 3, unit: '/10', target: 2, description: 'Daily stress (lower is better)' },
        { id: 'meditation', name: 'Meditation', value: 20, unit: 'min/day', target: 30, description: 'Mindfulness practice' },
        { id: 'focus', name: 'Focus Quality', value: 8, unit: '/10', target: 9, description: 'Concentration ability' }
      ]
    },
    {
      id: 'career',
      name: 'Career & Growth',
      icon: Briefcase,
      score: 92,
      maxScore: 100,
      color: 'from-purple-500 to-violet-600',
      description: 'Professional development and achievement',
      metrics: [
        { id: 'productivity', name: 'Productivity', value: 9, unit: '/10', target: 9, description: 'Work effectiveness' },
        { id: 'learning', name: 'Learning Time', value: 2, unit: 'hrs/day', target: 3, description: 'Skill development' },
        { id: 'satisfaction', name: 'Job Satisfaction', value: 8, unit: '/10', target: 9, description: 'Work fulfillment' }
      ]
    },
    {
      id: 'relationships',
      name: 'Relationships',
      icon: Heart,
      score: 73,
      maxScore: 100,
      color: 'from-pink-500 to-rose-600',
      description: 'Social connections and meaningful relationships',
      metrics: [
        { id: 'family', name: 'Family Time', value: 4, unit: 'hrs/week', target: 8, description: 'Quality time with family' },
        { id: 'friends', name: 'Social Activities', value: 2, unit: '/week', target: 3, description: 'Social engagement' },
        { id: 'connection', name: 'Connection Quality', value: 8, unit: '/10', target: 9, description: 'Relationship depth' }
      ]
    },
    {
      id: 'personal',
      name: 'Personal Growth',
      icon: Book,
      score: 80,
      maxScore: 100,
      color: 'from-orange-500 to-amber-600',
      description: 'Learning, hobbies, and self-development',
      metrics: [
        { id: 'reading', name: 'Reading', value: 3, unit: 'books/month', target: 4, description: 'Knowledge acquisition' },
        { id: 'hobbies', name: 'Creative Time', value: 5, unit: 'hrs/week', target: 8, description: 'Personal interests' },
        { id: 'reflection', name: 'Self-Reflection', value: 15, unit: 'min/day', target: 20, description: 'Journaling and introspection' }
      ]
    },
    {
      id: 'recreation',
      name: 'Recreation & Fun',
      icon: Coffee,
      score: 65,
      maxScore: 100,
      color: 'from-teal-500 to-cyan-600',
      description: 'Entertainment, leisure, and enjoyment',
      metrics: [
        { id: 'leisure', name: 'Leisure Time', value: 10, unit: 'hrs/week', target: 15, description: 'Relaxation activities' },
        { id: 'entertainment', name: 'Entertainment', value: 5, unit: 'hrs/week', target: 8, description: 'Movies, games, etc.' },
        { id: 'adventure', name: 'New Experiences', value: 1, unit: '/month', target: 2, description: 'Novel activities' }
      ]
    }
  ]);

  const updateMetric = (areaId: string, metricId: string, delta: number) => {
    setLifeAreas(areas => areas.map(area => {
      if (area.id === areaId) {
        const updatedMetrics = area.metrics.map(metric => {
          if (metric.id === metricId) {
            const newValue = Math.max(0, metric.value + delta);
            return { ...metric, value: newValue };
          }
          return metric;
        });

        // Recalculate area score based on metrics
        const avgCompletion = updatedMetrics.reduce((sum, metric) => {
          const completion = Math.min(100, (metric.value / metric.target) * 100);
          return sum + completion;
        }, 0) / updatedMetrics.length;

        return { ...area, metrics: updatedMetrics, score: Math.round(avgCompletion) };
      }
      return area;
    }));
  };

  const resetArea = (areaId: string) => {
    setLifeAreas(areas => areas.map(area => {
      if (area.id === areaId) {
        const resetMetrics = area.metrics.map(metric => ({ ...metric, value: 0 }));
        return { ...area, metrics: resetMetrics, score: 0 };
      }
      return area;
    }));
  };

  const overallScore = Math.round(lifeAreas.reduce((sum, area) => sum + area.score, 0) / lifeAreas.length);
  const topArea = lifeAreas.reduce((prev, current) => (prev.score > current.score) ? prev : current);
  const improvementArea = lifeAreas.reduce((prev, current) => (prev.score < current.score) ? prev : current);

  const getScoreLevel = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 80) return { label: 'Great', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 70) return { label: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (score >= 60) return { label: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { label: 'Needs Focus', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const scoreLevel = getScoreLevel(overallScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Header with Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Life Balance
              </h1>
              <p className="text-slate-600 dark:text-slate-400">Harmonize all dimensions of your life</p>
            </div>
          </div>

          {/* Overall Score Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-lg mx-auto"
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">{overallScore}</div>
                <Badge className={`${scoreLevel.bgColor} ${scoreLevel.color} mb-4`}>
                  {scoreLevel.label}
                </Badge>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Overall Life Balance Score</p>
                <Progress value={overallScore} className="h-3" />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-4"
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Strongest Area</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{topArea.name} ({topArea.score}%)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Focus Area</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{improvementArea.name} ({improvementArea.score}%)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Balanced Areas</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{lifeAreas.filter(a => a.score >= 70).length} of {lifeAreas.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Life Areas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-6"
        >
          {lifeAreas.map((area, index) => {
            const Icon = area.icon;
            const areaScoreLevel = getScoreLevel(area.score);
            
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border-0 shadow-lg h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${area.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{area.name}</CardTitle>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{area.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{area.score}%</div>
                        <Badge className={`${areaScoreLevel.bgColor} ${areaScoreLevel.color} text-xs`}>
                          {areaScoreLevel.label}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Area Progress */}
                    <Progress value={area.score} className="h-2" />
                    
                    <Separator />
                    
                    {/* Metrics */}
                    <div className="space-y-4">
                      {area.metrics.map((metric) => {
                        const completion = Math.min(100, (metric.value / metric.target) * 100);
                        return (
                          <div key={metric.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-medium text-slate-800 dark:text-slate-200">{metric.name}</span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">{metric.description}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateMetric(area.id, metric.id, -1)}
                                  className="w-8 h-8 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="min-w-[60px] text-center font-medium">
                                  {metric.value} {metric.unit}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateMetric(area.id, metric.id, 1)}
                                  className="w-8 h-8 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Progress value={completion} className="h-1.5 flex-1" />
                              <span className="text-xs text-slate-500 min-w-[50px]">
                                {Math.round(completion)}%
                              </span>
                            </div>
                            
                            <div className="text-xs text-slate-500">
                              Target: {metric.target} {metric.unit}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resetArea(area.id)}
                      className="w-full mt-4"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset Area
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Balance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>Balance Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Recommendations</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span>Focus on improving {improvementArea.name} to achieve better overall balance</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span>Maintain your excellent performance in {topArea.name}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <span>Consider daily 15-minute check-ins to track progress</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Balance Trends</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">This Week</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">+5%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">This Month</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">+12%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Overall Progress</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        Steady Growth
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
};

export default LifeBalance;
