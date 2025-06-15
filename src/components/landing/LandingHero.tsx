
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LandingHeroProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

const LandingHero = ({ onGetStarted, onLearnMore }: LandingHeroProps) => {
  return (
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
              onClick={onGetStarted} 
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onLearnMore} 
              className="text-lg px-8 py-6 border-2"
            >
              See Features
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingHero;
