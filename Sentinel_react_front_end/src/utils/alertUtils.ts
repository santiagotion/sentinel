import { AlertTriangle, Info, Bell, Activity } from 'lucide-react';

export const getAlertColor = (type: string) => {
  switch(type) {
    case 'critical': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300';
    case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300';
    case 'info': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300';
    case 'success': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300';
    default: return '';
  }
};

export const getAlertColorGradient = (type: string) => {
  switch (type) {
    case 'critical': return 'from-red-500 to-red-600';
    case 'warning': return 'from-yellow-500 to-yellow-600';
    case 'info': return 'from-blue-500 to-blue-600';
    default: return 'from-gray-500 to-gray-600';
  }
};

export const getAlertIcon = (type: string) => {
  switch (type) {
    case 'critical': return AlertTriangle;
    case 'warning': return Info;
    case 'info': return Bell;
    default: return Activity;
  }
};

export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
    case 'investigating': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
    case 'monitoring': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    case 'resolved': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    case 'critical': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
    case 'warning': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
    default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
  }
};