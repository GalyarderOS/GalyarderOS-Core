import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import type { Goal } from '@/stores/useVisionStore';

type GoalData = Omit<Goal, 'id' | 'status' | 'milestones'>;

const getInitialGoalData = (goal?: Goal): GoalData => {
  if (goal) {
    return {
      title: goal.title,
      description: goal.description,
      category: goal.category,
      timeframe: goal.timeframe,
      deadline: goal.deadline,
    };
  }
  return {
    title: '',
    description: '',
    category: 'personal',
    timeframe: 'medium',
    deadline: '',
  };
};

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: GoalData) => void;
  goal?: Goal;
}

export const CreateGoalModal = ({ isOpen, onClose, onSave, goal }: CreateGoalModalProps) => {
  const [goalData, setGoalData] = useState<GoalData>(() => getInitialGoalData(goal));

  useEffect(() => {
    if (isOpen) {
      setGoalData(getInitialGoalData(goal));
    }
  }, [isOpen, goal]);

  const handleSave = () => {
    if (!goalData.title.trim()) return;
    onSave(goalData);
  };
  
  const handleChange = (field: keyof GoalData, value: string) => {
      setGoalData(prev => ({ ...prev, [field]: value }));
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{goal ? 'Edit Goal' : 'Create a New Goal'}</DialogTitle>
          <DialogDescription>
            {goal ? 'Update the details of your goal.' : "A goal is a dream with a deadline. What's your next step towards your vision?"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              value={goalData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Run a marathon"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={goalData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Why is this goal important to you?"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={goalData.category} onValueChange={(v: GoalData['category']) => handleChange('category', v)}>
                  <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="career">Career</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="relationships">Relationships</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="timeframe">Timeframe</Label>
                 <Select value={goalData.timeframe} onValueChange={(v: GoalData['timeframe']) => handleChange('timeframe', v)}>
                  <SelectTrigger><SelectValue placeholder="Timeframe" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short-term</SelectItem>
                    <SelectItem value="medium">Medium-term</SelectItem>
                    <SelectItem value="long">Long-term</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">Target Date</Label>
            <Input
              id="deadline"
              type="date"
              value={goalData.deadline.split('T')[0]} // Handle date format
              onChange={(e) => handleChange('deadline', e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>{goal ? 'Save Changes' : 'Create Goal'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};