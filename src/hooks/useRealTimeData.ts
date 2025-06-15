
import { useState, useEffect, useCallback } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';

interface RealTimeData {
  [key: string]: any;
}

export const useRealTimeData = () => {
  const [data, setData] = useState<RealTimeData>({});
  const [isConnected, setIsConnected] = useState(false);
  const { addNotification } = useNotifications();

  const updateData = useCallback((key: string, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    // Simulate real-time connection
    const interval = setInterval(() => {
      setIsConnected(true);
      
      // Simulate random data updates
      if (Math.random() > 0.7) {
        const updates = [
          { key: 'portfolio', value: Math.random() * 10000 + 50000, title: 'Portfolio Updated' },
          { key: 'habits', value: Math.floor(Math.random() * 100), title: 'Habits Progress' },
          { key: 'focus', value: Math.random() * 8, title: 'Focus Session' },
          { key: 'income', value: Math.random() * 5000 + 3000, title: 'Income Updated' }
        ];
        
        const update = updates[Math.floor(Math.random() * updates.length)];
        updateData(update.key, update.value);
        
        if (Math.random() > 0.8) {
          addNotification({
            title: update.title,
            message: `${update.key} updated: ${typeof update.value === 'number' ? update.value.toFixed(2) : update.value}`,
            type: 'info'
          });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [updateData, addNotification]);

  return {
    data,
    isConnected,
    updateData,
    addNotification
  };
};
