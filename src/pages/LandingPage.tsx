
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
  Quote,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="h-10 w-10 text-[#FFD700]" />,
      title: "Intelligent Productivity",
      description: "Advanced AI that learns your patterns and optimizes your workflow for maximum efficiency.",
      highlight: "Smart Learning"
    },
    {
      icon: <Shield className="h-10 w-10 text-[#FFD700]" />,
      title: "Unified Life Management",
      description: "Seamlessly integrate all aspects of your personal and professional life in one elegant platform.",
      highlight: "Complete Integration"
    },
    {
      icon: <Zap className="h-10 w-10 text-[#FFD700]" />,
      title: "Effortless Connections",
      description: "Connect with your favorite tools and services without disrupting your existing workflow.",
      highlight: "Seamless Sync"
    },
    {
      icon: <Sparkles className="h-10 w-10 text-[#FFD700]" />,
      title: "Personalized Insights",
      description: "Receive intelligent recommendations tailored to your unique goals and lifestyle patterns.",
      highlight: "Custom Analytics"
    }
  ];

  const modules = [
    { icon: <BarChart3 className="h-6 w-6" />, name: "Dashboard", description: "Comprehensive overview & insights", color: "bg-blue-50 text-blue-600" },
    { icon: <User className="h-6 w-6" />, name: "Profile & Ethos", description: "Personal identity & values", color: "bg-purple-50 text-purple-600" },
    { icon: <Target className="h-6 w-6" />, name: "Vision & Roadmap", description: "Strategic goal alignment", color: "bg-green-50 text-green-600" },
    { icon: <Settings className="h-6 w-6" />, name: "Strategic Pillars", description: "Core principle frameworks", color: "bg-orange-50 text-orange-600" },
    { icon: <Calendar className="h-6 w-6" />, name: "Daily Rituals", description: "Habit mastery system", color: "bg-pink-50 text-pink-600" },
    { icon: <Clock className="h-6 w-6" />, name: "Focus Timer", description: "Deep work optimization", color: "bg-indigo-50 text-indigo-600" },
    { icon: <BookOpen className="h-6 w-6" />, name: "Memory Vault", description: "Knowledge preservation", color: "bg-teal-50 text-teal-600" },
    { icon: <Activity className="h-6 w-6" />, name: "Weekly Audit", description: "Progress evaluation", color: "bg-red-50 text-red-600" },
    { icon: <BarChart3 className="h-6 w-6" />, name: "Activity Log", description: "Detailed performance tracking", color: "bg-yellow-50 text-yellow-600" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Executive",
      content: "This platform transformed how I approach personal productivity. The intelligent insights are remarkable.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Johnson",
      role: "Technology Entrepreneur",
      content: "Finally, a system that evolves with your ambitions. The integration capabilities are revolutionary.",
      rating: 5,
      avatar: "MJ"
    },
    {
      name: "Elena Rodriguez",
      role: "Creative Director",
      content: "Stunning interface paired with powerful functionality. It's like having a strategic advisor at your fingertips.",
      rating: 5,
      avatar: "ER"
    }
  ];

  const benefits = [
    "AI-powered productivity optimization",
    "Comprehensive life management system",
    "Advanced integration capabilities",
    "Personalized insights and recommendations",
    "Elegant, intuitive interface",
    "Strategic planning framework"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCFCF9] via-white to-[#FCFCF9]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-6 w-6 text-[#1a1a1a]" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#1a1a1a] to-[#4a4a4a] bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display' }}>
              GalyarderOS
            </span>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-[#1a1a1a] transition-all duration-300 font-medium">Features</a>
            <a href="#modules" className="text-gray-600 hover:text-[#1a1a1a] transition-all duration-300 font-medium">Modules</a>
            <a href="#testimonials" className="text-gray-600 hover:text-[#1a1a1a] transition-all duration-300 font-medium">Reviews</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/auth')}
              className="text-gray-600 hover:text-[#1a1a1a] font-medium"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFB700] text-[#1a1a1a] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-6"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-[#FFD700]/10"></div>
        <div className="container mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm border border-[#FFD700]/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-[#FFD700]" />
              <span className="text-sm font-medium text-gray-700">The Future of Personal Operating Systems</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-[#1a1a1a] mb-8 leading-tight" style={{ fontFamily: 'Playfair Display' }}>
              Architect Your
              <br />
              <span className="bg-gradient-to-r from-[#FFD700] to-[#FFC700] bg-clip-text text-transparent">
                Extraordinary Life
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your ambitions into achievements with an intelligent personal operating system 
              that unifies every aspect of your productivity journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFB700] text-[#1a1a1a] text-lg px-8 py-6 h-auto font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Begin Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 h-auto border-2 border-gray-200 hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all duration-300"
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {benefits.slice(0, 4).map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5 text-[#FFD700] flex-shrink-0" />
                  <span className="text-sm text-gray-600 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6" style={{ fontFamily: 'Playfair Display' }}>
              Engineered for Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the sophisticated features that make GalyarderOS the ultimate platform for ambitious individuals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full border-2 border-gray-100 hover:border-[#FFD700]/30 transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-white to-gray-50/50">
                  <CardHeader className="pb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-4 bg-gradient-to-br from-[#FFD700]/10 to-[#FFD700]/5 rounded-2xl group-hover:from-[#FFD700]/20 group-hover:to-[#FFD700]/10 transition-all duration-500">
                        {feature.icon}
                      </div>
                      <Badge variant="secondary" className="bg-[#FFD700]/10 text-[#1a1a1a] border-0 font-medium">
                        {feature.highlight}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold text-[#1a1a1a] group-hover:text-[#FFD700] transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg text-gray-600 leading-relaxed">
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
      <section id="modules" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6" style={{ fontFamily: 'Playfair Display' }}>
              Complete Life Architecture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nine sophisticated modules designed to transform every dimension of your personal and professional growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Card className="border-2 border-gray-100 hover:border-[#FFD700]/40 transition-all duration-500 hover:shadow-xl bg-white">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                    <div className={`p-3 rounded-xl mr-4 transition-all duration-300 group-hover:scale-110 ${module.color}`}>
                      {module.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-[#1a1a1a] group-hover:text-[#FFD700] transition-colors duration-300">
                        {module.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 font-medium">
                        {module.description}
                      </CardDescription>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#FFD700] group-hover:translate-x-1 transition-all duration-300" />
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6" style={{ fontFamily: 'Playfair Display' }}>
              Trusted by Visionaries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of exceptional individuals who have revolutionized their productivity and achieved extraordinary results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <Card className="h-full border-2 border-gray-100 hover:border-[#FFD700]/30 transition-all duration-500 hover:shadow-xl bg-gradient-to-br from-white to-gray-50/30">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[#FFD700] text-[#FFD700]" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-[#FFD700] mb-4" />
                    <CardDescription className="text-lg italic text-gray-700 leading-relaxed">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-full flex items-center justify-center text-[#1a1a1a] font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-[#1a1a1a]">{testimonial.name}</div>
                        <div className="text-sm text-gray-500 font-medium">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#FFD700]/5"></div>
        <div className="container mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-8" style={{ fontFamily: 'Playfair Display' }}>
              Ready to Transform<br />
              <span className="bg-gradient-to-r from-[#FFD700] to-[#FFC700] bg-clip-text text-transparent">
                Your Future?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the revolution in personal productivity. Experience the power of intelligent life architecture 
              and unlock your extraordinary potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFB700] text-[#1a1a1a] text-xl px-10 py-7 h-auto font-bold shadow-2xl hover:shadow-[#FFD700]/25 transition-all duration-300"
              >
                Start Your Transformation
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-[#1a1a1a]" />
              </div>
              <span className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display' }}>
                GalyarderOS
              </span>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 GalyarderOS. Crafted for extraordinary minds.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
