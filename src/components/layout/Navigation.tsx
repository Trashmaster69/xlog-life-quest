import { 
  BarChart3, 
  Target, 
  Trophy, 
  BookOpen, 
  User, 
  ShoppingBag,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { icon: BarChart3, label: "Dashboard", id: "dashboard" },
  { icon: Target, label: "Habits", id: "habits" },
  { icon: BookOpen, label: "Journal", id: "journal" },
  { icon: ShoppingBag, label: "Shop", id: "shop" },
  { icon: Trophy, label: "Leaderboard", id: "leaderboard" },
  { icon: User, label: "Avatar", id: "avatar" },
];

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onSignOut?: () => void;
}

export function Navigation({ activeSection, onSectionChange, onSignOut }: NavigationProps) {
  return (
    <div className="flex flex-col h-full">
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
      
      {onSignOut && (
        <div className="mt-auto p-4">
          <Button
            variant="ghost"
            className="justify-start gap-3 h-12 w-full text-left text-muted-foreground hover:text-foreground"
            onClick={onSignOut}
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sign Out</span>
          </Button>
        </div>
      )}
    </div>
  );
}