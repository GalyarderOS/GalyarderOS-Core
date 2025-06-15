
import { useMemo } from 'react';
import { DashboardStats } from '@/types/dashboard';
import { useTheme } from '@/contexts/ThemeContext';
import { productivityTranslations } from './productivity/translations';

export const useProductivityMetrics = (stats: DashboardStats) => {
  const { language } = useTheme();
  
  const t = language === 'id' ? productivityTranslations.id : productivityTranslations.en;

  const {
    productivityScore,
    scoreInfo,
    focusData,
  } = useMemo(() => {
    const focusScore = Math.round((stats.focusHoursToday / 8) * 100);
    const calculatedProductivityScore = Math.round(
      (focusScore * 0.4) +
      ((stats.activeHabits / 5) * 25) +
      ((stats.habitStreak / 7) * 25) +
      ((stats.activeGoals / 3) * 10)
    );

    const getScoreLabel = (score: number) => {
      if (score >= 80) return { label: t.excellent, color: 'bg-green-500' };
      if (score >= 60) return { label: t.good, color: 'bg-yellow-500' };
      return { label: t.needsWork, color: 'bg-red-500' };
    };

    const scoreInfo = getScoreLabel(calculatedProductivityScore);

    const focusData = [
      { name: 'Mon', hours: 6.5 },
      { name: 'Tue', hours: 7.2 },
      { name: 'Wed', hours: 5.8 },
      { name: 'Thu', hours: 8.1 },
      { name: 'Fri', hours: 7.5 },
      { name: 'Sat', hours: 4.2 },
      { name: 'Sun', hours: stats.focusHoursToday },
    ];

    return { 
      productivityScore: calculatedProductivityScore, 
      scoreInfo, 
      focusData 
    };
  }, [stats, t, language]);

  return { t, productivityScore, scoreInfo, focusData };
};
