import React, { useState, useMemo, useEffect } from 'react';
import { 
  AlertTriangle, Info, Bell, Activity, Shield, TrendingUp, Network,
  CheckCircle, MapPin, Clock, Users, X, Download, Share2, FileText,
  MessageSquare, Eye, Settings, ChevronDown, ChevronRight, BarChart3,
  Calendar, Tag, Link, ExternalLink, Flag, Star, Archive, Trash2,
  UserPlus, Send, Copy, Bookmark, Plus, Filter, Search, RefreshCw,
  ArrowUp, ArrowDown, ArrowRight, Edit, Save, AlertCircle
} from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { exportAlerts } from '../../utils/exportUtils';
import { ConfirmationModal } from '../ui/Modal';
import { useConfirmationDialog } from '../ui/ConfirmationDialogs';
import { AlertsService, DetailedAlert } from '../../services/AlertsService';

// TypeScript interfaces
interface AlertMetrics {
  mentions: number;
  sentiment: number;
  reach: number;
  sources: string[];
}

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info' | 'success';
  category: 'security' | 'misinformation' | 'trend' | 'network';
  title: string;
  description: string;
  location: string;
  time: Date;
  status: 'active' | 'investigating' | 'monitoring' | 'resolved';
  assignedTo: string | null;
  metrics: AlertMetrics;
}

type AlertType = 'all' | 'critical' | 'warning' | 'info' | 'success';
type AlertCategory = 'security' | 'misinformation' | 'trend' | 'network' | 'political' | 'social' | 'economic';
type AlertStatus = 'active' | 'investigating' | 'monitoring' | 'resolved' | 'dismissed';

export function AlertsScreen() {
  const [filter, setFilter] = useState<AlertType>('all');
  const [selectedAlert, setSelectedAlert] = useState<DetailedAlert | null>(null);
  const [alerts, setAlerts] = useState<DetailedAlert[]>([]);
  const [loading, setLoading] = useState(true);
  
  const alertsService = new AlertsService();
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    details: true,
    metrics: true,
    timeline: false,
    actions: true
  });
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'timeline' | 'analysis' | 'related'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'time' | 'priority' | 'status'>('time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedAlerts, setSelectedAlerts] = useState<number[]>([]);
  const [assigneeInput, setAssigneeInput] = useState('');
  const [statusInput, setStatusInput] = useState<AlertStatus>('investigating');
  const [noteInput, setNoteInput] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  const { success, error, info } = useNotifications();
  const confirmationDialog = useConfirmationDialog();

  // Load alerts on component mount
  useEffect(() => {
    const loadAlerts = async () => {
      try {
        setLoading(true);
        const alertsData = await alertsService.getAllAlerts();
        setAlerts(alertsData);
      } catch (err) {
        error('Erreur de chargement', 'Impossible de charger les alertes');
        console.error('Failed to load alerts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAlerts();
  }, [alertsService, error]);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updatedAlerts = await alertsService.getAllAlerts();
        setAlerts(updatedAlerts);
      } catch (err) {
        console.error('Failed to refresh alerts:', err);
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [alertsService]);

  // Filtered alerts computed from loaded data

  // Enhanced alert management functions
  const handleAssignAlert = async () => {
    if (!selectedAlert || !assigneeInput.trim()) {
      error('Erreur d\'assignation', 'Veuillez sélectionner un utilisateur');
      return;
    }

    try {
      const updatedAlert = await alertsService.assignAlert(selectedAlert.id, assigneeInput.trim());
      setSelectedAlert(updatedAlert);
      success('Alert assignée', `Alerte assignée à ${assigneeInput.trim()}`);
      setShowAssignModal(false);
      setAssigneeInput('');
      
      // Refresh alerts list
      const refreshedAlerts = await alertsService.getAllAlerts();
      setAlerts(refreshedAlerts);
    } catch (err) {
      error('Erreur d\'assignation', 'Impossible d\'assigner l\'alerte');
      console.error('Assignment error:', err);
    }
  };

  const handleStatusChange = async (alertId?: number, newStatus?: AlertStatus) => {
    if (!selectedAlert) return;

    try {
      const statusToUse = newStatus || statusInput;
      const updatedAlert = await alertsService.updateAlertStatus(selectedAlert.id, statusToUse, noteInput || undefined);
      setSelectedAlert(updatedAlert);
      success('Statut mis à jour', `Alerte passée au statut "${statusToUse}"`);
      setShowStatusModal(false);
      setNoteInput('');
      
      // Refresh alerts list
      const refreshedAlerts = await alertsService.getAllAlerts();
      setAlerts(refreshedAlerts);
    } catch (err) {
      error('Erreur de statut', 'Impossible de changer le statut');
      console.error('Status change error:', err);
    }
  };

  const handleAddNote = async () => {
    if (!selectedAlert || !noteInput.trim()) {
      error('Erreur de note', 'Veuillez saisir une note');
      return;
    }

    try {
      const updatedAlert = await alertsService.addNote(selectedAlert.id, noteInput.trim());
      setSelectedAlert(updatedAlert);
      success('Note ajoutée', 'Note ajoutée à l\'alerte avec succès');
      setNoteInput('');
      
      // Refresh alerts list
      const refreshedAlerts = await alertsService.getAllAlerts();
      setAlerts(refreshedAlerts);
    } catch (err) {
      error('Erreur de note', 'Impossible d\'ajouter la note');
      console.error('Add note error:', err);
    }
  };

  const handleExportAlert = async (alertId?: number) => {
    try {
      const alertsToExport = alertId 
        ? alerts.filter(alert => alert.id === alertId)
        : selectedAlerts.length > 0 
          ? alerts.filter(alert => selectedAlerts.includes(alert.id))
          : filteredAlerts;

      await exportAlerts(alertsToExport, 'csv');
      success('Export réussi', `${alertsToExport.length} alerte(s) exportée(s)`);
      setShowExportModal(false);
    } catch (err) {
      error('Erreur d\'export', 'Impossible d\'exporter les alertes');
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedAlerts.length === 0) {
      error('Aucune sélection', 'Veuillez sélectionner des alertes');
      return;
    }

    const actionName = {
      'assign': 'assigner',
      'status': 'changer le statut de',
      'delete': 'supprimer',
      'archive': 'archiver'
    }[action] || action;

    confirmationDialog.confirmBulkDelete(
      selectedAlerts.length,
      () => {
        success('Action exécutée', `${selectedAlerts.length} alerte(s) traitée(s)`);
        setSelectedAlerts([]);
      },
      { itemType: 'alertes' }
    );
  };

  const toggleAlertSelection = (alertId: number) => {
    setSelectedAlerts(prev => 
      prev.includes(alertId)
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const selectAllAlerts = () => {
    const pageAlerts = filteredAlerts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(alert => alert.id);
    setSelectedAlerts(prev => 
      pageAlerts.every(id => prev.includes(id))
        ? prev.filter(id => !pageAlerts.includes(id))
        : [...new Set([...prev, ...pageAlerts])]
    );
  };

  // Filtered and sorted alerts
  const filteredAlerts = useMemo(() => {
    let filtered = alerts.filter(alert => {
      const matchesFilter = filter === 'all' || alert.type === filter;
      const matchesSearch = searchTerm === '' || 
        alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || alert.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
      
      return matchesFilter && matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort alerts
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'time':
          comparison = b.time.getTime() - a.time.getTime();
          break;
        case 'priority':
          const priorityOrder = { critical: 4, warning: 3, info: 2, success: 1 };
          comparison = priorityOrder[b.type] - priorityOrder[a.type];
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      return sortOrder === 'asc' ? -comparison : comparison;
    });

    return filtered;
  }, [alerts, filter, searchTerm, categoryFilter, statusFilter, sortBy, sortOrder]);

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const currentPage = 1;
  const paginatedAlerts = filteredAlerts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return Info;
      case 'info': return Bell;
      default: return Activity;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return 'from-red-500 to-red-600';
      case 'warning': return 'from-yellow-500 to-yellow-600';
      case 'info': return 'from-blue-500 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusBadge = (status: AlertStatus) => {
    switch (status) {
      case 'active': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'investigating': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'monitoring': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'resolved': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getCategoryIcon = (category: AlertCategory) => {
    switch (category) {
      case 'security': return Shield;
      case 'misinformation': return AlertTriangle;
      case 'trend': return TrendingUp;
      case 'network': return Network;
      default: return Activity;
    }
  };

  // Removed duplicate - filteredAlerts is already defined above

  // Helper functions for alert management
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Removed duplicate functions - already defined above

  // Removed duplicate handleExportAlert - already defined above

  const mockTimelineEvents = selectedAlert ? [
    {
      id: 1,
      type: 'created',
      title: 'Alerte créée',
      description: 'Détection automatique par le système de surveillance',
      timestamp: new Date(selectedAlert.time.getTime()),
      user: 'Système'
    },
    {
      id: 2,
      type: 'status_change',
      title: 'Statut modifié',
      description: 'Passé de "nouveau" à "actif"',
      timestamp: new Date(selectedAlert.time.getTime() + 300000),
      user: 'Analyste 1'
    },
    {
      id: 3,
      type: 'comment',
      title: 'Commentaire ajouté',
      description: 'Analyse préliminaire terminée, escalade recommandée',
      timestamp: new Date(selectedAlert.time.getTime() + 600000),
      user: 'Analyste Principal'
    }
  ] : [];

  const teamMembers = [
    'Équipe Analyse',
    'Équipe Communication',
    'Équipe Sécurité',
    'Analyste Principal',
    'Chef de Service'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Centre d'Alertes</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {alerts.filter(a => a.status === 'active').length} alertes actives nécessitant une attention
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as AlertType)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Toutes les alertes</option>
            <option value="critical">Critiques</option>
            <option value="warning">Avertissements</option>
            <option value="info">Information</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Configurer alertes
          </button>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <span className="text-3xl font-bold text-red-600">
              {alerts.filter(a => a.type === 'critical').length}
            </span>
          </div>
          <p className="text-sm text-red-700 dark:text-red-300">Alertes critiques</p>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between mb-2">
            <Info className="w-8 h-8 text-yellow-600" />
            <span className="text-3xl font-bold text-yellow-600">
              {alerts.filter(a => a.type === 'warning').length}
            </span>
          </div>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">Avertissements</p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-2">
            <Bell className="w-8 h-8 text-blue-600" />
            <span className="text-3xl font-bold text-blue-600">
              {alerts.filter(a => a.type === 'info').length}
            </span>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">Informations</p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-3xl font-bold text-green-600">
              {alerts.filter(a => a.status === 'resolved').length}
            </span>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">Résolues (24h)</p>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          const CategoryIcon = getCategoryIcon(alert.category);
          const timeDiff = Math.floor((Date.now() - alert.time.getTime()) / 60000);
          
          return (
            <div
              key={alert.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all p-6 cursor-pointer"
              onClick={() => setSelectedAlert(alert)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getAlertColor(alert.type)} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{alert.title}</h4>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(alert.status)}`}>
                        {alert.status === 'active' ? 'Active' :
                         alert.status === 'investigating' ? 'Investigation' :
                         alert.status === 'monitoring' ? 'Surveillance' : 'Résolue'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{alert.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <span className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{alert.location}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>il y a {timeDiff} minutes</span>
                      </span>
                      <span className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                        <CategoryIcon className="w-4 h-4" />
                        <span className="capitalize">{alert.category}</span>
                      </span>
                      {alert.assignedTo && (
                        <span className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{alert.assignedTo}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {alert.metrics.mentions}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">mentions</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getAlertColor(selectedAlert.type)} flex items-center justify-center`}>
                  {React.createElement(getAlertIcon(selectedAlert.type), { className: "w-6 h-6 text-white" })}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{selectedAlert.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedAlert.status)}`}>
                      {selectedAlert.status}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {selectedAlert.id}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleExportAlert(selectedAlert?.id)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  title="Exporter"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  title="Partager"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  title="Ajouter aux favoris"
                >
                  <Star className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-hidden flex">
              {/* Left Panel - Details */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex space-x-6">
                    {[
                      { id: 'overview', label: 'Vue d\'ensemble', icon: Eye },
                      { id: 'timeline', label: 'Chronologie', icon: Clock },
                      { id: 'analysis', label: 'Analyse', icon: BarChart3 },
                      { id: 'related', label: 'Liés', icon: Link }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveDetailTab(tab.id as any)}
                          className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
                            activeDetailTab === tab.id
                              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Tab Content */}
                {activeDetailTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Description</h4>
                      <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        {selectedAlert.description}
                      </p>
                    </div>

                    {/* Metrics Grid */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Métriques Clés</h4>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <MessageSquare className="w-4 h-4 text-blue-500" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Mentions</p>
                          </div>
                          <p className="text-2xl font-bold text-gray-800 dark:text-white">{selectedAlert.metrics.mentions}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Activity className="w-4 h-4 text-green-500" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Sentiment</p>
                          </div>
                          <p className={`text-2xl font-bold ${selectedAlert.metrics.sentiment > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {(selectedAlert.metrics.sentiment * 100).toFixed(0)}%
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-purple-500" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Portée</p>
                          </div>
                          <p className="text-2xl font-bold text-gray-800 dark:text-white">
                            {(selectedAlert.metrics.reach / 1000).toFixed(0)}K
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Network className="w-4 h-4 text-orange-500" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Sources</p>
                          </div>
                          <p className="text-sm font-bold text-gray-800 dark:text-white">
                            {selectedAlert.metrics.sources.join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Location and Category Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Informations Géographiques</h4>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5 text-red-500" />
                            <span className="font-medium text-gray-800 dark:text-white">{selectedAlert.location}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Catégorie</h4>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                          <div className="flex items-center space-x-2">
                            {React.createElement(getCategoryIcon(selectedAlert.category), { className: "w-5 h-5 text-blue-500" })}
                            <span className="font-medium text-gray-800 dark:text-white capitalize">{selectedAlert.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'timeline' && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Chronologie des Événements</h4>
                    <div className="space-y-4">
                      {mockTimelineEvents.map((event, index) => (
                        <div key={event.id} className="flex items-start space-x-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${
                              event.type === 'created' ? 'bg-blue-500' :
                              event.type === 'status_change' ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}></div>
                            {index < mockTimelineEvents.length - 1 && (
                              <div className="w-0.5 h-12 bg-gray-200 dark:bg-gray-600 mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-medium text-gray-800 dark:text-white">{event.title}</h5>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {event.timestamp.toLocaleString('fr-FR')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{event.description}</p>
                            <div className="flex items-center space-x-2">
                              <Users className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500 dark:text-gray-400">{event.user}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeDetailTab === 'analysis' && (
                  <div className="space-y-6">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Analyse Approfondie</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 dark:text-white mb-3">Évolution Temporelle</h5>
                        <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded flex items-center justify-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Graphique temporel</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 dark:text-white mb-3">Distribution Géographique</h5>
                        <div className="h-32 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded flex items-center justify-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Carte de chaleur</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'related' && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Alertes Liées</h4>
                    <div className="space-y-3">
                      {alerts.slice(0, 3).filter(a => a.id !== selectedAlert.id).map(relatedAlert => (
                        <div key={relatedAlert.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/50"
                             onClick={() => setSelectedAlert(relatedAlert)}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getAlertColor(relatedAlert.type)} flex items-center justify-center`}>
                              {React.createElement(getAlertIcon(relatedAlert.type), { className: "w-4 h-4 text-white" })}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-800 dark:text-white">{relatedAlert.title}</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{relatedAlert.location}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(relatedAlert.status)}`}>
                              {relatedAlert.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Panel - Actions */}
              <div className="w-80 border-l border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800/50">
                <h4 className="font-medium text-gray-800 dark:text-white mb-4">Actions Rapides</h4>
                
                <div className="space-y-3">
                  {/* Status Actions */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Gestion du Statut</h5>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleStatusChange(selectedAlert.id, 'investigating')}
                        className="px-3 py-2 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1 inline" />
                        Enquêter
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedAlert.id, 'resolved')}
                        className="px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-1 inline" />
                        Résoudre
                      </button>
                    </div>
                  </div>

                  {/* Assignment */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Attribution</h5>
                    <button
                      onClick={() => setShowAssignModal(true)}
                      className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      <UserPlus className="w-4 h-4 mr-2 inline" />
                      Assigner à une équipe
                    </button>
                  </div>

                  {/* Analysis Actions */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Analyse</h5>
                    <div className="space-y-2">
                      <button className="w-full px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors">
                        <BarChart3 className="w-4 h-4 mr-2 inline" />
                        Analyse approfondie
                      </button>
                      <button className="w-full px-3 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors">
                        <Network className="w-4 h-4 mr-2 inline" />
                        Analyse réseau
                      </button>
                    </div>
                  </div>

                  {/* Export Actions */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Export & Partage</h5>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleExportAlert(selectedAlert?.id)}
                        className="w-full px-3 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                      >
                        <FileText className="w-4 h-4 mr-2 inline" />
                        Générer rapport
                      </button>
                      <button className="w-full px-3 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                        <Copy className="w-4 h-4 mr-2 inline" />
                        Copier lien
                      </button>
                    </div>
                  </div>

                  {/* Other Actions */}
                  <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <button className="w-full px-3 py-2 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition-colors">
                      <Flag className="w-4 h-4 mr-2 inline" />
                      Escalader
                    </button>
                    <button className="w-full px-3 py-2 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors">
                      <Archive className="w-4 h-4 mr-2 inline" />
                      Archiver
                    </button>
                  </div>
                </div>

                {/* Alert Info Summary */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Informations</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Créée:</span>
                      <span className="text-gray-800 dark:text-white">
                        {selectedAlert.time.toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Assignée à:</span>
                      <span className="text-gray-800 dark:text-white">
                        {selectedAlert.assignedTo || 'Non assignée'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Priorité:</span>
                      <span className={`px-2 py-1 rounded text-xs ${getAlertColor(selectedAlert.type)}`}>
                        {selectedAlert.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignModal && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Assigner l'alerte
            </h3>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <button
                  key={member}
                  onClick={() => {
                    setAssigneeInput(member);
                    handleAssignAlert();
                  }}
                  className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-800 dark:text-white">{member}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}