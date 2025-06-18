import { motion } from 'framer-motion';
import { Award, Users, Zap, TrendingUp, Wifi, WifiOff } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Stats {
  totalPortfolioValue: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  totalDebt: number;
  wealthGoals: number;
  investments: number;
}

interface SystemStatsProps {
  stats: Stats;
  isConnected: boolean;
}

const SystemStats = ({ stats, isConnected }: SystemStatsProps) => {
    const { language } = useTheme();
    const t = {
        en: {
            totalModules: "Active Modules",
            globalUsers: "Global Users",
            aiPowered: "AI-Powered",
            portfolioValue: "Portfolio Value",
            connection: "Connection Status"
        },
        id: {
            totalModules: "Modul Aktif",
            globalUsers: "Pengguna Global",
            aiPowered: "Bertenaga AI",
            portfolioValue: "Nilai Portofolio",
            connection: "Status Koneksi"
        }
    }[language];

    const systemStats = [
        { 
            label: t.totalModules, 
            value: "13", 
            icon: <Award className="h-6 w-6" /> 
        },
        { 
            label: t.portfolioValue, 
            value: `$${stats.totalPortfolioValue.toLocaleString()}`, 
            icon: <TrendingUp className="h-6 w-6" /> 
        },
        { 
            label: t.connection, 
            value: isConnected ? "Online" : "Offline", 
            icon: isConnected ? <Wifi className="h-6 w-6" /> : <WifiOff className="h-6 w-6" /> 
        }
    ];

    return (
        <div className="grid grid-cols-3 gap-6">
            {systemStats.map((stat, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="text-center"
            >
                <div className="p-3 bg-muted/20 rounded-xl mx-auto w-fit mb-3 soft-shadow border border-border">
                {stat.icon}
                </div>
                <div className="text-2xl font-bold text-foreground font-playfair">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-playfair">{stat.label}</div>
            </motion.div>
            ))}
        </div>
    );
}

export default SystemStats;
