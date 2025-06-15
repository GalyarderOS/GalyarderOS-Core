import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrowRight, 
  Star, 
  DollarSign, 
  Target,
  User,
  BookOpen,
  Timer,
  CheckCircle,
  Sparkles,
  Receipt
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

  // Updated Core Modules to match dashboard
  const coreModules = [
    {
      title: "Identity Core",
      description: "Define your principles and life philosophy.",
      icon: <User className="h-8 w-8" />,
      gradient: "from-blue-500/20 to-indigo-500/20"
    },
    {
      title: "Vision Architecture",
      description: "Map your goals and create a strategic roadmap.",
      icon: <Target className="h-8 w-8" />,
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Ritual Engine",
      description: "Build and track powerful, life-changing habits.",
      icon: <CheckCircle className="h-8 w-8" />,
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Focus Timer",
      description: "Master deep work and boost your productivity.",
      icon: <Timer className="h-8 w-8" />,
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      title: "Knowledge Hub",
      description: "Organize your learning, insights, and ideas.",
      icon: <BookOpen className="h-8 w-8" />,
      gradient: "from-violet-500/20 to-purple-500/20"
    },
    {
      title: "AI Assistant",
      description: "Your personal AI for guidance and automation.",
      icon: <Sparkles className="h-8 w-8" />,
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      title: "Investment Tracker",
      description: "Monitor your portfolio and financial growth.",
      icon: <DollarSign className="h-8 w-8" />,
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      title: "Expense Manager",
      description: "Track and categorize your spending with ease.",
      icon: <Receipt className="h-8 w-8" />,
      gradient: "from-red-500/20 to-orange-500/20"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "GalyarderOS transformed how I manage my life. Having everything in one place—from my goals to my investments—is a game-changer.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez", 
      role: "Entrepreneur",
      content: "The Ritual Engine helped me build habits that stick. It's like having a personal coach that understands my long-term vision.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Executive",
      content: "Finally, a system that connects my personal development with my financial growth. The insights are incredibly valuable.",
      rating: 5
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
              className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center overflow-hidden"
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
            <Button onClick={handleGetStarted} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
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
              <Badge variant="outline" className="mb-6 font-playfair border-primary/20 text-lg px-4 py-2 text-primary">
                <Sparkles className="h-4 w-4 mr-2" />
                The Operating System for Your Life
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-8 font-playfair text-foreground"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            >
              Design Your Best Life.
            </motion.h1>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
            >
              GalyarderOS is a unified platform to align your goals, habits, and finances.
              Move from drifting by default to living by design.
            </motion.p>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                onClick={handleGetStarted} 
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleLearnMore} 
                className="text-lg px-8 py-6 border-2"
              >
                See Features
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Solution Section */}
      <section id="solution" className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-foreground">A Unified System for Growth</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              GalyarderOS integrates every core area of your life into one intuitive dashboard, helping you build momentum and achieve clarity.
            </p>
          </motion.div>

          {/* Core Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {coreModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="border-2 border-border hover:border-primary/30 transition-all duration-500 bg-card/80 hover:bg-card h-full">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-full h-20 bg-gradient-to-br ${module.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500 border border-border`}>
                      <div className="text-primary group-hover:text-accent-foreground">
                        {module.icon}
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg font-bold font-playfair text-foreground">
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="text-center">
                    <CardDescription className="text-muted-foreground text-sm">
                      {module.description}
                    </CardDescription>
                  </CardContent>
                </Card>
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
            <h2 className="text-4xl font-bold mb-6 font-playfair text-foreground">From Our Users</h2>
            <p className="text-xl text-muted-foreground">
              Real people, real transformations with GalyarderOS.
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
                    <Star key={i} className="h-5 w-5 fill-current text-accent" />
                  ))}
                </div>
                
                <blockquote className="text-xl font-playfair text-foreground leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-muted-foreground">
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
                  index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Closing Statement */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-card/70 rounded-3xl p-12 mb-12 border border-border">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-foreground">
                Ready to Design Your Life?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Stop drifting and start building. GalyarderOS provides the clarity, structure, and tools you need to live with intention.
              </p>
            
              <Button 
                size="lg" 
                onClick={handleGetStarted} 
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl px-16 py-8 group"
              >
                Start for Free
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inspirational Quotes Section */}
      <section className="py-16 px-6">
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
              <blockquote className="italic text-lg text-muted-foreground mb-6">
                “The people who are crazy enough to think they can change the world are the ones who do.”
              </blockquote>
              <span className="font-semibold text-foreground">Steve Jobs</span>
            </div>
            <div className="bg-card/70 rounded-xl p-8 border border-border flex flex-col justify-center items-center space-y-6">
              <blockquote className="italic text-lg text-muted-foreground mb-6">
                “When something is important enough, you do it even if the odds are not in your favor.”
              </blockquote>
              <span className="font-semibold text-foreground">Elon Musk</span>
            </div>
            <div className="bg-card/70 rounded-xl p-8 border border-border flex flex-col justify-center items-center space-y-6">
              <blockquote className="italic text-lg text-muted-foreground mb-6">
                “You don’t get what you want in life. You get who you are.”
              </blockquote>
              <span className="font-semibold text-foreground">Naval Ravikant</span>
            </div>
            <div className="bg-card/70 rounded-xl p-8 border border-border flex flex-col justify-center items-center space-y-6">
              <blockquote className="italic text-lg text-muted-foreground mb-6">
                "You do not rise to the level of your goals. You fall to the level of your systems."
              </blockquote>
              <span className="font-semibold text-foreground">James Clear</span>
            </div>
          </div>
          <div className="border-t border-border my-12"/>
          
          {/* Galyarder quote at the end */}
          <div className="mx-auto text-center mt-8">
            <blockquote className="text-xl italic text-foreground mb-4 font-playfair">
              "There’s no limit to what you can design for your own life, if you make yourself the architect."
            </blockquote>
            <span className="font-semibold text-muted-foreground">Galyarder</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/lovable-uploads/1933874e-bfc3-4397-b239-859be4a5d342.png" 
                  alt="GalyarderOS Logo" 
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="text-lg font-bold font-playfair text-foreground">GalyarderOS</span>
            </div>
            
            <p className="text-muted-foreground">
              © 2025 GalyarderOS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
