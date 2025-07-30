import { useState, useEffect, useRef, useCallback } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { useDashboardSettings } from '../contexts/SettingsContext';

export interface RealTimeUpdate<T = any> {
  id: string;
  type: 'create' | 'update' | 'delete';
  data: T;
  timestamp: Date;
  source: string;
}

export interface RealTimeDataHookOptions {
  enabled?: boolean;
  interval?: number; // in milliseconds
  maxUpdates?: number;
  onUpdate?: (update: RealTimeUpdate) => void;
  onError?: (error: Error) => void;
}

// Mock data generators for different types
const generateMockAlert = (): any => {
  const priorities = ['low', 'medium', 'high', 'critical'];
  const statuses = ['new', 'investigating', 'confirmed', 'resolved'];
  const locations = ['Kinshasa', 'Nord-Kivu', 'Sud-Kivu', 'Katanga', 'Kasaï'];
  const sources = ['Twitter', 'Facebook', 'WhatsApp', 'Telegram', 'News'];

  return {
    id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: `Incident ${Math.random() > 0.5 ? 'sécuritaire' : 'social'} détecté`,
    description: `Activité suspecte signalée par plusieurs sources dans la région`,
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    severity: Math.floor(Math.random() * 10) + 1,
    location: locations[Math.floor(Math.random() * locations.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    createdAt: new Date().toISOString(),
    mentions: Math.floor(Math.random() * 50) + 1,
    verified: Math.random() > 0.7
  };
};

const generateMockSocialPost = (): any => {
  const platforms = ['Twitter', 'Facebook', 'WhatsApp', 'Telegram', 'Instagram'];
  const sentiments = ['positive', 'negative', 'neutral'];
  const locations = ['Kinshasa', 'Nord-Kivu', 'Sud-Kivu', 'Katanga', 'Kasaï'];

  return {
    id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    content: `Nouveau contenu social détecté avec impact potentiel sur la situation`,
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    author: `@user_${Math.random().toString(36).substr(2, 6)}`,
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    engagement: Math.floor(Math.random() * 1000),
    reach: Math.floor(Math.random() * 10000),
    location: locations[Math.floor(Math.random() * locations.length)],
    timestamp: new Date().toISOString(),
    verified: Math.random() > 0.8
  };
};

const generateMockNetworkEvent = (): any => {
  const eventTypes = ['new_connection', 'influence_change', 'activity_spike', 'cluster_formation'];
  const nodeTypes = ['person', 'organization', 'location', 'event'];

  return {
    id: `network_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
    nodeId: `node_${Math.random().toString(36).substr(2, 9)}`,
    nodeType: nodeTypes[Math.floor(Math.random() * nodeTypes.length)],
    influence: Math.random() * 100,
    change: (Math.random() - 0.5) * 20,
    timestamp: new Date().toISOString()
  };
};

export function useRealTimeData<T = any>(
  dataType: 'alerts' | 'social' | 'network' | 'all',
  options: RealTimeDataHookOptions = {}
) {
  const {
    enabled = true,
    interval = 5000,
    maxUpdates = 100,
    onUpdate,
    onError
  } = options;

  const [updates, setUpdates] = useState<RealTimeUpdate<T>[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const [errorCount, setErrorCount] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const updateCountRef = useRef(0);
  const { success, warning, error } = useNotifications();
  const { settings: dashboardSettings } = useDashboardSettings();

  // Mock WebSocket connection simulation
  const connect = useCallback(() => {
    if (!enabled || !dashboardSettings.autoRefresh) return;

    setIsConnected(true);
    setErrorCount(0);

    intervalRef.current = setInterval(() => {
      try {
        // Simulate random updates
        if (Math.random() < 0.3) { // 30% chance of update each interval
          const updateType = Math.random() < 0.7 ? 'create' : Math.random() < 0.9 ? 'update' : 'delete';
          let mockData: any;
          let source: string;

          // Generate appropriate mock data based on type
          switch (dataType) {
            case 'alerts':
              mockData = generateMockAlert();
              source = 'AlertSystem';
              break;
            case 'social':
              mockData = generateMockSocialPost();
              source = 'SocialMonitor';
              break;
            case 'network':
              mockData = generateMockNetworkEvent();
              source = 'NetworkAnalyzer';
              break;
            case 'all':
            default:
              const types = ['alerts', 'social', 'network'];
              const randomType = types[Math.floor(Math.random() * types.length)];
              switch (randomType) {
                case 'alerts':
                  mockData = generateMockAlert();
                  source = 'AlertSystem';
                  break;
                case 'social':
                  mockData = generateMockSocialPost();
                  source = 'SocialMonitor';
                  break;
                case 'network':
                  mockData = generateMockNetworkEvent();
                  source = 'NetworkAnalyzer';
                  break;
              }
          }

          const update: RealTimeUpdate<T> = {
            id: `update_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: updateType,
            data: mockData as T,
            timestamp: new Date(),
            source
          };

          setUpdates(prev => {
            const newUpdates = [update, ...prev].slice(0, maxUpdates);
            return newUpdates;
          });

          setLastUpdateTime(new Date());
          updateCountRef.current++;

          // Call onUpdate callback if provided
          if (onUpdate) {
            onUpdate(update);
          }

          // Show notification for high-priority updates
          if (updateType === 'create' && mockData.priority === 'critical') {
            warning(
              'Alerte Critique',
              `Nouvelle alerte de priorité critique détectée: ${mockData.title}`,
              { duration: 10000 }
            );
          }
        }
      } catch (err) {
        const error = err as Error;
        setErrorCount(prev => prev + 1);
        if (onError) {
          onError(error);
        }
        // Real-time data update error handled via callback
      }
    }, interval);
  }, [enabled, interval, maxUpdates, onUpdate, onError, dataType, dashboardSettings.autoRefresh]);

  const disconnect = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsConnected(false);
  }, []);

  // Auto-connect/disconnect based on enabled state
  useEffect(() => {
    if (enabled && dashboardSettings.autoRefresh) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [enabled, connect, disconnect, dashboardSettings.autoRefresh]);

  // Manual refresh function
  const refresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    connect();
  }, [connect]);

  // Clear updates
  const clearUpdates = useCallback(() => {
    setUpdates([]);
    updateCountRef.current = 0;
  }, []);

  // Get updates by type
  const getUpdatesByType = useCallback((type: RealTimeUpdate['type']) => {
    return updates.filter(update => update.type === type);
  }, [updates]);

  // Get recent updates (last N minutes)
  const getRecentUpdates = useCallback((minutes: number = 5) => {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000);
    return updates.filter(update => update.timestamp > cutoff);
  }, [updates]);

  // Connection health check
  const connectionHealth = {
    isConnected,
    lastUpdateTime,
    errorCount,
    updateCount: updateCountRef.current,
    averageInterval: lastUpdateTime ? Date.now() - lastUpdateTime.getTime() : null
  };

  return {
    updates,
    isConnected,
    lastUpdateTime,
    errorCount,
    updateCount: updateCountRef.current,
    connectionHealth,
    
    // Actions
    connect,
    disconnect,
    refresh,
    clearUpdates,
    
    // Queries
    getUpdatesByType,
    getRecentUpdates,
    
    // Computed values
    hasRecentUpdates: getRecentUpdates(1).length > 0,
    criticalUpdates: updates.filter(u => u.data?.priority === 'critical'),
    newUpdatesCount: getUpdatesByType('create').length,
    isHealthy: errorCount < 5 && isConnected
  };
}

// Specialized hooks for specific data types
export function useRealTimeAlerts(options?: RealTimeDataHookOptions) {
  return useRealTimeData('alerts', options);
}

export function useRealTimeSocial(options?: RealTimeDataHookOptions) {
  return useRealTimeData('social', options);
}

export function useRealTimeNetwork(options?: RealTimeDataHookOptions) {
  return useRealTimeData('network', options);
}

// Hook for monitoring system health across all data types
export function useSystemHealth() {
  const alertsHealth = useRealTimeAlerts({ enabled: true });
  const socialHealth = useRealTimeSocial({ enabled: true });
  const networkHealth = useRealTimeNetwork({ enabled: true });

  const overallHealth = {
    alerts: alertsHealth.connectionHealth,
    social: socialHealth.connectionHealth,
    network: networkHealth.connectionHealth,
    
    // Overall status
    isHealthy: alertsHealth.isHealthy && socialHealth.isHealthy && networkHealth.isHealthy,
    totalErrors: alertsHealth.errorCount + socialHealth.errorCount + networkHealth.errorCount,
    totalUpdates: alertsHealth.updateCount + socialHealth.updateCount + networkHealth.updateCount,
    
    // Actions
    refreshAll: () => {
      alertsHealth.refresh();
      socialHealth.refresh();
      networkHealth.refresh();
    },
    
    clearAll: () => {
      alertsHealth.clearUpdates();
      socialHealth.clearUpdates();
      networkHealth.clearUpdates();
    }
  };

  return overallHealth;
}