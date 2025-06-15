
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  Timer,
  BookOpen,
  Brain,
  FileText,
  Target,
  Settings
} from "lucide-react";
import { useInteractiveGrid } from "@/hooks/useInteractiveGrid";
import { useRealTimeData } from "@/hooks/useRealTimeData";
import InteractiveCard from "./InteractiveCard";

interface EnhancedPersonalModulesSectionProps {
  onOpenAIAssistant: () => void;
  onOpenNotionAI: () => void;
}

// Module group definitions for digital soul structure
const SOUL_MODULES = [
  {
    group: "Digital Soul Layer",
    color: "from-primary to-muted/50",
    modules: [
      {
        id: "profile",
        titleKey: "profileTitle",
        descKey: "profileDesc",
        icon: <User className="h-8 w-8" />,
        value: "Complete",
        change: "Profile Set",
        path: "/dashboard/profile",
        gradient: "from-blue-400/50 via-indigo-400/40 to-indigo-300/60"
      },
      {
        id: "vision",
        titleKey: "visionTitle",
        descKey: "visionDesc",
        icon: <Target className="h-8 w-8" />,
        value: "5 Goals",
        change: "Active",
        path: "/dashboard/vision",
        gradient: "from-purple-400/50 via-pink-400/40 to-pink-300/60"
      },
    ],
  },
  {
    group: "Ritual Engine",
    color: "from-green-500 to-emerald-300",
    modules: [
      {
        id: "habits",
        titleKey: "habitsTitle",
        descKey: "habitsDesc",
        icon: <Calendar className="h-8 w-8" />,
        valueKey: "habits",
        change: "75% Complete",
        path: "/dashboard/habits",
        gradient: "from-green-400/50 via-emerald-400/40 to-emerald-300/60"
      },
      {
        id: "focus",
        titleKey: "focusTitle",
        descKey: "focusDesc",
        icon: <Timer className="h-8 w-8" />,
        valueKey: "focus",
        change: "Today",
        path: "/dashboard/focus",
        gradient: "from-orange-400/50 via-red-400/40 to-red-300/60"
      }
    ]
  },
  {
    group: "Knowledge System",
    color: "from-blue-500 to-blue-300",
    modules: [
      {
        id: "memory",
        titleKey: "memoryTitle",
        descKey: "memoryDesc",
        icon: <BookOpen className="h-8 w-8" />,
        value: "24 Notes",
        change: "Organized",
        path: "/dashboard/memory",
        gradient: "from-cyan-400/50 via-blue-400/40 to-blue-300/60"
      }
    ]
  },
  {
    group: "AI Integration",
    color: "from-pink-500 to-rose-300",
    modules: [
      {
        id: "ai-assistant",
        title: "AI Assistant",
        descKey: "aiAssistantDesc",
        icon: <Brain className="h-8 w-8" />,
        value: "Active",
        change: "Ready",
        action: "ai-assistant",
        gradient: "from-violet-400/50 via-purple-400/40 to-purple-300/60"
      },
      {
        id: "notion-ai",
        title: "Notion AI",
        descKey: "notionAIDesc",
        icon: <FileText className="h-8 w-8" />,
        value: "Synced",
        change: "Connected",
        action: "notion-ai",
        gradient: "from-teal-400/50 via-green-400/40 to-green-300/60"
      }
    ]
  }
];

const trans = {
  en: {
    personalModules: "Personal System",
    description: "Master your development and soul layer with these powerful life modules",
    connected: "Live Data Connected",
    offline: "Offline Mode",
    profileTitle: "Profile & Ethos",
    profileDesc: "Define your identity and core values",
    visionTitle: "Vision & Roadmap",
    visionDesc: "Strategic planning for your future",
    habitsTitle: "Daily Rituals",
    habitsDesc: "Build and track meaningful habits",
    focusTitle: "Focus Timer",
    focusDesc: "Deep work and productivity sessions",
    memoryTitle: "Memory Vault",
    memoryDesc: "Knowledge management and insights",
    aiAssistantDesc: "Intelligent personal assistant",
    notionAIDesc: "Enhanced note-taking with AI"
  },
  id: {
    personalModules: "Sistem Pribadi",
    description: "Kuasai pengembangan dan soul layer Anda dengan modul-modul kehidupan canggih",
    connected: "Data Live Terhubung",
    offline: "Mode Offline",
    profileTitle: "Profil & Etos",
    profileDesc: "Definisikan identitas dan nilai inti",
    visionTitle: "Visi & Roadmap",
    visionDesc: "Perencanaan strategis masa depan",
    habitsTitle: "Ritual Harian",
    habitsDesc: "Bangun dan lacak kebiasaan bermakna",
    focusTitle: "Timer Fokus",
    focusDesc: "Sesi kerja mendalam dan produktivitas",
    memoryTitle: "Brankas Memori",
    memoryDesc: "Manajemen pengetahuan dan wawasan",
    aiAssistantDesc: "Asisten personal cerdas",
    notionAIDesc: "Pencatatan ditingkatkan dengan AI"
  }
};

const EnhancedPersonalModulesSection = ({
  onOpenAIAssistant,
  onOpenNotionAI
}: EnhancedPersonalModulesSectionProps) => {
  const { language } = useTheme();
  const t = trans[language];
  const navigate = useNavigate();
  const { data: realTimeData, isConnected } = useRealTimeData();

  // Compose all modules for drag/reorder (still flat list for drag logic)
  const digitalSoulFlat = SOUL_MODULES.flatMap((group) =>
    group.modules.map((mod) => {
      // Dynamic values for realTimeData
      let value = mod.value;
      if (mod.valueKey === "habits" && realTimeData.habits)
        value = `${Math.floor(realTimeData.habits)}%`;
      if (mod.valueKey === "focus" && realTimeData.focus)
        value = `${realTimeData.focus.toFixed(1)} hrs`;

      return {
        ...mod,
        title: mod.title || t[mod.titleKey] || "",
        description: t[mod.descKey] || "",
        value,
        group: group.group,
        gradient: mod.gradient,
        path: mod.path,
        action: mod.action
      };
    })
  );

  // Attach drag/reorder logic to flat module list
  const {
    items,
    draggedItem,
    isReordering,
    gridRef,
    handleDragStart,
    handleDragEnd,
    reorderItems
  } = useInteractiveGrid(digitalSoulFlat);

  // Helper: get items for a group
  const groupItems = (groupName: string) =>
    items.filter((mod) => mod.group === groupName);

  // Enhanced 3D parallax effect
  const handlePointerMove = (index: number, e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = (x - midX) / midX * 15;
    const rotateX = -((y - midY) / midY * 15);
    target.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05) translateZ(20px)`;
    target.style.boxShadow = `0 25px 50px -12px rgba(0,0,0,0.25), 0 0 60px 20px rgba(126,34,206,0.15)`;
    target.style.zIndex = '10';
  };

  const handlePointerLeave = (index: number, e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    target.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1) translateZ(0px)`;
    target.style.boxShadow = '';
    target.style.zIndex = '1';
  };

  const handleModuleClick = (module: any) => {
    if (module.path) navigate(module.path);
    else if (module.action === "ai-assistant") onOpenAIAssistant();
    else if (module.action === "notion-ai") onOpenNotionAI();
  };

  // Section background
  return (
    <div className="relative">
      {/* Premium animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 relative z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold mb-4 font-playfair text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              {t.personalModules}
            </h2>
            <p className="text-xl text-muted-foreground font-playfair max-w-2xl">
              {t.description}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ scale: isConnected ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
                isConnected 
                  ? 'bg-green-500/10 border-green-500/20 text-green-600' 
                  : 'bg-red-500/10 border-red-500/20 text-red-600'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
              <span className="text-sm font-medium">{isConnected ? t.connected : t.offline}</span>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl bg-card border border-border hover:bg-muted/50 transition-colors"
            >
              <Settings className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
      <div className="relative z-10 space-y-8">
        {/* Render group sections in GalyarderOS Digital Soul Layer style */}
        {SOUL_MODULES.map((group, idx) => (
          <section key={group.group} className="space-y-5">
            <div className="flex items-baseline space-x-5">
              <h3 className="text-2xl font-extrabold font-playfair text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">{group.group}</h3>
              <span className={`h-2 w-2 rounded-full ${group.color.split(" ")[0]} block`} />
            </div>
            <div
              ref={idx === 0 ? gridRef : undefined}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {groupItems(group.group).map((module, index) => (
                <InteractiveCard
                  key={module.id}
                  item={module}
                  index={index}
                  onPointerMove={(e) => handlePointerMove(index, e)}
                  onPointerLeave={(e) => handlePointerLeave(index, e)}
                  onClick={() => handleModuleClick(module)}
                  onDragStart={() => handleDragStart(module.id)}
                  onDragEnd={handleDragEnd}
                  onContextMenu={() => {}}
                  isDragging={draggedItem === module.id}
                />
              ))}
            </div>
          </section>
        ))}
        {/* Floating action hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex items-center justify-center space-x-4 text-muted-foreground text-sm pt-8"
        >
          <span>Drag to reorder</span>
          <span>•</span>
          <span>Right-click for options</span>
          <span>•</span>
          <span>Press ⌘K for commands</span>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedPersonalModulesSection;
