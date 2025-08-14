import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LevelBadge } from "@/components/xp/XPBar";
import { Sword, Shield, Wand2, Heart } from "lucide-react";

export interface AvatarStats {
  strength: number;
  intelligence: number;
  constitution: number;
  magic: number;
}

export interface UserAvatar {
  name: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  stats: AvatarStats;
  unlockedItems: string[];
  currentClass: string;
}

interface AvatarDisplayProps {
  avatar: UserAvatar;
}

export function AvatarDisplay({ avatar }: AvatarDisplayProps) {
  const statIcons = {
    strength: Sword,
    intelligence: Wand2,
    constitution: Shield,
    magic: Heart,
  };

  const statColors = {
    strength: "text-destructive",
    intelligence: "text-primary",
    constitution: "text-warning",
    magic: "text-accent",
  };

  return (
    <div className="space-y-6">
      {/* Avatar Visual */}
      <Card className="achievement-glow">
        <CardHeader className="text-center">
          <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
            <div className="text-4xl font-bold text-white">
              {avatar.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <CardTitle className="flex items-center justify-center gap-3">
            {avatar.name}
            <LevelBadge level={avatar.level} />
          </CardTitle>
          <Badge variant="outline" className="mx-auto w-fit">
            {avatar.currentClass}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level Progress</span>
              <span>{avatar.currentXP} / {avatar.nextLevelXP} XP</span>
            </div>
            <Progress 
              value={(avatar.currentXP / avatar.nextLevelXP) * 100} 
              className="h-3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Character Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(avatar.stats).map(([stat, value]) => {
            const Icon = statIcons[stat as keyof AvatarStats];
            const colorClass = statColors[stat as keyof AvatarStats];
            
            return (
              <div key={stat} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${colorClass}`} />
                  <span className="capitalize font-medium">{stat}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={value * 10} className="w-20 h-2" />
                  <span className="text-sm font-bold w-8">{value}</span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Unlocked Items */}
      <Card>
        <CardHeader>
          <CardTitle>Unlocked Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {avatar.unlockedItems.map((item, index) => (
              <div
                key={index}
                className="aspect-square bg-card-glow border border-border rounded-lg flex items-center justify-center text-xs font-medium"
              >
                {item}
              </div>
            ))}
            {/* Placeholder locked items */}
            {Array.from({ length: 8 - avatar.unlockedItems.length }).map((_, index) => (
              <div
                key={`locked-${index}`}
                className="aspect-square bg-muted border border-border rounded-lg flex items-center justify-center opacity-30"
              >
                ?
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}