import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'fr' | 'en';
  notifications: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
    email: boolean;
    severity: ('low' | 'medium' | 'high' | 'critical')[];
  };
  dashboard: {
    autoRefresh: boolean;
    refreshInterval: number; // in seconds
    defaultView: 'strategic' | 'analytics' | 'opinion' | 'timeline' | 'network' | 'rawdata' | 'alerts';
    compactMode: boolean;
    showMetrics: boolean;
  };
  map: {
    defaultZoom: number;
    defaultCenter: [number, number];
    basemap: 'streets' | 'satellite' | 'hybrid' | 'terrain';
    showLabels: boolean;
    clusterMarkers: boolean;
  };
  data: {
    retentionPeriod: number; // in days
    maxResults: number;
    autoExportEnabled: boolean;
    exportFormat: 'csv' | 'json' | 'xlsx';
  };
  privacy: {
    anonymizeData: boolean;
    shareAnalytics: boolean;
    localStorageEnabled: boolean;
  };
  advanced: {
    debugMode: boolean;
    performanceMode: boolean;
    experimentalFeatures: boolean;
    apiTimeout: number; // in milliseconds
  };
}

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: <K extends keyof UserSettings>(category: K, updates: Partial<UserSettings[K]>) => void;
  resetSettings: () => void;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => boolean;
  isLoading: boolean;
}

const defaultSettings: UserSettings = {
  theme: 'system',
  language: 'fr',
  notifications: {
    enabled: true,
    sound: true,
    desktop: true,
    email: false,
    severity: ['medium', 'high', 'critical']
  },
  dashboard: {
    autoRefresh: true,
    refreshInterval: 300, // 5 minutes
    defaultView: 'strategic',
    compactMode: false,
    showMetrics: true
  },
  map: {
    defaultZoom: 6,
    defaultCenter: [-15.3, 23.2], // DRC center
    basemap: 'streets',
    showLabels: true,
    clusterMarkers: true
  },
  data: {
    retentionPeriod: 30,
    maxResults: 1000,
    autoExportEnabled: false,
    exportFormat: 'csv'
  },
  privacy: {
    anonymizeData: false,
    shareAnalytics: true,
    localStorageEnabled: true
  },
  advanced: {
    debugMode: false,
    performanceMode: false,
    experimentalFeatures: false,
    apiTimeout: 30000
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

interface SettingsProviderProps {
  children: ReactNode;
}

const SETTINGS_STORAGE_KEY = 'sentinel_settings';

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        // Merge with defaults to ensure all properties exist
        setSettings({ ...defaultSettings, ...parsedSettings });
      }
    } catch (error) {
      console.warn('Failed to load settings from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      } catch (error) {
        console.warn('Failed to save settings to localStorage:', error);
      }
    }
  }, [settings, isLoading]);

  // Apply theme changes to document
  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;
      
      if (settings.theme === 'system') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      } else {
        if (settings.theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    applyTheme();

    // Listen for system theme changes if using system theme
    if (settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', applyTheme);
      return () => mediaQuery.removeEventListener('change', applyTheme);
    }
  }, [settings.theme]);

  const updateSettings = <K extends keyof UserSettings>(
    category: K,
    updates: Partial<UserSettings[K]>
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        ...updates
      }
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const exportSettings = (): string => {
    return JSON.stringify(settings, null, 2);
  };

  const importSettings = (settingsJson: string): boolean => {
    try {
      const parsedSettings = JSON.parse(settingsJson);
      // Validate structure by checking for required top-level keys
      const requiredKeys = ['theme', 'language', 'notifications', 'dashboard', 'map', 'data', 'privacy', 'advanced'];
      const hasAllKeys = requiredKeys.every(key => key in parsedSettings);
      
      if (hasAllKeys) {
        setSettings({ ...defaultSettings, ...parsedSettings });
        return true;
      } else {
        throw new Error('Invalid settings structure');
      }
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSettings,
      resetSettings,
      exportSettings,
      importSettings,
      isLoading
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

// Hook for easy access to specific setting categories
export function useNotificationSettings() {
  const { settings, updateSettings } = useSettings();
  return {
    settings: settings.notifications,
    updateSettings: (updates: Partial<UserSettings['notifications']>) => 
      updateSettings('notifications', updates)
  };
}

export function useDashboardSettings() {
  const { settings, updateSettings } = useSettings();
  return {
    settings: settings.dashboard,
    updateSettings: (updates: Partial<UserSettings['dashboard']>) => 
      updateSettings('dashboard', updates)
  };
}

export function useMapSettings() {
  const { settings, updateSettings } = useSettings();
  return {
    settings: settings.map,
    updateSettings: (updates: Partial<UserSettings['map']>) => 
      updateSettings('map', updates)
  };
}

export function useDataSettings() {
  const { settings, updateSettings } = useSettings();
  return {
    settings: settings.data,
    updateSettings: (updates: Partial<UserSettings['data']>) => 
      updateSettings('data', updates)
  };
}