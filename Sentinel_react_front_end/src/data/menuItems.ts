import { Home, Search, Hash, BarChart3, Network, Map, Brain, Database, Bell } from 'lucide-react';
import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: Home, badge: null },
  { id: 'search', label: 'Recherche', icon: Search, badge: null },
  { id: 'keywords', label: 'Mots-clés', icon: Hash, badge: null }, // Dynamic badge will be set based on keywords length
  { id: 'analytics', label: 'Analytique', icon: BarChart3, badge: null },
  { id: 'network', label: 'Réseau', icon: Network, badge: null },
  { id: 'geographic', label: 'Géographie', icon: Map, badge: null },
  { id: 'intelligence', label: 'Intelligence IA', icon: Brain, badge: 'AI' },
  { id: 'sources', label: 'Sources', icon: Database, badge: null },
  { id: 'alerts', label: 'Alertes', icon: Bell, badge: null } // Dynamic badge will be set based on notifications count
];