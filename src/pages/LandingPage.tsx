
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
  Sparkles,
  Shield,
  Zap,
  ChevronRight,
  Star,
  Quote
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-[#FFD700]" />,
      title: "AI-Powered Productivity",
      description: "Advanced AI assistant that understands your goals and helps optimize your daily workflows."
    },
    {
      icon: <Shield className="h-8 w-8 text-[#FFD700]" />,
      title: "Unified Life Dashboard",
      description: "All aspects of your life in one comprehensive, intuitive interface."
    },
    {
      icon: <Zap className="h-8 w-8 text-[#FFD700]" />,
      title: "Seamless Integrations",
      description: "Connect with Notion, Google Calendar, and other tools you already use."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-[#FFD700]" />,
      title: "Intelligent Insights",
      description: "Get personalized recommendations based on your patterns and goals."
    }
  ];

  const modules = [
    { icon: <BarChart3 className="h-6 w-6" />, name: "Dashboard", description: "Overview & insights" },
    { icon: <User className="h-6 w-6" />, name: "Profile & Ethos", description: "Personal identity" },
    { icon: <Target className="h-6 w-6" />, name: "Vision & Roadmap", description: "Long-term goals" },
    { icon: <Settings className="h-6 w-6" />, name: "Strategic Pillars", description: "Core principles" },
    { icon: <Calendar className="h-6 w-6" />, name: "Daily Rituals", description: "Habit tracking" },
    { icon: <Clock className="h-6 w-6" />, name: "Focus Timer", description: "Productivity sessions" },
    { icon: <BookOpen className="h-6 w-6" />, name: "Memory Vault", description: "Knowledge base" },
    { icon: <Activity className="h-6 w-6" />, name: "Weekly Audit", description: "Progress review" },
    { icon: <BarChart3 className="h-6 w-6" />, name: "Activity Log", description: "Detailed tracking" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "GalyarderOS transformed how I approach personal productivity. The AI assistant is incredibly intuitive.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Entrepreneur",
      content: "Finally, a system that grows with you. The integration capabilities are game-changing.",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "Designer",
      content: "Beautiful interface, powerful features. It's like having a personal life coach in your pocket.",
      rating: 5
    }
  ];

  const quotes = [
    "The future belongs to those who prepare for it today.",
    "Excellence is not a skill, it's an attitude.",
    "Your life does not get better by chance, it gets better by change."
  ];

  return (
    <div className="min-h-screen bg-[#FCFCF9]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FCFCF9]/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-8 h-8 bg-[#FFD700] rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-[#1a1a1a]" />
            </div>
            <span className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'Playfair Display' }}>
              GalyarderOS
            </span>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-[#1a1a1a] transition-colors">Features</a>
            <a href="#modules" className="text-gray-600 hover:text-[#1a1a1a] transition-colors">Modules</a>
            <a href="#testimonials" className="text-gray-600 hover:text-[#1a1a1a] transition-colors">Reviews</a>
            <a href="#faq" className="text-gray-600 hover:text-[#1a1a1a] transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/auth')}
              className="text-gray-600 hover:text-[#1a1a1a]"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1a1a1a] font-semibold"
            >
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-[#1a1a1a] mb-6" style={{ fontFamily: 'Playfair Display' }}>
              The Operating System for<br />
              <span className="text-[#FFD700]">Your Life's Ambitions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your productivity with an AI-powered personal operating system that unifies 
              goal-setting, habit tracking, and strategic planning in one elegant platform.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="bg-[#FFD700]/10 text-[#1a1a1a] border-[#FFD700]/20">
                <Sparkles className="h-4 w-4 mr-1" />
                AI-Powered
              </Badge>
              <Badge variant="secondary" className="bg-[#FFD700]/10 text-[#1a1a1a] border-[#FFD700]/20">
                <Brain className="h-4 w-4 mr-1" />
                Gemini Integration
              </Badge>
              <Badge variant="secondary" className="bg-[#FFD700]/10 text-[#1a1a1a] border-[#FFD700]/20">
                <BookOpen className="h-4 w-4 mr-1" />
                Notion Compatible
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: 'Playfair Display' }}>
              Why Choose GalyarderOS?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the features that make GalyarderOS the ultimate personal productivity platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-[#FFD700]/30 transition-colors">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-[#FFD700]/10 rounded-full w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 bg-[#FCFCF9]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: 'Playfair Display' }}>
              Comprehensive Life Modules
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nine powerful modules designed to cover every aspect of your personal and professional growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="border-2 hover:border-[#FFD700]/50 transition-all cursor-pointer">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                    <div className="p-2 bg-[#FFD700]/10 rounded-lg mr-3">
                      {module.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: 'Playfair Display' }}>
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their productivity with GalyarderOS.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-[#FFD700] mb-2" />
                    <CardDescription className="text-base italic">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold text-[#1a1a1a]">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirational Quotes */}
      <section className="py-20 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ fontFamily: 'Playfair Display' }}>
              Inspiration for Your Journey
            </h2>
            <div className="space-y-8">
              {quotes.map((quote, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3 }}
                  className="text-xl lg:text-2xl font-light italic max-w-4xl mx-auto"
                >
                  "{quote}"
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#FFD700]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-6" style={{ fontFamily: 'Playfair Display' }}>
              Ready to Architect Your Future?
            </h2>
            <p className="text-xl text-[#1a1a1a]/80 mb-8 max-w-2xl mx-auto">
              Join the revolution in personal productivity. Start your journey with GalyarderOS today.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-[#1a1a1a] hover:bg-[#1a1a1a]/90 text-white text-lg px-8 py-6 h-auto"
            >
              Start Your Journey Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-[#FFD700] rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[#1a1a1a]" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'Playfair Display' }}>
                GalyarderOS
              </span>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 GalyarderOS. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
