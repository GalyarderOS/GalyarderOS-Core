
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
    },
    volume: {
      level: 50,
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
        },
      }));
    };

    // Volume monitoring (limited in web browsers)
    const initVolumeMonitoring = () => {
      try {
        // Create a silent audio context to monitor volume
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        navigator.mediaDevices?.getUserMedia({ audio: true })
          .then(stream => {
            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            
            const checkVolume = () => {
              analyser.getByteFrequencyData(dataArray);
              const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
              const volumeLevel = Math.round((average / 255) * 100);
              
              setStatus(prev => ({
                ...prev,
                volume: {
                  level: volumeLevel,
                  muted: volumeLevel === 0,
                  supported: true,
                },
              }));
              
              requestAnimationFrame(checkVolume);
            };
            
            checkVolume();
          })
          .catch(() => {
            // Fallback to simulated volume
            setStatus(prev => ({
              ...prev,
              volume: {
                level: 75,
                muted: false,
                supported: false,
              },
            }));
          });
      } catch (error) {
        console.log('Volume monitoring not supported');
      }
    };

    // Initialize all monitoring
    initBattery();
    updateNetworkStatus();
    initVolumeMonitoring();

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
