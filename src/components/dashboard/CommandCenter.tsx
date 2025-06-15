import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Target,
  Calendar,
  Timer,
  Brain,
  BookOpen,
  Edit,
  BarChart2,
  FileText,
  Zap,
  Activity,
  TrendingUp,
  Clock,
  Heart,
  Eye,
  Sparkles,
  Command,
  Search,
  Plus,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

const SOUL_MODULES = [
  {
    id: "identity-core",
    label: "Identity Core",
    icon: User,
    path: "/dashboard/identity",
    color: "from-purple-600 to-purple-800",
    description: "Define your core self",
    stats: { usage: "82%", lastUsed: "Today" }
  },
  {
    id: "vision-architecture",
    label: "Vision Architecture", 
    icon: Target,
    path: "/dashboard/vision",
    color: "from-emerald-600 to-emerald-800",
    description: "Build your future blueprint",
    stats: { usage: "67%", lastUsed: "2 days ago" }
  },
  {
    id: "life-balance",
    label: "Life Balance",
    icon: Brain,
    path: "/dashboard/balance", 
    color: "from-blue-600 to-blue-800",
    description: "Harmonize all life areas",
    stats: { usage: "91%", lastUsed: "Today" }
  },
  {
    id: "ritual-engine",
    label: "Ritual Engine",
    icon: Calendar,
    path: "/dashboard/ritual",
    color: "from-orange-600 to-orange-800", 
    description: "Automate your habits",
    stats: { usage: "78%", lastUsed: "Today" }
  },
  {
    id: "flow-state",
    label: "Flow State",
    icon: Timer,
    path: "/dashboard/flow",
    color: "from-cyan-600 to-cyan-800",
    description: "Enter deep focus mode",
    stats: { usage: "89%", lastUsed: "3 hours ago" }
  },
  {
    id: "knowledge-hub",
    label: "Knowledge Hub", 
    icon: BookOpen,
    path: "/dashboard/knowledge",
    color: "from-indigo-600 to-indigo-800",
    description: "Capture and organize insights",
    stats: { usage: "74%", lastUsed: "Yesterday" }
  },
  {
    id: "reflection",
    label: "Reflection",
    icon: Edit,
    path: "/dashboard/reflection",
    color: "from-pink-600 to-pink-800",
    description: "Journal your journey",
    stats: { usage: "85%", lastUsed: "Today" }
  },
  {
    id: "life-analytics",
    label: "Life Analytics",
    icon: BarChart2, 
    path: "/dashboard/analytics",
    color: "from-yellow-600 to-yellow-800",
    description: "Visualize your progress",
    stats: { usage: "63%", lastUsed: "Yesterday" }
  }
];

const QUICK_ACTIONS = [
  { icon: Plus, label: "New Goal", action: "create-goal" },
  { icon: Timer, label: "Start Focus", action: "start-focus" },
  { icon: Edit, label: "Journal Entry", action: "journal" },
  { icon: Target, label: "Track Habit", action: "track-habit" },
  { icon: Search, label: "Search Knowledge", action: "search" },
  { icon: BarChart2, label: "View Analytics", action: "analytics" }
];

const CommandCenter = () => {
  const navigate = useNavigate();
  const [commandQuery, setCommandQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [systemStats, setSystemStats] = useState({
    focusTime: 4.2,
    completedHabits: 8,
    journalStreak: 12,
    goalsProgress: 67,
    knowledgeItems: 156,
    systemHealth: 94
  });

  const [recentActivity] = useState([
    { type: "focus", message: "Completed 90min deep work session", time: "2 hours ago" },
    { type: "habit", message: "Morning routine streak: 12 days", time: "6 hours ago" },
    { type: "journal", message: "Reflection entry added", time: "Yesterday" },
    { type: "goal", message: "Monthly target 67% complete", time: "2 days ago" }
  ]);

  const handleModuleClick = (module: any) => {
    navigate(module.path);
  };

  const executeQuickAction = (action: string) => {
    switch(action) {
      case "create-goal":
        navigate("/dashboard/vision");
        break;
      case "start-focus":
        navigate("/dashboard/flow"); 
        break;
      case "journal":
        navigate("/dashboard/reflection");
        break;
      case "track-habit":
        navigate("/dashboard/ritual");
        break;
      case "search":
        navigate("/dashboard/knowledge");
        break;
      case "analytics":
        navigate("/dashboard/analytics");
        break;
    }
  };

  const filteredModules = SOUL_MODULES.filter(module => 
    module.label.toLowerCase().includes(commandQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(commandQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Header with Command Palette */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <Command className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Command Center
              </h1>
              <p className="text-slate-600 dark:text-slate-400">Your digital soul operating system</p>
            </div>
          </div>

          {/* Command Palette */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search modules, actions, or type commands..."
              value={commandQuery}
              onChange={(e) => setCommandQuery(e.target.value)}
              className="pl-12 py-4 text-lg border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:border-purple-500 transition-colors"
            />
          </div>
        </motion.div>

        {/* System Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Timer className="h-5 w-5 text-cyan-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{systemStats.focusTime}h</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Focus Time</div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{systemStats.completedHabits}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Habits Done</div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Edit className="h-5 w-5 text-pink-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{systemStats.journalStreak}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Journal Streak</div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{systemStats.goalsProgress}%</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Goals Progress</div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{systemStats.knowledgeItems}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Knowledge Items</div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{systemStats.systemHealth}%</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">System Health</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {QUICK_ACTIONS.map((action, index) => (
              <motion.div
                key={action.action}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Button
                  variant="outline"
                  onClick={() => executeQuickAction(action.action)}
                  className="w-full h-16 flex flex-col items-center justify-center space-y-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <action.icon className="h-5 w-5" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Digital Soul Modules Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">Digital Soul Modules</h2>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              {filteredModules.length} modules
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-full"
                    onClick={() => handleModuleClick(module)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {module.stats.usage}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 transition-colors">
                        {module.label}
                      </CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {module.description}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{module.stats.lastUsed}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>Active</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity & System Status */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {activity.message}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <span>System Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Focus Performance</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                      </div>
                      <span className="text-sm font-medium">89%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Habit Consistency</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                      </div>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Life Balance</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" />
                      </div>
                      <span className="text-sm font-medium">91%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    💡 <strong>Insight:</strong> Your focus sessions are 23% longer this week. Consider scheduling more deep work blocks.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
