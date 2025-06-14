
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Target, 
  Clock, 
  BookOpen, 
  Calendar, 
  Settings, 
  Activity, 
  User, 
  BarChart3,
  Shield,
  Zap,
  ChevronRight,
  Star,
  Quote,
  ArrowRight,
  CheckCircle,
  Rocket,
  Globe,
  Layers,
  TrendingUp,
  Users,
  Lightbulb,
  Heart,
  DollarSign
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const problems = [
    "95% of people live on default mode, not by design",
    "Overwhelmed by complexity and fragmented tools", 
    "Reactive instead of proactive lifestyle",
    "No unified system for personal growth"
  ];

  const solutions = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Intelligence",
      description: "Personal AI that learns your patterns and optimizes your entire life system",
      highlight: "Smart Automation"
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Modular Ecosystem",
      description: "Seamlessly integrate all aspects of life - productivity, health, finance, growth",
      highlight: "Total Integration"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Goal-Driven Architecture",
      description: "Every feature designed to accelerate your journey to maximum potential",
      highlight: "Purpose-Built"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Adaptive & Responsive",
      description: "System evolves with you, providing exactly what you need, when you need it",
      highlight: "Dynamic Growth"
    }
  ];

  const modules = [
    { icon: <BarChart3 className="h-6 w-6" />, name: "Life Dashboard", description: "Command center for your existence", gradient: "from-blue-500 to-cyan-500" },
    { icon: <User className="h-6 w-6" />, name: "Identity Engine", description: "Define and refine your core self", gradient: "from-purple-500 to-pink-500" },
    { icon: <Target className="h-6 w-6" />, name: "Vision System", description: "Strategic goal manifestation", gradient: "from-green-500 to-emerald-500" },
    { icon: <Calendar className="h-6 w-6" />, name: "Ritual Optimizer", description: "Habit mastery automation", gradient: "from-orange-500 to-red-500" },
    { icon: <Clock className="h-6 w-6" />, name: "Focus Accelerator", description: "Deep work amplification", gradient: "from-indigo-500 to-purple-500" },
    { icon: <BookOpen className="h-6 w-6" />, name: "Knowledge Vault", description: "Infinite memory expansion", gradient: "from-teal-500 to-cyan-500" },
    { icon: <Activity className="h-6 w-6" />, name: "Performance Analytics", description: "Continuous optimization engine", gradient: "from-rose-500 to-pink-500" },
    { icon: <Settings className="h-6 w-6" />, name: "System Core", description: "Total personalization control", gradient: "from-gray-500 to-slate-500" }
  ];

  const roadmapPhases = [
    {
      phase: "Phase 1",
      timeline: "Q3-Q4 2025",
      title: "Foundation MVP",
      description: "Life Dashboard with AI workflows & journaling",
      status: "In Development",
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      phase: "Phase 2", 
      timeline: "Q1 2026",
      title: "Early Access Launch",
      description: "Founders, students, creators community",
      status: "Coming Soon",
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      phase: "Phase 3",
      timeline: "Q2-Q3 2026", 
      title: "AI Personality Engine",
      description: "Modular plugin ecosystem development",
      status: "Planned",
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      phase: "Phase 4",
      timeline: "2027+",
      title: "Digital Soul Layer",
      description: "Cross-device, blockchain-secured OS",
      status: "Vision",
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    }
  ];

  const marketOpportunity = [
    { sector: "Productivity Software", size: "$47B", icon: <BarChart3 className="h-5 w-5" /> },
    { sector: "Mental Health Tech", size: "$26B", icon: <Heart className="h-5 w-5" /> },
    { sector: "Self-Development", size: "$13B", icon: <Lightbulb className="h-5 w-5" /> },
    { sector: "Personal Finance", size: "$1.2T", icon: <DollarSign className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#FFD700]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-2xl border-b border-white/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FF6B35] rounded-2xl flex items-center justify-center shadow-2xl">
              <img 
                src="/lovable-uploads/cb9e2457-6d30-446c-8cd4-3890fb59efa9.png" 
                alt="GalyarderOS Logo" 
                className="h-8 w-8 object-contain filter brightness-0"
              />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display' }}>
              GalyarderOS
            </span>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/auth')}
              className="text-white/80 hover:text-white hover:bg-white/10 font-medium border border-white/20 hover:border-white/40"
            >
              Access System
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-[#FFD700] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FFD700] text-black font-bold shadow-2xl hover:shadow-[#FFD700]/25 transition-all duration-500 px-8"
            >
              Begin Evolution
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#FFD700]/20 to-[#FF6B35]/20 backdrop-blur-sm border border-[#FFD700]/30 rounded-full px-6 py-3 mb-12">
              <Globe className="h-5 w-5 text-[#FFD700]" />
              <span className="text-lg font-semibold text-white/90">The Future of Personal Operating Systems</span>
              <Rocket className="h-5 w-5 text-[#FF6B35]" />
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight" style={{ fontFamily: 'Playfair Display' }}>
              Your Personal
              <br />
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FF6B35] to-[#FF1744] bg-clip-text text-transparent">
                Operating System
              </span>
            </h1>
            
            <p className="text-2xl lg:text-3xl text-white/80 mb-8 max-w-5xl mx-auto leading-relaxed font-light">
              Imagine having your own AI-powered digital ecosystem that learns who you are, 
              adapts to your goals, and empowers you to reach your absolute maximum potential.
            </p>

            <p className="text-xl text-[#FFD700] mb-16 font-semibold">
              Not just software. An entire revolution in how you live, work, and grow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-[#FFD700] to-[#FF6B35] hover:from-[#FF6B35] hover:to-[#FFD700] text-black text-xl px-12 py-8 h-auto font-bold shadow-2xl hover:shadow-[#FFD700]/50 transition-all duration-500 transform hover:scale-105"
              >
                Join the Revolution
                <Rocket className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-xl px-12 py-8 h-auto border-2 border-white/30 hover:border-[#FFD700] hover:bg-[#FFD700]/10 text-white hover:text-[#FFD700] transition-all duration-500"
              >
                Experience the Vision
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-8 text-white" style={{ fontFamily: 'Playfair Display' }}>
              The Reality We're Changing
            </h2>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto">
              Let's be real. Most people are living life on default mode, overwhelmed and reactive.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center space-x-4 p-6 bg-black/30 backdrop-blur-sm rounded-2xl border border-red-500/30"
              >
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <p className="text-lg text-white/90 font-medium">{problem}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-8 text-white" style={{ fontFamily: 'Playfair Display' }}>
              The <span className="bg-gradient-to-r from-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent">GalyarderOS</span> Solution
            </h2>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto">
              A personalized, AI-powered life management system that brings together everything you need to thrive.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <Card className="h-full border-2 border-white/10 hover:border-[#FFD700]/50 transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm">
                  <CardHeader className="pb-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 bg-gradient-to-br from-[#FFD700]/20 to-[#FF6B35]/20 rounded-2xl group-hover:from-[#FFD700]/30 group-hover:to-[#FF6B35]/30 transition-all duration-500">
                        <div className="text-[#FFD700]">
                          {solution.icon}
                        </div>
                      </div>
                      <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-0 font-bold">
                        {solution.highlight}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-[#FFD700] transition-colors duration-300">
                      {solution.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg text-white/80 leading-relaxed">
                      {solution.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Ecosystem */}
      <section className="py-24 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-white mb-8" style={{ fontFamily: 'Playfair Display' }}>
              Complete Life Architecture
            </h2>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto">
              Eight interconnected modules designed to optimize every dimension of your existence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Card className="border-2 border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-xl bg-black/40 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${module.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {module.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors duration-300">
                      {module.name}
                    </CardTitle>
                    <CardDescription className="text-white/70 font-medium">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-white mb-8" style={{ fontFamily: 'Playfair Display' }}>
              Massive Market Opportunity
            </h2>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto">
              We're not just entering one market. We're creating an entirely new category.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketOpportunity.map((market, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#FFD700]/50 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700]/20 to-[#FF6B35]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-[#FFD700]">
                    {market.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{market.sector}</h3>
                <p className="text-3xl font-bold text-[#FFD700]">{market.size}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-white mb-8" style={{ fontFamily: 'Playfair Display' }}>
              The Evolution Roadmap
            </h2>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto">
              From MVP to Digital Soul Layer - here's how we're building the future.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {roadmapPhases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="border-2 border-white/10 hover:border-white/30 transition-all duration-500 bg-black/40 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`${phase.bgColor} ${phase.color} border-0 font-bold`}>
                        {phase.phase}
                      </Badge>
                      <span className="text-sm text-white/60 font-medium">{phase.timeline}</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      {phase.title}
                    </CardTitle>
                    <CardDescription className="text-lg text-white/80">
                      {phase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${phase.color === 'text-blue-500' ? 'bg-blue-500' : phase.color === 'text-purple-500' ? 'bg-purple-500' : phase.color === 'text-green-500' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                      <span className="text-white/70 font-medium">{phase.status}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/10 via-[#FF6B35]/10 to-[#FF1744]/10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl lg:text-7xl font-bold mb-12 text-white" style={{ fontFamily: 'Playfair Display' }}>
              Ready to<br />
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FF6B35] to-[#FF1744] bg-clip-text text-transparent">
                Revolutionize
              </span><br />
              Your Existence?
            </h2>
            <p className="text-2xl text-white/80 mb-16 max-w-4xl mx-auto leading-relaxed">
              This isn't just software. This is the foundation for a completely new way of living. 
              Your personal operating system is waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-[#FFD700] via-[#FF6B35] to-[#FF1744] hover:from-[#FF1744] hover:via-[#FF6B35] hover:to-[#FFD700] text-black text-2xl px-16 py-10 h-auto font-bold shadow-2xl hover:shadow-[#FFD700]/50 transition-all duration-500 transform hover:scale-105"
              >
                Begin Your Evolution
                <Rocket className="ml-4 h-8 w-8" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black/60 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FF6B35] rounded-2xl flex items-center justify-center shadow-2xl">
                <img 
                  src="/lovable-uploads/cb9e2457-6d30-446c-8cd4-3890fb59efa9.png" 
                  alt="GalyarderOS Logo" 
                  className="h-8 w-8 object-contain filter brightness-0"
                />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FF6B35] bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display' }}>
                GalyarderOS
              </span>
            </div>
            <div className="text-white/60">
              © 2024 GalyarderOS. Building the future of human potential.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
