import { BaseService } from './BaseService';

export interface AppSettings {
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    language: 'fr' | 'en' | 'sw' | 'ln';
    fontSize: 'small' | 'medium' | 'large';
    compactMode: boolean;
    animations: boolean;
    highContrast: boolean;
  };
  notifications: {
    enabled: boolean;
    email: boolean;
    push: boolean;
    sms: boolean;
    sound: boolean;
    frequency: 'immediate' | 'hourly' | 'daily';
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
    types: {
      alerts: boolean;
      mentions: boolean;
      reports: boolean;
      system: boolean;
    };
  };
  dashboard: {
    autoRefresh: boolean;
    refreshInterval: number; // seconds
    defaultView: 'overview' | 'alerts' | 'search' | 'analytics';
    widgetLayout: Array<{
      id: string;
      position: { x: number; y: number };
      size: { width: number; height: number };
      visible: boolean;
    }>;
  };
  map: {
    mapboxToken: string;
    basemap: 'streets' | 'satellite' | 'hybrid' | 'terrain';
    defaultZoom: number;
    defaultCenter: { lat: number; lng: number };
    defaultLayers: string[];
    clustering: boolean;
    heatmapEnabled: boolean;
    animationSpeed: 'slow' | 'normal' | 'fast';
  };
  data: {
    retentionPeriod: number; // days, -1 for unlimited
    autoExportEnabled: boolean;
    exportFormat: 'csv' | 'json' | 'xlsx';
    exportSchedule: string; // cron format
    cacheEnabled: boolean;
    maxCacheSize: number; // MB
    compression: boolean;
  };
  privacy: {
    anonymizeData: boolean;
    dataSharing: boolean;
    analytics: boolean;
    locationTracking: boolean;
    ipLogging: boolean;
    sessionRecording: boolean;
    consentRequired: boolean;
  };
  advanced: {
    debugMode: boolean;
    performanceMonitoring: boolean;
    experimentalFeatures: boolean;
    apiTimeout: number; // seconds
    maxConcurrentRequests: number;
    errorReporting: boolean;
    featureFlags: Record<string, boolean>;
  };
  security: {
    sessionTimeout: number; // minutes
    maxLoginAttempts: number;
    requireTwoFactor: boolean;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSymbols: boolean;
    };
    ipWhitelist: string[];
    auditLogging: boolean;
  };
}

export interface UserPreferences extends Partial<AppSettings> {
  userId: string;
  lastModified: Date;
  version: string;
}

export interface SystemConfiguration {
  deployment: {
    environment: 'development' | 'staging' | 'production';
    version: string;
    buildDate: Date;
    features: string[];
  };
  limits: {
    maxUsers: number;
    maxKeywords: number;
    maxAlerts: number;
    dataRetentionDays: number;
    apiRateLimit: number;
  };
  integrations: {
    mapbox: { enabled: boolean; apiKey?: string };
    email: { enabled: boolean; provider?: string };
    sms: { enabled: boolean; provider?: string };
    webhooks: { enabled: boolean; maxEndpoints: number };
  };
}

export class SettingsService extends BaseService {
  constructor() {
    super('sentinel_settings');
  }

  private getDefaultSettings(): AppSettings {
    return {
      appearance: {
        theme: 'light',
        language: 'fr',
        fontSize: 'medium',
        compactMode: false,
        animations: true,
        highContrast: false
      },
      notifications: {
        enabled: true,
        email: true,
        push: true,
        sms: false,
        sound: true,
        frequency: 'immediate',
        quietHours: {
          enabled: false,
          start: '22:00',
          end: '07:00'
        },
        types: {
          alerts: true,
          mentions: true,
          reports: false,
          system: true
        }
      },
      dashboard: {
        autoRefresh: true,
        refreshInterval: 30,
        defaultView: 'overview',
        widgetLayout: [
          { id: 'alerts', position: { x: 0, y: 0 }, size: { width: 6, height: 4 }, visible: true },
          { id: 'sentiment', position: { x: 6, y: 0 }, size: { width: 6, height: 4 }, visible: true },
          { id: 'geographic', position: { x: 0, y: 4 }, size: { width: 12, height: 6 }, visible: true }
        ]
      },
      map: {
        mapboxToken: '',
        basemap: 'streets',
        defaultZoom: 6,
        defaultCenter: { lat: -4.4419, lng: 15.2663 }, // Kinshasa
        defaultLayers: ['Activité', 'Alertes'],
        clustering: true,
        heatmapEnabled: true,
        animationSpeed: 'normal'
      },
      data: {
        retentionPeriod: 90,
        autoExportEnabled: false,
        exportFormat: 'csv',
        exportSchedule: '0 2 * * *', // Daily at 2 AM
        cacheEnabled: true,
        maxCacheSize: 100,
        compression: true
      },
      privacy: {
        anonymizeData: false,
        dataSharing: false,
        analytics: true,
        locationTracking: true,
        ipLogging: false,
        sessionRecording: false,
        consentRequired: true
      },
      advanced: {
        debugMode: false,
        performanceMonitoring: true,
        experimentalFeatures: false,
        apiTimeout: 30,
        maxConcurrentRequests: 10,
        errorReporting: true,
        featureFlags: {}
      },
      security: {
        sessionTimeout: 480, // 8 hours
        maxLoginAttempts: 5,
        requireTwoFactor: false,
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireNumbers: true,
          requireSymbols: false
        },
        ipWhitelist: [],
        auditLogging: true
      }
    };
  }

  async getSettings(): Promise<AppSettings> {
    await this.simulateDelay(100);
    
    const settings = this.loadFromStorage<AppSettings>();
    if (settings) {
      // Merge with defaults to ensure all properties exist
      return { ...this.getDefaultSettings(), ...settings };
    }
    
    return this.getDefaultSettings();
  }

  async updateSettings(updates: Partial<AppSettings>): Promise<AppSettings> {
    await this.simulateDelay(150);
    
    const currentSettings = await this.getSettings();
    const newSettings = this.deepMerge(currentSettings, updates);
    
    this.saveToStorage(newSettings);
    
    // Trigger settings change event
    this.notifySettingsChange(newSettings);
    
    return newSettings;
  }

  async resetSettings(): Promise<AppSettings> {
    await this.simulateDelay(100);
    
    const defaultSettings = this.getDefaultSettings();
    this.saveToStorage(defaultSettings);
    
    this.notifySettingsChange(defaultSettings);
    
    return defaultSettings;
  }

  async getUserPreferences(userId: string): Promise<UserPreferences> {
    await this.simulateDelay(100);
    
    const userKey = `user_preferences_${userId}`;
    const preferences = localStorage.getItem(userKey);
    
    if (preferences) {
      return JSON.parse(preferences);
    }
    
    const defaultPreferences: UserPreferences = {
      userId,
      lastModified: new Date(),
      version: '1.0.0',
      appearance: {
        theme: 'light',
        language: 'fr',
        fontSize: 'medium',
        compactMode: false,
        animations: true,
        highContrast: false
      }
    };
    
    return defaultPreferences;
  }

  async updateUserPreferences(userId: string, updates: Partial<UserPreferences>): Promise<UserPreferences> {
    await this.simulateDelay(150);
    
    const currentPreferences = await this.getUserPreferences(userId);
    const newPreferences = {
      ...currentPreferences,
      ...updates,
      lastModified: new Date()
    };
    
    const userKey = `user_preferences_${userId}`;
    localStorage.setItem(userKey, JSON.stringify(newPreferences));
    
    return newPreferences;
  }

  async exportSettings(): Promise<string> {
    await this.simulateDelay(200);
    
    const settings = await this.getSettings();
    const exportData = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      settings,
      metadata: {
        application: 'Sentinel',
        format: 'json'
      }
    };
    
    return JSON.stringify(exportData, null, 2);
  }

  async importSettings(data: string): Promise<{ success: boolean; errors: string[] }> {
    await this.simulateDelay(300);
    
    try {
      const importData = JSON.parse(data);
      const errors: string[] = [];
      
      // Validate import data structure
      if (!importData.settings) {
        errors.push('Format de fichier invalide: section settings manquante');
        return { success: false, errors };
      }
      
      // Validate version compatibility
      if (importData.version && !this.isVersionCompatible(importData.version)) {
        errors.push(`Version incompatible: ${importData.version}`);
      }
      
      // Import settings with validation
      const defaultSettings = this.getDefaultSettings();
      const importedSettings = this.validateAndMergeSettings(defaultSettings, importData.settings);
      
      if (errors.length === 0) {
        this.saveToStorage(importedSettings);
        this.notifySettingsChange(importedSettings);
        return { success: true, errors: [] };
      }
      
      return { success: false, errors };
      
    } catch (error) {
      return { 
        success: false, 
        errors: [`Erreur de parsing JSON: ${error instanceof Error ? error.message : 'Erreur inconnue'}`] 
      };
    }
  }

  async getSystemConfiguration(): Promise<SystemConfiguration> {
    await this.simulateDelay(100);
    
    // In a real implementation, this would come from environment variables or a config service
    return {
      deployment: {
        environment: 'development',
        version: '1.0.0',
        buildDate: new Date('2024-06-27'),
        features: ['alerts', 'search', 'analytics', 'network', 'geographic', 'keywords']
      },
      limits: {
        maxUsers: 100,
        maxKeywords: 50,
        maxAlerts: 1000,
        dataRetentionDays: 365,
        apiRateLimit: 1000
      },
      integrations: {
        mapbox: { enabled: true, apiKey: process.env.VITE_MAPBOX_ACCESS_TOKEN },
        email: { enabled: false },
        sms: { enabled: false },
        webhooks: { enabled: true, maxEndpoints: 10 }
      }
    };
  }

  async validateConfiguration(): Promise<{ valid: boolean; issues: string[] }> {
    await this.simulateDelay(200);
    
    const settings = await this.getSettings();
    const issues: string[] = [];
    
    // Validate map configuration
    if (!settings.map.mapboxToken) {
      issues.push('Token Mapbox manquant - les fonctionnalités cartographiques seront limitées');
    }
    
    // Validate data retention
    if (settings.data.retentionPeriod < 1 && settings.data.retentionPeriod !== -1) {
      issues.push('Période de rétention des données invalide');
    }
    
    // Validate notification settings
    if (settings.notifications.enabled && !settings.notifications.email && !settings.notifications.push) {
      issues.push('Notifications activées mais aucun canal de notification configuré');
    }
    
    // Validate security settings
    if (settings.security.sessionTimeout < 5) {
      issues.push('Délai d\'expiration de session trop court (minimum 5 minutes)');
    }
    
    return {
      valid: issues.length === 0,
      issues
    };
  }

  private deepMerge(target: any, source: any): any {
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    
    return result;
  }

  private validateAndMergeSettings(defaults: AppSettings, imported: Partial<AppSettings>): AppSettings {
    // Implement validation logic here
    // For now, just merge with defaults
    return this.deepMerge(defaults, imported);
  }

  private isVersionCompatible(version: string): boolean {
    // Simple version compatibility check
    const [major] = version.split('.');
    return major === '1';
  }

  private notifySettingsChange(settings: AppSettings): void {
    // In a real implementation, this would emit an event or call registered callbacks
    // For now, we'll just dispatch a custom event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('settingsChanged', { detail: settings }));
    }
  }

  async getFeatureFlags(): Promise<Record<string, boolean>> {
    await this.simulateDelay(50);
    
    const settings = await this.getSettings();
    return {
      ...settings.advanced.featureFlags,
      // Default feature flags
      enhancedSearch: true,
      networkAnalysis: true,
      realTimeUpdates: true,
      advancedFilters: true,
      customReports: false,
      aiInsights: false
    };
  }

  async toggleFeatureFlag(flag: string, enabled: boolean): Promise<void> {
    await this.simulateDelay(100);
    
    const settings = await this.getSettings();
    settings.advanced.featureFlags[flag] = enabled;
    
    await this.updateSettings(settings);
  }
}