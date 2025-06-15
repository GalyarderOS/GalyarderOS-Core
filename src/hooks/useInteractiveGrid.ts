
import { useState, useCallback, useRef } from 'react';

export interface GridItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  value: string;
  change: string;
  path?: string;
  action?: string;
  gradient: string;
  size?: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  group: string; // <-- Added group property
}

export const useInteractiveGrid = (initialItems: GridItem[]) => {
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [isReordering, setIsReordering] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback((itemId: string) => {
    setDraggedItem(itemId);
    setIsReordering(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setIsReordering(false);
  }, []);

  const handleDrop = useCallback((targetId: string, position: { x: number; y: number }) => {
    if (!draggedItem) return;

    setItems(prev => prev.map(item => {
      if (item.id === draggedItem) {
        return { ...item, position };
      }
      return item;
    }));
  }, [draggedItem]);

  const updateItemSize = useCallback((itemId: string, size: 'small' | 'medium' | 'large') => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, size } : item
    ));
  }, []);

  const reorderItems = useCallback((fromIndex: number, toIndex: number) => {
    setItems(prev => {
      const newItems = [...prev];
      const [removed] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, removed);
      return newItems;
    });
  }, []);

  return {
    items,
    draggedItem,
    isReordering,
    gridRef,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    updateItemSize,
    reorderItems,
    setItems
  };
};
