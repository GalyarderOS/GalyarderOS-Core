
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Calendar, 
  Clock, 
  BookOpen, 
  TrendingUp,
  CheckCircle,
  Timer,
  Brain
} from 'lucide-react';

const DashboardHome = () => {
  const stats = [
    { label: 'Goals Completed', value: 12, total: 20, icon: Target, color: 'text-green-600' },
    { label: 'Active Habits', value: 8, total: 10, icon: Calendar, color: 'text-blue-600' },
    { label: 'Focus Hours Today', value: 4.5, total: 8, icon: Clock, color: 'text-purple-600' },
    { label: 'Memories Captured', value: 45, total: null, icon: BookOpen, color: 'text-orange-600' }
  ];

  const recentActivities = [
    { action: 'Completed morning meditation', time: '2 hours ago', module: 'Habits' },
    { action: 'Added new goal: Learn TypeScript', time: '4 hours ago', module: 'Vision' },
    { action: 'Finished 25-min focus session', time: '6 hours ago', module: 'Focus' },
    { action: 'Captured memory: Team lunch', time: '1 day ago', module: 'Memory' }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'Playfair Display' }}>
          Welcome Back
        </h1>
        <p className="text-gray-600">Here's your productivity overview for today</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.total ? `${stat.value}/${stat.total}` : stat.value}
                </div>
                {stat.total && (
                  <Progress 
                    value={(stat.value / stat.total) * 100} 
                    className="mt-2"
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-[#FFD700]" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>
                Jump into your most important tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                <div className="flex items-center space-x-3">
                  <Timer className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">Start Focus Session</span>
                </div>
                <Badge variant="secondary">25 min</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Review Today's Habits</span>
                </div>
                <Badge variant="secondary">3 pending</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                <div className="flex items-center space-x-3">
                  <Brain className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Capture New Memory</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest achievements and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {activity.module}
                        </Badge>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
