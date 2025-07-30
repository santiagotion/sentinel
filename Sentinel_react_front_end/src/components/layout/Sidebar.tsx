import React from 'react';
import { Shield, ChevronLeft, Settings, LogOut } from 'lucide-react';
import { MenuItem, ScreenType } from '../../types';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  menuItems: MenuItem[];
  activeScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
  notifications: number;
}

export default function Sidebar({ 
  collapsed, 
  onToggleCollapse, 
  menuItems, 
  activeScreen, 
  onScreenChange, 
  notifications 
}: SidebarProps) {
  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}>
      {/* Logo Section */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        <div className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-white">SENTINEL</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">RDC Intelligence</p>
            </div>
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft className={`w-5 h-5 text-gray-500 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Quick Stats (only when expanded) */}
      {!collapsed && (
        <div className="px-4 py-4 space-y-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Mentions/h</span>
            <span className="font-semibold text-gray-800 dark:text-white">1,247</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Sentiment</span>
            <span className="font-semibold text-green-600">72%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Alertes</span>
            <span className="font-semibold text-red-600">{notifications}</span>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id as ScreenType)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} />
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </div>
              {!collapsed && item.badge !== null && (
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  item.badge === 'AI' 
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    : item.id === 'alerts' && typeof item.badge === 'number' && item.badge > 0
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">AD</span>
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Niveau 5</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="mt-4 flex items-center justify-between">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <LogOut className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}