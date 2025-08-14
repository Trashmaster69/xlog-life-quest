import { Habit } from "@/components/habits/HabitCard";
import { LeaderboardUser } from "@/components/leaderboard/LeaderboardCard";
import { UserAvatar } from "@/components/avatar/AvatarDisplay";

// Mock user data
export const mockUser = {
  id: "user-1",
  name: "You",
  level: 12,
  currentXP: 2450,
  levelXP: 3000,
  totalXP: 15750,
  weeklyXP: 890,
  dailyStreak: 7,
  completedHabits: 23,
  totalHabits: 30,
};

// Mock habits data
export const mockHabits: Habit[] = [
  {
    id: "habit-1",
    name: "Morning Workout",
    description: "30 minutes of exercise to start the day",
    xpReward: 50,
    difficulty: "medium",
    streak: 7,
    completed: false,
    type: "daily",
    category: "Health",
  },
  {
    id: "habit-2",
    name: "Read for 20 minutes",
    description: "Read books, articles, or educational content",
    xpReward: 30,
    difficulty: "easy",
    streak: 12,
    completed: true,
    type: "daily",
    category: "Learning",
  },
  {
    id: "habit-3",
    name: "Meditation",
    description: "10 minutes of mindfulness practice",
    xpReward: 40,
    difficulty: "easy",
    streak: 5,
    completed: false,
    type: "daily",
    category: "Wellness",
  },
  {
    id: "habit-4",
    name: "Learn Programming",
    description: "Spend 1 hour on coding practice",
    xpReward: 80,
    difficulty: "hard",
    streak: 3,
    completed: false,
    type: "daily",
    category: "Learning",
  },
  {
    id: "habit-5",
    name: "Drink 8 glasses of water",
    description: "Stay hydrated throughout the day",
    xpReward: 20,
    difficulty: "easy",
    streak: 15,
    completed: true,
    type: "daily",
    category: "Health",
  },
  {
    id: "habit-6",
    name: "Weekly Planning",
    description: "Plan and organize the upcoming week",
    xpReward: 60,
    difficulty: "medium",
    streak: 4,
    completed: false,
    type: "weekly",
    category: "Productivity",
  },
];

// Mock leaderboard data
export const mockLeaderboard: LeaderboardUser[] = [
  {
    id: "user-2",
    name: "Alex Champion",
    totalXP: 25600,
    level: 18,
    rank: 1,
    weeklyXP: 1250,
    avatar: "🏆",
  },
  {
    id: "user-3",
    name: "Sarah Master",
    totalXP: 22400,
    level: 16,
    rank: 2,
    weeklyXP: 980,
    avatar: "⚡",
  },
  {
    id: "user-4",
    name: "Mike Warrior",
    totalXP: 19800,
    level: 15,
    rank: 3,
    weeklyXP: 920,
    avatar: "🔥",
  },
  {
    id: "user-1",
    name: "You",
    totalXP: mockUser.totalXP,
    level: mockUser.level,
    rank: 4,
    weeklyXP: mockUser.weeklyXP,
    avatar: "⭐",
  },
  {
    id: "user-5",
    name: "Emma Swift",
    totalXP: 14200,
    level: 11,
    rank: 5,
    weeklyXP: 760,
    avatar: "🚀",
  },
  {
    id: "user-6",
    name: "John Brave",
    totalXP: 12800,
    level: 10,
    rank: 6,
    weeklyXP: 680,
    avatar: "🎯",
  },
  {
    id: "user-7",
    name: "Lisa Quest",
    totalXP: 11500,
    level: 9,
    rank: 7,
    weeklyXP: 590,
    avatar: "✨",
  },
  {
    id: "user-8",
    name: "Tom Hero",
    totalXP: 10200,
    level: 8,
    rank: 8,
    weeklyXP: 510,
    avatar: "🌟",
  },
];

// Mock avatar data
export const mockAvatar: UserAvatar = {
  name: "Your Hero",
  level: mockUser.level,
  currentXP: mockUser.currentXP,
  nextLevelXP: mockUser.levelXP,
  stats: {
    strength: 8,
    intelligence: 12,
    constitution: 6,
    magic: 10,
  },
  unlockedItems: ["⚔️", "🛡️", "📚", "💎", "🔮"],
  currentClass: "Scholar Warrior",
};

// Mock quests data
export const mockQuests = [
  {
    id: "quest-1",
    title: "Weekly Warrior",
    description: "Complete all daily habits for 7 days straight",
    progress: 5,
    target: 7,
    xpReward: 200,
    difficulty: "medium",
    type: "streak",
  },
  {
    id: "quest-2",
    title: "Learning Master",
    description: "Spend 10 hours learning this month",
    progress: 7,
    target: 10,
    xpReward: 500,
    difficulty: "hard",
    type: "accumulative",
  },
  {
    id: "quest-3",
    title: "Wellness Champion",
    description: "Complete 20 wellness habits",
    progress: 16,
    target: 20,
    xpReward: 150,
    difficulty: "easy",
    type: "accumulative",
  },
];

// Mock journal entries
export const mockJournalEntries = [
  {
    id: "journal-1",
    date: "2024-01-15",
    title: "Great Progress Today!",
    content: "Completed my workout and reading goals. Feeling motivated to keep going!",
    xpEarned: 25,
    mood: "excellent",
  },
  {
    id: "journal-2",
    date: "2024-01-14",
    title: "Reflection on Goals",
    content: "Thinking about my long-term objectives and how daily habits contribute to them.",
    xpEarned: 25,
    mood: "thoughtful",
  },
  {
    id: "journal-3",
    date: "2024-01-13",
    title: "Challenging Day",
    content: "Had some difficulties with my coding practice, but persistence pays off.",
    xpEarned: 25,
    mood: "determined",
  },
];