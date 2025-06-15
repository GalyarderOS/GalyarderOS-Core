
import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target, Clock, Zap } from 'lucide-react';

const LifeAnalyticsCharts = () => {
  // Sample data for different metrics
  const productivityData = [
    { name: 'Mon', focus: 85, energy: 70, mood: 80 },
    { name: 'Tue', focus: 75, energy: 80, mood: 85 },
    { name: 'Wed', focus: 90, energy: 75, mood: 78 },
    { name: 'Thu', focus: 80, energy: 85, mood: 82 },
    { name: 'Fri', focus: 70, energy: 60, mood: 75 },
    { name: 'Sat', focus: 60, energy: 90, mood: 95 },
    { name: 'Sun', focus: 65, energy: 85, mood: 90 }
  ];

  const goalProgressData = [
    { name: 'Career', value: 75, color: '#3B82F6' },
    { name: 'Health', value: 60, color: '#10B981' },
    { name: 'Finance', value: 85, color: '#F59E0B' },
    { name: 'Personal', value: 45, color: '#8B5CF6' }
  ];

  const timeTrackingData = [
    { activity: 'Deep Work', hours: 6, color: '#3B82F6' },
    { activity: 'Meetings', hours: 2, color: '#EF4444' },
    { activity: 'Learning', hours: 2, color: '#10B981' },
    { activity: 'Admin', hours: 1, color: '#F59E0B' },
    { activity: 'Break', hours: 1, color: '#8B5CF6' }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Productivity Trends */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Weekly Productivity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="focus" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Goal Progress */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Target className="h-5 w-5 text-green-600" />
            <span>Goal Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={goalProgressData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {goalProgressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Time Tracking */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Clock className="h-5 w-5 text-purple-600" />
            <span>Time Allocation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timeTrackingData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                type="category"
                dataKey="activity"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                width={80}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="hours" 
                fill="#8B5CF6"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Energy Levels */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Zap className="h-5 w-5 text-yellow-600" />
            <span>Energy Levels</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="energy" 
                stroke="#F59E0B" 
                fill="#FEF3C7"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="mood" 
                stroke="#10B981" 
                fill="#D1FAE5"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default LifeAnalyticsCharts;
