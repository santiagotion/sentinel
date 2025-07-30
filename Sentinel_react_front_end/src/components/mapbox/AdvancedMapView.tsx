import React, { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LayerControls } from './LayerControls';
import { MapSearch } from './MapSearch';
import { TimeControls } from './TimeControls';
import { 
  Map, Satellite, Navigation, Maximize2, Download, 
  Info, Bookmark, MessageSquare, AlertTriangle, Globe
} from 'lucide-react';
import { 
  LayerControl, SearchFilter, MapViewState, 
  SecurityIncident, SocialMediaPost, InfluenceNetwork 
} from '../../types/mapbox';
import { mapboxLayers } from '../../data/mapboxData';

interface AdvancedMapViewProps {
  mapboxToken?: string;
}

export function AdvancedMapView({ mapboxToken }: AdvancedMapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  // Store markers for layer management
  const markers = useRef<mapboxgl.Marker[]>([]);
  
  // Map state
  const [mapStyle, setMapStyle] = useState('satellite-streets-v12');
  const [viewState, setViewState] = useState<MapViewState>({
    longitude: 23.6566,
    latitude: -2.8419,
    zoom: 5.5,
    bearing: 0,
    pitch: 0
  });

  // Layer controls
  const [layers, setLayers] = useState<LayerControl>({
    security: { incidents: true, riskZones: false, checkpoints: false },
    social: { sentiment: true, viral: false, influence: true },
    infrastructure: { power: false, transport: false, mining: false },
    demographic: { population: false, displacement: false },
    economic: { activity: false, trade: false }
  });

  const [layerOpacity, setLayerOpacity] = useState<Record<string, number>>({});

  // Search state
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Time controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date()
  });
  const [playSpeed, setPlaySpeed] = useState(1);

  // UI state
  const [activePanel, setActivePanel] = useState<'layers' | 'search' | 'time' | null>('layers');
  const [showMapboxError, setShowMapboxError] = useState(false);

  // Mapbox map styles
  const mapStyles = [
    { id: 'satellite-streets-v12', name: 'Satellite', icon: Satellite },
    { id: 'streets-v12', name: 'Streets', icon: Map },
    { id: 'outdoors-v12', name: 'Terrain', icon: Navigation }
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
          pitch: viewState.pitch
        });

        map.current.on('load', () => {
          addDataLayers();
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-left');
        
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
    if (map.current) {
      map.current.setStyle(`mapbox://styles/mapbox/${mapStyle}`);
    }
  }, [mapStyle]);

  const addDataLayers = useCallback((currentLayers?: LayerControl) => {
    if (!map.current) return;
    
    const layersToUse = currentLayers || layers;

    // Add security incidents layer
    if (layersToUse.security.incidents) {
      mapboxLayers.security.incidents.forEach((incident, index) => {
        if (index < 50) { // Limit for performance
          const el = document.createElement('div');
          el.className = 'marker';
          el.style.width = '12px';
          el.style.height = '12px';
          el.style.borderRadius = '50%';
          el.style.cursor = 'pointer';
          
          const severity = incident.severity;
          el.style.backgroundColor = 
            severity === 'critical' ? '#dc2626' :
            severity === 'high' ? '#ea580c' :
            severity === 'medium' ? '#ca8a04' : '#16a34a';
          el.style.boxShadow = '0 0 10px rgba(220, 38, 38, 0.5)';

          const marker = new mapboxgl.Marker(el)
            .setLngLat(incident.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-2">
                  <h3 class="font-bold">${incident.type}</h3>
                  <p><strong>Severity:</strong> ${incident.severity}</p>
                  <p><strong>Province:</strong> ${incident.province}</p>
                  <p><strong>Date:</strong> ${new Date(incident.timestamp).toLocaleDateString()}</p>
                  <p class="text-sm mt-1">${incident.description}</p>
                </div>
              `))
            .addTo(map.current!);
          
          markers.current.push(marker);
        }
      });
    }

    // Add social media posts
    if (layersToUse.social.sentiment) {
      mapboxLayers.social.posts.forEach((post, index) => {
        if (index < 30) { // Limit for performance
          const el = document.createElement('div');
          el.className = 'marker social-post';
          el.style.width = '12px';
          el.style.height = '12px';
          el.style.borderRadius = '50%';
          el.style.cursor = 'pointer';
          el.style.border = '2px solid #ffffff';
          el.style.transition = 'all 0.2s ease';
          
          el.style.backgroundColor = 
            post.sentiment === 'positive' ? '#16a34a' :
            post.sentiment === 'negative' ? '#dc2626' : '#6b7280';
          el.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.6)';

          const marker = new mapboxgl.Marker(el)
            .setLngLat(post.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-2">
                  <h3 class="font-bold">Social Media Post</h3>
                  <p><strong>Platform:</strong> ${post.platform}</p>
                  <p><strong>Sentiment:</strong> ${post.sentiment}</p>
                  <p><strong>Engagement:</strong> ${post.engagement}</p>
                  <p class="text-sm mt-1">Topic: ${post.topic}</p>
                </div>
              `))
            .addTo(map.current!);
          
          markers.current.push(marker);
        }
      });
    }

    // Add influence networks
    if (layersToUse.social.influence) {
      mapboxLayers.social.influence.forEach((influencer, index) => {
        if (index < 20) { // Limit for performance
          const el = document.createElement('div');
          el.className = 'marker network-node';
          el.style.width = '20px';
          el.style.height = '20px';
          el.style.borderRadius = '50%';
          el.style.cursor = 'pointer';
          el.style.backgroundColor = '#8b5cf6';
          el.style.border = '3px solid #ffffff';
          el.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.8)';
          el.style.transition = 'all 0.3s ease';
          el.style.zIndex = '1000';

          // Add hover effects
          el.addEventListener('mouseenter', () => {
            el.style.transform = 'scale(1.3)';
            el.style.boxShadow = '0 0 20px rgba(139, 92, 246, 1)';
          });

          el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1)';
            el.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.8)';
          });

          const marker = new mapboxgl.Marker(el)
            .setLngLat(influencer.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-2">
                  <h3 class="font-bold">Influence Network</h3>
                  <p><strong>Type:</strong> ${influencer.type}</p>
                  <p><strong>Influence Score:</strong> ${influencer.influence}</p>
                  <p><strong>Followers:</strong> ${influencer.followers.toLocaleString()}</p>
                </div>
              `))
            .addTo(map.current!);
          
          markers.current.push(marker);
        }
      });
    }
  }, [layers]);

  // Update layers when layer state changes
  useEffect(() => {
    if (map.current && map.current.loaded()) {
      // Add a small delay to prevent flickering
      const timeoutId = setTimeout(() => {
        clearMarkers();
        addDataLayers();
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [layers, addDataLayers]);

  const clearMarkers = () => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
  };

  const handleLayerToggle = useCallback((category: keyof LayerControl, layer: string) => {
    setLayers(prev => {
      const newLayers = {
        ...prev,
        [category]: {
          ...prev[category],
          [layer]: !prev[category][layer as keyof typeof prev[typeof category]]
        }
      };
      
      return newLayers;
    });
  }, []);

  const handleOpacityChange = useCallback((category: keyof LayerControl, layer: string, opacity: number) => {
    const key = `${category}_${layer}`;
    setLayerOpacity(prev => ({ ...prev, [key]: opacity }));
  }, []);

  const handleSearch = useCallback((query: string, filters: SearchFilter) => {
    setIsSearching(true);
    
    // Mock search implementation
    setTimeout(() => {
      const mockResults = mapboxLayers.security.incidents
        .filter(incident => 
          incident.description.toLowerCase().includes(query.toLowerCase()) ||
          incident.province.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 10);
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchResults([]);
  }, []);

  const handleTimeChange = useCallback((time: Date) => {
    setCurrentTime(time);
    // In a real implementation, this would filter data by time
  }, []);

  const handlePlayPause = useCallback((playing: boolean) => {
    setIsPlaying(playing);
    
    if (playing) {
      // Start time animation
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = new Date(prev.getTime() + (24 * 60 * 60 * 1000 * playSpeed));
          if (newTime > timeRange.end) {
            setIsPlaying(false);
            return timeRange.end;
          }
          return newTime;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [playSpeed, timeRange]);

  return (
    <div className="relative w-full h-full bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="absolute inset-0">
        {showMapboxError ? (
          <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-700 rounded-lg">
            <div className="text-center p-8">
              <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Mapbox Configuration Required
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                To enable advanced mapping features, please configure your Mapbox API key.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Setup Instructions:</h4>
                <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                  <li>Get a free API key from <a href="https://account.mapbox.com/auth/signup/" target="_blank" rel="noopener noreferrer" className="underline">Mapbox</a></li>
                  <li>Add to your .env file: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1Ijoic2FudGlhZ29sZ2QiLCJhIjoiY2tpdngyY2lwMWNiOTJ2bW0wdTF6ZW52ZyJ9.ve7YzOLqoeUymHJfGhVGgA</code></li>
                  <li>Restart the development server</li>
                </ol>
              </div>
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h5 className="font-medium text-gray-800 dark:text-white mb-2">Preview Mode Active</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing mock visualization with sample intelligence data layers.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div ref={mapContainer} className="w-full h-full" />
        )}
      </div>

      {/* Map Style Switcher */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex space-x-1">
          {mapStyles.map((style) => {
            const Icon = style.icon;
            return (
              <button
                key={style.id}
                onClick={() => setMapStyle(style.id)}
                className={`p-2 rounded transition-colors ${
                  mapStyle === style.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={style.name}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Panels Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex space-x-1">
          <button
            onClick={() => setActivePanel(activePanel === 'layers' ? null : 'layers')}
            className={`p-2 rounded transition-colors ${
              activePanel === 'layers'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Layer Controls"
          >
            <Map className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setActivePanel(activePanel === 'search' ? null : 'search')}
            className={`p-2 rounded transition-colors ${
              activePanel === 'search'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Search & Filters"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setActivePanel(activePanel === 'time' ? null : 'time')}
            className={`p-2 rounded transition-colors ${
              activePanel === 'time'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Time Controls"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Control Panels */}
      {activePanel && (
        <div className="absolute top-20 right-4 z-20 w-80 max-h-96">
          {activePanel === 'layers' && (
            <LayerControls
              layers={layers}
              onLayerToggle={handleLayerToggle}
              onOpacityChange={handleOpacityChange}
              layerOpacity={layerOpacity}
            />
          )}
          
          {activePanel === 'search' && (
            <MapSearch
              onSearch={handleSearch}
              onClearSearch={handleClearSearch}
              isSearching={isSearching}
              resultCount={searchResults.length}
            />
          )}
          
          {activePanel === 'time' && (
            <TimeControls
              onTimeChange={handleTimeChange}
              onSpeedChange={setPlaySpeed}
              onPlayPause={handlePlayPause}
              isPlaying={isPlaying}
              currentTime={currentTime}
              timeRange={timeRange}
              speed={playSpeed}
            />
          )}
        </div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="flex justify-between items-end">
          <div className="flex flex-col space-y-3">
            {/* Coverage Metrics Card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white">Couverture</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Provinces</span>
                  <span className="font-medium text-gray-900 dark:text-white">26/26</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Langues</span>
                  <span className="font-medium text-gray-900 dark:text-white">15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Plateformes</span>
                  <span className="font-medium text-gray-900 dark:text-white">8/8</span>
                </div>
              </div>
            </div>
            
            {/* Map Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Zoom: {viewState.zoom.toFixed(1)}
                  </span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Center: {viewState.latitude.toFixed(3)}, {viewState.longitude.toFixed(3)}
                </div>
                {searchResults.length > 0 && (
                  <div className="text-blue-600 dark:text-blue-400">
                    {searchResults.length} results found
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Map Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex space-x-1">
            <button
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              title="Export Map"
            >
              <Download className="w-4 h-4" />
            </button>
            
            <button
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
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
    </div>
  );
}