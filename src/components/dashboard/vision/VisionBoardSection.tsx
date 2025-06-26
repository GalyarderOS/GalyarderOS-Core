import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Star, ImageIcon } from 'lucide-react';
import { CreateBoardItemModal } from './CreateBoardItemModal';
import { VisionBoardItem as VisionBoardItemType, Goal } from '@/stores/useVisionStore';

interface BoardItemProps {
  item: VisionBoardItemType;
  onEdit: (item: VisionBoardItemType) => void;
  onDelete: (id: string) => void;
}

const BoardItem = ({ item, onEdit, onDelete }: BoardItemProps) => {
  return (
    <Reorder.Item
      value={item}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative group cursor-grab"
      whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
    >
      <Card className="overflow-hidden border-border group-hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-0 relative">
          <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="secondary" className="h-7 w-7" onClick={() => onEdit(item)}><Edit className="h-4 w-4" /></Button>
            <Button size="icon" variant="destructive" className="h-7 w-7" onClick={() => onDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        </CardContent>
        <CardFooter className="p-3 flex justify-between items-center bg-card/80 backdrop-blur-sm">
          <p className="font-semibold text-foreground text-sm">{item.title}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < item.priority ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} />
            ))}
          </div>
        </CardFooter>
      </Card>
    </Reorder.Item>
  );
};

interface VisionBoardSectionProps {
  items: VisionBoardItemType[];
  onAddItem: (item: Omit<VisionBoardItemType, 'id'>) => void;
  onUpdateItem: (id: string, item: Partial<Omit<VisionBoardItemType, 'id'>>) => void;
  onDeleteItem: (id: string) => void;
}

const VisionBoardSection = ({ items, onAddItem, onUpdateItem, onDeleteItem }: VisionBoardSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VisionBoardItemType | undefined>(undefined);

  const handleOpenModal = (item?: VisionBoardItemType) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingItem(undefined);
    setIsModalOpen(false);
  };

  const handleSaveItem = (itemData: Omit<VisionBoardItemType, 'id'>) => {
    if (editingItem) {
      onUpdateItem(editingItem.id, itemData);
    } else {
      onAddItem(itemData);
    }
    handleCloseModal();
  };

  return (
    <Card className="bg-card/50 border-border backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
             <div className="flex items-center gap-3">
                 <div className="w-11 h-11 bg-gradient-to-br from-secondary to-primary/50 rounded-lg flex items-center justify-center shadow-md">
                    <ImageIcon className="h-6 w-6 text-white/90" />
                </div>
                <div>
                    <CardTitle className="text-xl">Vision Board</CardTitle>
                    <CardDescription>Visual inspirations for your desired future.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Reorder.Group
                axis="x"
                values={items}
                onReorder={() => { /* Reordering logic to be implemented later */ }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
                {items.map(item => (
                    <BoardItem key={item.id} item={item} onEdit={handleOpenModal} onDelete={onDeleteItem} />
                ))}

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: items.length * 0.05 }}
                >
                    <button
                        onClick={() => handleOpenModal()}
                        className="w-full h-full min-h-48 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 hover:border-primary/50 transition-all duration-300"
                    >
                        <Plus className="h-8 w-8 mb-2" />
                        <span className="font-semibold">Add New Item</span>
                    </button>
                </motion.div>
            </Reorder.Group>

            <CreateBoardItemModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveItem}
                item={editingItem}
            />
        </CardContent>
    </Card>
  );
};

export default VisionBoardSection; 