
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface SetupLifeAreasModalProps {
  isOpen: boolean;
  onClose: () => void; 
  onSave?: (areas: string[]) => void;
  existingAreas?: string[];
  onSave?: (areas: string[]) => void;
  existingAreas?: string[];
}

const defaultAreas = ['Career', 'Health', 'Relationships', 'Personal Growth', 'Finance'];

export const SetupLifeAreasModal = ({ isOpen, onClose, onSave, existingAreas }: SetupLifeAreasModalProps) => {
  const [areas, setAreas] = useState<string[]>(existingAreas?.length ? existingAreas : defaultAreas);
  const [newArea, setNewArea] = useState('');

  const handleAddArea = () => {
    if (newArea.trim() && !areas.find(a => a.toLowerCase() === newArea.trim().toLowerCase())) {
      setAreas([...areas, newArea.trim()]);
      setNewArea('');
    }
  };

  const handleRemoveArea = (areaToRemove: string) => {
    setAreas(areas.filter(area => area !== areaToRemove));
  };
  
  const handleSave = () => {
    if (onSave) {
      if (onSave) {
        onSave(areas);
      }
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Setup Your Life Areas</DialogTitle>
          <DialogDescription>
            Define the key areas of your life you want to track and balance. Here are some suggestions to get you started.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="flex flex-wrap gap-2">
                {areas.map(area => (
                    <Badge key={area} variant="secondary" className="text-base py-1 px-3">
                        {area}
                        <button onClick={() => handleRemoveArea(area)} className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors">
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
            <div className="flex space-x-2">
                <Input 
                    value={newArea}
                    onChange={e => setNewArea(e.target.value)}
                    placeholder="Add a new area (e.g., Spirituality)"
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddArea(); } }}
                />
                <Button onClick={handleAddArea}>Add</Button>
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
