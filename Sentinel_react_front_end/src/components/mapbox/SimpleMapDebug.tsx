import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface SimpleMapDebugProps {
  mapboxToken?: string;
}

export function SimpleMapDebug({ mapboxToken }: SimpleMapDebugProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [status, setStatus] = useState('Initializing...');
  const [markerCount, setMarkerCount] = useState(0);

  useEffect(() => {
    if (!mapboxToken) {
      setStatus('No Mapbox token provided');
      return;
    }

    if (mapContainer.current && !map.current) {
      try {
        mapboxgl.accessToken = mapboxToken;
        setStatus('Creating map...');
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [23.6566, -2.8419], // DRC center
          zoom: 5
        });

        map.current.on('load', () => {
          setStatus('Map loaded! Adding test markers...');
          
          // Add simple test markers
          const testPoints = [
            { lng: 15.2663, lat: -4.4419, name: 'Kinshasa' },
            { lng: 29.2663, lat: -1.4419, name: 'Nord-Kivu' },
            { lng: 28.7663, lat: -2.8419, name: 'Sud-Kivu' },
            { lng: 25.2663, lat: -9.4419, name: 'Katanga' }
          ];

          let added = 0;
          testPoints.forEach(point => {
            new mapboxgl.Marker({ color: '#FF0000' })
              .setLngLat([point.lng, point.lat])
              .setPopup(new mapboxgl.Popup().setHTML(`<h3>${point.name}</h3>`))
              .addTo(map.current!);
            added++;
          });
          
          setMarkerCount(added);
          setStatus(`Map ready! Added ${added} test markers`);
        });

        map.current.on('error', (e) => {
          setStatus(`Map error: ${e.error.message}`);
        });

      } catch (error) {
        setStatus(`Error: ${error}`);
      }
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded shadow-lg max-w-sm">
        <h3 className="font-bold mb-2">Map Debug Info</h3>
        <p className="text-sm">Status: {status}</p>
        <p className="text-sm">Token: {mapboxToken ? 'Present' : 'Missing'}</p>
        <p className="text-sm">Markers: {markerCount}</p>
      </div>
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}