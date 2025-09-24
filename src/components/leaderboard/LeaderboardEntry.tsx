"use client";

import { useTheme } from "../theme/ThemeProvider";

interface LeaderboardEntryProps {
  position: number;
  name: string;
  avatar?: string;
  badge?: string;
  wpm: number;
  accuracy?: number;
  raw?: number;
  consistency?: number;
  time?: string;
  gained?: string;
  lastActivity?: string;
  isCurrentUser?: boolean;
}

export default function LeaderboardEntry({
  position,
  name,
  avatar,
  badge,
  wpm,
  accuracy,
  raw,
  consistency,
  time,
  gained,
  lastActivity,
  isCurrentUser = false,
}: LeaderboardEntryProps) {
  const { currentTheme } = useTheme();
  
  return (
    <tr 
      className={`leaderboard-entry border-b border-opacity-10 ${isCurrentUser ? 'font-bold' : ''}`}
      style={{ 
        backgroundColor: isCurrentUser ? `${currentTheme.colors.primary}20` : 'transparent',
        borderColor: currentTheme.colors.text
      }}
    >
      <td className="py-3 px-2 text-center">
        {position === 1 && (
          <span className="text-yellow-500">👑</span>
        )}
        {position !== 1 && position}
      </td>
      
      <td className="py-3 px-2">
        <div className="flex items-center gap-2">
          {avatar && (
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            </div>
          )}
          {!avatar && (
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
              style={{ backgroundColor: `${currentTheme.colors.secondary}80` }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <span>{name}</span>
          {badge && (
            <span 
              className="text-xs px-2 py-0.5 rounded"
              style={{ 
                backgroundColor: badge === "Mythical" ? "#FFD700" : "#3498db",
                color: badge === "Mythical" ? "#000" : "#fff"
              }}
            >
              {badge}
            </span>
          )}
        </div>
      </td>
      
      <td className="py-3 px-2 text-right">{wpm.toFixed(2)}</td>
      
      {accuracy !== undefined && (
        <td className="py-3 px-2 text-right">{accuracy.toFixed(2)}%</td>
      )}
      
      {raw !== undefined && (
        <td className="py-3 px-2 text-right">{raw.toFixed(2)}</td>
      )}
      
      {consistency !== undefined && (
        <td className="py-3 px-2 text-right">{consistency.toFixed(2)}%</td>
      )}
      
      {time && (
        <td className="py-3 px-2 text-right">{time}</td>
      )}
      
      {gained && (
        <td className="py-3 px-2 text-right">{gained}</td>
      )}
      
      {lastActivity && (
        <td className="py-3 px-2 text-right text-sm opacity-70">{lastActivity}</td>
      )}
    </tr>
  );
}