import React from 'react';
import { 
  Eye, EyeOff, Layers, Shield, Users, Activity, Zap, 
  MapPin, Building, Truck, Factory, Settings
} from 'lucide-react';
import { LayerControl } from '../../types/mapbox';

interface LayerControlsProps {
  layers: LayerControl;
  onLayerToggle: (category: keyof LayerControl, layer: string) => void;
  onOpacityChange: (category: keyof LayerControl, layer: string, opacity: number) => void;
  layerOpacity: Record<string, number>;
}

export function LayerControls({ layers, onLayerToggle, onOpacityChange, layerOpacity }: LayerControlsProps) {
  const layerConfig = [
    {
      category: 'security' as const,
      icon: Shield,
      title: 'Security Intelligence',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      layers: [
        { key: 'incidents', label: 'Security Incidents', icon: Shield },
        { key: 'riskZones', label: 'Risk Zones', icon: MapPin },
        { key: 'checkpoints', label: 'Checkpoints', icon: Eye }
      ]
    },
    {
      category: 'social' as const,
      icon: Users,
      title: 'Social Media Intelligence',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      layers: [
        { key: 'sentiment', label: 'Sentiment Heatmap', icon: Activity },
        { key: 'viral', label: 'Viral Content', icon: Zap },
        { key: 'influence', label: 'Influence Networks', icon: Users }
      ]
    },
    {
      category: 'infrastructure' as const,
      icon: Building,
      title: 'Infrastructure',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      layers: [
        { key: 'power', label: 'Power Grid', icon: Zap },
        { key: 'transport', label: 'Transportation', icon: Truck },
        { key: 'mining', label: 'Mining Sites', icon: Factory }
      ]
    },
    {
      category: 'demographic' as const,
      icon: Users,
      title: 'Demographics',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      layers: [
        { key: 'population', label: 'Population Density', icon: Users },
        { key: 'displacement', label: 'Displacement', icon: MapPin }
      ]
    },
    {
      category: 'economic' as const,
      icon: Activity,
      title: 'Economic Activity',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      layers: [
        { key: 'activity', label: 'Economic Centers', icon: Building },
        { key: 'trade', label: 'Trade Routes', icon: Truck }
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
      <div className="flex items-center space-x-2 mb-4">
        <Layers className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Intelligence Layers</h3>
      </div>

      <div className="space-y-4">
        {layerConfig.map((category) => {
          const CategoryIcon = category.icon;
          const categoryLayers = layers[category.category];
          
          return (
            <div key={category.category} className={`${category.bgColor} rounded-lg p-3`}>
              <div className="flex items-center space-x-2 mb-3">
                <CategoryIcon className={`w-4 h-4 ${category.color}`} />
                <span className={`font-medium ${category.color}`}>{category.title}</span>
              </div>

              <div className="space-y-2">
                {category.layers.map((layer) => {
                  const LayerIcon = layer.icon;
                  const isEnabled = categoryLayers[layer.key as keyof typeof categoryLayers];
                  const opacityKey = `${category.category}_${layer.key}`;
                  const opacity = layerOpacity[opacityKey] || 100;

                  return (
                    <div key={layer.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onLayerToggle(category.category, layer.key)}
                            className={`p-1 rounded transition-colors ${
                              isEnabled 
                                ? 'text-gray-700 dark:text-gray-200' 
                                : 'text-gray-400 dark:text-gray-500'
                            }`}
                          >
                            {isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <LayerIcon className={`w-4 h-4 ${isEnabled ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`} />
                          <span className={`text-sm ${isEnabled ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}`}>
                            {layer.label}
                          </span>
                        </div>
                        
                        {isEnabled && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {opacity}%
                          </span>
                        )}
                      </div>

                      {isEnabled && (
                        <div className="ml-6 mr-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={opacity}
                            onChange={(e) => onOpacityChange(category.category, layer.key, parseInt(e.target.value))}
                            className="w-full h-1 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Quick Actions</span>
          <div className="flex space-x-2">
            <button 
              onClick={() => {
                // Enable all security layers
                Object.keys(layers.security).forEach(layer => {
                  if (!layers.security[layer as keyof typeof layers.security]) {
                    onLayerToggle('security', layer);
                  }
                });
              }}
              className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              All Security
            </button>
            <button 
              onClick={() => {
                // Disable all layers
                Object.keys(layers).forEach(category => {
                  const cat = category as keyof LayerControl;
                  const categoryLayers = layers[cat];
                  Object.keys(categoryLayers).forEach(layerKey => {
                    const typedLayerKey = layerKey as keyof typeof categoryLayers;
                    if (categoryLayers[typedLayerKey]) {
                      onLayerToggle(cat, layerKey);
                    }
                  });
                });
              }}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}