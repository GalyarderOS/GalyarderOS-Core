
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrowRight, 
  Zap, 
  Target, 
  Brain, 
  Globe, 
  Users, 
  TrendingUp,
  CheckCircle,
  Star,
  ChevronRight,
  Calendar,
  BarChart3,
  Settings,
  Shield,
  Smartphone,
  Palette,
  Languages
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { theme, language, setTheme, setLanguage } = useTheme();
  const [currentModule, setCurrentModule] = useState(0);

  const translations = {
    en: {
      // Navigation
      features: 'Features',
      about: 'About',
      contact: 'Contact',
      getStarted: 'Get Started',
      login: 'Login',
      
      // Hero Section
      heroTitle: 'Your Personal Operating System',
      heroSubtitle: 'Imagine a world where everyone has their own personal operating system. Not just your average productivity tools - a full-stack digital system, powered by AI, totally customizable, and completely in sync with who you are.',
      ctaPrimary: 'Start Your Journey',
      ctaSecondary: 'Watch Demo',
      
      // Vision Section
      visionTitle: 'The Vision for GalyarderOS',
      visionSubtitle: 'A super futuristic, modular UI/UX tailored to Freedom, Mastery, and Impact.',
      
      // Problem Section
      problemTitle: 'The Problem We\'re Solving',
      problemSubtitle: '95% of people are living life on default mode, not by their own design',
      problem1: 'People are reacting, not being proactive',
      problem2: 'The world is getting more complicated',
      problem3: 'People are overwhelmed and lack direction',
      
      // Solution Section
      solutionTitle: 'The Solution: GalyarderOS',
      solutionSubtitle: 'A personalized, AI-powered life management system that combines the best of Notion, ChatGPT, Apple Health, TradingView, Asana, and spiritual journaling.',
      
      // Modules
      modulesTitle: 'Core Modules',
      profileModule: 'Profile & Ethos',
      profileDesc: 'Define your identity and core values',
      visionModule: 'Vision & Roadmap',
      visionDesc: 'Strategic planning for your future',
      habitsModule: 'Daily Rituals',
      habitsDesc: 'Build and track meaningful habits',
      focusModule: 'Focus Timer',
      focusDesc: 'Deep work and productivity sessions',
      memoryModule: 'Memory Vault',
      memoryDesc: 'Knowledge management and insights',
      
      // Market Section
      marketTitle: 'Market Potential',
      marketSubtitle: 'Billions in combined market opportunity',
      productivity: 'Productivity Market',
      mentalHealth: 'Mental Health Tech',
      selfDev: 'Self-Development',
      
      // Roadmap
      roadmapTitle: 'The Roadmap',
      phase1: 'Phase 1 (Q3-Q4 2025)',
      phase1Desc: 'Build MVP with Life Dashboard and AI-driven workflows',
      phase2: 'Phase 2',
      phase2Desc: 'Launch Early Access for founders, students, creators',
      phase3: 'Phase 3',
      phase3Desc: 'Develop AI Personality Engine & Plugin Ecosystem',
      phase4: 'Phase 4',
      phase4Desc: 'Digital Soul Layer - cross-device, blockchain-secured',
      
      // Footer
      closing: 'GalyarderOS isn\'t just a tool; it\'s the key to unlocking massive transformation.',
      allRights: '© 2025 GalyarderOS. All rights reserved.',
      built: 'Built for the future of human potential.',
      
      // Theme & Language
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      english: 'English',
      indonesian: 'Bahasa Indonesia'
    },
    id: {
      // Navigation
      features: 'Fitur',
      about: 'Tentang',
      contact: 'Kontak',
      getStarted: 'Mulai Sekarang',
      login: 'Masuk',
      
      // Hero Section
      heroTitle: 'Sistem Operasi Personal Anda',
      heroSubtitle: 'Bayangkan dunia di mana setiap orang memiliki sistem operasi personal mereka sendiri. Bukan hanya tools produktivitas biasa - sistem digital lengkap, didukung AI, dapat disesuaikan sepenuhnya, dan sinkron dengan siapa Anda.',
      ctaPrimary: 'Mulai Perjalanan Anda',
      ctaSecondary: 'Tonton Demo',
      
      // Vision Section
      visionTitle: 'Visi untuk GalyarderOS',
      visionSubtitle: 'UI/UX super futuristik dan modular yang disesuaikan untuk Kebebasan, Penguasaan, dan Dampak.',
      
      // Problem Section
      problemTitle: 'Masalah yang Kami Selesaikan',
      problemSubtitle: '95% orang hidup dalam mode default, bukan berdasarkan desain mereka sendiri',
      problem1: 'Orang bereaksi, bukan proaktif',
      problem2: 'Dunia semakin rumit',
      problem3: 'Orang kewalahan dan kehilangan arah',
      
      // Solution Section
      solutionTitle: 'Solusi: GalyarderOS',
      solutionSubtitle: 'Sistem manajemen hidup personal bertenaga AI yang menggabungkan yang terbaik dari Notion, ChatGPT, Apple Health, TradingView, Asana, dan jurnal spiritual.',
      
      // Modules
      modulesTitle: 'Modul Inti',
      profileModule: 'Profil & Etos',
      profileDesc: 'Definisikan identitas dan nilai inti Anda',
      visionModule: 'Visi & Roadmap',
      visionDesc: 'Perencanaan strategis untuk masa depan Anda',
      habitsModule: 'Ritual Harian',
      habitsDesc: 'Bangun dan lacak kebiasaan bermakna',
      focusModule: 'Timer Fokus',
      focusDesc: 'Sesi kerja mendalam dan produktivitas',
      memoryModule: 'Brankas Memori',
      memoryDesc: 'Manajemen pengetahuan dan wawasan',
      
      // Market Section
      marketTitle: 'Potensi Pasar',
      marketSubtitle: 'Peluang pasar gabungan miliaran dollar',
      productivity: 'Pasar Produktivitas',
      mentalHealth: 'Teknologi Kesehatan Mental',
      selfDev: 'Pengembangan Diri',
      
      // Roadmap
      roadmapTitle: 'Roadmap',
      phase1: 'Fase 1 (Q3-Q4 2025)',
      phase1Desc: 'Bangun MVP dengan Life Dashboard dan workflow berbasis AI',
      phase2: 'Fase 2',
      phase2Desc: 'Luncurkan Early Access untuk founder, mahasiswa, kreator',
      phase3: 'Fase 3',
      phase3Desc: 'Kembangkan AI Personality Engine & Plugin Ecosystem',
      phase4: 'Fase 4',
      phase4Desc: 'Digital Soul Layer - lintas perangkat, diamankan blockchain',
      
      // Footer
      closing: 'GalyarderOS bukan hanya tool; ini adalah kunci untuk membuka transformasi besar.',
      allRights: '© 2025 GalyarderOS. Hak cipta dilindungi.',
      built: 'Dibangun untuk masa depan potensi manusia.',
      
      // Theme & Language
      lightMode: 'Mode Terang',
      darkMode: 'Mode Gelap',
      english: 'English',
      indonesian: 'Bahasa Indonesia'
    }
  };

  const t = translations[language];

  const modules = [
    { icon: <Users className="h-8 w-8" />, name: t.profileModule, desc: t.profileDesc },
    { icon: <Target className="h-8 w-8" />, name: t.visionModule, desc: t.visionDesc },
    { icon: <Calendar className="h-8 w-8" />, name: t.habitsModule, desc: t.habitsDesc },
    { icon: <Zap className="h-8 w-8" />, name: t.focusModule, desc: t.focusDesc },
    { icon: <Brain className="h-8 w-8" />, name: t.memoryModule, desc: t.memoryDesc },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModule((prev) => (prev + 1) % modules.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [modules.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg">
                <img 
                  src="/lovable-uploads/cb9e2457-6d30-446c-8cd4-3890fb59efa9.png" 
                  alt="GalyarderOS" 
                  className="h-6 w-6 object-contain"
                />
              </div>
              <span className="text-xl font-bold premium-text-gradient" style={{ fontFamily: 'Playfair Display' }}>
                GalyarderOS
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-accent transition-colors duration-300">{t.features}</a>
              <a href="#about" className="text-muted-foreground hover:text-accent transition-colors duration-300">{t.about}</a>
              <a href="#contact" className="text-muted-foreground hover:text-accent transition-colors duration-300">{t.contact}</a>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="premium-button text-muted-foreground hover:text-accent hover:bg-accent/10"
              >
                {theme === 'light' ? <Palette className="h-4 w-4" /> : <Palette className="h-4 w-4" />}
                <span className="ml-2 hidden sm:inline">{theme === 'light' ? t.darkMode : t.lightMode}</span>
              </Button>

              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
                className="premium-button text-muted-foreground hover:text-accent hover:bg-accent/10"
              >
                <Languages className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">{language === 'en' ? t.indonesian : t.english}</span>
              </Button>

              <Button 
                variant="outline" 
                onClick={() => navigate('/auth')}
                className="premium-button border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground"
              >
                {t.login}
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="premium-button premium-gradient hover:shadow-lg text-accent-foreground"
              >
                {t.getStarted}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 backdrop-blur-sm">
              {t.visionTitle}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 premium-text-gradient" style={{ fontFamily: 'Playfair Display' }}>
              {t.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="premium-button premium-gradient hover:shadow-lg text-accent-foreground px-8 py-6 text-lg"
              >
                {t.ctaPrimary}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="premium-button border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg"
              >
                {t.ctaSecondary}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 glass-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 premium-text-gradient" style={{ fontFamily: 'Playfair Display' }}>
              {t.problemTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.problemSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[t.problem1, t.problem2, t.problem3].map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="premium-card glass-card h-full border-destructive/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-destructive text-xl">⚠️</span>
                    </div>
                    <p className="text-foreground/80">{problem}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 premium-text-gradient" style={{ fontFamily: 'Playfair Display' }}>
              {t.solutionTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              {t.solutionSubtitle}
            </p>
          </motion.div>

          {/* Modules Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-foreground">{t.modulesTitle}</h3>
            <div className="grid md:grid-cols-5 gap-6">
              {modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative ${currentModule === index ? 'scale-105' : ''}`}
                >
                  <Card className={`premium-card h-full transition-all duration-300 ${
                    currentModule === index 
                      ? 'glass-card border-accent shadow-accent/25 shadow-lg' 
                      : 'glass-card hover:shadow-md'
                  }`}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${
                        currentModule === index 
                          ? 'premium-gradient text-accent-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {module.icon}
                      </div>
                      <h4 className="font-semibold mb-2 text-foreground">{module.name}</h4>
                      <p className="text-sm text-muted-foreground">{module.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Market Potential */}
      <section className="py-20 px-6 glass-card">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 premium-text-gradient" style={{ fontFamily: 'Playfair Display' }}>
              {t.marketTitle}
            </h2>
            <p className="text-xl text-muted-foreground mb-12">{t.marketSubtitle}</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: t.productivity, amount: '$40B+', icon: <TrendingUp className="h-8 w-8" /> },
                { name: t.mentalHealth, amount: '$25B+', icon: <Brain className="h-8 w-8" /> },
                { name: t.selfDev, amount: '$15B+', icon: <Star className="h-8 w-8" /> }
              ].map((market, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="premium-card glass-card">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="text-accent">{market.icon}</div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">{market.amount}</h3>
                      <p className="text-muted-foreground">{market.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 premium-text-gradient" style={{ fontFamily: 'Playfair Display' }}>
              {t.roadmapTitle}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { phase: t.phase1, desc: t.phase1Desc },
              { phase: t.phase2, desc: t.phase2Desc },
              { phase: t.phase3, desc: t.phase3Desc },
              { phase: t.phase4, desc: t.phase4Desc }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="premium-card glass-card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 premium-gradient text-accent-foreground rounded-full flex items-center justify-center font-bold mr-3">
                        {index + 1}
                      </div>
                      <h3 className="font-bold text-foreground">{item.phase}</h3>
                    </div>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 glass-card">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 premium-text-gradient" style={{ fontFamily: 'Playfair Display' }}>
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t.closing}
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="premium-button premium-gradient hover:shadow-lg text-accent-foreground px-12 py-6 text-xl"
            >
              {t.ctaPrimary}
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center">
                <img 
                  src="/lovable-uploads/cb9e2457-6d30-446c-8cd4-3890fb59efa9.png" 
                  alt="GalyarderOS" 
                  className="h-6 w-6 object-contain"
                />
              </div>
              <span className="text-xl font-bold text-primary-foreground" style={{ fontFamily: 'Playfair Display' }}>
                GalyarderOS
              </span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-primary-foreground/60 mb-2">{t.allRights}</p>
              <p className="text-accent">{t.built}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
