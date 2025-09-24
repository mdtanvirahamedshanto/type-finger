"use client";

import { ReactNode } from "react";
import { useTheme } from "../theme/ThemeProvider";

interface SettingsSectionProps {
  title: string;
  icon: string;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
  dangerZone?: boolean;
}

export default function SettingsSection({
  title,
  icon,
  expanded,
  onToggle,
  children,
  dangerZone = false,
}: SettingsSectionProps) {
  const { currentTheme } = useTheme();
  
  return (
    <div 
      className={`settings-section rounded-lg overflow-hidden ${dangerZone ? 'border border-red-500' : ''}`}
      style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}
    >
      <div 
        className="section-header flex items-center p-4 cursor-pointer"
        onClick={onToggle}
      >
        <span className="mr-2">{icon}</span>
        <h2 className="text-lg font-mono">{title}</h2>
        <div className="ml-auto">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      
      {expanded && (
        <div className="section-content">
          {children}
        </div>
      )}
    </div>
  );
}