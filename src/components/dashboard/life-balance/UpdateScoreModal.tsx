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

interface UpdateScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (score: number) => void;
  areaName: string;
  currentScore: number;
}

export const UpdateScoreModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  areaName, 
  currentScore 
}: UpdateScoreModalProps) => {
  const [score, setScore] = useState(currentScore);

  // Reset score when modal opens with new area
  useEffect(() => {
    setScore(currentScore);
  }, [currentScore, isOpen]);

  const handleSave = () => {
    onSave(score);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update {areaName} Score</DialogTitle>
          <DialogDescription>
            How would you rate your current balance in this life area?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Balance Score: {score}%</Label>
              <div className="text-2xl font-bold text-primary">{score}</div>
            </div>
            <Slider
              value={[score]}
              onValueChange={(value) => setScore(value[0])}
              min={0}
              max={100}
              step={1}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Needs Attention</span>
              <span>Balanced</span>
              <span>Excellent</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Score Meaning</Label>
            <div className="text-sm text-muted-foreground">
              {score < 30 && (
                <p>This area needs significant attention and improvement.</p>
              )}
              {score >= 30 && score < 60 && (
                <p>This area is developing but could use more focus.</p>
              )}
              {score >= 60 && score < 80 && (
                <p>This area is well-balanced but has room for growth.</p>
              )}
              {score >= 80 && (
                <p>This area is thriving and in excellent condition.</p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Score</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};