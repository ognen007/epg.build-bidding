import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { NavItem } from './NavItem';
import { routes } from '../../navigation/routes';

export function AdminNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get all routes except settings
  const mainNavItems = routes.admin.filter(route => !route.path.includes('settings'));

  return (
    <div className="flex flex-col h-full">
      {/* Main navigation items */}
      <div className="flex-1 px-2 py-4 space-y-1">
        {mainNavItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>

      {/* Settings at the bottom */}
      <div className="px-2 mt-auto">
        <NavItem
          icon={Settings}
          label="Settings"
          isActive={location.pathname === '/admin/settings'}
          onClick={() => navigate('/admin/settings')}
          isSettings={true}
        />
      </div>
    </div>
  );
}