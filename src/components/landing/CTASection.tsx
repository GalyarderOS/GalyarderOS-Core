
import { motion } from 'framer-motion';
import { Button } from '@/components/global/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onGetStarted: () => void;
}

const CTASection = ({ onGetStarted }: CTASectionProps) => {
  return (
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
              onClick={onGetStarted} 
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl px-16 py-8 group"
            >
              Start for Free
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
