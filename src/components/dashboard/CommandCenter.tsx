
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Target,
  Calendar,
  Timer,
  Brain,
  Sparkles,
  FileText,
  TrendingUp,
  DollarSign,
  Receipt,
  Building,
  Calculator,
  CreditCard,
  Settings,
  BookOpen,
  Edit,
  BarChart2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MODULES = [
  {
    id: "identity-core",
    label: "Identity Core",
    icon: User,
    path: "/dashboard/identity",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "vision-architecture",
    label: "Vision Architecture",
    icon: Target,
    path: "/dashboard/vision",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "life-balance",
    label: "Life Balance",
    icon: Brain,
    path: "/dashboard/balance",
    color: "from-blue-500 to-sky-400",
  },
  {
    id: "ritual-engine",
    label: "Ritual Engine",
    icon: Calendar,
    path: "/dashboard/ritual",
    color: "from-orange-400 to-red-500",
  },
  {
    id: "flow-state",
    label: "Flow State",
    icon: Timer,
    path: "/dashboard/flow",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "knowledge-hub",
    label: "Knowledge Hub",
    icon: BookOpen,
    path: "/dashboard/knowledge",
    color: "from-indigo-500 to-purple-400",
  },
  {
    id: "reflection",
    label: "Reflection",
    icon: Edit,
    path: "/dashboard/reflection",
    color: "from-fuchsia-500 to-pink-400",
  },
  {
    id: "life-analytics",
    label: "Life Analytics",
    icon: BarChart2,
    path: "/dashboard/analytics",
    color: "from-yellow-400 to-amber-500",
  },
  {
    id: "notion-sync",
    label: "Notion Sync",
    icon: FileText,
    path: "/dashboard/notion",
    color: "from-teal-500 to-green-500",
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    icon: Sparkles,
    path: "",
    color: "from-pink-500 to-rose-500",
    disabled: true,
  },
];

const FINANCE_MODULES = [
  {
    id: "investments",
    label: "Investments",
    icon: TrendingUp,
    path: "/dashboard/investments",
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "cashflow",
    label: "Cashflow",
    icon: DollarSign,
    path: "/dashboard/cashflow",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "expenses",
    label: "Expenses",
    icon: Receipt,
    path: "/dashboard/expenses",
    color: "from-red-500 to-pink-600",
  },
  {
    id: "wealth",
    label: "Wealth",
    icon: Building,
    path: "/dashboard/wealth",
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "tax",
    label: "Tax Optimizer",
    icon: Calculator,
    path: "/dashboard/tax",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "debt",
    label: "Debt Manager",
    icon: CreditCard,
    path: "/dashboard/debt",
    color: "from-orange-500 to-yellow-600",
  },
];

const CommandCenter = () => {
  const navigate = useNavigate();

  // For now, all stats are static demo data
  const dailyFocus = 4; // hours
  const habitsDone = 6;
  const balanceScore = 78;
  const completedGoals = 2;
  const journalStreak = 5;

  return (
    <div className="py-10 max-w-6xl mx-auto space-y-8">
      {/* Title & Short Description */}
      <div className="mb-6 flex flex-col items-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground">
          Command Center
        </h1>
        <p className="text-muted-foreground text-lg text-center max-w-xl">
          Your personal GalyarderOS dashboard. Jumpstart your day, track your progress, and navigate your digital soul modules.
        </p>
      </div>

      {/* Quick Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="group hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Timer className="h-5 w-5 text-cyan-500" />
              <span>Focus Time</span>
            </CardTitle>
            <CardDescription>Today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{dailyFocus}h</div>
          </CardContent>
        </Card>
        <Card className="group hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              <span>Habits</span>
            </CardTitle>
            <CardDescription>Completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{habitsDone}</div>
          </CardContent>
        </Card>
        <Card className="group hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span>Balance</span>
            </CardTitle>
            <CardDescription>Score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{balanceScore}</div>
          </CardContent>
        </Card>
        <Card className="group hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Goals</span>
            </CardTitle>
            <CardDescription>Completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{completedGoals}</div>
          </CardContent>
        </Card>
        <Card className="group hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5 text-fuchsia-600" />
              <span>Journal Streak</span>
            </CardTitle>
            <CardDescription>Days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{journalStreak}</div>
          </CardContent>
        </Card>
      </div>

      {/* Module Quick Access Grid */}
      <section>
        <div className="flex items-baseline space-x-4 mb-4">
          <h2 className="text-2xl font-bold font-playfair text-foreground">Digital Soul Modules</h2>
          <Badge variant="secondary">{MODULES.length} modules</Badge>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <Card
                key={mod.id}
                className={`hover:shadow-xl transition cursor-pointer group border-2 border-transparent hover:border-primary`}
                onClick={() => mod.path && !mod.disabled && navigate(mod.path)}
              >
                <CardContent className="p-5 flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-2`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <span className={`font-medium font-playfair mt-1 group-hover:text-primary ${mod.disabled ? "opacity-60" : ""}`}>
                    {mod.label}
                  </span>
                  {mod.disabled && (
                    <span className="text-xs text-muted-foreground mt-1">(Coming Soon)</span>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Section: Finance Modules */}
      <section>
        <div className="flex items-baseline space-x-4 mb-4 mt-10">
          <h2 className="text-2xl font-bold font-playfair text-foreground">Finance Modules</h2>
          <Badge variant="secondary">{FINANCE_MODULES.length} modules</Badge>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {FINANCE_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <Card
                key={mod.id}
                className="hover:shadow-xl transition cursor-pointer group border-2 border-transparent hover:border-primary"
                onClick={() => mod.path && navigate(mod.path)}
              >
                <CardContent className="p-4 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center mb-2`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium mt-1 group-hover:text-primary">{mod.label}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Placeholders for: Recent Activity, Onboarding Steps */}
      <section className="mt-12 grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Module actions, tracked goals, system events</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-4 space-y-1 text-muted-foreground">
              <li>Finished a focus session on <b>Flow State</b>.</li>
              <li>Completed <b>3 habits</b> today in <b>Ritual Engine</b>.</li>
              <li>Updated core values in <b>Identity Core</b>.</li>
              <li>Added a new life goal in <b>Vision Architecture</b>.</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Getting Started</CardTitle>
            <CardDescription>Complete onboarding to unlock all insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <Badge className="mr-2" variant="default">1</Badge>
                Complete your Identity Core profile
              </div>
              <div className="flex items-center">
                <Badge className="mr-2" variant="default">2</Badge>
                Define your first goal in Vision Architecture
              </div>
              <div className="flex items-center">
                <Badge className="mr-2" variant="default">3</Badge>
                Log your first ritual in Ritual Engine
              </div>
              <div className="flex items-center">
                <Badge className="mr-2" variant="outline">4</Badge>
                Write a journal entry in Reflection
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default CommandCenter;
