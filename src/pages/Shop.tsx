import { useState, useEffect } from "react";
import { PointShop } from "@/components/shop/PointShop";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingBag } from "lucide-react";

interface UserProfile {
  coins: number;
  level: number;
}

export function Shop() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("coins, level")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handlePurchase = () => {
    fetchUserProfile(); // Refresh profile after purchase
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <ShoppingBag className="h-8 w-8 text-primary" />
          Shop
        </h1>
        <p className="text-muted-foreground">
          Spend your hard-earned coins on avatar upgrades and customizations.
        </p>
      </div>

      <PointShop userProfile={userProfile} onPurchase={handlePurchase} />
    </div>
  );
}