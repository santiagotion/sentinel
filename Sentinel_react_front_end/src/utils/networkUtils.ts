export const getNodeColor = (type: string) => {
  switch (type) {
    case 'official': return 'from-blue-400 to-blue-600';
    case 'media': return 'from-purple-400 to-purple-600';
    case 'influencer': return 'from-green-400 to-green-600';
    case 'activist': return 'from-orange-400 to-orange-600';
    default: return 'from-gray-400 to-gray-600';
  }
};