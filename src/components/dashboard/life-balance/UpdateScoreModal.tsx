import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import type { LifeArea } from '@/stores/useLifeBalanceStore';

interface UpdateScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (score: number) => void;
  area: LifeArea;
}

export const UpdateScoreModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  area
}: UpdateScoreModalProps) => {
  const [score, setScore] = useState(area.score);

  useEffect(() => {
    if (isOpen) {
      setScore(area.score);
    }
  }, [area, isOpen]);

  const handleSave = () => {
    onSave(score);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Score for: {area.name}</DialogTitle>
          <DialogDescription>
             {area.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <Label htmlFor="score-slider" className="text-base">Your Rating</Label>
              <div className="text-3xl font-bold text-primary">{score}</div>
            </div>
            <Slider
              id="score-slider"
              value={[score]}
              onValueChange={(value) => setScore(value[0])}
              min={0}
              max={100}
              step={1}
            />
            <div className="flex justify-between text-xs text-muted-foreground px-1">
              <span>Needs Focus</span>
              <span>Thriving</span>
            </div>
          </div>
          
          <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
            <Label className="font-semibold">What this score means:</Label>
            <div className="text-sm text-muted-foreground">
              {score < 33 && <p>This area requires significant attention and planning.</p>}
              {score >= 33 && score < 66 && <p>This area is okay, but could benefit from more focus and effort.</p>}
              {score >= 66 && <p>You feel this area is well-managed and a source of strength.</p>}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Score</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};