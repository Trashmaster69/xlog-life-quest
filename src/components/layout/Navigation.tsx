import { useState } from "react";
import { 
  Home, 
  Target, 
  Trophy, 
  BookOpen, 
  User, 
  Settings,
  Swords,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { icon: Home, label: "Dashboard", id: "dashboard" },
  { icon: Target, label: "Habits", id: "habits" },
  { icon: Swords, label: "Quests", id: "quests" },
  { icon: Trophy, label: "Leaderboard", id: "leaderboard" },
  { icon: BookOpen, label: "Journal", id: "journal" },
  { icon: TrendingUp, label: "Analytics", id: "analytics" },
  { icon: User, label: "Avatar", id: "avatar" },
  { icon: Settings, label: "Settings", id: "settings" },
];

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <nav className="flex flex-col gap-2 p-4">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <Button
            key={item.id}
            variant={isActive ? "default" : "ghost"}
            className={cn(
              "justify-start gap-3 h-12 text-left transition-all duration-200",
              isActive 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "hover:bg-card-glow text-muted-foreground hover:text-foreground"
            )}
            onClick={() => onSectionChange(item.id)}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Button>
        );
      })}
    </nav>
  );
}