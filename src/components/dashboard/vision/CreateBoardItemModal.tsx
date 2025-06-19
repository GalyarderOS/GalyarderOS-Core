import { useState, useEffect } from 'react';
import useVisionStore, {VisionBoardItem } from '@/stores/useVisionStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item?: VisionBoardItem;
}

export const CreateBoardItemModal = ({ isOpen, onClose, item }: Props) => {
  const { addBoardItem, updateBoardItem } = useVisionStore();
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [priority, setPriority] = useState(3);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setImageUrl(item.imageUrl);
      setPriority(item.priority);
    } else {
      // Reset form when opening for a new item
      setTitle('');
      setImageUrl('');
      setPriority(3);
    }
  }, [item, isOpen]);

  const handleSubmit = () => {
    const boardItemData = { title, imageUrl, priority };
    if (item) {
      updateBoardItem({ ...item, ...boardItemData });
    } else {
      addBoardItem(boardItemData);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item ? 'Edit Vision Board Item' : 'Add New Vision Board Item'}</DialogTitle>
          <DialogDescription>
            {item ? 'Update the details of your vision.' : 'Add a new visual inspiration to your board.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
            <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="col-span-3" placeholder="https://..." />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">Priority</Label>
            <div className="col-span-3 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 cursor-pointer ${i < priority ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`}
                  onClick={() => setPriority(i + 1)}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{item ? 'Save Changes' : 'Add Item'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 