'use client';

import { useState, useEffect } from 'react';

interface SimpleStatusProps {
  fallbackStatus?: 'online' | 'idle' | 'dnd' | 'offline';
  customActivity?: string;
}

const SimpleDiscordStatus: React.FC<SimpleStatusProps> = ({ 
  fallbackStatus = 'online', 
  customActivity 
}) => {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-400';
      case 'idle':
        return 'text-yellow-400';
      case 'dnd':
        return 'text-red-400';
      case 'offline':
        return 'text-gray-400';
      default:
        return 'text-cyan-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return '●';
      case 'idle':
        return '◐';
      case 'dnd':
        return '⚫';
      case 'offline':
        return '○';
      default:
        return '◦';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'ONLINE';
      case 'idle':
        return 'AWAY';
      case 'dnd':
        return 'BUSY';
      case 'offline':
        return 'OFFLINE';
      default:
        return 'UNKNOWN';
    }
  };

  if (!mounted) {
    return (
      <div className="flex flex-col gap-2 pixelify-font">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 animate-pulse">◦</span>
          <span className="text-cyan-400">LOADING...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 pixelify-font">
      <div className="flex items-center gap-2">
        <span className={`${getStatusColor(fallbackStatus)} animate-pulse`}>
          {getStatusIcon(fallbackStatus)}
        </span>
        <span className={getStatusColor(fallbackStatus)}>
          {getStatusText(fallbackStatus)}
        </span>
      </div>
      {customActivity && (
        <div className="text-xs text-cyan-300 truncate">
          {customActivity}
        </div>
      )}
      <div className="text-xs text-gray-500">
        Current time: {currentTime}
      </div>
    </div>
  );
};

export default SimpleDiscordStatus;
