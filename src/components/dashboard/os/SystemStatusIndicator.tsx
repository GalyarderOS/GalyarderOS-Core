import { Wifi, WifiOff, Battery, BatteryLow, Volume2, VolumeX, Volume1, BatteryCharging } from 'lucide-react';
import { useSystemStatus } from '@/hooks/useSystemStatus';
import { Badge } from '@/components/global/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/global/ui/tooltip';

const SystemStatusIndicator = () => {
  const { battery, wifi, volume } = useSystemStatus();

  const getBatteryIcon = () => {
    if (battery.charging) return BatteryCharging;
    if (battery.level <= 20) return BatteryLow;
    return Battery;
  };

  const getBatteryColor = () => {
    if (battery.charging) return 'text-green-500';
    if (battery.level <= 20) return 'text-red-500';
    if (battery.level <= 50) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getVolumeIcon = () => {
    if (volume.muted || volume.level === 0) return VolumeX;
    if (volume.level < 50) return Volume1;
    return Volume2;
  };

  const WifiIcon = wifi.online ? Wifi : WifiOff;
  const BatteryIcon = getBatteryIcon();
  const VolumeIcon = getVolumeIcon();

  return (
    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
      {/* WiFi Status */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-1">
            <WifiIcon 
              className={`h-4 w-4 ${wifi.online ? 'text-green-500' : 'text-red-500'}`} 
            />
            <Badge variant="outline" className="text-xs px-1 py-0">
              {wifi.connectionType}
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{wifi.online ? 'Connected' : 'Offline'} - {wifi.connectionType}</p>
          {wifi.downlink !== undefined && <p className="text-xs text-muted-foreground">Speed: ~{wifi.downlink} Mbps</p>}
        </TooltipContent>
      </Tooltip>

      {/* Volume Status */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-1">
            <VolumeIcon 
              className={`h-4 w-4 ${volume.muted ? 'text-red-500' : 'text-foreground'}`} 
            />
            {volume.supported && (
              <Badge variant="outline" className="text-xs px-1 py-0">
                {volume.level}%
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Volume: {volume.muted ? 'Muted' : `${volume.level}%`}</p>
        </TooltipContent>
      </Tooltip>

      {/* Battery Status */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-1">
            <BatteryIcon className={`h-4 w-4 ${getBatteryColor()}`} />
            {battery.supported && (
              <Badge variant="outline" className="text-xs px-1 py-0">
                {battery.level}%
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Battery: {battery.level}%</p>
          <p>{battery.charging ? 'Charging' : 'Not charging'}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default SystemStatusIndicator;
