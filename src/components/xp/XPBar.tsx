import { useState, useEffect } from "react";

interface XPBarProps {
  currentXP: number;
  levelXP: number;
  level: number;
  className?: string;
}

export function XPBar({ currentXP, levelXP, level, className = "" }: XPBarProps) {
  const [animatedXP, setAnimatedXP] = useState(0);
  const percentage = Math.min((currentXP / levelXP) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedXP(currentXP);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentXP]);

  return (
    <div className={`xp-bar ${className}`}>
      <div 
        className="xp-bar-fill"
        style={{ width: `${percentage}%` }}
      />
      <div className="xp-bar-text">
        <span>{currentXP} / {levelXP} XP</span>
      </div>
    </div>
  );
}

interface LevelBadgeProps {
  level: number;
  className?: string;
}

export function LevelBadge({ level, className = "" }: LevelBadgeProps) {
  const getLevelColor = (level: number) => {
    if (level >= 50) return "level-platinum";
    if (level >= 25) return "level-gold";
    if (level >= 10) return "level-silver";
    return "level-bronze";
  };

  return (
    <div className={`level-badge ${className}`}>
      <span>{level}</span>
    </div>
  );
}