
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

interface CoreModule {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

interface CoreModulesSectionProps {
  coreModules: CoreModule[];
}

const CoreModulesSection = ({ coreModules }: CoreModulesSectionProps) => {
  return (
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
  );
};

export default CoreModulesSection;
