
import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target, Clock, Zap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const LifeAnalyticsCharts = () => {
  const { theme } = useTheme();
  const [chartColors, setChartColors] = useState({
    grid: 'hsl(var(--border))',
    tick: 'hsl(var(--muted-foreground))',
    tooltipBg: 'hsl(var(--popover))',
    tooltipText: 'hsl(var(--popover-foreground))',
    area1Fill: theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7',
    area2Fill: theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#D1FAE5',
  });

  useEffect(() => {
    // This ensures that the CSS variables have been applied before we read them.
    const timeoutId = setTimeout(() => {
      const rootStyles = getComputedStyle(document.documentElement);
      setChartColors({
        grid: `hsl(${rootStyles.getPropertyValue('--border').trim()})`,
        tick: `hsl(${rootStyles.getPropertyValue('--muted-foreground').trim()})`,
        tooltipBg: `hsl(${rootStyles.getPropertyValue('--popover').trim()})`,
        tooltipText: `hsl(${rootStyles.getPropertyValue('--popover-foreground').trim()})`,
        area1Fill: theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7',
        area2Fill: theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#D1FAE5',
      });
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [theme]);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Productivity Trends */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Weekly Productivity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: chartColors.tick }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: chartColors.tick }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: chartColors.tooltipBg, 
                  color: chartColors.tooltipText,
                  border: '1px solid hsl(var(--border))', 
                  borderRadius: 'var(--radius)',
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
      <Card>
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
                  backgroundColor: chartColors.tooltipBg,
                  color: chartColors.tooltipText,
                  border: '1px solid hsl(var(--border))', 
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Time Tracking */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Clock className="h-5 w-5 text-purple-600" />
            <span>Time Allocation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timeTrackingData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis 
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: chartColors.tick }}
              />
              <YAxis 
                type="category"
                dataKey="activity"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: chartColors.tick }}
                width={80}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: chartColors.tooltipBg,
                  color: chartColors.tooltipText,
                  border: '1px solid hsl(var(--border))', 
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
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
            <Zap className="h-5 w-5 text-yellow-600" />
            <span>Energy Levels</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis 
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: chartColors.tick }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: chartColors.tick }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: chartColors.tooltipBg, 
                  color: chartColors.tooltipText,
                  border: '1px solid hsl(var(--border))', 
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="energy" 
                stroke="#F59E0B" 
                fill={chartColors.area1Fill}
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="mood" 
                stroke="#10B981" 
                fill={chartColors.area2Fill}
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
