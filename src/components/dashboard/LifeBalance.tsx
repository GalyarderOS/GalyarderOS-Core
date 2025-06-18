import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Brain, Activity, Plus, Sliders as Slider } from "lucide-react"mptyState from "./home/EmptyState";
import { SetupLifeAreasModal } from "./life-balance/SetupLifeAreasModal";

interface LifeArea {
  id: string;
  name: string;
  icon: any;
  score: number;
  maxScore: number;
  color: string;
  description: string;
  metrics: Metric[];
}

interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  target: number;
  description: string;
}

const LifeBalance = () => {
  const [lifeAreas, setLifeAreas] = useState<LifeArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSetupModalOpen, setSetupModalOpen] = useState(false);
  const { toast } = useToast();

  // Load saved life balance data on component mount
  useEffect(() => {
    setLoading(true);
    
    // Load life balance data from localStorage
    const savedLifeBalance = localStorage.getItem('life-balance-data');
    if (savedLifeBalance) {
      try {
        const parsedData = JSON.parse(savedLifeBalance);
        setLifeAreas(parsedData.lifeAreas || []);
      } catch (error) {
        console.error('Error parsing saved life balance data:', error);
      }
    }
    
    setLoading(false);
  }, []);

  const handleSetupLifeAreas = (areas: string[]) => {
    // Create life area objects from the area names
    const newLifeAreas: LifeArea[] = areas.map((area, index) => ({
      id: Date.now() + index.toString(),
      name: area,
      icon: Activity,
      score: 50, // Default starting score
      maxScore: 100,
      color: getRandomColor(),
      description: `Your ${area.toLowerCase()} balance and harmony`,
      metrics: []
    }));
    
    setLifeAreas(newLifeAreas);
    
    // Save to localStorage
    localStorage.setItem('life-balance-data', JSON.stringify({
      lifeAreas: newLifeAreas,
      lastUpdated: new Date().toISOString()
    }));
    
    toast({
      title: "Life areas set up",
      description: "Your life balance areas have been configured successfully.",
    });
    
    setSetupModalOpen(false);
  };

  // Helper function to generate random colors for life areas
  const getRandomColor = () => {
    const colors = [
      'from-blue-500 to-indigo-600',
      'from-green-500 to-emerald-600',
      'from-purple-500 to-pink-600',
      'from-orange-500 to-red-600',
      'from-teal-500 to-cyan-600',
      'from-yellow-500 to-amber-600'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-muted border-t-foreground rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (lifeAreas.length === 0 && !loading) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="max-w-6xl mx-auto p-6">
            <EmptyState
              icon={Brain}
              title="Start Tracking Life Balance"
              description="Monitor and optimize all dimensions of your life. Create a holistic view of your physical health, mental wellness, relationships, career, and personal growth."
              actionLabel="Setup Life Areas"
              onAction={() => setSetupModalOpen(true)}
              gradient="from-blue-600 to-indigo-600"
            />
          </div>
        </div>
        <SetupLifeAreasModal 
          isOpen={isSetupModalOpen} 
          onClose={() => setSetupModalOpen(false)} 
          onSave={handleSetupLifeAreas}
        />
      </>
    );
  }

  const overallScore = lifeAreas.length > 0 
    ? Math.round(lifeAreas.reduce((sum, area) => sum + area.score, 0) / lifeAreas.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Header with Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-playfair">
                Life Balance
              </h1>
              <p className="text-slate-600 dark:text-slate-400">Harmonize all dimensions of your life</p>
            </div>
          </div>

          {/* Overall Score Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-lg mx-auto"
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">{overallScore}</div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Overall Life Balance Score</p>
                <Progress value={overallScore} className="h-3" />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Life Areas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {lifeAreas.map((area, index) => (
            <Card 
              key={area.id}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg overflow-hidden"
            >
              <div className={`h-2 w-full bg-gradient-to-r ${area.color}`}></div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{area.name}</span>
                  <Badge variant={area.score >= 70 ? "default" : "outline"}>
                    {area.score}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{area.description}</p>
                <Progress value={area.score} className="h-2" />
                <Button variant="outline" className="w-full">
                  Update Score
                </Button>
              </CardContent>
            </Card>
          ))}
          
          {/* Add New Area Card */}
          <Card 
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg border-dashed border-2 flex items-center justify-center cursor-pointer hover:bg-muted/20 transition-colors"
            onClick={() => setSetupModalOpen(true)}
          >
            <CardContent className="p-8 text-center">
              <Plus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Add New Life Area</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <SetupLifeAreasModal 
        isOpen={isSetupModalOpen} 
        onClose={() => setSetupModalOpen(false)} 
        onSave={handleSetupLifeAreas}
        existingAreas={lifeAreas.map(area => area.name)}
      />
    </div>
  );
};

export default LifeBalance;