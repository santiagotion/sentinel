import { Globe, Users, FileText, Database } from 'lucide-react';

export const getSourceIcon = (source: string) => {
  const icons = {
    twitter: { icon: '𝕏', color: 'text-gray-900 dark:text-white' },
    facebook: { icon: 'f', color: 'text-blue-600' },
    news: { icon: Globe, color: 'text-orange-500' }
  };
  return icons[source as keyof typeof icons];
};

export const getSourceIconByType = (type: string) => {
  switch (type) {
    case 'news': return Globe;
    case 'social': return Users;
    case 'blog': return FileText;
    default: return Database;
  }
};

export const getCredibilityBadge = (score: number) => {
  if (score >= 80) return { color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300', label: 'Fiable' };
  if (score >= 50) return { color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300', label: 'À vérifier' };
  return { color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300', label: 'Douteux' };
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'critical': return 'from-red-500 to-red-600';
    case 'warning': return 'from-yellow-500 to-yellow-600';
    case 'active': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    case 'monitoring': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
    default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
  }
};