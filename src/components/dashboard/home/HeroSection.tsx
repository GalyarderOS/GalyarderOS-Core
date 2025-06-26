import { Badge } from '@/components/global/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { Crown, Sparkles, Award, TrendingUp, Calendar, Target, Brain, Activity } from 'lucide-react';
import { useIdentityStore } from '@/stores/useIdentityStore';

interface HeroSectionProps {
  stats: {
    totalPortfolioValue: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    totalDebt: number;
    wealthGoals: number;
    investments: number;
    activeHabits: number;
    habitStreak: number;
    focusHoursToday: number;
    notesCount: number;
    reflectionEntries: number;
    activeGoals: number;
    lifeBalanceScore: number;
    weeklyFocusHours: number;
    completedGoalsThisMonth: number;
    savingsRate: number;
  };
}

const HeroSection = ({ stats }: HeroSectionProps) => {
    const { language } = useTheme();
    const { identity } = useIdentityStore();
    const t = {
        en: {
          welcomeTitle: identity.title || "Your Personal OS",
          welcomeSubtitle: "Master life by design",
          welcomeDescription: "Your complete life system dashboard with real-time insights.",
          activeModules: "Active Modules",
          portfolioValue: "Portfolio Value",
          lifeBalance: "Life Balance",
          focusToday: "Focus Today"
        },
        id: {
          welcomeTitle: identity.title || "OS Pribadi Anda",
          welcomeSubtitle: "Hidup terancang, dikuasai!",
          welcomeDescription: "Dashboard sistem hidup lengkap dengan wawasan real-time.",
          activeModules: "Modul Aktif",
          portfolioValue: "Nilai Portofolio", 
          lifeBalance: "Keseimbangan Hidup",
          focusToday: "Fokus Hari Ini"
        }
      }[language];

    const heroStats = [
        { 
            label: t.activeModules, 
            value: "15", 
            icon: <Award className="h-5 w-5" />,
            color: "text-blue-600"
        },
        { 
            label: t.portfolioValue, 
            value: `$${stats.totalPortfolioValue.toLocaleString()}`, 
            icon: <TrendingUp className="h-5 w-5" />,
            color: "text-green-600"
        },
        { 
            label: t.lifeBalance, 
            value: `${stats.lifeBalanceScore}%`, 
            icon: <Activity className="h-5 w-5" />,
            color: "text-orange-600"
        },
        { 
            label: t.focusToday, 
            value: `${stats.focusHoursToday}h`, 
            icon: <Brain className="h-5 w-5" />,
            color: "text-purple-600"
        }
    ];

    return (
        <div className="rounded-2xl border border-border bg-card px-7 py-8 mb-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="p-3 bg-muted/30 rounded-xl border border-border">
                    <Crown className="h-8 w-8 text-muted-foreground" />
                  </span>
                  <div>
                    <Badge variant="outline" className="font-playfair text-xs border-muted-foreground/20">
                      Personal OS
                    </Badge>
                    <div className="text-muted-foreground font-playfair text-sm">Welcome back, {identity.fullName}</div>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold font-playfair leading-tight text-foreground">{t.welcomeTitle}</h1>
                <h2 className="text-xl font-medium text-muted-foreground font-playfair">{identity.mission || t.welcomeSubtitle}</h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl font-playfair">{t.welcomeDescription}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                  {heroStats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-start p-4 bg-muted/20 rounded-xl border border-border hover:bg-muted/30 transition-colors cursor-pointer">
                        <div className={`flex items-center gap-2 font-playfair ${stat.color}`}>
                          <span>{stat.icon}</span>
                          <span className="font-bold text-lg">{stat.value}</span>
                        </div>
                        <div className="text-xs text-muted-foreground font-playfair mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center">
              <div className="w-28 h-28 bg-muted/30 rounded-full flex items-center justify-center border-4 border-card hover:scale-105 transition-transform cursor-pointer">
                <Sparkles className="h-14 w-14 text-muted-foreground" />
              </div>
            </div>
        </div>
    );
};

export default HeroSection;
