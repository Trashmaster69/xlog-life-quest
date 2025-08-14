import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Medal, Trophy } from "lucide-react";
import { LevelBadge } from "@/components/xp/XPBar";

export interface LeaderboardUser {
  id: string;
  name: string;
  totalXP: number;
  level: number;
  rank: number;
  weeklyXP: number;
  avatar?: string;
}

interface LeaderboardCardProps {
  user: LeaderboardUser;
  isCurrentUser?: boolean;
}

export function LeaderboardCard({ user, isCurrentUser = false }: LeaderboardCardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-level-gold" />;
      case 2: return <Medal className="h-5 w-5 text-level-silver" />;
      case 3: return <Trophy className="h-5 w-5 text-level-bronze" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    if (rank <= 3) return "default";
    if (rank <= 10) return "secondary";
    return "outline";
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${isCurrentUser ? 'ring-2 ring-primary' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10">
              {getRankIcon(user.rank)}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold">
                {user.avatar || user.name.charAt(0).toUpperCase()}
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">
                    {user.name}
                    {isCurrentUser && (
                      <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                    )}
                  </h3>
                  <LevelBadge level={user.level} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {user.totalXP.toLocaleString()} total XP
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-accent">
              +{user.weeklyXP}
            </div>
            <p className="text-xs text-muted-foreground">this week</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}