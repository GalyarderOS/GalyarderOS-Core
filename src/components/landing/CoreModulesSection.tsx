import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/global/ui/card';
import { LucideIcon } from 'lucide-react';

interface Module {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface CoreModulesSectionProps {
  coreModules: Module[];
}

const CoreModulesSection = ({ coreModules }: CoreModulesSectionProps) => {
  return (
    <section id="solution" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-serif mb-4">A Unified System for Life</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stop juggling scattered apps. GalyarderOS integrates your core life domains into one seamless, intelligent dashboard.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreModules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${module.color}`}>
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{module.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreModulesSection; 