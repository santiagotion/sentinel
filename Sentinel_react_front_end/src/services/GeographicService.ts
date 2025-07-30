import { BaseService } from './BaseService';

export interface GeographicData {
  province: string;
  coordinates: { lat: number; lng: number };
  activity: number;
  sentiment: number;
  alertLevel: 'low' | 'medium' | 'high' | 'critical';
  population: string;
  recentEvents: GeographicEvent[];
  metrics: {
    totalMentions: number;
    activeSources: number;
    trendingTopics: string[];
    sentimentTrend: number[];
  };
}

export interface GeographicEvent {
  id: string;
  type: 'political' | 'security' | 'social' | 'economic' | 'health';
  title: string;
  description: string;
  location: { lat: number; lng: number };
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  verified: boolean;
  sources: string[];
}

export interface MapLayer {
  id: string;
  name: string;
  type: 'heatmap' | 'markers' | 'choropleth' | 'clusters';
  data: any[];
  visible: boolean;
  style: {
    color: string;
    opacity: number;
    weight?: number;
    fillOpacity?: number;
  };
}

export interface HotspotAnalysis {
  location: string;
  coordinates: { lat: number; lng: number };
  intensity: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: Array<{
    type: string;
    score: number;
    description: string;
  }>;
  timeline: Array<{
    date: Date;
    intensity: number;
    events: string[];
  }>;
}

export class GeographicService extends BaseService {
  constructor() {
    super('sentinel_geographic');
  }

  private generateProvinceData(): GeographicData[] {
    const provinces = [
      { name: 'Kinshasa', lat: -4.4419, lng: 15.2663, population: '14.3M' },
      { name: 'Nord-Kivu', lat: -0.7, lng: 29.2, population: '8.1M' },
      { name: 'Sud-Kivu', lat: -3.5, lng: 28.5, population: '6.3M' },
      { name: 'Haut-Katanga', lat: -11.6, lng: 27.4, population: '5.7M' },
      { name: 'Équateur', lat: 0.0, lng: 18.3, population: '1.6M' },
      { name: 'Kasaï', lat: -5.0, lng: 22.5, population: '3.2M' },
      { name: 'Ituri', lat: 2.5, lng: 29.5, population: '5.6M' },
      { name: 'Tanganyika', lat: -6.5, lng: 27.9, population: '3.3M' },
      { name: 'Tshopo', lat: 0.5, lng: 25.2, population: '2.6M' },
      { name: 'Maniema', lat: -2.5, lng: 26.0, population: '2.3M' }
    ];

    return provinces.map(province => ({
      province: province.name,
      coordinates: { lat: province.lat, lng: province.lng },
      activity: Math.floor(Math.random() * 100),
      sentiment: (Math.random() - 0.5) * 2,
      alertLevel: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as GeographicData['alertLevel'],
      population: province.population,
      recentEvents: this.generateRecentEvents(province.lat, province.lng),
      metrics: {
        totalMentions: Math.floor(Math.random() * 5000) + 500,
        activeSources: Math.floor(Math.random() * 20) + 5,
        trendingTopics: this.generateTrendingTopics(),
        sentimentTrend: Array.from({ length: 7 }, () => (Math.random() - 0.5) * 2)
      }
    }));
  }

  private generateRecentEvents(baseLat: number, baseLng: number): GeographicEvent[] {
    const eventTypes: GeographicEvent['type'][] = ['political', 'security', 'social', 'economic', 'health'];
    const titles = {
      political: ['Réunion politique locale', 'Manifestation pacifique', 'Débat communautaire'],
      security: ['Incident sécuritaire', 'Patrouille renforcée', 'Contrôle routier'],
      social: ['Événement culturel', 'Initiative communautaire', 'Rassemblement social'],
      economic: ['Ouverture de marché', 'Activité commerciale', 'Initiative économique'],
      health: ['Campagne de vaccination', 'Sensibilisation santé', 'Distribution médicale']
    };

    return Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, i) => {
      const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const typeTitle = titles[type][Math.floor(Math.random() * titles[type].length)];
      
      return {
        id: this.generateId(),
        type,
        title: typeTitle,
        description: `Description détaillée de l'événement ${typeTitle.toLowerCase()}`,
        location: {
          lat: baseLat + (Math.random() - 0.5) * 2,
          lng: baseLng + (Math.random() - 0.5) * 2
        },
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as GeographicEvent['severity'],
        verified: Math.random() > 0.3,
        sources: ['Rapports locaux', 'Médias sociaux', 'Témoins', 'Autorités locales'].slice(0, Math.floor(Math.random() * 3) + 1)
      };
    });
  }

  private generateTrendingTopics(): string[] {
    const topics = [
      'élections locales', 'sécurité communautaire', 'développement rural',
      'santé publique', 'éducation', 'infrastructure', 'agriculture',
      'commerce local', 'transport', 'environnement'
    ];
    
    return topics.slice(0, Math.floor(Math.random() * 5) + 3);
  }

  async getProvinceData(): Promise<GeographicData[]> {
    await this.simulateDelay(200);
    
    const cached = this.loadFromStorage<GeographicData[]>();
    if (cached) {
      return cached;
    }
    
    const data = this.generateProvinceData();
    this.saveToStorage(data);
    return data;
  }

  async getProvinceDetails(provinceName: string): Promise<GeographicData | null> {
    await this.simulateDelay(150);
    
    const provinces = await this.getProvinceData();
    return provinces.find(p => p.province === provinceName) || null;
  }

  async getRecentEvents(
    bounds?: { north: number; south: number; east: number; west: number },
    eventTypes?: GeographicEvent['type'][],
    limit: number = 20
  ): Promise<GeographicEvent[]> {
    await this.simulateDelay(200);
    
    const provinces = await this.getProvinceData();
    let allEvents: GeographicEvent[] = [];
    
    provinces.forEach(province => {
      allEvents = allEvents.concat(province.recentEvents);
    });
    
    // Filter by bounds if provided
    if (bounds) {
      allEvents = allEvents.filter(event => 
        event.location.lat <= bounds.north &&
        event.location.lat >= bounds.south &&
        event.location.lng <= bounds.east &&
        event.location.lng >= bounds.west
      );
    }
    
    // Filter by event types if provided
    if (eventTypes?.length) {
      allEvents = allEvents.filter(event => eventTypes.includes(event.type));
    }
    
    // Sort by timestamp (most recent first) and limit
    return allEvents
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async getHotspotAnalysis(): Promise<HotspotAnalysis[]> {
    await this.simulateDelay(400);
    
    const hotspotLocations = [
      { name: 'Goma', lat: -1.6792, lng: 29.2228 },
      { name: 'Bukavu', lat: -2.5007, lng: 28.8562 },
      { name: 'Beni', lat: 0.4951, lng: 29.4738 },
      { name: 'Butembo', lat: 0.1415, lng: 29.2915 }
    ];
    
    return hotspotLocations.map(location => ({
      location: location.name,
      coordinates: { lat: location.lat, lng: location.lng },
      intensity: Math.random(),
      riskLevel: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as HotspotAnalysis['riskLevel'],
      factors: [
        { type: 'Sécurité', score: Math.random(), description: 'Niveau de menace sécuritaire' },
        { type: 'Social', score: Math.random(), description: 'Tensions communautaires' },
        { type: 'Économique', score: Math.random(), description: 'Instabilité économique' },
        { type: 'Politique', score: Math.random(), description: 'Tensions politiques' }
      ],
      timeline: Array.from({ length: 14 }, (_, i) => ({
        date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000),
        intensity: Math.random(),
        events: [
          'Incident mineur reporté',
          'Activité inhabituelle détectée',
          'Tension communautaire signalée'
        ].slice(0, Math.floor(Math.random() * 3))
      }))
    }));
  }

  async getMapLayers(): Promise<MapLayer[]> {
    await this.simulateDelay(100);
    
    const provinces = await this.getProvinceData();
    
    return [
      {
        id: 'activity-heatmap',
        name: 'Carte de chaleur - Activité',
        type: 'heatmap',
        data: provinces.map(p => ({
          lat: p.coordinates.lat,
          lng: p.coordinates.lng,
          intensity: p.activity / 100
        })),
        visible: true,
        style: { color: '#ff0000', opacity: 0.8 }
      },
      {
        id: 'sentiment-choropleth',
        name: 'Sentiment par région',
        type: 'choropleth',
        data: provinces.map(p => ({
          province: p.province,
          sentiment: p.sentiment,
          color: p.sentiment > 0 ? '#10B981' : p.sentiment < -0.5 ? '#EF4444' : '#F59E0B'
        })),
        visible: false,
        style: { color: '#3B82F6', opacity: 0.7, fillOpacity: 0.5 }
      },
      {
        id: 'alerts-markers',
        name: 'Marqueurs d\'alertes',
        type: 'markers',
        data: provinces
          .filter(p => p.alertLevel === 'high' || p.alertLevel === 'critical')
          .map(p => ({
            lat: p.coordinates.lat,
            lng: p.coordinates.lng,
            alert: p.alertLevel,
            province: p.province
          })),
        visible: true,
        style: { color: '#EF4444', opacity: 1, weight: 2 }
      },
      {
        id: 'events-clusters',
        name: 'Événements groupés',
        type: 'clusters',
        data: provinces.flatMap(p => 
          p.recentEvents.map(event => ({
            lat: event.location.lat,
            lng: event.location.lng,
            type: event.type,
            title: event.title,
            severity: event.severity
          }))
        ),
        visible: false,
        style: { color: '#8B5CF6', opacity: 0.8 }
      }
    ];
  }

  async updateLayerVisibility(layerId: string, visible: boolean): Promise<void> {
    await this.simulateDelay(50);
    
    const layers = await this.getMapLayers();
    const layer = layers.find(l => l.id === layerId);
    
    if (layer) {
      layer.visible = visible;
      // In a real implementation, this would update the stored layer configuration
    }
  }

  async searchLocations(query: string): Promise<Array<{
    name: string;
    type: 'province' | 'city' | 'territory';
    coordinates: { lat: number; lng: number };
    description: string;
  }>> {
    await this.simulateDelay(150);
    
    const locations = [
      { name: 'Kinshasa', type: 'province', lat: -4.4419, lng: 15.2663, description: 'Capital and largest city' },
      { name: 'Lubumbashi', type: 'city', lat: -11.6204, lng: 27.4794, description: 'Mining capital' },
      { name: 'Goma', type: 'city', lat: -1.6792, lng: 29.2228, description: 'Eastern regional center' },
      { name: 'Bukavu', type: 'city', lat: -2.5007, lng: 28.8562, description: 'South Kivu capital' },
      { name: 'Nord-Kivu', type: 'province', lat: -0.7, lng: 29.2, description: 'Eastern province' },
      { name: 'Sud-Kivu', type: 'province', lat: -3.5, lng: 28.5, description: 'Eastern province' },
      { name: 'Mbuji-Mayi', type: 'city', lat: -6.1360, lng: 23.5970, description: 'Diamond mining center' },
      { name: 'Kisangani', type: 'city', lat: 0.5167, lng: 25.2167, description: 'Northeastern regional center' }
    ] as const;
    
    return locations
      .filter(location => 
        location.name.toLowerCase().includes(query.toLowerCase()) ||
        location.description.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10);
  }

  async getGeographicTrends(period: 'day' | 'week' | 'month'): Promise<Array<{
    province: string;
    data: Array<{ date: Date; activity: number; sentiment: number }>;
  }>> {
    await this.simulateDelay(300);
    
    const provinces = await this.getProvinceData();
    const intervals = { day: 24, week: 7, month: 30 };
    const count = intervals[period];
    
    return provinces.slice(0, 5).map(province => ({
      province: province.province,
      data: Array.from({ length: count }, (_, i) => {
        const date = new Date();
        
        switch (period) {
          case 'day':
            date.setHours(date.getHours() - (count - 1 - i));
            break;
          case 'week':
            date.setDate(date.getDate() - (count - 1 - i));
            break;
          case 'month':
            date.setDate(date.getDate() - (count - 1 - i));
            break;
        }
        
        return {
          date,
          activity: Math.floor(Math.random() * 100),
          sentiment: (Math.random() - 0.5) * 2
        };
      })
    }));
  }

  async exportGeographicData(format: 'csv' | 'geojson' | 'kml'): Promise<string> {
    await this.simulateDelay(400);
    
    const provinces = await this.getProvinceData();
    
    switch (format) {
      case 'csv':
        const csvHeader = 'Province,Latitude,Longitude,Activity,Sentiment,Alert Level,Population\n';
        const csvRows = provinces.map(p => 
          `"${p.province}",${p.coordinates.lat},${p.coordinates.lng},${p.activity},${p.sentiment},"${p.alertLevel}","${p.population}"`
        ).join('\n');
        return csvHeader + csvRows;
      
      case 'geojson':
        const geojson = {
          type: 'FeatureCollection',
          features: provinces.map(p => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [p.coordinates.lng, p.coordinates.lat]
            },
            properties: {
              name: p.province,
              activity: p.activity,
              sentiment: p.sentiment,
              alertLevel: p.alertLevel,
              population: p.population
            }
          }))
        };
        return JSON.stringify(geojson, null, 2);
      
      case 'kml':
        const kmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2">\n<Document>\n';
        const kmlFooter = '</Document>\n</kml>';
        const kmlPlacemarks = provinces.map(p => `
  <Placemark>
    <name>${p.province}</name>
    <description>Activity: ${p.activity}, Sentiment: ${p.sentiment}</description>
    <Point>
      <coordinates>${p.coordinates.lng},${p.coordinates.lat},0</coordinates>
    </Point>
  </Placemark>`).join('\n');
        return kmlHeader + kmlPlacemarks + kmlFooter;
      
      default:
        throw new Error(`Format non supporté: ${format}`);
    }
  }
}