import React, { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LayerControls } from './LayerControls';
import { MapSearch } from './MapSearch';
import { TimeControls } from './TimeControls';
import { 
  Map, Satellite, Navigation, Maximize2, Download, 
  Info, Bookmark, MessageSquare, AlertTriangle, Layers,
  BarChart3, Filter, Eye, EyeOff, Zap
} from 'lucide-react';
import { 
  LayerControl, SearchFilter, MapViewState, 
  SecurityIncident, SocialMediaPost, InfluenceNetwork 
} from '../../types/mapbox';
import { mapboxLayers } from '../../data/mapboxData';

interface EnhancedMapViewProps {
  mapboxToken?: string;
  activeLayers?: any[];
  onResize?: boolean;
  realTimeUpdates?: boolean;
  showHeatmap?: boolean;
  selectedTimeRange?: string;
}

export function EnhancedMapView({ mapboxToken, activeLayers = [], onResize }: EnhancedMapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  // Map state
  const [mapStyle, setMapStyle] = useState('satellite-streets-v12');
  const [viewState, setViewState] = useState<MapViewState>({
    longitude: 23.6566,
    latitude: -2.8419,
    zoom: 5.5,
    bearing: 0,
    pitch: 0
  });

  // Enhanced layer controls - derived from activeLayers prop
  const [layers, setLayers] = useState({
    choropleth: { provinces: true, riskLevels: true },
    security: { incidents: true, clusters: true, heatmap: false },
    social: { sentiment: true, heatmap: true, viral: false },
    infrastructure: { power: false, transport: false, mining: false },
    demographic: { population: false, displacement: false }
  });

  // Update layers based on activeLayers prop
  useEffect(() => {
    if (activeLayers && activeLayers.length > 0) {
      const securityLayer = activeLayers.find(l => l.id === 'security');
      const socialLayer = activeLayers.find(l => l.id === 'social');
      const infrastructureLayer = activeLayers.find(l => l.id === 'infrastructure');
      const populationLayer = activeLayers.find(l => l.id === 'population');
      
      setLayers({
        choropleth: { provinces: true, riskLevels: true },
        security: { 
          incidents: securityLayer?.active || false, 
          clusters: true, 
          heatmap: securityLayer?.sublayers?.find((s: any) => s.id === 'armed_clash')?.active || false 
        },
        social: { 
          sentiment: socialLayer?.active || false, 
          heatmap: socialLayer?.sublayers?.find((s: any) => s.id === 'sentiment')?.active || false, 
          viral: socialLayer?.sublayers?.find((s: any) => s.id === 'viral_content')?.active || false 
        },
        infrastructure: { 
          power: infrastructureLayer?.sublayers?.find((s: any) => s.id === 'power')?.active || false, 
          transport: infrastructureLayer?.sublayers?.find((s: any) => s.id === 'transport')?.active || false, 
          mining: false 
        },
        demographic: { 
          population: populationLayer?.sublayers?.find((s: any) => s.id === 'density')?.active || false, 
          displacement: populationLayer?.sublayers?.find((s: any) => s.id === 'displacement')?.active || false 
        }
      });
    }
  }, [activeLayers]);

  const [layerOpacity, setLayerOpacity] = useState<Record<string, number>>({
    'provinces': 0.6,
    'security': 0.8,
    'social-heatmap': 0.7,
    'influence': 0.9
  });

  // Advanced controls
  const [activeControl, setActiveControl] = useState<'layers' | 'filters' | 'analysis' | null>('layers');
  const [showMapboxError, setShowMapboxError] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Store markers and layers for management
  const markers = useRef<mapboxgl.Marker[]>([]);
  const activeMapLayers = useRef<Set<string>>(new Set());

  // Enhanced map styles with descriptions
  const mapStyles = [
    { 
      id: 'satellite-streets-v12', 
      name: 'Satellite', 
      icon: Satellite,
      description: 'High-resolution satellite imagery with street overlays'
    },
    { 
      id: 'streets-v12', 
      name: 'Streets', 
      icon: Map,
      description: 'Detailed street map with navigation features'
    },
    { 
      id: 'outdoors-v12', 
      name: 'Terrain', 
      icon: Navigation,
      description: 'Topographic map showing elevation and terrain'
    }
  ];

  // Initialize Mapbox when token is available
  useEffect(() => {
    if (!mapboxToken) {
      setShowMapboxError(true);
      return;
    }

    if (mapContainer.current && !map.current) {
      try {
        mapboxgl.accessToken = mapboxToken;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: `mapbox://styles/mapbox/${mapStyle}`,
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch,
          antialias: true
        });

        map.current.on('load', () => {
          setMapLoaded(true);
          addAdvancedLayers();
        });

        // Add advanced navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-left');
        map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');
        map.current.addControl(new mapboxgl.FullscreenControl(), 'top-left');
        
        // Update view state when map moves
        map.current.on('moveend', () => {
          if (map.current) {
            const center = map.current.getCenter();
            const zoom = map.current.getZoom();
            const bearing = map.current.getBearing();
            const pitch = map.current.getPitch();
            
            setViewState({
              longitude: center.lng,
              latitude: center.lat,
              zoom,
              bearing,
              pitch
            });
          }
        });

      } catch (error) {
        console.error('Error initializing Mapbox:', error);
        setShowMapboxError(true);
      }
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  // Update map style
  useEffect(() => {
    if (map.current && mapLoaded) {
      map.current.setStyle(`mapbox://styles/mapbox/${mapStyle}`);
      map.current.once('styledata', () => {
        addAdvancedLayers();
      });
    }
  }, [mapStyle, mapLoaded]);

  // Re-render layers when layers state changes
  useEffect(() => {
    if (map.current && mapLoaded) {
      addAdvancedLayers();
    }
  }, [layers, mapLoaded]);

  // Resize map when container changes
  useEffect(() => {
    if (map.current && mapLoaded) {
      // Small delay to ensure container has resized
      setTimeout(() => {
        map.current?.resize();
      }, 350);
    }
  }, [onResize, mapLoaded]);

  const addAdvancedLayers = () => {
    if (!map.current || !mapLoaded) return;

    // Clear existing layers
    clearAllLayers();

    // Add province choropleth
    if (layers.choropleth.provinces) {
      addProvinceChoropleth();
    }

    // Add security layers
    if (layers.security.incidents) {
      if (layers.security.clusters) {
        addSecurityClusters();
      } else {
        addSecurityPoints();
      }
    }

    // Security heatmap would go here if implemented

    // Add social layers
    if (layers.social.sentiment) {
      addSocialSentimentLayer();
    }

    if (layers.social.heatmap) {
      addSocialHeatmap();
    }

    // Add influence networks
    addInfluenceNetworks();
  };

  const clearAllLayers = () => {
    // Clear markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Remove map layers
    activeMapLayers.current.forEach(layerId => {
      if (map.current && map.current.getLayer(layerId)) {
        map.current.removeLayer(layerId);
      }
    });

    // Remove sources
    ['provinces', 'security-incidents', 'social-media', 'security-heatmap'].forEach(sourceId => {
      if (map.current && map.current.getSource(sourceId)) {
        map.current.removeSource(sourceId);
      }
    });

    activeMapLayers.current.clear();
  };

  const addProvinceChoropleth = () => {
    if (!map.current) return;

    // Create GeoJSON for DRC provinces
    const provincesGeoJSON = {
      type: 'FeatureCollection',
      features: mapboxLayers.drcProvinces.map(province => ({
        type: 'Feature',
        properties: {
          name: province.name,
          population: province.population,
          riskLevel: province.riskLevel,
          activityScore: Math.random() * 100
        },
        geometry: {
          type: 'Polygon',
          coordinates: [province.coordinates]
        }
      }))
    };

    // Add source
    map.current.addSource('provinces', {
      type: 'geojson',
      data: provincesGeoJSON as any
    });

    // Add fill layer for choropleth
    map.current.addLayer({
      id: 'provinces-fill',
      type: 'fill',
      source: 'provinces',
      paint: {
        'fill-color': [
          'case',
          ['==', ['get', 'riskLevel'], 'high'], '#dc2626',
          ['==', ['get', 'riskLevel'], 'medium'], '#ea580c',
          '#16a34a'
        ],
        'fill-opacity': layerOpacity['provinces'] || 0.3
      }
    });

    // Add border layer
    map.current.addLayer({
      id: 'provinces-border',
      type: 'line',
      source: 'provinces',
      paint: {
        'line-color': '#374151',
        'line-width': 2,
        'line-opacity': 0.8
      }
    });

    // Add province labels
    map.current.addLayer({
      id: 'provinces-labels',
      type: 'symbol',
      source: 'provinces',
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': 14,
        'text-anchor': 'center'
      },
      paint: {
        'text-color': '#1f2937',
        'text-halo-color': '#ffffff',
        'text-halo-width': 2
      }
    });

    activeMapLayers.current.add('provinces-fill');
    activeMapLayers.current.add('provinces-border');
    activeMapLayers.current.add('provinces-labels');

    // Add click handlers
    map.current.on('click', 'provinces-fill', (e) => {
      const feature = e.features![0];
      const coordinates = e.lngLat;
      const properties = feature.properties!;

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(`
          <div class="p-4 min-w-[200px]">
            <h3 class="font-bold text-lg mb-3 text-gray-900">${properties.name}</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Population:</span>
                <span class="font-medium">${(properties.population / 1000000).toFixed(1)}M</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Risk Level:</span>
                <span class="font-medium capitalize ${
                  properties.riskLevel === 'high' ? 'text-red-600' :
                  properties.riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }">${properties.riskLevel}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Activity Score:</span>
                <span class="font-medium">${properties.activityScore.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        `)
        .addTo(map.current!);
    });
  };

  const addSecurityClusters = () => {
    if (!map.current) return;

    const incidentsGeoJSON = {
      type: 'FeatureCollection',
      features: mapboxLayers.security.incidents.map(incident => ({
        type: 'Feature',
        properties: {
          ...incident,
          timestamp: incident.timestamp.toString()
        },
        geometry: {
          type: 'Point',
          coordinates: incident.coordinates
        }
      }))
    };

    map.current.addSource('security-incidents', {
      type: 'geojson',
      data: incidentsGeoJSON as any,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50
    });

    // Cluster circles
    map.current.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'security-incidents',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6', 20,
          '#f1f075', 100,
          '#f28cb1'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20, 100,
          30, 750,
          40
        ],
        'circle-opacity': layerOpacity['security'] || 0.8
      }
    });

    // Cluster labels
    map.current.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'security-incidents',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    });

    // Individual points
    map.current.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'security-incidents',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': [
          'case',
          ['==', ['get', 'severity'], 'critical'], '#dc2626',
          ['==', ['get', 'severity'], 'high'], '#ea580c',
          ['==', ['get', 'severity'], 'medium'], '#ca8a04',
          '#16a34a'
        ],
        'circle-radius': 8,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff',
        'circle-opacity': layerOpacity['security'] || 0.8
      }
    });

    activeMapLayers.current.add('clusters');
    activeMapLayers.current.add('cluster-count');
    activeMapLayers.current.add('unclustered-point');

    // Click handlers
    map.current.on('click', 'clusters', (e) => {
      const features = map.current!.queryRenderedFeatures(e.point, {
        layers: ['clusters']
      });
      const clusterId = features[0].properties!.cluster_id;
      (map.current!.getSource('security-incidents') as any).getClusterExpansionZoom(
        clusterId,
        (err: any, zoom: number) => {
          if (err) return;
          map.current!.easeTo({
            center: (features[0].geometry as any).coordinates,
            zoom: zoom
          });
        }
      );
    });

    map.current.on('click', 'unclustered-point', (e) => {
      const feature = e.features![0];
      const coordinates = (feature.geometry as any).coordinates.slice();
      const properties = feature.properties!;

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(`
          <div class="p-4 min-w-[250px]">
            <h3 class="font-bold text-lg mb-3 capitalize">${properties.type.replace('_', ' ')}</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Severity:</span>
                <span class="font-medium capitalize ${
                  properties.severity === 'critical' ? 'text-red-600' :
                  properties.severity === 'high' ? 'text-orange-600' :
                  properties.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }">${properties.severity}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Province:</span>
                <span class="font-medium">${properties.province}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Date:</span>
                <span class="font-medium">${new Date(properties.timestamp).toLocaleDateString()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Casualties:</span>
                <span class="font-medium">${properties.casualties}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Verified:</span>
                <span class="font-medium ${properties.verified ? 'text-green-600' : 'text-red-600'}">
                  ${properties.verified ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
            <p class="text-xs text-gray-600 mt-3 border-t pt-2">${properties.description}</p>
          </div>
        `)
        .addTo(map.current!);
    });
  };

  const addSecurityPoints = () => {
    // Fallback to individual markers if clustering is disabled
    mapboxLayers.security.incidents.forEach((incident, index) => {
      if (index < 100) { // Limit for performance
        const el = document.createElement('div');
        el.className = 'security-marker';
        el.innerHTML = `
          <div class="w-4 h-4 rounded-full border-2 border-white shadow-lg ${
            incident.severity === 'critical' ? 'bg-red-500' :
            incident.severity === 'high' ? 'bg-orange-500' :
            incident.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
          }"></div>
        `;
        el.style.cursor = 'pointer';

        const marker = new mapboxgl.Marker(el)
          .setLngLat(incident.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-3">
                <h3 class="font-bold capitalize">${incident.type.replace('_', ' ')}</h3>
                <p class="text-sm mt-1">${incident.description}</p>
              </div>
            `))
          .addTo(map.current!);
        
        markers.current.push(marker);
      }
    });
  };

  const addSocialHeatmap = () => {
    if (!map.current) return;

    const socialGeoJSON = {
      type: 'FeatureCollection',
      features: mapboxLayers.social.posts.map(post => ({
        type: 'Feature',
        properties: {
          engagement: post.engagement,
          sentiment: post.sentiment,
          platform: post.platform
        },
        geometry: {
          type: 'Point',
          coordinates: post.coordinates
        }
      }))
    };

    map.current.addSource('social-media', {
      type: 'geojson',
      data: socialGeoJSON as any
    });

    map.current.addLayer({
      id: 'social-heatmap',
      type: 'heatmap',
      source: 'social-media',
      maxzoom: 9,
      paint: {
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'engagement'],
          0, 0,
          10000, 1
        ],
        'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 1,
          9, 3
        ],
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(33,102,172,0)',
          0.2, 'rgb(103,169,207)',
          0.4, 'rgb(209,229,240)',
          0.6, 'rgb(253,219,199)',
          0.8, 'rgb(239,138,98)',
          1, 'rgb(178,24,43)'
        ],
        'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 2,
          9, 20
        ],
        'heatmap-opacity': layerOpacity['social-heatmap'] || 0.7
      }
    });

    activeMapLayers.current.add('social-heatmap');
  };

  const addSocialSentimentLayer = () => {
    if (!map.current) return;

    map.current.addLayer({
      id: 'social-points',
      type: 'circle',
      source: 'social-media',
      minzoom: 7,
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          7, ['interpolate', ['linear'], ['get', 'engagement'], 0, 2, 10000, 6],
          16, ['interpolate', ['linear'], ['get', 'engagement'], 0, 8, 10000, 25]
        ],
        'circle-color': [
          'case',
          ['==', ['get', 'sentiment'], 'positive'], '#16a34a',
          ['==', ['get', 'sentiment'], 'negative'], '#dc2626',
          '#6b7280'
        ],
        'circle-opacity': 0.6,
        'circle-stroke-width': 1,
        'circle-stroke-color': 'white'
      }
    });

    activeMapLayers.current.add('social-points');
  };

  const addInfluenceNetworks = () => {
    mapboxLayers.social.influence.forEach((influencer, index) => {
      if (index < 50) {
        const el = document.createElement('div');
        el.className = 'influence-marker';
        el.innerHTML = `
          <div class="w-6 h-6 bg-purple-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center relative">
            <div class="w-2 h-2 bg-white rounded-full"></div>
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full text-xs flex items-center justify-center text-black font-bold">
              ${Math.floor(influencer.influence / 20) + 1}
            </div>
          </div>
        `;
        el.style.cursor = 'pointer';

        const marker = new mapboxgl.Marker(el)
          .setLngLat(influencer.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-4 min-w-[200px]">
                <h3 class="font-bold text-lg mb-3">Influence Network</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Type:</span>
                    <span class="font-medium capitalize">${influencer.type}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Influence:</span>
                    <span class="font-medium">${influencer.influence.toFixed(1)}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Followers:</span>
                    <span class="font-medium">${influencer.followers.toLocaleString()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Reach:</span>
                    <span class="font-medium">${influencer.reach}km</span>
                  </div>
                </div>
                <div class="mt-3 pt-2 border-t">
                  <div class="flex items-center space-x-1">
                    ${influencer.connections.slice(0, 3).map(() => 
                      '<div class="w-2 h-2 bg-purple-400 rounded-full"></div>'
                    ).join('')}
                    <span class="text-xs text-gray-500 ml-1">
                      ${influencer.connections.length} connections
                    </span>
                  </div>
                </div>
              </div>
            `))
          .addTo(map.current!);
        
        markers.current.push(marker);
      }
    });
  };

  const handleLayerToggle = useCallback((category: string, layer: string) => {
    setLayers(prev => {
      const currentCategory = prev[category as keyof typeof prev] as any;
      return {
        ...prev,
        [category]: {
          ...currentCategory,
          [layer]: !currentCategory[layer]
        }
      };
    });

    // Refresh layers
    setTimeout(() => addAdvancedLayers(), 100);
  }, []);

  const handleOpacityChange = useCallback((layerId: string, opacity: number) => {
    setLayerOpacity(prev => ({ ...prev, [layerId]: opacity }));
    
    if (map.current && map.current.getLayer(layerId)) {
      if (layerId.includes('fill')) {
        map.current.setPaintProperty(layerId, 'fill-opacity', opacity);
      } else if (layerId.includes('circle')) {
        map.current.setPaintProperty(layerId, 'circle-opacity', opacity);
      } else if (layerId.includes('heatmap')) {
        map.current.setPaintProperty(layerId, 'heatmap-opacity', opacity);
      }
    }
  }, []);

  return (
    <div className="relative w-full h-full bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="absolute inset-0">
        {showMapboxError ? (
          <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-700 rounded-lg">
            <div className="text-center p-8 max-w-md">
              <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Mapbox Configuration Required
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Advanced mapping features require a valid Mapbox API key.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Quick Setup:</h4>
                <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                  <li>Get free API key from <a href="https://account.mapbox.com" target="_blank" rel="noopener noreferrer" className="underline">Mapbox</a></li>
                  <li>Add to .env: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">VITE_MAPBOX_ACCESS_TOKEN=your_key</code></li>
                  <li>Restart development server</li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <div ref={mapContainer} className="w-full h-full" />
        )}
      </div>

      {/* Enhanced Map Style Switcher */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-2">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">Map Style</div>
            <div className="flex space-x-1">
              {mapStyles.map((style) => {
                const Icon = style.icon;
                return (
                  <button
                    key={style.id}
                    onClick={() => setMapStyle(style.id)}
                    className={`p-2 rounded transition-colors group relative ${
                      mapStyle === style.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    title={style.description}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Layer Controls */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-sm">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Advanced Layers
              </h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Live</span>
              </div>
            </div>
          </div>
          
          <div className="p-3 space-y-3 max-h-80 overflow-y-auto">
            {/* Choropleth Controls */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Choropleth</span>
                <button
                  onClick={() => handleLayerToggle('choropleth', 'provinces')}
                  className={`p-1 rounded ${
                    layers.choropleth.provinces ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  {layers.choropleth.provinces ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              </div>
              {layers.choropleth.provinces && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={layerOpacity['provinces'] || 0.3}
                  onChange={(e) => handleOpacityChange('provinces-fill', parseFloat(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              )}
            </div>

            {/* Security Controls */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Security</span>
                <button
                  onClick={() => handleLayerToggle('security', 'incidents')}
                  className={`p-1 rounded ${
                    layers.security.incidents ? 'text-red-600' : 'text-gray-400'
                  }`}
                >
                  {layers.security.incidents ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              </div>
              {layers.security.incidents && (
                <div className="space-y-1">
                  <label className="flex items-center space-x-2 text-xs">
                    <input
                      type="checkbox"
                      checked={layers.security.clusters}
                      onChange={() => handleLayerToggle('security', 'clusters')}
                      className="w-3 h-3 rounded"
                    />
                    <span className="text-gray-600 dark:text-gray-400">Clustering</span>
                  </label>
                  <label className="flex items-center space-x-2 text-xs">
                    <input
                      type="checkbox"
                      checked={layers.security.heatmap}
                      onChange={() => handleLayerToggle('security', 'heatmap')}
                      className="w-3 h-3 rounded"
                    />
                    <span className="text-gray-600 dark:text-gray-400">Heatmap</span>
                  </label>
                </div>
              )}
            </div>

            {/* Social Media Controls */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Social Media</span>
                <button
                  onClick={() => handleLayerToggle('social', 'sentiment')}
                  className={`p-1 rounded ${
                    layers.social.sentiment ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  {layers.social.sentiment ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              </div>
              {layers.social.sentiment && (
                <div className="space-y-1">
                  <label className="flex items-center space-x-2 text-xs">
                    <input
                      type="checkbox"
                      checked={layers.social.heatmap}
                      onChange={() => handleLayerToggle('social', 'heatmap')}
                      className="w-3 h-3 rounded"
                    />
                    <span className="text-gray-600 dark:text-gray-400">Heatmap</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={layerOpacity['social-heatmap'] || 0.7}
                    onChange={(e) => handleOpacityChange('social-heatmap', parseFloat(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Map Info */}
      <div className="absolute bottom-4 left-4 z-20">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <Info className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-600 dark:text-gray-400">
                Zoom: {viewState.zoom.toFixed(1)}
              </span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {viewState.latitude.toFixed(3)}, {viewState.longitude.toFixed(3)}
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 dark:text-gray-400">Live Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Tools */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 flex space-x-1">
          <button
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Export Map"
          >
            <Download className="w-4 h-4" />
          </button>
          
          <button
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Bookmark View"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}