import { useState } from 'react';
import useVisionStore, {VisionBoardItem } from '@/stores/useVisionStore';
import { motion, Reorder } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Star, GripVertical } from 'lucide-react';
import { CreateBoardItemModal } from './CreateBoardItemModal'; // We'll create this modal next

// Single Board Item Component
const BoardItem = ({ item, onEdit }: { item: VisionBoardItem; onEdit: (item: VisionBoardItem) => void; }) => {
    const { deleteBoardItem } = useVisionStore();
    
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
                         <Button size="icon" variant="destructive" className="h-7 w-7" onClick={() => deleteBoardItem(item.id)}><Trash2 className="h-4 w-4" /></Button>
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


// Main Section Component
const VisionBoardSection = () => {
  const { visionBoardItems, updateBoardItem } = useVisionStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VisionBoardItem | undefined>(undefined);

  const handleOpenModal = (item?: VisionBoardItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  
  // Note: Reorder functionality with zustand is complex.
  // For this implementation, we'll just show the items.
  // A full reorder would require a more complex state update.

  return (
    <div>
        <Reorder.Group
            axis="y"
            values={visionBoardItems}
            onReorder={() => {}} // Placeholder for reorder logic
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
            {visionBoardItems.map(item => (
                <BoardItem key={item.id} item={item} onEdit={handleOpenModal} />
            ))}

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: visionBoardItems.length * 0.05 }}
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
            onClose={() => setIsModalOpen(false)}
            item={editingItem}
        />
    </div>
  );
};

export default VisionBoardSection; 