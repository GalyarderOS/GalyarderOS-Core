import { 
  LayoutDashboard,
  User,
  Target,
  Calendar,
  Timer,
  Sparkles,
  FileText,
  TrendingUp,
  DollarSign,
  Receipt,
  Building,
  Calculator,
  CreditCard,
  Settings,
  Activity,
  CheckCircle,
  BookOpen,
  BookMarked
} from 'lucide-react';
import { Module } from './types';

export const getDashboardModules = (
  language: string, 
  onOpenAIAssistant?: () => void, 
  onOpenNotionAI?: () => void
): Module[] => {
  return [
    { 
      id: 'dashboard', 
      label: language === 'id' ? 'Beranda' : 'Home', 
      icon: LayoutDashboard, 
      path: '/dashboard',
      category: 'personal',
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      id: 'identity', 
      label: language === 'id' ? 'Identitas' : 'Identity Core', 
      icon: User, 
      path: '/dashboard/identity',
      category: 'personal',
      color: 'from-purple-500 to-pink-600'
    },
    { 
      id: 'vision', 
      label: language === 'id' ? 'Visi' : 'Vision Architecture', 
      icon: Target, 
      path: '/dashboard/vision',
      category: 'personal',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      id: 'balance', 
      label: language === 'id' ? 'Keseimbangan' : 'Life Balance', 
      icon: Activity, 
      path: '/dashboard/balance',
      category: 'personal',
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      id: 'ritual', 
      label: language === 'id' ? 'Ritual' : 'Ritual Engine', 
      icon: CheckCircle, 
      path: '/dashboard/ritual',
      category: 'personal',
      color: 'from-teal-500 to-cyan-600'
    },
    { 
      id: 'calendar', 
      label: language === 'id' ? 'Kalender' : 'Calendar', 
      icon: Calendar, 
      path: '/dashboard/calendar',
      category: 'personal',
      color: 'from-orange-500 to-red-600'
    },
    { 
      id: 'focus', 
      label: language === 'id' ? 'Timer Fokus' : 'Focus Timer', 
      icon: Timer, 
      path: '/dashboard/focus',
      category: 'personal',
      color: 'from-cyan-500 to-blue-600'
    },
    { 
      id: 'knowledge', 
      label: language === 'id' ? 'Pengetahuan' : 'Knowledge Hub', 
      icon: BookOpen, 
      path: '/dashboard/knowledge',
      category: 'personal',
      color: 'from-violet-500 to-purple-600'
    },
    { 
      id: 'reflection', 
      label: language === 'id' ? 'Refleksi' : 'Reflection', 
      icon: BookMarked, 
      path: '/dashboard/reflection',
      category: 'personal',
      color: 'from-indigo-500 to-purple-600'
    },
    { 
      id: 'analytics', 
      label: language === 'id' ? 'Analitik' : 'Life Analytics', 
      icon: TrendingUp, 
      path: '/dashboard/analytics',
      category: 'personal',
      color: 'from-pink-500 to-rose-600'
    },
    { 
      id: 'ai-assistant', 
      label: 'AI Assistant', 
      icon: Sparkles, 
      action: onOpenAIAssistant,
      category: 'ai',
      color: 'from-pink-500 to-rose-600'
    },
    { 
      id: 'notion-ai', 
      label: 'Notion AI', 
      icon: FileText, 
      action: onOpenNotionAI,
      category: 'ai',
      color: 'from-teal-500 to-green-600'
    },
    { 
      id: 'investments', 
      label: language === 'id' ? 'Investasi' : 'Investments', 
      icon: DollarSign, 
      path: '/dashboard/investments',
      category: 'finance',
      color: 'from-yellow-500 to-orange-600'
    },
    { 
      id: 'cashflow', 
      label: language === 'id' ? 'Arus Kas' : 'Cashflow', 
      icon: DollarSign, 
      path: '/dashboard/cashflow',
      category: 'finance',
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      id: 'expenses', 
      label: language === 'id' ? 'Pengeluaran' : 'Expenses', 
      icon: Receipt, 
      path: '/dashboard/expenses',
      category: 'finance',
      color: 'from-red-500 to-pink-600'
    },
    { 
      id: 'wealth', 
      label: language === 'id' ? 'Kekayaan' : 'Wealth', 
      icon: Building, 
      path: '/dashboard/wealth',
      category: 'finance',
      color: 'from-indigo-500 to-purple-600'
    },
    { 
      id: 'tax', 
      label: language === 'id' ? 'Pajak' : 'Tax', 
      icon: Calculator, 
      path: '/dashboard/tax',
      category: 'finance',
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      id: 'debt', 
      label: language === 'id' ? 'Hutang' : 'Debt', 
      icon: CreditCard, 
      path: '/dashboard/debt',
      category: 'finance',
      color: 'from-orange-500 to-yellow-600'
    },
    { 
      id: 'settings', 
      label: language === 'id' ? 'Pengaturan' : 'Settings', 
      icon: Settings, 
      path: '/dashboard/settings',
      category: 'system',
      color: 'from-gray-500 to-slate-600'
    }
  ];
};
