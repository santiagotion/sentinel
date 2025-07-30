import { BaseService } from './BaseService';

export interface DetailedAlert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  category: 'security' | 'misinformation' | 'trend' | 'network' | 'political' | 'social' | 'economic';
  title: string;
  description: string;
  location: string;
  time: Date;
  status: 'active' | 'investigating' | 'monitoring' | 'resolved' | 'dismissed';
  assignedTo: string | null;
  metrics: {
    mentions: number;
    sentiment: number;
    reach: number;
    sources: string[];
  };
  notes?: AlertNote[];
  timeline?: AlertTimelineEvent[];
}

export interface AlertNote {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
}

export interface AlertTimelineEvent {
  id: string;
  action: string;
  description: string;
  author: string;
  timestamp: Date;
}

export interface AlertFilters {
  type?: string[];
  category?: string[];
  status?: string[];
  assignedTo?: string;
  location?: string;
  dateRange?: { start: Date; end: Date };
  priority?: string[];
}

export interface CreateAlertData {
  type: 'critical' | 'warning' | 'info';
  category: string;
  title: string;
  description: string;
  location: string;
  metrics?: Partial<DetailedAlert['metrics']>;
}

export class AlertsService extends BaseService {
  constructor() {
    super('sentinel_alerts');
  }

  private parseDatesInAlert(alert: any): DetailedAlert {
    return {
      ...alert,
      time: new Date(alert.time),
      notes: alert.notes?.map((note: any) => ({
        ...note,
        timestamp: new Date(note.timestamp)
      })),
      timeline: alert.timeline?.map((event: any) => ({
        ...event,
        timestamp: new Date(event.timestamp)
      }))
    };
  }

  private generateMockAlerts(): DetailedAlert[] {
    return [
      {
        id: 1,
        type: 'critical',
        category: 'security',
        title: 'Pic d\'activité anormal détecté',
        description: 'Augmentation de 300% des mentions négatives concernant la sécurité dans la province du Nord-Kivu',
        location: 'Nord-Kivu',
        time: new Date(Date.now() - 120000),
        status: 'active',
        assignedTo: null,
        metrics: {
          mentions: 892,
          sentiment: -0.73,
          reach: 234000,
          sources: ['Facebook', 'Twitter']
        },
        timeline: [
          {
            id: '1-1',
            action: 'created',
            description: 'Alerte créée automatiquement par le système IA',
            author: 'System',
            timestamp: new Date(Date.now() - 120000)
          }
        ]
      },
      {
        id: 2,
        type: 'warning',
        category: 'misinformation',
        title: 'Campagne de désinformation détectée',
        description: 'Propagation rapide d\'informations non vérifiées concernant des événements à Kinshasa',
        location: 'Kinshasa',
        time: new Date(Date.now() - 300000),
        status: 'investigating',
        assignedTo: 'Équipe Analyse',
        metrics: {
          mentions: 456,
          sentiment: -0.45,
          reach: 125000,
          sources: ['WhatsApp', 'Facebook']
        },
        notes: [
          {
            id: 'note-1',
            content: 'Investigation en cours - sources multiples identifiées',
            author: 'Analyste Principal',
            timestamp: new Date(Date.now() - 60000)
          }
        ],
        timeline: [
          {
            id: '2-1',
            action: 'created',
            description: 'Alerte créée automatiquement',
            author: 'System',
            timestamp: new Date(Date.now() - 300000)
          },
          {
            id: '2-2',
            action: 'assigned',
            description: 'Assigné à l\'Équipe Analyse',
            author: 'Coordinateur',
            timestamp: new Date(Date.now() - 240000)
          },
          {
            id: '2-3',
            action: 'status_changed',
            description: 'Statut changé à "investigating"',
            author: 'Équipe Analyse',
            timestamp: new Date(Date.now() - 180000)
          }
        ]
      },
      {
        id: 3,
        type: 'info',
        category: 'trend',
        title: 'Nouveau sujet tendance identifié',
        description: 'Le terme "réforme éducative" connaît une augmentation significative des mentions positives',
        location: 'National',
        time: new Date(Date.now() - 720000),
        status: 'monitoring',
        assignedTo: 'Équipe Communication',
        metrics: {
          mentions: 234,
          sentiment: 0.67,
          reach: 89000,
          sources: ['News', 'Blogs']
        }
      },
      {
        id: 4,
        type: 'critical',
        category: 'network',
        title: 'Réseau d\'influence hostile détecté',
        description: 'Identification d\'un groupe coordonné diffusant des messages anti-gouvernementaux',
        location: 'Katanga',
        time: new Date(Date.now() - 1080000),
        status: 'active',
        assignedTo: null,
        metrics: {
          mentions: 678,
          sentiment: -0.82,
          reach: 187000,
          sources: ['Twitter', 'Forums']
        }
      }
    ];
  }

  async getAllAlerts(filters?: AlertFilters): Promise<DetailedAlert[]> {
    await this.simulateDelay(200);
    
    let alerts = this.loadFromStorage<DetailedAlert[]>() || this.generateMockAlerts();
    
    // Convert date strings back to Date objects if loading from storage
    if (this.loadFromStorage<DetailedAlert[]>()) {
      alerts = alerts.map(alert => this.parseDatesInAlert(alert));
    }
    
    if (filters) {
      if (filters.type?.length) {
        alerts = alerts.filter(alert => filters.type!.includes(alert.type));
      }
      if (filters.category?.length) {
        alerts = alerts.filter(alert => filters.category!.includes(alert.category));
      }
      if (filters.status?.length) {
        alerts = alerts.filter(alert => filters.status!.includes(alert.status));
      }
      if (filters.assignedTo) {
        alerts = alerts.filter(alert => alert.assignedTo === filters.assignedTo);
      }
      if (filters.location) {
        alerts = alerts.filter(alert => alert.location.toLowerCase().includes(filters.location!.toLowerCase()));
      }
      if (filters.dateRange) {
        alerts = alerts.filter(alert => 
          alert.time >= filters.dateRange!.start && alert.time <= filters.dateRange!.end
        );
      }
    }
    
    return alerts.sort((a, b) => b.time.getTime() - a.time.getTime());
  }

  async getAlert(id: number): Promise<DetailedAlert | null> {
    await this.simulateDelay(100);
    let alerts = this.loadFromStorage<DetailedAlert[]>() || this.generateMockAlerts();
    
    // Convert date strings back to Date objects if loading from storage
    if (this.loadFromStorage<DetailedAlert[]>()) {
      alerts = alerts.map(alert => this.parseDatesInAlert(alert));
    }
    
    return alerts.find(alert => alert.id === id) || null;
  }

  async createAlert(alertData: CreateAlertData): Promise<DetailedAlert> {
    await this.simulateDelay(300);
    
    const alerts = this.loadFromStorage<DetailedAlert[]>() || this.generateMockAlerts();
    const newAlert: DetailedAlert = {
      id: Math.max(...alerts.map(a => a.id), 0) + 1,
      ...alertData,
      time: new Date(),
      status: 'active',
      assignedTo: null,
      metrics: {
        mentions: 0,
        sentiment: 0,
        reach: 0,
        sources: [],
        ...alertData.metrics
      },
      timeline: [
        {
          id: this.generateId(),
          action: 'created',
          description: 'Alerte créée manuellement',
          author: 'User',
          timestamp: new Date()
        }
      ]
    };
    
    alerts.push(newAlert);
    this.saveToStorage(alerts);
    
    return newAlert;
  }

  async updateAlertStatus(id: number, status: DetailedAlert['status'], note?: string): Promise<DetailedAlert> {
    await this.simulateDelay(200);
    
    let alerts = this.loadFromStorage<DetailedAlert[]>() || this.generateMockAlerts();
    
    // Convert date strings back to Date objects if loading from storage
    if (this.loadFromStorage<DetailedAlert[]>()) {
      alerts = alerts.map(alert => this.parseDatesInAlert(alert));
    }
    
    const alertIndex = alerts.findIndex(alert => alert.id === id);
    
    if (alertIndex === -1) {
      throw new Error('Alert not found');
    }
    
    const alert = alerts[alertIndex];
    alert.status = status;
    
    if (!alert.timeline) alert.timeline = [];
    alert.timeline.push({
      id: this.generateId(),
      action: 'status_changed',
      description: `Statut changé à "${status}"${note ? `: ${note}` : ''}`,
      author: 'User',
      timestamp: new Date()
    });
    
    this.saveToStorage(alerts);
    return alert;
  }

  async assignAlert(id: number, assignee: string): Promise<DetailedAlert> {
    await this.simulateDelay(200);
    
    let alerts = this.loadFromStorage<DetailedAlert[]>() || this.generateMockAlerts();
    
    // Convert date strings back to Date objects if loading from storage
    if (this.loadFromStorage<DetailedAlert[]>()) {
      alerts = alerts.map(alert => this.parseDatesInAlert(alert));
    }
    
    const alertIndex = alerts.findIndex(alert => alert.id === id);
    
    if (alertIndex === -1) {
      throw new Error('Alert not found');
    }
    
    const alert = alerts[alertIndex];
    alert.assignedTo = assignee;
    
    if (!alert.timeline) alert.timeline = [];
    alert.timeline.push({
      id: this.generateId(),
      action: 'assigned',
      description: `Assigné à ${assignee}`,
      author: 'User',
      timestamp: new Date()
    });
    
    this.saveToStorage(alerts);
    return alert;
  }

  async addNote(id: number, content: string): Promise<DetailedAlert> {
    await this.simulateDelay(150);
    
    let alerts = this.loadFromStorage<DetailedAlert[]>() || this.generateMockAlerts();
    
    // Convert date strings back to Date objects if loading from storage
    if (this.loadFromStorage<DetailedAlert[]>()) {
      alerts = alerts.map(alert => this.parseDatesInAlert(alert));
    }
    
    const alertIndex = alerts.findIndex(alert => alert.id === id);
    
    if (alertIndex === -1) {
      throw new Error('Alert not found');
    }
    
    const alert = alerts[alertIndex];
    if (!alert.notes) alert.notes = [];
    
    const note: AlertNote = {
      id: this.generateId(),
      content,
      author: 'User',
      timestamp: new Date()
    };
    
    alert.notes.push(note);
    
    if (!alert.timeline) alert.timeline = [];
    alert.timeline.push({
      id: this.generateId(),
      action: 'note_added',
      description: 'Note ajoutée',
      author: 'User',
      timestamp: new Date()
    });
    
    this.saveToStorage(alerts);
    return alert;
  }

  async getAlertStats(): Promise<{
    total: number;
    active: number;
    critical: number;
    investigating: number;
    resolved: number;
    byCategory: Record<string, number>;
  }> {
    await this.simulateDelay(100);
    
    let alerts = this.loadFromStorage<DetailedAlert[]>() || this.generateMockAlerts();
    
    // Convert date strings back to Date objects if loading from storage
    if (this.loadFromStorage<DetailedAlert[]>()) {
      alerts = alerts.map(alert => this.parseDatesInAlert(alert));
    }
    
    return {
      total: alerts.length,
      active: alerts.filter(a => a.status === 'active').length,
      critical: alerts.filter(a => a.type === 'critical').length,
      investigating: alerts.filter(a => a.status === 'investigating').length,
      resolved: alerts.filter(a => a.status === 'resolved').length,
      byCategory: alerts.reduce((acc, alert) => {
        acc[alert.category] = (acc[alert.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }

  async deleteAlert(id: number): Promise<void> {
    await this.simulateDelay(200);
    
    let alerts = this.loadFromStorage<DetailedAlert[]>() || this.generateMockAlerts();
    
    // Convert date strings back to Date objects if loading from storage
    if (this.loadFromStorage<DetailedAlert[]>()) {
      alerts = alerts.map(alert => this.parseDatesInAlert(alert));
    }
    
    const filteredAlerts = alerts.filter(alert => alert.id !== id);
    
    this.saveToStorage(filteredAlerts);
  }

  async getRecentActivity(limit: number = 10): Promise<DetailedAlert[]> {
    await this.simulateDelay(100);
    
    const alerts = await this.getAllAlerts();
    return alerts.slice(0, limit);
  }
}