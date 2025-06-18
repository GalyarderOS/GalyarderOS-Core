import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { LucideIcon } from 'lucide-react';

interface Module {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

interface DesktopGridProps {
  modules: Module[];
  onModuleClick: (module: Module) => void;
  onModuleOpen: (moduleId: string) => void;
}

// GalyarderOS "Digital Soul Layer" groups
const CATEGORY_CONFIG = [
  {
    key: 'core',
    label: 'Digital Soul Layer',
    description: 'Your core OS modules for life design and personal mastery.',
    color: 'from-primary to-muted/50',
    modules: ['dashboard', 'command', 'identity', 'vision', 'balance'],
  },
  {
    key: 'ritual',
    label: 'Ritual Engine',
    description: 'Habits and routines to power your day.',
    color: 'from-green-500 to-emerald-300',
    modules: ['habits', 'flow', 'reflection'],
  },
  {
    key: 'knowledge',
    label: 'Knowledge System',
    description: 'Harness your mind: memory, learning, analytics.',
    color: 'from-blue-500 to-blue-300',
    modules: ['memory', 'analytics'],
  },
  {
    key: 'finance',
    label: 'Financial Core',
    description: 'Build, track, and optimize wealth.',
    color: 'from-yellow-500 to-amber-300',
    modules: [
      'investments',
      'cashflow',
      'expenses',
      'wealth',
      'tax',
      'debt',
    ],
  },
  {
    key: 'ai',
    label: 'AI/Integration',
    description: 'Seamless connection with AI and Notion.',
    color: 'from-pink-500 to-rose-300',
    modules: ['ai-assistant', 'notion-ai'],
  },
  {
    key: 'system',
    label: 'System & Settings',
    description: 'Manage your OS and settings.',
    color: 'from-gray-400 to-slate-300',
    modules: ['settings'],
  },
];

function normalizeId(id: string) {
  // Map legacy module ids to digital soul vocab
  switch (id) {
    case 'profile':
      return 'identity';
    case 'focus':
      return 'flow';
    case 'dashboard':
      return 'dashboard';
    case 'vision':
      return 'vision';
    case 'habits':
      return 'habits';
    case 'memory':
      return 'memory';
    case 'investments':
      return 'investments';
    case 'cashflow':
      return 'cashflow';
    case 'expenses':
      return 'expenses';
    case 'wealth':
      return 'wealth';
    case 'tax':
      return 'tax';
    case 'debt':
      return 'debt';
    case 'settings':
      return 'settings';
    case 'ai-assistant':
      return 'ai-assistant';
    case 'notion-ai':
      return 'notion-ai';
    // Add more legacy-to-digital mapping as needed
    default:
      return id;
  }
}

// You must preserve the dock's ability to open modules by id

const DesktopGrid = ({ modules, onModuleClick, onModuleOpen }: DesktopGridProps) => {
  const { data: realTimeData, isConnected } = useRealTimeData();

  // Build category lists with normalized ids (to future-proof new module names)
  const categorized = CATEGORY_CONFIG.map((cat) => ({
    ...cat,
    items: modules
      .filter((mod) => cat.modules.includes(normalizeId(mod.id)))
      .map((mod) => ({
        ...mod,
        _groupLabel: cat.label,
      })),
  }));

  const ModuleCard = ({ module }: { module: Module }) => {
    const Icon = module.icon;
    return (
      <div
        className="group cursor-pointer rounded-xl border border-border bg-card hover:border-primary/60 hover:shadow-lg transition duration-150 select-none overflow-hidden"
        onClick={() => onModuleClick(module)}
        onDoubleClick={() => onModuleOpen(module.id)}
      >
        <Card className="border-none shadow-none h-full">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 bg-gradient-to-tr ${module.color} rounded-2xl flex items-center justify-center`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span className="ml-4 text-lg font-semibold font-playfair text-foreground group-hover:text-primary transition-colors truncate">{module.label}</span>
            </div>
            {isConnected && ['habits', 'flow', 'investments'].includes(module.id) && (
              <div className="flex items-center space-x-2 mt-auto">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-green-600 font-medium font-playfair">Live</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {categorized.map(
        (cat) =>
          cat.items.length > 0 && (
            <section key={cat.key} className="space-y-5">
              <div className="flex items-baseline space-x-5">
                <h2 className="text-2xl font-bold leading-none font-playfair text-foreground">
                  {cat.label}
                </h2>
                <Badge variant="secondary" className="font-playfair">
                  {cat.items.length} modules
                </Badge>
                {cat.description && (
                  <span className="text-base text-muted-foreground hidden md:inline font-playfair">
                    {cat.description}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cat.items.map((mod) => (
                  <ModuleCard key={mod.id} module={mod} />
                ))}
              </div>
            </section>
          )
      )}
      <div className="text-center mt-12">
        <p className="text-muted-foreground">
          Double-click modules to open in windows • Press ⌘K for quick search • Drag to customize layout
        </p>
      </div>
    </div>
  );
};

export default DesktopGrid;
