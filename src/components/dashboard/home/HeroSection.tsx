
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { Crown, Sparkles } from 'lucide-react';
import SystemStats from './SystemStats';

const HeroSection = () => {
    const { language } = useTheme();
    const t = {
        en: {
          welcomeTitle: "Your Personal Operating System",
          welcomeSubtitle: "Master Your Life with AI-Powered Intelligence",
          welcomeDescription: "Access all your personal development and wealth management tools in one unified dashboard. From habits to investments, vision to focus - everything you need to live by design.",
        },
        id: {
          welcomeTitle: "Sistem Operasi Personal Anda",
          welcomeSubtitle: "Kuasai Hidup Anda dengan Kecerdasan AI",
          welcomeDescription: "Akses semua alat pengembangan diri dan manajemen kekayaan dalam satu dashboard terpadu. Dari kebiasaan hingga investasi, visi hingga fokus - semua yang Anda butuhkan untuk hidup sesuai desain.",
        }
      }[language];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden"
        >
            <div className="bg-gradient-to-br from-card/90 to-card/60 rounded-3xl p-12 border border-border/30 relative soft-shadow">
            <div className="absolute top-0 right-0 w-96 h-96 bg-muted/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-muted/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <div className="space-y-8 flex-1 max-w-3xl">
                    <div className="flex items-center space-x-4">
                    <div className="p-4 bg-muted/30 rounded-2xl soft-shadow border border-border">
                        <Crown className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div>
                        <Badge variant="outline" className="mb-2 border-muted-foreground/20 font-playfair">
                        Personal Operating System
                        </Badge>
                        <p className="text-muted-foreground font-playfair text-lg">Welcome back</p>
                    </div>
                    </div>
                    
                    <div>
                    <h1 className="text-6xl font-bold mb-6 font-playfair text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
                        {t.welcomeTitle}
                    </h1>
                    <h2 className="text-2xl font-semibold mb-4 text-muted-foreground font-playfair">
                        {t.welcomeSubtitle}
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-playfair">
                        {t.welcomeDescription}
                    </p>
                    </div>

                    <SystemStats />
                </div>

                <div className="hidden xl:block">
                    <div className="w-40 h-40 bg-gradient-to-br from-muted/30 to-muted/10 rounded-full flex items-center justify-center soft-shadow border-4 border-card">
                    <Sparkles className="h-20 w-20 text-muted-foreground" />
                    </div>
                </div>
                </div>
            </div>
            </div>
        </motion.div>
    );
};

export default HeroSection;
