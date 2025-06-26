import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/global/ui/dialog';
import { Button } from '@/components/global/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/global/ui/card';
import { Badge } from '@/components/global/ui/badge';
import { Progress } from '@/components/global/ui/progress';
import { 
  User, 
  Target, 
  Brain, 
  Dumbbell, 
  Timer, 
  BookOpen,
  Sparkles,
  ArrowRight,
  Check,
  ChevronRight,
  Play
} from 'lucide-react';
import { useTheme } from '@/contexts/useTheme';

interface WelcomeCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeCenter = ({ isOpen, onClose }: WelcomeCenterProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { language } = useTheme();

  const steps = [
    {
      id: 'welcome',
      title: language === 'id' ? 'Selamat Datang di GalyarderOS' : 'Welcome to GalyarderOS',
      description: language === 'id' 
        ? 'Sistem operasi kehidupan pribadi yang membantu Anda merancang dan mengoptimalkan hidup'
        : 'Your personal life operating system to design and optimize your life',
      icon: Sparkles,
      color: 'from-purple-500 to-blue-600'
    },
    {
      id: 'identity',
      title: language === 'id' ? 'Identity Core' : 'Identity Core',
      description: language === 'id'
        ? 'Tentukan identitas inti, nilai-nilai, dan misi hidup Anda'
        : 'Define your core identity, values, and life mission',
      icon: User,
      color: 'from-purple-600 to-blue-600'
    },
    {
      id: 'vision',
      title: language === 'id' ? 'Vision & Goals' : 'Vision & Goals',
      description: language === 'id'
        ? 'Buat roadmap dan lacak kemajuan tujuan jangka panjang'
        : 'Create roadmap and track progress of long-term goals',
      icon: Target,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'balance',
      title: language === 'id' ? 'Life Balance' : 'Life Balance',
      description: language === 'id'
        ? 'Monitor dan seimbangkan semua aspek kehidupan'
        : 'Monitor and balance all aspects of your life',
      icon: Brain,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'ritual',
      title: language === 'id' ? 'Ritual Engine' : 'Ritual Engine',
      description: language === 'id'
        ? 'Bangun kebiasaan positif dan rutinitas harian'
        : 'Build positive habits and daily routines',
      icon: Dumbbell,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'focus',
      title: language === 'id' ? 'Focus System' : 'Focus System',
      description: language === 'id'
        ? 'Tingkatkan produktivitas dengan timer fokus dan pelacakan'
        : 'Boost productivity with focus timer and tracking',
      icon: Timer,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${currentStepData.color} rounded-lg flex items-center justify-center`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <span className="font-playfair">Welcome Center</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Current Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`bg-gradient-to-br ${currentStepData.color} border-0 text-white`}>
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair flex items-center space-x-3">
                    <Icon className="h-8 w-8" />
                    <span>{currentStepData.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg opacity-90">{currentStepData.description}</p>
                  
                  {currentStep === 0 && (
                    <div className="mt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/20 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Personal Modules</h4>
                          <p className="text-sm opacity-80">Identity, Vision, Balance, Habits</p>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Productivity Tools</h4>
                          <p className="text-sm opacity-80">Focus Timer, Knowledge Hub</p>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Finance Tracking</h4>
                          <p className="text-sm opacity-80">Investments, Cashflow, Expenses</p>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">AI Assistant</h4>
                          <p className="text-sm opacity-80">Smart help and automation</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button onClick={nextStep}>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeCenter;
