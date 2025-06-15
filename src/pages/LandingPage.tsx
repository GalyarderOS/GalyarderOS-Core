
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Crown, 
  ArrowRight, 
  Star, 
  TrendingUp, 
  DollarSign, 
  Brain, 
  Target,
  Globe,
  Users,
  Zap,
  Award,
  User,
  Calendar,
  BookOpen,
  Timer,
  PiggyBank,
  Receipt,
  Wallet,
  Shield,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Heart,
  Rocket,
  Sparkles
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Core Modules (13 modules total: 7 personal development + 6 finance)
  const coreModules = [
    {
      title: "Profile & Ethos",
      description: "Define your identity and core values",
      icon: <User className="h-8 w-8" />,
      gradient: "from-blue-500/20 to-indigo-500/20"
    },
    {
      title: "Vision & Roadmap", 
      description: "Strategic planning for your future",
      icon: <Target className="h-8 w-8" />,
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Daily Rituals",
      description: "Build and track meaningful habits",
      icon: <Calendar className="h-8 w-8" />,
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Focus Timer",
      description: "Deep work and productivity sessions",
      icon: <Timer className="h-8 w-8" />,
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Memory Vault",
      description: "Knowledge management and insights",
      icon: <BookOpen className="h-8 w-8" />,
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      title: "AI Assistant",
      description: "Intelligent personal assistant",
      icon: <Brain className="h-8 w-8" />,
      gradient: "from-violet-500/20 to-purple-500/20"
    },
    {
      title: "Notion AI",
      description: "Enhanced note-taking with AI",
      icon: <Zap className="h-8 w-8" />,
      gradient: "from-teal-500/20 to-green-500/20"
    },
    {
      title: "Investment Tracker",
      description: "Monitor and analyze your investments",
      icon: <TrendingUp className="h-8 w-8" />,
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      title: "Cashflow Tracker",
      description: "Track income and cash flow patterns",
      icon: <DollarSign className="h-8 w-8" />,
      gradient: "from-green-500/20 to-lime-500/20"
    },
    {
      title: "Expense Manager",
      description: "Manage and categorize expenses",
      icon: <Receipt className="h-8 w-8" />,
      gradient: "from-red-500/20 to-orange-500/20"
    },
    {
      title: "Wealth Builder",
      description: "Build long-term wealth strategies",
      icon: <PiggyBank className="h-8 w-8" />,
      gradient: "from-yellow-500/20 to-amber-500/20"
    },
    {
      title: "Tax Optimizer",
      description: "Optimize tax strategies and planning",
      icon: <Shield className="h-8 w-8" />,
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Debt Manager",
      description: "Manage and optimize debt payments",
      icon: <CreditCard className="h-8 w-8" />,
      gradient: "from-slate-500/20 to-gray-500/20"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "GalyarderOS transformed how I manage my life. Having everything in one place - from my goals to my investments - is game-changing.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez", 
      role: "Entrepreneur",
      content: "The AI assistant feature alone is worth it. It's like having a personal life coach that knows everything about my habits and goals.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Executive",
      content: "Finally, a system that connects my personal development with my financial growth. The insights are incredibly valuable.",
      rating: 5
    }
  ];

  const marketStats = [
    {
      title: "Productivity Market",
      value: "Billions",
      description: "Personal productivity software market",
      icon: <Globe className="h-8 w-8" />,
      growth: "Growing fast"
    },
    {
      title: "Mental Health Tech",
      value: "Billions", 
      description: "Digital wellness and mental health",
      icon: <Heart className="h-8 w-8" />,
      growth: "Exploding"
    },
    {
      title: "Self-Development",
      value: "Billions",
      description: "Personal development industry",
      icon: <Target className="h-8 w-8" />,
      growth: "Massive market"
    },
    {
      title: "Combined Potential",
      value: "Huge!",
      description: "That's where we're playing",
      icon: <Rocket className="h-8 w-8" />,
      growth: "Our playground"
    }
  ];

  const monetizationModel = [
    {
      title: "SaaS Subscription",
      description: "Tiered personalization model",
      icon: <DollarSign className="h-8 w-8" />,
      pricing: "$9-49/month"
    },
    {
      title: "Plugin Marketplace",
      description: "Templates and extensions",
      icon: <Zap className="h-8 w-8" />,
      pricing: "Revenue share"
    },
    {
      title: "IoT Integration",
      description: "Wearables and smart devices",
      icon: <Globe className="h-8 w-8" />,
      pricing: "Premium features"
    }
  ];

  const roadmapPhases = [
    {
      phase: "Phase 1",
      timeline: "Q3-Q4 2025",
      title: "MVP Launch",
      description: "Life Dashboard with AI-driven workflows & journaling",
      deliverables: ["Main dashboard UI", "Beta AI journaling", "Basic workflow automation"],
      status: "In Progress"
    },
    {
      phase: "Phase 2", 
      timeline: "Q1 2026",
      title: "Early Access",
      description: "Launch to founders, students, creators",
      deliverables: ["User onboarding", "Community features", "Feedback loops"],
      status: "Planned"
    },
    {
      phase: "Phase 3",
      timeline: "Q2-Q3 2026", 
      title: "AI Personality Engine",
      description: "Modular Plugin Ecosystem development",
      deliverables: ["AI personality matching", "Plugin architecture", "Marketplace beta"],
      status: "Planned"
    },
    {
      phase: "Phase 4",
      timeline: "Q4 2026+",
      title: "Digital Soul Layer",
      description: "Cross-device, blockchain-secured platform",
      deliverables: ["Multi-device sync", "Blockchain integration", "Global expansion"],
      status: "Vision"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleLearnMore = () => {
    document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-foreground to-muted-foreground rounded-xl flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src="/lovable-uploads/1933874e-bfc3-4397-b239-859be4a5d342.png" 
                alt="GalyarderOS Logo" 
                className="w-6 h-6 object-contain"
              />
            </motion.div>
            <span className="text-xl font-bold font-playfair text-foreground">GalyarderOS</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
            <Button onClick={handleGetStarted} className="bg-gradient-to-r from-foreground to-muted-foreground hover:from-foreground/90 hover:to-muted-foreground/90">
              Get Started
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Opening Pitch */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-background"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-6 font-playfair border-muted-foreground/20 text-lg px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                The Personal Operating System Revolution
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-8 font-playfair bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            >
              GalyarderOS
            </motion.h1>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-6 mb-12"
            >
              <p className="text-2xl md:text-3xl text-foreground font-playfair leading-relaxed max-w-5xl mx-auto">
                "Imagine a world where everyone has their own personal operating system."
              </p>
              <p className="text-xl text-muted-foreground font-playfair max-w-4xl mx-auto">
                GalyarderOS isn't just another productivity platform—it's a totally customizable digital system, powered by AI and designed to help you align your unique identity and aspirations into everything you do.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mb-12"
            >
              <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-2xl p-8 max-w-4xl mx-auto border border-border">
                <p className="text-xl md:text-2xl font-bold text-foreground font-playfair mb-4">
                  "GalyarderOS brings together your goals, habits, finances, and daily workflow into a single, unified platform."
                </p>
                <p className="text-lg text-muted-foreground font-playfair">
                  More than just software—it's a system to help you thrive through clarity, structure, and deep personal alignment.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                onClick={handleGetStarted} 
                className="bg-gradient-to-r from-foreground to-muted-foreground hover:from-foreground/90 hover:to-muted-foreground/90 text-background text-lg px-8 py-6 font-playfair group"
              >
                Start Your Transformation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleLearnMore} 
                className="text-lg px-8 py-6 font-playfair border-2"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center border border-red-500/20">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-foreground">The Problem GalyarderOS Solves</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-2xl md:text-3xl font-bold text-foreground font-playfair">
                "Most people live life on default mode—not by their own design..."
              </p>
              <p className="text-xl text-muted-foreground font-playfair leading-relaxed">
                GalyarderOS exists because the world is more complex than ever, and it's easy to feel overwhelmed or disconnected from your true direction. Most tools are fragmented, impersonal, and fail to help you take charge as the designer of your own life.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Solution Section */}
      <section id="solution" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center border border-green-500/20">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-foreground">The Solution: GalyarderOS</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-2xl md:text-3xl font-bold text-foreground font-playfair">
                "The world's first personal operating system—tailored to you."
              </p>
              <p className="text-xl text-muted-foreground font-playfair leading-relaxed">
                GalyarderOS unifies goal setting, financial health, habit tracking, knowledge, and AI—so you can focus, grow, and achieve by design, not by accident.
              </p>
            </div>
          </motion.div>

          {/* Core Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
            {coreModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="border-2 border-border hover:border-muted-foreground/30 transition-all duration-500 bg-card/80 hover:bg-card h-full">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-full h-20 bg-gradient-to-br ${module.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500 border border-border`}>
                      <div className="text-foreground">
                        {module.icon}
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg font-bold font-playfair text-foreground">
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="text-center">
                    <CardDescription className="font-playfair text-muted-foreground text-sm">
                      {module.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now & Why GalyarderOS Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-purple-500/20">
                <Lightbulb className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-foreground">Why GalyarderOS? Why Now?</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-gradient-to-r from-muted/50 to-muted/20 rounded-2xl p-8 border border-border">
                <p className="text-2xl md:text-3xl font-bold text-foreground font-playfair mb-4">
                  "We're entering a new era where your digital world should work for you, not the other way around."
                </p>
                <p className="text-xl text-muted-foreground font-playfair leading-relaxed">
                  Technology, AI, and self-growth best practices have never been more accessible. GalyarderOS integrates them into a seamless system—so you can control your life, become your best self, and make your vision a reality.
                </p>
              </div>
              <p className="text-lg text-muted-foreground font-playfair">
                It's not just theory—it's a system built to empower anyone to design, track, and live their best life through clarity, structure, and continuous progress.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Potential Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-foreground">The Market Potential</h2>
            <p className="text-2xl font-bold text-foreground font-playfair mb-4">
              "Anyone and everyone who wants to live a more structured, meaningful, and efficient life."
            </p>
            <p className="text-xl text-muted-foreground font-playfair max-w-3xl mx-auto">
              The productivity market? Billions. Mental health tech? Billions. Self-development? Billions. Combine all of those. That's where we're playing, and it's huge!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-center"
              >
                <Card className="border-2 border-border hover:border-muted-foreground/30 transition-all duration-300 h-full group">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-foreground/20 to-muted-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <CardTitle className="text-3xl font-bold font-playfair text-foreground">
                      {stat.value}
                    </CardTitle>
                    <Badge variant="secondary" className="font-playfair">
                      {stat.growth}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="font-playfair text-muted-foreground">
                      {stat.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Monetization Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-foreground">How We'll Make Money</h2>
            <p className="text-xl text-muted-foreground font-playfair max-w-3xl mx-auto">
              Multiple revenue streams designed for sustainable growth and maximum value delivery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {monetizationModel.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Card className="border-2 border-border hover:border-muted-foreground/30 transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {model.icon}
                    </div>
                    <CardTitle className="text-xl font-bold font-playfair text-foreground">
                      {model.title}
                    </CardTitle>
                    <Badge variant="outline" className="font-playfair">
                      {model.pricing}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="font-playfair text-muted-foreground">
                      {model.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-foreground">The Roadmap</h2>
            <p className="text-xl text-muted-foreground font-playfair max-w-3xl mx-auto">
              Where we're headed: From MVP to Digital Soul Layer
            </p>
          </motion.div>

          <div className="space-y-8">
            {roadmapPhases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 + 0.3 }}
                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <Card className="border-2 border-border hover:border-muted-foreground/30 transition-all duration-300 max-w-2xl w-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Badge variant={phase.status === 'In Progress' ? 'default' : 'secondary'} className="font-playfair mb-2">
                          {phase.status}
                        </Badge>
                        <CardTitle className="text-2xl font-bold font-playfair text-foreground">
                          {phase.phase}: {phase.title}
                        </CardTitle>
                        <CardDescription className="text-lg font-playfair text-muted-foreground">
                          {phase.timeline}
                        </CardDescription>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-foreground/20 to-muted-foreground/20 rounded-xl flex items-center justify-center">
                        <span className="text-xl font-bold font-playfair">{index + 1}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-playfair mb-4">{phase.description}</p>
                    <div>
                      <p className="font-semibold text-foreground font-playfair mb-2">Key Deliverables:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {phase.deliverables.map((deliverable, i) => (
                          <li key={i} className="text-sm text-muted-foreground font-playfair">{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 font-playfair text-foreground">What Early Users Say</h2>
            <p className="text-xl text-muted-foreground font-playfair">
              Real people, real transformations with GalyarderOS
            </p>
          </motion.div>

          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-border bg-card/80 p-8">
              <CardContent className="space-y-6">
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-amber-500" />
                  ))}
                </div>
                
                <blockquote className="text-xl font-playfair text-foreground leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div>
                  <p className="font-semibold text-foreground font-playfair">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-muted-foreground font-playfair">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-foreground' : 'bg-muted'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Closing Statement */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-3xl p-12 mb-12 border border-border">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-foreground">
                Transform Your Life by Design
              </h2>
              <p className="text-2xl md:text-3xl font-bold text-foreground font-playfair mb-6">
                "GalyarderOS is your platform for structured growth, self-mastery, and total clarity. Live with intention—break out of default mode—even as the world becomes more complex."
              </p>
              <p className="text-xl text-muted-foreground font-playfair leading-relaxed">
                Join a new generation choosing to shape their own lives. Remove barriers, get inspired, and build the future—with GalyarderOS.
              </p>
            </div>
            
            <Button 
              size="lg" 
              onClick={handleGetStarted} 
              className="bg-gradient-to-r from-foreground to-muted-foreground hover:from-foreground/90 hover:to-muted-foreground/90 text-background text-xl px-16 py-8 font-playfair group"
            >
              Join the Revolution
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Inspirational Quotes Section */}
      <section className="py-16 px-6 bg-muted/10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-12"
          >
            Inspiration for Your Journey
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card/70 rounded-xl p-8 border border-border flex flex-col justify-center items-center space-y-6">
              <blockquote className="italic font-playfair text-lg text-muted-foreground mb-6">
                “The people who are crazy enough to think they can change the world are the ones who do.”
              </blockquote>
              <span className="font-semibold text-foreground font-playfair">Steve Jobs</span>
            </div>
            <div className="bg-card/70 rounded-xl p-8 border border-border flex flex-col justify-center items-center space-y-6">
              <blockquote className="italic font-playfair text-lg text-muted-foreground mb-6">
                “When something is important enough, you do it even if the odds are not in your favor.”
              </blockquote>
              <span className="font-semibold text-foreground font-playfair">Elon Musk</span>
            </div>
            <div className="bg-card/70 rounded-xl p-8 border border-border flex flex-col justify-center items-center space-y-6">
              <blockquote className="italic font-playfair text-lg text-muted-foreground mb-6">
                “You don’t get what you want in life. You get who you are.”
              </blockquote>
              <span className="font-semibold text-foreground font-playfair">Naval Ravikant</span>
            </div>
            <div className="bg-card/70 rounded-xl p-8 border border-border flex flex-col justify-center items-center space-y-6">
              <blockquote className="italic font-playfair text-lg text-muted-foreground mb-6">
                "You do not rise to the level of your goals. You fall to the level of your systems."
              </blockquote>
              <span className="font-semibold text-foreground font-playfair">James Clear</span>
            </div>
          </div>
          <div className="border-t border-border my-12"/>
          
          {/* Galyarder quote at the end */}
          <div className="mx-auto text-center mt-8">
            <blockquote className="text-xl italic text-foreground font-playfair mb-4">
              "There’s no limit to what you can design for your own life, if you make yourself the architect."
            </blockquote>
            <span className="font-semibold text-muted-foreground font-playfair">Galyarder</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-foreground to-muted-foreground rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/lovable-uploads/1933874e-bfc3-4397-b239-859be4a5d342.png" 
                  alt="GalyarderOS Logo" 
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="text-lg font-bold font-playfair text-foreground">GalyarderOS</span>
            </div>
            
            <p className="text-muted-foreground font-playfair">
              © 2024 GalyarderOS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
