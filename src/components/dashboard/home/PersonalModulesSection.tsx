
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight, User, Calendar, Timer, BookOpen, Brain, FileText, Target } from "lucide-react";

interface PersonalModulesSectionProps {
  onOpenAIAssistant: () => void;
  onOpenNotionAI: () => void;
}

const getInitialModules = (language: string) => [
  {
    title: language === "id" ? "Profil & Etos" : "Profile & Ethos",
    description: language === "id" ? "Definisikan identitas dan nilai inti" : "Define your identity and core values",
    icon: <User className="h-8 w-8" />,
    value: "Complete",
    change: "Profile Set",
    path: "/dashboard/profile",
    gradient: "from-blue-400/50 via-indigo-400/40 to-indigo-300/60",
  },
  {
    title: language === "id" ? "Visi & Roadmap" : "Vision & Roadmap",
    description: language === "id" ? "Perencanaan strategis masa depan" : "Strategic planning for your future",
    icon: <Target className="h-8 w-8" />,
    value: "5 Goals",
    change: "Active",
    path: "/dashboard/vision",
    gradient: "from-purple-400/50 via-pink-400/40 to-pink-300/60",
  },
  {
    title: language === "id" ? "Ritual Harian" : "Daily Rituals",
    description: language === "id" ? "Bangun dan lacak kebiasaan bermakna" : "Build and track meaningful habits",
    icon: <Calendar className="h-8 w-8" />,
    value: "8 Habits",
    change: "75% Complete",
    path: "/dashboard/habits",
    gradient: "from-green-400/50 via-emerald-400/40 to-emerald-300/60",
  },
  {
    title: language === "id" ? "Timer Fokus" : "Focus Timer",
    description: language === "id" ? "Sesi kerja mendalam dan produktivitas" : "Deep work and productivity sessions",
    icon: <Timer className="h-8 w-8" />,
    value: "2.5 hrs",
    change: "Today",
    path: "/dashboard/focus",
    gradient: "from-orange-400/50 via-red-400/40 to-red-300/60",
  },
  {
    title: language === "id" ? "Brankas Memori" : "Memory Vault",
    description: language === "id" ? "Manajemen pengetahuan dan wawasan" : "Knowledge management and insights",
    icon: <BookOpen className="h-8 w-8" />,
    value: "24 Notes",
    change: "Organized",
    path: "/dashboard/memory",
    gradient: "from-cyan-400/50 via-blue-400/40 to-blue-300/60",
  },
  {
    title: "AI Assistant",
    description: language === "id" ? "Asisten personal cerdas" : "Intelligent personal assistant",
    icon: <Brain className="h-8 w-8" />,
    value: "Active",
    change: "Ready",
    action: "ai-assistant",
    gradient: "from-violet-400/50 via-purple-400/40 to-purple-300/60",
  },
  {
    title: "Notion AI",
    description: language === "id" ? "Pencatatan ditingkatkan dengan AI" : "Enhanced note-taking with AI",
    icon: <FileText className="h-8 w-8" />,
    value: "Synced",
    change: "Connected",
    action: "notion-ai",
    gradient: "from-teal-400/50 via-green-400/40 to-green-300/60",
  },
];

const PersonalModulesSection = ({ onOpenAIAssistant, onOpenNotionAI }: PersonalModulesSectionProps) => {
  const { language } = useTheme();
  const navigate = useNavigate();
  const [modules, setModules] = useState(getInitialModules(language));
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const rippleRefs = useRef<{ [key: number]: HTMLSpanElement | null }>({});

  const t = {
    en: {
      personalModules: "Personal Development",
      description: "Master your personal development with these powerful tools"
    },
    id: {
      personalModules: "Pengembangan Personal",
      description: "Kuasai pengembangan diri Anda dengan alat canggih ini"
    }
  }[language];

  const handleDragStart = (idx: number) => setDraggedIdx(idx);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;
    const copied = [...modules];
    const [removed] = copied.splice(draggedIdx, 1);
    copied.splice(idx, 0, removed);
    setDraggedIdx(idx);
    setModules(copied);
  };
  const handleDragEnd = () => setDraggedIdx(null);

  // TILT / 3D parallax effect
  const handlePointerMove = (idx: number, e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2, midY = rect.height / 2;
    const rotateY = (x - midX) / midX * 10;
    const rotateX = -((y - midY) / midY * 10);
    target.style.transform = `perspective(600px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.035)`;
    target.style.boxShadow = `0 20px 44px -12px rgba(91,109,255,0.13), 0 0 48px 16px rgba(125,55,255,0.08)`;
  };
  const handlePointerLeave = (idx: number, e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    target.style.transform = `perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)`;
    target.style.boxShadow = '';
  };

  // RIPPLE EFFECT
  const triggerRipple = (idx: number, e: React.MouseEvent) => {
    const el = rippleRefs.current[idx];
    if (!el) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.12;
    el.style.width = el.style.height = `${size}px`;
    el.style.left = `${e.clientX - rect.left - size / 2}px`;
    el.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.classList.remove("animate-ripple-effect");
    void el.offsetWidth;
    el.classList.add("animate-ripple-effect");
  };

  const handleModuleClick = (module: any, idx: number, e: React.MouseEvent) => {
    triggerRipple(idx, e);
    setTimeout(() => {
      if (module.path) navigate(module.path);
      else if (module.action === "ai-assistant") onOpenAIAssistant();
      else if (module.action === "notion-ai") onOpenNotionAI();
    }, 150);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
        {modules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.07 + 0.41, type: "spring", stiffness: 100 }}
            whileTap={{ scale: 0.97 }}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={e => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`group cursor-pointer select-none relative transition-transform duration-300 will-change-transform
                ${draggedIdx === index ? "scale-95 brightness-90 z-50 pointer-events-none" : ""}
              `}
            style={{}}
            tabIndex={0}
            onPointerMove={e => handlePointerMove(index, e)}
            onPointerLeave={e => handlePointerLeave(index, e)}
            onClick={e => handleModuleClick(module, index, e)}
          >
            <Card className="relative overflow-hidden border-2 border-border group-hover:border-primary/70 transition-all duration-500 bg-card/85 group-hover:bg-card/95 soft-shadow group-hover:soft-shadow-2xl h-full backdrop-blur-md"
              style={{
                // Subtle border + glow and extra depth
                boxShadow: "0 8px 36px -8px rgba(98,105,245,0.14), 0 0 100px 36px rgba(149,30,250,0.05)",
                transition: "box-shadow 0.23s cubic-bezier(0.4,0,0.2,1),transform 0.16s"
              }}
            >
              {/* Ripple effect */}
              <span
                ref={el => (rippleRefs.current[index] = el)}
                className="pointer-events-none absolute rounded-full bg-primary/25 opacity-70 scale-100 z-10"
                style={{ transform: "scale(0)", transition: "transform 0.38s" }}
              ></span>
              {/* Animated BG Gradient */}
              <motion.div
                className={`absolute z-0 left-1/2 top-0 w-[115%] h-32 -translate-x-1/2 blur-2xl rounded-xl opacity-60 group-hover:opacity-100 animate-gradient-move`}
                style={{
                  background: `linear-gradient(90deg, var(--tw-gradient-stops))`,
                }}
                initial={{ opacity: 0.72, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.09 * index }}
              >
                <div className={`w-full h-full bg-gradient-to-br ${module.gradient}`}></div>
              </motion.div>
              <CardHeader className="pb-4 relative z-10">
                <div
                  className={`w-full h-24 bg-gradient-to-br ${module.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 border border-border`}
                  style={{
                    boxShadow: "0 0 32px 6px rgba(92,122,240,0.07)"
                  }}
                >
                  <div className="text-foreground drop-shadow-lg">
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
              <CardContent className="space-y-4 relative z-10">
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
      {/* Ripple & BG animation styles */}
      <style>{`
        .animate-ripple-effect {
          animation: ripple-effect 0.7s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes ripple-effect {
          from { transform: scale(0); opacity: 0.95; }
          70%  { transform: scale(2.1); opacity: 0.6; }
          to   { transform: scale(2.3); opacity: 0; }
        }
        @keyframes gradient-move {
          0% { filter: blur(24px) brightness(0.91); opacity: 0.69;}
          100% { filter: blur(29px) brightness(1.12); opacity: 0.98; }
        }
        .animate-gradient-move {
          animation: gradient-move 3.2s alternate infinite;
        }
      `}</style>
    </div>
  );
};

export default PersonalModulesSection;
