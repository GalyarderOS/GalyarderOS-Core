
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Activity
} from "lucide-react";
import EmptyState from "./home/EmptyState";
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
  const [isSetupModalOpen, setSetupModalOpen] = useState(false);

  if (lifeAreas.length === 0) {
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
        <SetupLifeAreasModal isOpen={isSetupModalOpen} onClose={() => setSetupModalOpen(false)} />
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
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Life areas content would go here */}
      </div>
    </div>
  );
};

export default LifeBalance;
