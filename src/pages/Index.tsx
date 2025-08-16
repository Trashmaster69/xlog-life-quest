import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Dashboard } from "@/pages/Dashboard";
import { Habits } from "@/pages/Habits";
import { Journal } from "@/pages/Journal";
import { Shop } from "@/pages/Shop";
import { Leaderboard } from "@/pages/Leaderboard";
import { AvatarDisplay } from "@/components/avatar/AvatarDisplay";
import { AuthPage } from "@/components/auth/AuthPage";
import { useAuth } from "@/hooks/useAuth";
import { mockAvatar } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();

  const handleHabitComplete = (habitId: string) => {
    toast({
      title: "🎉 Habit Completed!",
      description: "You earned XP and maintained your streak!",
    });
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "See you next time, hero!",
    });
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard onHabitComplete={handleHabitComplete} />;
      case "habits":
        return <Habits onHabitComplete={handleHabitComplete} />;
      case "journal":
        return <Journal />;
      case "shop":
        return <Shop />;
      case "leaderboard":
        return <Leaderboard />;
      case "avatar":
        return <AvatarDisplay avatar={mockAvatar} />;
      default:
        return <Dashboard onHabitComplete={handleHabitComplete} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            xLog
          </div>
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={() => setActiveSection("dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            xLog
          </h1>
          <p className="text-sm text-muted-foreground">Gamify Your Life</p>
        </div>
        <Navigation 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          onSignOut={handleSignOut}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
