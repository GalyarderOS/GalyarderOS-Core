
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
  Timer
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

  // Core Modules (7 modules)
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

  const features = [
    {
      title: "AI-Powered Intelligence",
      description: "Advanced AI that learns your patterns and provides personalized insights",
      icon: <Brain className="h-6 w-6" />
    },
    {
      title: "Unified Dashboard",
      description: "All your life management tools in one beautiful, intuitive interface",
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "Real-time Sync",
      description: "Seamless integration with your favorite tools and platforms",
      icon: <Zap className="h-6 w-6" />
    },
    {
      title: "Global Community",
      description: "Connect with like-minded individuals on their growth journey",
      icon: <Users className="h-6 w-6" />
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
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-foreground to-muted-foreground rounded-xl flex items-center justify-center">
              <Crown className="h-6 w-6 text-background" />
            </div>
            <span className="text-xl font-bold font-playfair text-foreground">GalyarderOS</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
            <Button onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-6 font-playfair border-muted-foreground/20">
              The Future of Personal Operating Systems
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 font-playfair bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              GalyarderOS
            </h1>
            
            <p className="text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto font-playfair leading-relaxed">
              A personalized, AI-powered life management system that combines the best of Notion, ChatGPT, Apple Health, TradingView, Asana, and spiritual journaling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleGetStarted} className="bg-foreground hover:bg-foreground/90 text-background text-lg px-8 py-6 font-playfair">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={handleLearnMore} className="text-lg px-8 py-6 font-playfair">
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Core Modules Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 font-playfair text-foreground">Core Modules</h2>
              <p className="text-xl text-muted-foreground font-playfair max-w-2xl mx-auto">
                Everything you need to transform your life in one integrated system
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {coreModules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card className="border-2 border-border hover:border-muted-foreground/30 transition-all duration-500 bg-card/80 hover:bg-card h-full">
                    <CardHeader className="text-center pb-4">
                      <div className={`w-full h-24 bg-gradient-to-br ${module.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500 border border-border`}>
                        <div className="text-foreground">
                          {module.icon}
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl font-bold font-playfair text-foreground">
                        {module.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="text-center">
                      <CardDescription className="font-playfair text-muted-foreground">
                        {module.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 font-playfair text-foreground">Why Choose GalyarderOS?</h2>
            <p className="text-xl text-muted-foreground font-playfair max-w-3xl mx-auto">
              Experience the future of personal productivity with our comprehensive life management platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6 border border-border">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 font-playfair text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground font-playfair">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 font-playfair text-foreground">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground font-playfair">
              Join thousands of users who have transformed their lives with GalyarderOS
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

      {/* CTA Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-6 font-playfair text-foreground">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 font-playfair">
              Join the future of personal productivity and start living by design.
            </p>
            
            <Button size="lg" onClick={handleGetStarted} className="bg-foreground hover:bg-foreground/90 text-background text-lg px-12 py-6 font-playfair">
              Start Your Journey Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-foreground to-muted-foreground rounded-lg flex items-center justify-center">
                <Crown className="h-5 w-5 text-background" />
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
