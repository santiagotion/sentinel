import { BaseService } from './BaseService';
import * as Papa from 'papaparse';

export interface ExportJob {
  id: string;
  name: string;
  type: 'alerts' | 'search' | 'analytics' | 'keywords' | 'network' | 'geographic';
  format: 'csv' | 'json' | 'xlsx' | 'pdf';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  createdAt: Date;
  completedAt?: Date;
  downloadUrl?: string;
  fileSize?: number;
  filters: Record<string, any>;
  error?: string;
}

export interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  type: ExportJob['type'];
  format: ExportJob['format'];
  fields: ExportField[];
  filters: Record<string, any>;
  schedule?: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    recipients: string[];
  };
  createdAt: Date;
  lastUsed?: Date;
}

export interface ExportField {
  key: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'array';
  required: boolean;
  format?: string; // for dates and numbers
}

export interface ExportOptions {
  includeHeaders: boolean;
  dateFormat: string;
  timezone: string;
  encoding: 'utf-8' | 'iso-8859-1';
  delimiter: ',' | ';' | '\t';
  customFields?: Record<string, any>;
}

export class ExportService extends BaseService {
  constructor() {
    super('sentinel_exports');
  }

  private getDefaultExportOptions(): ExportOptions {
    return {
      includeHeaders: true,
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      timezone: 'Africa/Kinshasa',
      encoding: 'utf-8',
      delimiter: ','
    };
  }

  async createExportJob(
    name: string,
    type: ExportJob['type'],
    format: ExportJob['format'],
    filters: Record<string, any>,
    options?: Partial<ExportOptions>
  ): Promise<ExportJob> {
    await this.simulateDelay(200);
    
    const job: ExportJob = {
      id: this.generateId(),
      name,
      type,
      format,
      status: 'pending',
      progress: 0,
      createdAt: new Date(),
      filters
    };
    
    const jobs = this.loadFromStorage<ExportJob[]>() || [];
    jobs.push(job);
    this.saveToStorage(jobs);
    
    // Simulate async processing
    this.processExportJob(job.id, options);
    
    return job;
  }

  async getExportJobs(): Promise<ExportJob[]> {
    await this.simulateDelay(100);
    
    const jobs = this.loadFromStorage<ExportJob[]>() || [];
    return jobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getExportJob(id: string): Promise<ExportJob | null> {
    await this.simulateDelay(50);
    
    const jobs = this.loadFromStorage<ExportJob[]>() || [];
    return jobs.find(job => job.id === id) || null;
  }

  async deleteExportJob(id: string): Promise<void> {
    await this.simulateDelay(100);
    
    const jobs = this.loadFromStorage<ExportJob[]>() || [];
    const filteredJobs = jobs.filter(job => job.id !== id);
    this.saveToStorage(filteredJobs);
  }

  private async processExportJob(jobId: string, options?: Partial<ExportOptions>): Promise<void> {
    const exportOptions = { ...this.getDefaultExportOptions(), ...options };
    
    setTimeout(async () => {
      const jobs = this.loadFromStorage<ExportJob[]>() || [];
      const jobIndex = jobs.findIndex(job => job.id === jobId);
      
      if (jobIndex === -1) return;
      
      const job = jobs[jobIndex];
      
      try {
        // Update status to processing
        job.status = 'processing';
        job.progress = 10;
        this.saveToStorage(jobs);
        
        // Simulate data generation progress
        for (let progress = 20; progress <= 90; progress += 20) {
          await new Promise(resolve => setTimeout(resolve, 200));
          job.progress = progress;
          this.saveToStorage(jobs);
        }
        
        // Generate the actual export data
        const data = await this.generateExportData(job, exportOptions);
        
        // Create download URL (in real implementation, this would be uploaded to a file server)
        const blob = new Blob([data], { type: this.getMimeType(job.format) });
        const downloadUrl = URL.createObjectURL(blob);
        
        // Update job as completed
        job.status = 'completed';
        job.progress = 100;
        job.completedAt = new Date();
        job.downloadUrl = downloadUrl;
        job.fileSize = blob.size;
        
        this.saveToStorage(jobs);
        
      } catch (error) {
        job.status = 'failed';
        job.error = error instanceof Error ? error.message : 'Erreur inconnue';
        this.saveToStorage(jobs);
      }
    }, 500);
  }

  private async generateExportData(job: ExportJob, options: ExportOptions): Promise<string> {
    // Mock data generation based on job type
    let data: any[] = [];
    
    switch (job.type) {
      case 'alerts':
        data = this.generateAlertsData(job.filters);
        break;
      case 'search':
        data = this.generateSearchData(job.filters);
        break;
      case 'analytics':
        data = this.generateAnalyticsData(job.filters);
        break;
      case 'keywords':
        data = this.generateKeywordsData(job.filters);
        break;
      case 'network':
        data = this.generateNetworkData(job.filters);
        break;
      case 'geographic':
        data = this.generateGeographicData(job.filters);
        break;
    }
    
    return this.formatData(data, job.format, options);
  }

  private generateAlertsData(filters: Record<string, any>): any[] {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      type: ['critical', 'warning', 'info'][Math.floor(Math.random() * 3)],
      title: `Alerte ${i + 1}`,
      description: `Description de l'alerte ${i + 1}`,
      location: ['Kinshasa', 'Goma', 'Lubumbashi'][Math.floor(Math.random() * 3)],
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      status: ['active', 'investigating', 'resolved'][Math.floor(Math.random() * 3)],
      mentions: Math.floor(Math.random() * 1000),
      sentiment: (Math.random() - 0.5) * 2
    }));
  }

  private generateSearchData(filters: Record<string, any>): any[] {
    return Array.from({ length: 50 }, (_, i) => ({
      id: `search-${i + 1}`,
      title: `Résultat de recherche ${i + 1}`,
      content: `Contenu du message ${i + 1}`,
      author: `Auteur ${i + 1}`,
      platform: ['Facebook', 'Twitter', 'WhatsApp'][Math.floor(Math.random() * 3)],
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      sentiment: (Math.random() - 0.5) * 2,
      engagement: Math.floor(Math.random() * 500)
    }));
  }

  private generateAnalyticsData(filters: Record<string, any>): any[] {
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
      mentions: Math.floor(Math.random() * 1000) + 100,
      sentiment: (Math.random() - 0.5) * 2,
      reach: Math.floor(Math.random() * 10000) + 1000,
      engagement: Math.floor(Math.random() * 500) + 50
    }));
  }

  private generateKeywordsData(filters: Record<string, any>): any[] {
    const keywords = ['élections', 'sécurité', 'économie', 'santé', 'éducation'];
    return keywords.map((keyword, i) => ({
      id: i + 1,
      term: keyword,
      mentions: Math.floor(Math.random() * 1000) + 100,
      sentiment_positive: Math.floor(Math.random() * 50) + 10,
      sentiment_neutral: Math.floor(Math.random() * 40) + 30,
      sentiment_negative: Math.floor(Math.random() * 30) + 10,
      trend_7d: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
      status: ['active', 'critical', 'warning'][Math.floor(Math.random() * 3)]
    }));
  }

  private generateNetworkData(filters: Record<string, any>): any[] {
    return Array.from({ length: 20 }, (_, i) => ({
      node_id: `node-${i + 1}`,
      label: `Nœud ${i + 1}`,
      type: ['person', 'organization', 'topic'][Math.floor(Math.random() * 3)],
      influence: Math.random(),
      connections: Math.floor(Math.random() * 50) + 5,
      sentiment: (Math.random() - 0.5) * 2
    }));
  }

  private generateGeographicData(filters: Record<string, any>): any[] {
    const provinces = ['Kinshasa', 'Nord-Kivu', 'Sud-Kivu', 'Haut-Katanga'];
    return provinces.map((province, i) => ({
      province,
      latitude: -4 + Math.random() * 8,
      longitude: 15 + Math.random() * 15,
      activity: Math.floor(Math.random() * 100),
      sentiment: (Math.random() - 0.5) * 2,
      alerts: Math.floor(Math.random() * 20),
      population: `${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 10)}M`
    }));
  }

  private formatData(data: any[], format: ExportJob['format'], options: ExportOptions): string {
    switch (format) {
      case 'csv':
        return Papa.unparse(data, {
          header: options.includeHeaders,
          delimiter: options.delimiter
        });
      
      case 'json':
        return JSON.stringify({
          data,
          metadata: {
            exportedAt: new Date().toISOString(),
            totalRecords: data.length,
            options
          }
        }, null, 2);
      
      case 'xlsx':
        // Mock Excel format - in reality, you'd use a library like xlsx
        return this.generateExcelMock(data, options);
      
      case 'pdf':
        // Mock PDF format - in reality, you'd use a library like jsPDF
        return this.generatePdfMock(data, options);
      
      default:
        throw new Error(`Format non supporté: ${format}`);
    }
  }

  private generateExcelMock(data: any[], options: ExportOptions): string {
    // This is a simplified mock - real implementation would use xlsx library
    const csvData = Papa.unparse(data, {
      header: options.includeHeaders,
      delimiter: '\t'
    });
    return `Excel Mock Data:\n${csvData}`;
  }

  private generatePdfMock(data: any[], options: ExportOptions): string {
    // This is a simplified mock - real implementation would use jsPDF or similar
    return `PDF Mock Data:\nTotal Records: ${data.length}\nGenerated: ${new Date().toISOString()}`;
  }

  private getMimeType(format: ExportJob['format']): string {
    const mimeTypes = {
      csv: 'text/csv',
      json: 'application/json',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      pdf: 'application/pdf'
    };
    return mimeTypes[format] || 'text/plain';
  }

  async downloadExport(jobId: string): Promise<void> {
    const job = await this.getExportJob(jobId);
    
    if (!job || job.status !== 'completed' || !job.downloadUrl) {
      throw new Error('Export non disponible pour téléchargement');
    }
    
    // Create download link
    const link = document.createElement('a');
    link.href = job.downloadUrl;
    link.download = `${job.name}.${job.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async createExportTemplate(template: Omit<ExportTemplate, 'id' | 'createdAt'>): Promise<ExportTemplate> {
    await this.simulateDelay(150);
    
    const templates = this.loadFromStorage<ExportTemplate[]>() || [];
    const newTemplate: ExportTemplate = {
      ...template,
      id: this.generateId(),
      createdAt: new Date()
    };
    
    templates.push(newTemplate);
    localStorage.setItem('sentinel_export_templates', JSON.stringify(templates));
    
    return newTemplate;
  }

  async getExportTemplates(): Promise<ExportTemplate[]> {
    await this.simulateDelay(100);
    
    const templates = JSON.parse(localStorage.getItem('sentinel_export_templates') || '[]');
    return templates.sort((a: ExportTemplate, b: ExportTemplate) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getExportStats(): Promise<{
    totalExports: number;
    successRate: number;
    avgFileSize: number;
    popularFormats: Array<{ format: string; count: number }>;
    recentActivity: Array<{ date: Date; count: number }>;
  }> {
    await this.simulateDelay(150);
    
    const jobs = await this.getExportJobs();
    const completed = jobs.filter(j => j.status === 'completed');
    
    return {
      totalExports: jobs.length,
      successRate: jobs.length > 0 ? (completed.length / jobs.length) * 100 : 0,
      avgFileSize: completed.reduce((sum, j) => sum + (j.fileSize || 0), 0) / Math.max(completed.length, 1),
      popularFormats: [
        { format: 'csv', count: jobs.filter(j => j.format === 'csv').length },
        { format: 'json', count: jobs.filter(j => j.format === 'json').length },
        { format: 'xlsx', count: jobs.filter(j => j.format === 'xlsx').length },
        { format: 'pdf', count: jobs.filter(j => j.format === 'pdf').length }
      ].sort((a, b) => b.count - a.count),
      recentActivity: Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayJobs = jobs.filter(j => 
          j.createdAt.toDateString() === date.toDateString()
        );
        return { date, count: dayJobs.length };
      }).reverse()
    };
  }
}