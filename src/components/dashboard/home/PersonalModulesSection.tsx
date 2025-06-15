
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User, Calendar, Timer, BookOpen, Brain, FileText, Target } from 'lucide-react';

interface PersonalModulesSectionProps {
  onOpenAIAssistant: () => void;
  onOpenNotionAI: () => void;
}

const PersonalModulesSection = ({ onOpenAIAssistant, onOpenNotionAI }: PersonalModulesSectionProps) => {
    const { language } = useTheme();
    const navigate = useNavigate();

    const t = {
        en: { personalModules: "Personal Development", description: "Master your personal development with these powerful tools" },
        id: { personalModules: "Pengembangan Personal", description: "Kuasai pengembangan diri Anda dengan alat canggih ini" }
    }[language];

    const personalModules = [
        {
          title: language === 'id' ? 'Profil & Etos' : 'Profile & Ethos',
          description: language === 'id' ? 'Definisikan identitas dan nilai inti' : 'Define your identity and core values',
          icon: <User className="h-8 w-8" />,
          value: "Complete",
          change: "Profile Set",
          path: "/dashboard/profile",
          gradient: "from-blue-500/20 to-indigo-500/20"
        },
        {
          title: language === 'id' ? 'Visi & Roadmap' : 'Vision & Roadmap',
          description: language === 'id' ? 'Perencanaan strategis masa depan' : 'Strategic planning for your future',
          icon: <Target className="h-8 w-8" />,
          value: "5 Goals",
          change: "Active",
          path: "/dashboard/vision",
          gradient: "from-purple-500/20 to-pink-500/20"
        },
        {
          title: language === 'id' ? 'Ritual Harian' : 'Daily Rituals',
          description: language === 'id' ? 'Bangun dan lacak kebiasaan bermakna' : 'Build and track meaningful habits',
          icon: <Calendar className="h-8 w-8" />,
          value: "8 Habits",
          change: "75% Complete",
          path: "/dashboard/habits",
          gradient: "from-green-500/20 to-emerald-500/20"
        },
        {
          title: language === 'id' ? 'Timer Fokus' : 'Focus Timer',
          description: language === 'id' ? 'Sesi kerja mendalam dan produktivitas' : 'Deep work and productivity sessions',
          icon: <Timer className="h-8 w-8" />,
          value: "2.5 hrs",
          change: "Today",
          path: "/dashboard/focus",
          gradient: "from-orange-500/20 to-red-500/20"
        },
        {
          title: language === 'id' ? 'Brankas Memori' : 'Memory Vault',
          description: language === 'id' ? 'Manajemen pengetahuan dan wawasan' : 'Knowledge management and insights',
          icon: <BookOpen className="h-8 w-8" />,
          value: "24 Notes",
          change: "Organized",
          path: "/dashboard/memory",
          gradient: "from-cyan-500/20 to-blue-500/20"
        },
        {
          title: 'AI Assistant',
          description: language === 'id' ? 'Asisten personal cerdas' : 'Intelligent personal assistant',
          icon: <Brain className="h-8 w-8" />,
          value: "Active",
          change: "Ready",
          action: "ai-assistant",
          gradient: "from-violet-500/20 to-purple-500/20"
        },
        {
          title: 'Notion AI',
          description: language === 'id' ? 'Pencatatan ditingkatkan dengan AI' : 'Enhanced note-taking with AI',
          icon: <FileText className="h-8 w-8" />,
          value: "Synced",
          change: "Connected",
          action: "notion-ai",
          gradient: "from-teal-500/20 to-green-500/20"
        }
      ];

    const handleModuleClick = (module: any) => {
        if (module.path) {
          navigate(module.path);
        } else if (module.action === 'ai-assistant') {
          onOpenAIAssistant();
        } else if (module.action === 'notion-ai') {
          onOpenNotionAI();
        }
    };
    
    return (
        <div>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
            >
                <h2 className="text-4xl font-bold mb-4 font-playfair text-foreground">{t.personalModules}</h2>
                <p className="text-xl text-muted-foreground font-playfair max-w-2xl">
                    {t.description}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {personalModules.map((module, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.03, boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.1)" }}
                className="group cursor-pointer"
                onClick={() => handleModuleClick(module)}
                >
                <Card className="border-2 border-border group-hover:border-primary transition-all duration-300 bg-card/80 hover:bg-card soft-shadow group-hover:soft-shadow-lg h-full overflow-hidden">
                    <CardHeader className="pb-4">
                    <div className={`w-full h-24 bg-gradient-to-br ${module.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500 border border-border`}>
                        <div className="text-foreground">
                        {module.icon}
                        </div>
                    </div>
                    
                    <CardTitle className="text-lg font-bold font-playfair text-foreground group-hover:text-primary transition-colors">
                        {module.title}
                    </CardTitle>
                    <CardDescription className="font-playfair text-sm text-muted-foreground">
                        {module.description}
                    </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                        <div className="text-lg font-bold text-foreground font-playfair">{module.value}</div>
                        <div className="text-xs font-medium text-muted-foreground font-playfair">{module.change}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                    </CardContent>
                </Card>
                </motion.div>
            ))}
            </div>
      </div>
    );
};

export default PersonalModulesSection;
