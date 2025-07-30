import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, RotateCcw, 
  Clock, Calendar, Zap, Settings
} from 'lucide-react';

interface TimeControlsProps {
  onTimeChange: (time: Date) => void;
  onSpeedChange: (speed: number) => void;
  onPlayPause: (playing: boolean) => void;
  isPlaying: boolean;
  currentTime: Date;
  timeRange: { start: Date; end: Date };
  speed: number;
}

export function TimeControls({ 
  onTimeChange, 
  onSpeedChange, 
  onPlayPause, 
  isPlaying, 
  currentTime, 
  timeRange, 
  speed 
}: TimeControlsProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [timelinePosition, setTimelinePosition] = useState(0);

  // Calculate timeline position based on current time
  useEffect(() => {
    const totalRange = timeRange.end.getTime() - timeRange.start.getTime();
    const currentPosition = currentTime.getTime() - timeRange.start.getTime();
    const position = (currentPosition / totalRange) * 100;
    setTimelinePosition(Math.max(0, Math.min(100, position)));
  }, [currentTime, timeRange]);

  const handleTimelineChange = (position: number) => {
    const totalRange = timeRange.end.getTime() - timeRange.start.getTime();
    const newTime = new Date(timeRange.start.getTime() + (position / 100) * totalRange);
    onTimeChange(newTime);
    setTimelinePosition(position);
  };

  const jumpToTime = (direction: 'start' | 'end' | 'back' | 'forward') => {
    switch (direction) {
      case 'start':
        onTimeChange(timeRange.start);
        break;
      case 'end':
        onTimeChange(timeRange.end);
        break;
      case 'back':
        const backTime = new Date(currentTime.getTime() - (24 * 60 * 60 * 1000 * speed));
        onTimeChange(new Date(Math.max(timeRange.start.getTime(), backTime.getTime())));
        break;
      case 'forward':
        const forwardTime = new Date(currentTime.getTime() + (24 * 60 * 60 * 1000 * speed));
        onTimeChange(new Date(Math.min(timeRange.end.getTime(), forwardTime.getTime())));
        break;
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeRange = () => {
    const days = Math.ceil((timeRange.end.getTime() - timeRange.start.getTime()) / (24 * 60 * 60 * 1000));
    return `${days} days`;
  };

  const speedOptions = [
    { value: 0.25, label: '0.25x', description: 'Very Slow' },
    { value: 0.5, label: '0.5x', description: 'Slow' },
    { value: 1, label: '1x', description: 'Normal' },
    { value: 2, label: '2x', description: 'Fast' },
    { value: 4, label: '4x', description: 'Very Fast' },
    { value: 8, label: '8x', description: 'Ultra Fast' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Temporal Analysis</h3>
          </div>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-colors ${
              showSettings 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Current Time Display */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Current Time</div>
              <div className="text-lg font-mono font-semibold text-gray-800 dark:text-white">
                {formatDateTime(currentTime)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">Range</div>
              <div className="text-lg font-semibold text-gray-800 dark:text-white">
                {formatTimeRange()}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{formatDateTime(timeRange.start)}</span>
            <span>{formatDateTime(timeRange.end)}</span>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={timelinePosition}
              onChange={(e) => handleTimelineChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <div 
              className="absolute top-0 h-2 bg-blue-500 rounded-lg pointer-events-none"
              style={{ width: `${timelinePosition}%` }}
            />
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-600 border-2 border-white dark:border-gray-800 rounded-full pointer-events-none shadow-lg"
              style={{ left: `calc(${timelinePosition}% - 8px)` }}
            />
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => jumpToTime('start')}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Jump to start"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => jumpToTime('back')}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Step backward"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onPlayPause(!isPlaying)}
            className={`p-3 rounded-lg transition-colors ${
              isPlaying 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
                : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
            }`}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          
          <button
            onClick={() => jumpToTime('forward')}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Step forward"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => jumpToTime('end')}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Jump to end"
          >
            <SkipForward className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onTimeChange(new Date())}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Jump to now"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center justify-center space-x-4">
          <Zap className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <div className="flex space-x-1">
            {speedOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSpeedChange(option.value)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  speed === option.value
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-600'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                title={option.description}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Settings */}
        {showSettings && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Animation Settings</h4>
            
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Show data trails</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Smooth transitions</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Auto-loop</span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Time Step Size</label>
              <select className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                <option value="1h">1 Hour</option>
                <option value="6h">6 Hours</option>
                <option value="1d" selected>1 Day</option>
                <option value="1w">1 Week</option>
              </select>
            </div>
          </div>
        )}

        {/* Live Mode Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
          <span className="text-sm text-gray-600 dark:text-gray-400">Live Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
}