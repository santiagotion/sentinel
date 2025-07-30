interface Province {
  activity: number;
  sentiment: number;
  alerts: number;
}

export const getColorForLayer = (province: Province, mapLayer: string) => {
  switch (mapLayer) {
    case 'activity':
      return province.activity > 80 ? '#EF4444' : province.activity > 60 ? '#F59E0B' : '#10B981';
    case 'sentiment':
      return province.sentiment > 70 ? '#10B981' : province.sentiment > 50 ? '#F59E0B' : '#EF4444';
    case 'alerts':
      return province.alerts > 20 ? '#EF4444' : province.alerts > 10 ? '#F59E0B' : '#10B981';
    default:
      return '#6B7280';
  }
};

export const getLayerLabel = (mapLayer: string) => {
  switch (mapLayer) {
    case 'activity': return 'Niveau d\'Activité';
    case 'sentiment': return 'Score de Sentiment';
    case 'alerts': return 'Nombre d\'Alertes';
    default: return '';
  }
};