"use client";

import { useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import SettingsSection from "@/components/settings/SettingsSection";
import ThemeSettings from "@/components/settings/ThemeSettings";
import TestBehaviorSettings from "@/components/settings/TestBehaviorSettings";
import SoundSettings from "@/components/settings/SoundSettings";
import FunboxSettings from "@/components/settings/FunboxSettings";

export default function SettingsPage() {
  const { currentTheme } = useTheme();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    theme: true,
    behavior: false,
    sound: false,
    funbox: false,
    danger: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="settings-page max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-mono mb-8">Settings</h1>
      
      <div className="grid grid-cols-1 gap-4">
        <SettingsSection 
          title="theme" 
          icon="🎨" 
          expanded={expandedSections.theme}
          onToggle={() => toggleSection("theme")}
        >
          <ThemeSettings />
        </SettingsSection>

        <SettingsSection 
          title="behavior" 
          icon="⚙️" 
          expanded={expandedSections.behavior}
          onToggle={() => toggleSection("behavior")}
        >
          <TestBehaviorSettings />
        </SettingsSection>

        <SettingsSection 
          title="sound" 
          icon="🔊" 
          expanded={expandedSections.sound}
          onToggle={() => toggleSection("sound")}
        >
          <SoundSettings />
        </SettingsSection>

        <SettingsSection 
          title="funbox" 
          icon="🎮" 
          expanded={expandedSections.funbox}
          onToggle={() => toggleSection("funbox")}
        >
          <FunboxSettings />
        </SettingsSection>

        <SettingsSection 
          title="danger zone" 
          icon="⚠️" 
          expanded={expandedSections.danger}
          onToggle={() => toggleSection("danger")}
          dangerZone={true}
        >
          <div className="p-4">
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-sm opacity-70 mr-2">import/export settings</span>
              </div>
              <p className="text-sm mb-2">Import or export the settings as JSON.</p>
              <div className="flex gap-2">
                <button 
                  className="px-4 py-2 rounded-md text-sm"
                  style={{ backgroundColor: `${currentTheme.colors.secondary}40` }}
                >
                  import
                </button>
                <button 
                  className="px-4 py-2 rounded-md text-sm"
                  style={{ backgroundColor: `${currentTheme.colors.secondary}40` }}
                >
                  export
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-sm opacity-70 mr-2">reset settings</span>
              </div>
              <p className="text-sm mb-2">Resets settings to the default (but doesn&apos;t touch your tags and presets).</p>
              <p className="text-sm text-red-500 mb-2">You can&apos;t undo this action!</p>
              <button 
                className="px-4 py-2 rounded-md text-sm bg-red-500 text-white"
              >
                reset settings
              </button>
            </div>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}