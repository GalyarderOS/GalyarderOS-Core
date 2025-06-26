
import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/global/ui/card';
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
    { name: 'Career', value: 75, color: 'hsl(var(--chart-1))' },
    { name: 'Health', value: 60, color: 'hsl(var(--chart-2))' },
    { name: 'Finance', value: 85, color: 'hsl(var(--chart-3))' },
    { name: 'Personal', value: 45, color: 'hsl(var(--chart-4))' }
  ];

  const timeTrackingData = [
    { activity: 'Deep Work', hours: 6, color: 'hsl(var(--chart-1))' },
    { activity: 'Meetings', hours: 2, color: 'hsl(var(--chart-5))' },
    { activity: 'Learning', hours: 2, color: 'hsl(var(--chart-2))' },
    { activity: 'Admin', hours: 1, color: 'hsl(var(--chart-3))' },
    { activity: 'Break', hours: 1, color: 'hsl(var(--chart-4))' }
  ];
  
  const tooltipStyle = {
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    border: '1px solid hsl(var(--border))',
    borderRadius: 'var(--radius)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Productivity Trends */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <TrendingUp className="h-5 w-5 text-chart-1" />
            <span>Weekly Productivity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke={'hsl(var(--border))'} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Line 
                type="monotone" 
                dataKey="focus" 
                stroke={'hsl(var(--chart-1))'}
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--chart-1))', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke={'hsl(var(--chart-2))'}
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--chart-2))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Goal Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Target className="h-5 w-5 text-chart-2" />
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
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Time Tracking */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Clock className="h-5 w-5 text-chart-4" />
            <span>Time Allocation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timeTrackingData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={'hsl(var(--border))'} />
              <XAxis 
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                type="category"
                dataKey="activity"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                width={80}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar 
                dataKey="hours" 
                radius={[0, 4, 4, 0]}
              >
                {timeTrackingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Energy Levels */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Zap className="h-5 w-5 text-chart-3" />
            <span>Energy Levels</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={productivityData}>
              <defs>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={'hsl(var(--chart-3))'} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={'hsl(var(--chart-3))'} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={'hsl(var(--chart-2))'} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={'hsl(var(--chart-2))'} stopOpacity={0}/>
                  </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={'hsl(var(--border))'} />
              <XAxis 
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Area 
                type="monotone" 
                dataKey="energy" 
                stroke={'hsl(var(--chart-3))'}
                fill="url(#colorEnergy)"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="mood" 
                stroke={'hsl(var(--chart-2))'}
                fill="url(#colorMood)"
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
