
// Minimal hero, clean structure, consistent with "Digital Soul Layer"
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { Crown, Sparkles, Award, TrendingUp, Wifi } from 'lucide-react';

const HeroSection = () => {
    const { language } = useTheme();
    const t = {
        en: {
          welcomeTitle: "Your Personal OS",
          welcomeSubtitle: "Master life by design",
          welcomeDescription: "Access all your personal development and wealth tools from one dashboard.",
          totalModules: "Active Modules",
          portfolioValue: "Portfolio Value",
          connection: "Connection"
        },
        id: {
          welcomeTitle: "OS Pribadi Anda",
          welcomeSubtitle: "Hidup terancang, dikuasai!",
          welcomeDescription: "Akses seluruh alat pengembangan diri & keuangan di satu dashboard.",
          totalModules: "Modul Aktif",
          portfolioValue: "Nilai Portofolio",
          connection: "Koneksi"
        }
      }[language];

    const heroStats = [
        { 
            label: t.totalModules, 
            value: "13", 
            icon: <Award className="h-5 w-5" /> 
        },
        { 
            label: t.portfolioValue, 
            value: "$0", 
            icon: <TrendingUp className="h-5 w-5" /> 
        },
        { 
            label: t.connection, 
            value: "Online", 
            icon: <Wifi className="h-5 w-5" /> 
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
                    <div className="text-muted-foreground font-playfair text-sm">Welcome back</div>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold font-playfair leading-tight text-foreground">{t.welcomeTitle}</h1>
                <h2 className="text-xl font-medium text-muted-foreground font-playfair">{t.welcomeSubtitle}</h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl font-playfair">{t.welcomeDescription}</p>
                <div className="flex gap-8 mt-2">
                  {heroStats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-start">
                        <div className="flex items-center gap-2 text-foreground font-playfair">
                          <span>{stat.icon}</span>
                          <span className="font-bold text-lg">{stat.value}</span>
                        </div>
                        <div className="text-xs text-muted-foreground font-playfair">{stat.label}</div>
                    </div>
                  ))}
                </div>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center">
              <div className="w-28 h-28 bg-muted/30 rounded-full flex items-center justify-center border-4 border-card">
                <Sparkles className="h-14 w-14 text-muted-foreground" />
              </div>
            </div>
        </div>
    );
};

export default HeroSection;

