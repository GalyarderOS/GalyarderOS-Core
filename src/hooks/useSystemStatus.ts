
import { useState, useEffect } from 'react';

interface SystemStatus {
  battery: {
    level: number;
    charging: boolean;
    supported: boolean;
  };
  wifi: {
    online: boolean;
    connectionType: string;
    downlink?: number;
  };
  volume: {
    level: number;
    muted: boolean;
    supported: boolean;
  };
}

export const useSystemStatus = () => {
  const [status, setStatus] = useState<SystemStatus>({
    battery: {
      level: 100,
      charging: false,
      supported: false,
    },
    wifi: {
      online: navigator.onLine,
      connectionType: 'wifi',
      downlink: undefined,
    },
    volume: {
      level: 75,
      muted: false,
      supported: false,
    },
  });

  useEffect(() => {
    // Battery API monitoring
    const initBattery = async () => {
      try {
        // @ts-ignore - Battery API is experimental
        const battery = await navigator.getBattery?.();
        if (battery) {
          const updateBatteryInfo = () => {
            setStatus(prev => ({
              ...prev,
              battery: {
                level: Math.round(battery.level * 100),
                charging: battery.charging,
                supported: true,
              },
            }));
          };

          updateBatteryInfo();
          battery.addEventListener('chargingchange', updateBatteryInfo);
          battery.addEventListener('levelchange', updateBatteryInfo);

          return () => {
            battery.removeEventListener('chargingchange', updateBatteryInfo);
            battery.removeEventListener('levelchange', updateBatteryInfo);
          };
        }
      } catch (error) {
        console.log('Battery API not supported');
      }
    };

    // WiFi/Network monitoring
    const updateNetworkStatus = () => {
      setStatus(prev => ({
        ...prev,
        wifi: {
          online: navigator.onLine,
          // @ts-ignore - Connection API is experimental
          connectionType: navigator.connection?.effectiveType || 'wifi',
          // @ts-ignore - Connection API is experimental
          downlink: navigator.connection?.downlink,
        },
      }));
    };

    // Static volume monitoring (no continuous updates to avoid bug)
    const initVolumeStatus = () => {
      // Set static volume indicator - no real-time monitoring to prevent bugs
      setStatus(prev => ({
        ...prev,
        volume: {
          level: 75, // Static value
          muted: false,
          supported: false, // Mark as not supported to show it's simulated
        },
      }));
    };

    // Initialize monitoring
    initBattery();
    updateNetworkStatus();
    initVolumeStatus();

    // Add network event listeners
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // @ts-ignore - Connection API is experimental
    navigator.connection?.addEventListener('change', updateNetworkStatus);

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      // @ts-ignore
      navigator.connection?.removeEventListener('change', updateNetworkStatus);
    };
  }, []);

  return status;
};
