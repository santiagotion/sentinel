import React from 'react';

interface GaugeChartProps {
  value: number;
  max?: number;
  label: string;
  color: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ 
  value, 
  max = 100, 
  label, 
  color 
}) => {
  const percentage = (value / max) * 100;
  const rotation = (percentage * 180) / 100 - 90;

  return (
    <div className="relative w-full h-32">
      <svg className="w-full h-full" viewBox="0 0 200 100">
        <path
          d="M 20 80 A 60 60 0 0 1 180 80"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="12"
        />
        <path
          d="M 20 80 A 60 60 0 0 1 180 80"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={`${percentage * 1.885} 188.5`}
          strokeLinecap="round"
        />
        <line
          x1="100"
          y1="80"
          x2="100"
          y2="30"
          stroke="#374151"
          strokeWidth="3"
          transform={`rotate(${rotation} 100 80)`}
          strokeLinecap="round"
        />
        <circle cx="100" cy="80" r="6" fill="#374151" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center mt-4">
        <div className="text-center">
          <div className="text-2xl font-bold">
            {value}{typeof value === 'number' && value < 100 ? '%' : ''}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;