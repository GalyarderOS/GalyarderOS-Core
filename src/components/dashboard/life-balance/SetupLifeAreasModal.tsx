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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import type { LifeArea } from '@/stores/useLifeBalanceStore';

interface SetupLifeAreasModalProps {
  isOpen: boolean;
  onClose: () => void; 
  onSave: (areas: LifeArea[]) => void;
  currentAreas: LifeArea[];
}

const defaultAreas: Omit<LifeArea, 'id' | 'score'>[] = [
    { name: 'Career', description: 'Your job, business, and professional development.', color: 'from-blue-400 to-blue-600' },
    { name: 'Health', description: 'Physical and mental well-being, fitness, and nutrition.', color: 'from-green-400 to-green-600' },
    { name: 'Finance', description: 'Managing money, investments, and financial security.', color: 'from-yellow-400 to-yellow-600' },
    { name: 'Relationships', description: 'Connections with family, friends, and partners.', color: 'from-pink-400 to-pink-600' },
    { name: 'Personal Growth', description: 'Learning, skills, and self-improvement.', color: 'from-purple-400 to-purple-600' },
    { name: 'Fun & Recreation', description: 'Hobbies, leisure activities, and enjoyment.', color: 'from-indigo-400 to-indigo-600' },
];

const createDefaultAreas = (): LifeArea[] => {
    return defaultAreas.map(area => ({
        ...area,
        id: uuidv4(),
        score: 50, // Start with a default score
    }));
}

export const SetupLifeAreasModal = ({ isOpen, onClose, onSave, currentAreas }: SetupLifeAreasModalProps) => {
  const [areas, setAreas] = useState<LifeArea[]>([]);
  const [newAreaName, setNewAreaName] = useState('');

  useEffect(() => {
    if (isOpen) {
        setAreas(currentAreas.length > 0 ? [...currentAreas] : createDefaultAreas());
    }
  }, [isOpen, currentAreas]);

  const handleAddArea = () => {
    if (newAreaName.trim() && !areas.find(a => a.name.toLowerCase() === newAreaName.trim().toLowerCase())) {
      const newArea: LifeArea = {
        id: uuidv4(),
        name: newAreaName.trim(),
        description: 'A new area of your life.',
        score: 50,
        color: 'from-gray-400 to-gray-600'
      };
      setAreas([...areas, newArea]);
      setNewAreaName('');
    }
  };

  const handleRemoveArea = (idToRemove: string) => {
    setAreas(areas.filter(area => area.id !== idToRemove));
  };
  
  const handleSave = () => {
    onSave(areas);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configure Life Areas</DialogTitle>
          <DialogDescription>
            Add, remove, or use our suggested areas to track your life balance.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="flex flex-wrap gap-2">
                {areas.map(area => (
                    <Badge key={area.id} variant="secondary" className="text-sm py-1 px-2">
                        {area.name}
                        <button onClick={() => handleRemoveArea(area.id)} className="ml-2 rounded-full hover:bg-red-500/20 p-0.5 transition-colors">
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
            <div className="flex space-x-2">
                <Input 
                    value={newAreaName}
                    onChange={e => setNewAreaName(e.target.value)}
                    placeholder="Add a new area (e.g., Spirituality)"
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddArea(); } }}
                />
                <Button onClick={handleAddArea}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Areas</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
