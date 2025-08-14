import { useState } from "react";
import { Check, Flame, Calendar, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Habit {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  difficulty: "easy" | "medium" | "hard";
  streak: number;
  completed: boolean;
  type: "daily" | "weekly" | "habit";
  category: string;
}

interface HabitCardProps {
  habit: Habit;
  onComplete: (habitId: string) => void;
  onEdit?: (habit: Habit) => void;
}

export function HabitCard({ habit, onComplete, onEdit }: HabitCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    onComplete(habit.id);
    setIsCompleting(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "success";
      case "medium": return "warning";
      case "hard": return "destructive";
      default: return "secondary";
    }
  };

  const getXPColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-success";
      case "medium": return "text-warning";
      case "hard": return "text-destructive";
      default: return "text-accent";
    }
  };

  return (
    <Card className={cn(
      "habit-card transition-all duration-300",
      habit.completed ? "opacity-75 bg-success/10 border-success/30" : ""
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              {habit.name}
              {habit.streak > 0 && (
                <div className="streak-counter">
                  <Flame className="h-3 w-3" />
                  {habit.streak}
                </div>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {habit.description}
            </p>
          </div>
          <Badge variant={getDifficultyColor(habit.difficulty) as any}>
            {habit.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className={getXPColor(habit.difficulty)}>
                +{habit.xpReward} XP
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{habit.type}</span>
            </div>
          </div>
          
          <Button
            size="sm"
            variant={habit.completed ? "secondary" : "default"}
            onClick={handleComplete}
            disabled={habit.completed || isCompleting}
            className={cn(
              "transition-all duration-200",
              habit.completed 
                ? "bg-success text-success-foreground" 
                : "hover:scale-105"
            )}
          >
            <Check className={cn(
              "h-4 w-4",
              isCompleting ? "animate-spin" : ""
            )} />
            {habit.completed ? "Done" : "Complete"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}