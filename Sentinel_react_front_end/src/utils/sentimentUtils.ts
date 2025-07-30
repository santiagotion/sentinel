import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export const getSentimentIcon = (sentiment: string) => {
  if (sentiment === 'positive') return { icon: TrendingUp, color: 'text-green-600' };
  if (sentiment === 'negative') return { icon: TrendingDown, color: 'text-red-600' };
  return { icon: Activity, color: 'text-gray-600' };
};