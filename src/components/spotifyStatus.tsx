'use client';

import { useState, useEffect } from 'react';

interface SpotifyData {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  track_id: string;
}

interface LanyardData {
  spotify: SpotifyData | null;
  listening_to_spotify: boolean;
}

interface SpotifyStatusProps {
  userId: string;
}

const SpotifyStatus: React.FC<SpotifyStatusProps> = ({ userId }) => {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchSpotifyStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await res.json();
        
        console.log('Spotify API Response:', data); // Debug log
        
        if (data.success) {
          const lanyardData: LanyardData = data.data;
          setIsListening(lanyardData.listening_to_spotify);
          setSpotifyData(lanyardData.spotify);
          
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
      }
    };

    if (mounted) {
      fetchSpotifyStatus();
      
      // Update status every 15 seconds (more frequent for music)
      const interval = setInterval(fetchSpotifyStatus, 15000);
      
      return () => clearInterval(interval);
    }
  }, [userId, mounted]);

  // Prevent hydration mismatch by not rendering time-dependent content until mounted
  if (!mounted) {
    return (
      <div className="flex flex-col gap-2 pixelify-font">
        <div className="text-cyan-400 animate-pulse">
          ♪ Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-2 pixelify-font">
        <div className="text-red-400">
          ♪ Error
        </div>
        <div className="text-xs text-gray-500">
          {error}
        </div>
      </div>
    );
  }

  if (!isListening || !spotifyData) {
    return (
      <div className="flex flex-col gap-2 pixelify-font">
        <div className="text-gray-400">
          ♪ Not listening
        </div>
        <div className="text-xs text-gray-500">
          No music playing
        </div>
        {lastUpdated && (
          <div className="text-xs text-gray-600">
            Last checked: {lastUpdated}
          </div>
        )}
      </div>
    );
  }

  // Truncate long text for better display
  const truncateText = (text: string, maxLength: number = 25) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="flex flex-col gap-2 pixelify-font">
      <div className="flex items-center gap-2">
        <span className="text-green-400 animate-pulse">♪</span>
        <span className="text-green-400 font-bold">NOW PLAYING</span>
      </div>
      
      {/* Album art and song info */}
      <div className="flex gap-2">
        {spotifyData.album_art_url && (
          <img 
            src={spotifyData.album_art_url} 
            alt="Album Art" 
            className="w-12 h-12 rounded border border-green-800"
          />
        )}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="text-cyan-300 text-sm font-semibold truncate" title={spotifyData.song}>
            {truncateText(spotifyData.song, 20)}
          </div>
          <div className="text-yellow-400 text-xs truncate" title={spotifyData.artist}>
            by {truncateText(spotifyData.artist, 18)}
          </div>
          <div className="text-gray-400 text-xs truncate" title={spotifyData.album}>
            {truncateText(spotifyData.album, 18)}
          </div>
        </div>
      </div>

      {lastUpdated && (
        <div className="text-xs text-gray-500">
          Updated: {lastUpdated}
        </div>
      )}
    </div>
  );
};

export default SpotifyStatus;
