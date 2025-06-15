
import LifeOverviewSection from './LifeOverviewSection';
import PersonalSystemsGrid from './PersonalSystemsGrid';
import FinancialHealthSection from './FinancialHealthSection';
import ProductivityMetrics from './ProductivityMetrics';
import LifeAnalyticsCharts from './LifeAnalyticsCharts';
import { DashboardStats } from '@/types/dashboard';

interface DashboardContentProps {
  stats: DashboardStats;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ stats }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <LifeOverviewSection stats={stats} />
      <PersonalSystemsGrid
        activeRituals={stats.activeRituals}
        ritualStreak={stats.ritualStreak}
        focusHoursToday={stats.focusHoursToday}
        weeklyFocusHours={stats.weeklyFocusHours}
        notesCount={stats.notesCount}
        reflectionEntries={stats.reflectionEntries}
        activeGoals={stats.activeGoals}
        completedGoalsThisMonth={stats.completedGoalsThisMonth}
        calendarEventsThisWeek={stats.calendarEventsThisWeek}
        notionPagesCount={stats.notionPagesCount}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <FinancialHealthSection stats={stats} />
        <ProductivityMetrics stats={stats} />
      </div>
      <LifeAnalyticsCharts />
    </div>
  );
};

export default DashboardContent;
