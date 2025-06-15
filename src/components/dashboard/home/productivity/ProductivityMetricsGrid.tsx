
import { Timer, Zap, Calendar, Target } from 'lucide-react';

interface MetricProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  color: string;
}

const Metric = ({ icon: Icon, value, label, color }: MetricProps) => (
  <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4 text-center">
    <Icon className={`h-5 w-5 ${color} mx-auto mb-2`} />
    <div className="font-bold text-slate-800 dark:text-slate-100">{value}</div>
    <div className="text-xs text-slate-600 dark:text-slate-400">{label}</div>
  </div>
);

interface ProductivityMetricsGridProps {
  focusToday: number;
  focusWeek: number;
  activeHabits: number;
  habitStreak: number;
  translations: {
    today: string;
    week: string;
    habits: string;
    streak: string;
  }
}

const ProductivityMetricsGrid = ({
  focusToday,
  focusWeek,
  activeHabits,
  habitStreak,
  translations
}: ProductivityMetricsGridProps) => {
  const metrics = [
    { icon: Timer, value: `${focusToday}h`, label: translations.today, color: "text-purple-600" },
    { icon: Zap, value: `${focusWeek}h`, label: translations.week, color: "text-yellow-600" },
    { icon: Calendar, value: activeHabits, label: translations.habits, color: "text-green-600" },
    { icon: Target, value: habitStreak, label: translations.streak, color: "text-blue-600" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric, index) => (
        <Metric key={index} {...metric} />
      ))}
    </div>
  );
};

export default ProductivityMetricsGrid;
