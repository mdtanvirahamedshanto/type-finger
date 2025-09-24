"use client";

import { ReactNode } from "react";
import { useTheme } from "../theme/ThemeProvider";

interface SettingItemProps {
  label: string;
  description: string;
  children: ReactNode;
}

export default function SettingItem({ label, description, children }: SettingItemProps) {
  const { currentTheme } = useTheme();
  
  return (
    <div className="setting-item mb-6">
      <div className="setting-header mb-2">
        <h3 className="text-md font-mono" style={{ color: currentTheme.colors.primary }}>
          {label}
        </h3>
        <p className="text-sm opacity-70">{description}</p>
      </div>
      <div className="setting-control mt-2">
        {children}
      </div>
    </div>
  );
}