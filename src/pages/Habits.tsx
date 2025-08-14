import { useState } from "react";
import { HabitCard } from "@/components/habits/HabitCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, Target, Calendar, Repeat } from "lucide-react";
import { mockHabits } from "@/data/mockData";

interface HabitsProps {
  onHabitComplete: (habitId: string) => void;
}

export function Habits({ onHabitComplete }: HabitsProps) {
  const [activeTab, setActiveTab] = useState("all");

  const getHabitsByType = (type: string) => {
    if (type === "all") return mockHabits;
    return mockHabits.filter(habit => habit.type === type);
  };

  const getCompletionStats = (habits: any[]) => {
    const completed = habits.filter(h => h.completed).length;
    const total = habits.length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const allStats = getCompletionStats(mockHabits);
  const dailyStats = getCompletionStats(mockHabits.filter(h => h.type === "daily"));
  const weeklyStats = getCompletionStats(mockHabits.filter(h => h.type === "weekly"));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Target className="h-8 w-8" />
            Habits & Routines
          </h1>
          <p className="text-muted-foreground">
            Build lasting habits and earn XP for consistency
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Habit
        </Button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">All Habits</span>
              <Badge variant="outline">{allStats.completed}/{allStats.total}</Badge>
            </div>
            <div className="text-2xl font-bold">{allStats.percentage}%</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${allStats.percentage}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Daily Habits</span>
              <Badge variant="outline">{dailyStats.completed}/{dailyStats.total}</Badge>
            </div>
            <div className="text-2xl font-bold">{dailyStats.percentage}%</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${dailyStats.percentage}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Weekly Goals</span>
              <Badge variant="outline">{weeklyStats.completed}/{weeklyStats.total}</Badge>
            </div>
            <div className="text-2xl font-bold">{weeklyStats.percentage}%</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-500"
                style={{ width: `${weeklyStats.percentage}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Habits List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Habits</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                All
              </TabsTrigger>
              <TabsTrigger value="daily" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Daily
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center gap-2">
                <Repeat className="h-4 w-4" />
                Weekly
              </TabsTrigger>
              <TabsTrigger value="habit" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Habits
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              {getHabitsByType("all").map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onComplete={onHabitComplete}
                />
              ))}
            </TabsContent>

            <TabsContent value="daily" className="space-y-4 mt-6">
              {getHabitsByType("daily").map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onComplete={onHabitComplete}
                />
              ))}
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4 mt-6">
              {getHabitsByType("weekly").map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onComplete={onHabitComplete}
                />
              ))}
            </TabsContent>

            <TabsContent value="habit" className="space-y-4 mt-6">
              {getHabitsByType("habit").map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onComplete={onHabitComplete}
                />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}