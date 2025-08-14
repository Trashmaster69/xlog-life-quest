import { StatsCard } from "@/components/dashboard/StatsCard";
import { XPBar, LevelBadge } from "@/components/xp/XPBar";
import { HabitCard } from "@/components/habits/HabitCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  Flame,
  Plus,
  Star
} from "lucide-react";
import { mockUser, mockHabits } from "@/data/mockData";

interface DashboardProps {
  onHabitComplete: (habitId: string) => void;
}

export function Dashboard({ onHabitComplete }: DashboardProps) {
  const todayHabits = mockHabits.filter(habit => habit.type === "daily");
  const completedToday = todayHabits.filter(habit => habit.completed).length;

  return (
    <div className="space-y-6">
      {/* Header with XP Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              Welcome back, Hero! 
              <LevelBadge level={mockUser.level} />
            </h1>
            <p className="text-muted-foreground">
              Ready to level up today?
            </p>
          </div>
          <Badge variant="outline" className="streak-counter">
            <Flame className="h-4 w-4" />
            {mockUser.dailyStreak} day streak
          </Badge>
        </div>
        
        <XPBar 
          currentXP={mockUser.currentXP} 
          levelXP={mockUser.levelXP} 
          level={mockUser.level}
          className="h-8"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Today's Progress"
          value={`${completedToday}/${todayHabits.length}`}
          icon={Target}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total XP"
          value={mockUser.totalXP.toLocaleString()}
          icon={Star}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Current Level"
          value={mockUser.level}
          icon={TrendingUp}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Daily Streak"
          value={mockUser.dailyStreak}
          icon={Flame}
          trend={{ value: 20, isPositive: true }}
        />
      </div>

      {/* Today's Habits */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Habits
            </CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Habit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {todayHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onComplete={onHabitComplete}
            />
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="achievement-glow cursor-pointer hover:scale-105 transition-transform">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">Start Quest</h3>
            <p className="text-sm text-muted-foreground">Begin new challenges</p>
          </CardContent>
        </Card>
        
        <Card className="achievement-glow cursor-pointer hover:scale-105 transition-transform">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
            <h3 className="font-semibold">View Analytics</h3>
            <p className="text-sm text-muted-foreground">Track your progress</p>
          </CardContent>
        </Card>
        
        <Card className="achievement-glow cursor-pointer hover:scale-105 transition-transform">
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-warning" />
            <h3 className="font-semibold">Customize Avatar</h3>
            <p className="text-sm text-muted-foreground">Unlock new items</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}