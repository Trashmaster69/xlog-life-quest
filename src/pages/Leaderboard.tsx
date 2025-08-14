import { LeaderboardCard } from "@/components/leaderboard/LeaderboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Crown, TrendingUp, Calendar } from "lucide-react";
import { mockLeaderboard, mockUser } from "@/data/mockData";

export function Leaderboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-level-gold" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Compete with other heroes and climb the ranks
          </p>
        </div>
        <Badge variant="outline" className="text-base px-4 py-2">
          Your Rank: #{mockLeaderboard.find(u => u.id === mockUser.id)?.rank}
        </Badge>
      </div>

      {/* Top 3 Podium */}
      <Card className="achievement-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-level-gold" />
            Hall of Fame
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockLeaderboard.slice(0, 3).map((user, index) => {
              const positions = ["2nd Place", "1st Place", "3rd Place"];
              const heights = ["h-20", "h-24", "h-16"];
              const colors = ["level-silver", "level-gold", "level-bronze"];
              
              return (
                <div key={user.id} className={`order-${index === 1 ? 2 : index === 0 ? 1 : 3} text-center`}>
                  <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-2xl font-bold text-white mb-2`}>
                    {user.avatar}
                  </div>
                  <div className={`mx-auto ${heights[index]} w-20 bg-${colors[index]} rounded-t-lg flex items-end justify-center pb-2 mb-2`}>
                    <span className="text-white font-bold text-lg">{user.rank}</span>
                  </div>
                  <h3 className="font-bold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">Level {user.level}</p>
                  <p className="text-sm font-semibold text-accent">{user.totalXP.toLocaleString()} XP</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                This Week
              </TabsTrigger>
              <TabsTrigger value="alltime" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                All Time
              </TabsTrigger>
              <TabsTrigger value="monthly" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                This Month
              </TabsTrigger>
            </TabsList>

            <TabsContent value="weekly" className="space-y-3">
              {mockLeaderboard
                .sort((a, b) => b.weeklyXP - a.weeklyXP)
                .map((user) => (
                  <LeaderboardCard
                    key={user.id}
                    user={user}
                    isCurrentUser={user.id === mockUser.id}
                  />
                ))}
            </TabsContent>

            <TabsContent value="alltime" className="space-y-3">
              {mockLeaderboard
                .sort((a, b) => b.totalXP - a.totalXP)
                .map((user) => (
                  <LeaderboardCard
                    key={user.id}
                    user={user}
                    isCurrentUser={user.id === mockUser.id}
                  />
                ))}
            </TabsContent>

            <TabsContent value="monthly" className="space-y-3">
              {mockLeaderboard
                .sort((a, b) => b.weeklyXP * 4 - a.weeklyXP * 4)
                .map((user) => (
                  <LeaderboardCard
                    key={user.id}
                    user={{...user, weeklyXP: user.weeklyXP * 4}}
                    isCurrentUser={user.id === mockUser.id}
                  />
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}