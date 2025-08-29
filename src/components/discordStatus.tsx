'use client';

import { useState, useEffect } from 'react';

interface DiscordData {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  discord_user: {
    username: string;
    avatar: string;
    display_name: string;
  };
  activities: Array<{
    name: string;
    type: number;
    details?: string;
    state?: string;
  }>;
}

interface DiscordStatusProps {
  userId: string;
}

const DiscordStatus: React.FC<DiscordStatusProps> = ({ userId }) => {
  const [status, setStatus] = useState<string>('loading');
  const [activity, setActivity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchDiscordStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await res.json();
        
        console.log('Lanyard API Response:', data); // Debug log
        
        if (data.success) {
          const discordData: DiscordData = data.data;
          setStatus(discordData.discord_status);
          
          // Get current activity if any
          const currentActivity = discordData.activities?.find(
            activity => activity.type === 0 || activity.type === 2
          );
          
          if (currentActivity) {
            if (currentActivity.details && currentActivity.state) {
              setActivity(`${currentActivity.name}: ${currentActivity.details}`);
            } else {
              setActivity(currentActivity.name);
            }
          } else {
            setActivity(null);
          }
          
          // Update timestamp only on client
          if (mounted) {
            const now = new Date();
            setLastUpdated(now.toLocaleTimeString('en-US', { 
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }));
          }
          setError(null); // Clear any previous errors
        } else {
          console.error('Lanyard API Error:', data.error);
          setError(data.error?.message || 'User not found on Lanyard');
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Network error - check console');
        setStatus('offline');
      }
    };

    if (mounted) {
      fetchDiscordStatus();
      
      // Update status every 30 seconds
      const interval = setInterval(fetchDiscordStatus, 30000);
      
      return () => clearInterval(interval);
    }
  }, [userId, mounted]);

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
      case 'loading':
        return 'LOADING...';
      default:
        return 'UNKNOWN';
    }
  };

  if (error) {
    return (
      <div className="flex flex-col gap-2 pixelify-font">
        <div className="flex items-center gap-2">
          <span className="text-red-400">○</span>
          <span className="text-red-400">ERROR</span>
        </div>
        <div className="text-xs text-gray-500">
          {error}
        </div>
      </div>
    );
  }

  // Prevent hydration mismatch by not rendering time-dependent content until mounted
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
        <span className={`${getStatusColor(status)} animate-pulse`}>
          {getStatusIcon(status)}
        </span>
        <span className={getStatusColor(status)}>
          {getStatusText(status)}
        </span>
      </div>
      {activity && (
        <div className="text-xs text-cyan-300 truncate">
          {activity}
        </div>
      )}
      {lastUpdated && (
        <div className="text-xs text-gray-500">
          Last updated: {lastUpdated}
        </div>
      )}
    </div>
  );
};

export default DiscordStatus;
