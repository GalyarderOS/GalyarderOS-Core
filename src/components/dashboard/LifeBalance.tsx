import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Sliders, Settings } from "lucide-react";
import { SetupLifeAreasModal } from "./life-balance/SetupLifeAreasModal";
import { UpdateScoreModal } from "./life-balance/UpdateScoreModal";
import { ModuleCard } from "@/components/shared/ModuleCard";
import useLifeBalanceStore from "@/stores/useLifeBalanceStore";
import type { LifeArea } from "@/stores/useLifeBalanceStore";

const LifeBalance = () => {
  const { lifeAreas, initializeAreas, updateAreaScore, resetAreas } = useLifeBalanceStore();
  const [isSetupModalOpen, setSetupModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<LifeArea | null>(null);

  const handleSelectArea = (area: LifeArea) => {
    setSelectedArea(area);
    setUpdateModalOpen(true);
  };

  const handleSaveScore = (newScore: number) => {
    if (selectedArea) {
      updateAreaScore(selectedArea.id, newScore);
    }
    setUpdateModalOpen(false);
  };

  const overallScore = lifeAreas.length > 0 
    ? Math.round(lifeAreas.reduce((sum, area) => sum + area.score, 0) / lifeAreas.length)
    : 0;
    
  if (lifeAreas.length === 0) {
      return (
          <>
            <div className="text-center p-8">
                <h2 className="text-2xl font-semibold">Set Up Your Life Balance Areas</h2>
                <p className="text-muted-foreground mt-2">Define the areas of your life you want to track and improve.</p>
                <Button onClick={() => setSetupModalOpen(true)} className="mt-4">
                    <Settings className="mr-2 h-4 w-4" />
                    Initial Setup
                </Button>
            </div>
             <SetupLifeAreasModal 
              isOpen={isSetupModalOpen} 
              onClose={() => setSetupModalOpen(false)} 
              onSave={initializeAreas}
            />
          </>
      )
  }

  return (
    <div className="p-4 md:p-6 space-y-8">
        <div className="flex justify-between items-center">
             <div className="space-y-1">
                <h1 className="text-3xl font-bold">Life Balance</h1>
                <p className="text-muted-foreground">A holistic view of your well-being.</p>
             </div>
             <Button variant="outline" onClick={() => setSetupModalOpen(true)}>
                <Settings className="mr-2 h-4 w-4" />
                Configure Areas
            </Button>
        </div>

        <Card className="text-center">
            <CardContent className="p-6">
                <div className="text-6xl font-bold text-primary mb-2">{overallScore}</div>
                <p className="text-muted-foreground mb-4">Overall Life Balance Score</p>
                <Progress value={overallScore} className="h-3" />
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifeAreas.map((area) => (
            <ModuleCard
              key={area.id}
              title={area.name}
              module="balance"
              className="overflow-hidden"
              headerContent={<Badge variant="secondary">{area.score}%</Badge>}
            >
              <div className={`h-2 w-full bg-gradient-to-r ${area.color} mb-4`}></div>
              <p className="text-sm text-muted-foreground mb-4 h-10">
                Your current score in {area.name.toLowerCase()}.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleSelectArea(area)}
              >
                <Sliders className="h-4 w-4 mr-2" />
                Update Score
              </Button>
            </ModuleCard>
          ))}
        </div>
        
        <SetupLifeAreasModal 
            isOpen={isSetupModalOpen} 
            onClose={() => setSetupModalOpen(false)} 
            onSave={initializeAreas}
        />
        
        {selectedArea && (
            <UpdateScoreModal
                isOpen={isUpdateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                onSave={handleSaveScore}
                area={selectedArea}
            />
        )}
    </div>
  );
};

export default LifeBalance;