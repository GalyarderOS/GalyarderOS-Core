
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
import { useState } from 'react';

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateGoalModal = ({ isOpen, onClose }: CreateGoalModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateGoal = () => {
    console.log('Creating goal:', { title, description });
    // This is where you would typically call a function to save the goal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Your First Goal</DialogTitle>
          <DialogDescription>
            A goal is a dream with a deadline. What's your first step towards your vision?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Run a marathon"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Why is this goal important to you?"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreateGoal}>Create Goal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
