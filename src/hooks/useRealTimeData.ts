
import { useState, useEffect, useCallback } from 'react';

interface RealTimeData {
  [key: string]: any;
}

export const useRealTimeData = () => {
  const [data, setData] = useState<RealTimeData>({});
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; type: 'info' | 'success' | 'warning' | 'error'; timestamp: Date }>>([]);

  const updateData = useCallback((key: string, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  }, []);

  const addNotification = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const notification = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
  }, []);

  useEffect(() => {
    // Simulate real-time connection
    const interval = setInterval(() => {
      setIsConnected(true);
      
      // Simulate random data updates
      if (Math.random() > 0.7) {
        const updates = [
          { key: 'portfolio', value: Math.random() * 10000 + 50000 },
          { key: 'habits', value: Math.floor(Math.random() * 100) },
          { key: 'focus', value: Math.random() * 8 },
          { key: 'income', value: Math.random() * 5000 + 3000 }
        ];
        
        const update = updates[Math.floor(Math.random() * updates.length)];
        updateData(update.key, update.value);
        
        if (Math.random() > 0.8) {
          addNotification(`${update.key} updated: ${update.value}`, 'info');
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [updateData, addNotification]);

  return {
    data,
    isConnected,
    notifications,
    updateData,
    addNotification
  };
};
