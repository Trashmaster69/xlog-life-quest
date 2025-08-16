import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Coins, ShoppingBag, Star, Crown, Gem } from "lucide-react";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rarity: string;
  unlock_level: number;
  is_available: boolean;
}

interface UserProfile {
  coins: number;
  level: number;
}

interface PointShopProps {
  userProfile: UserProfile | null;
  onPurchase?: () => void;
}

export function PointShop({ userProfile, onPurchase }: PointShopProps) {
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchShopData();
  }, []);

  const fetchShopData = async () => {
    try {
      // Fetch shop items
      const { data: items, error: itemsError } = await supabase
        .from("shop_items")
        .select("*")
        .eq("is_available", true)
        .order("price");

      if (itemsError) throw itemsError;

      // Fetch user purchases
      const { data: purchases, error: purchasesError } = await supabase
        .from("user_purchases")
        .select("shop_item_id");

      if (purchasesError) throw purchasesError;

      setShopItems(items || []);
      setPurchasedItems(new Set(purchases?.map(p => p.shop_item_id) || []));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load shop items.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (item: ShopItem) => {
    if (!userProfile || userProfile.coins < item.price) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("user_purchases")
        .insert({
          user_id: user.id,
          shop_item_id: item.id,
        });

      if (error) throw error;

      // Update coins in profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ coins: userProfile.coins - item.price })
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

      if (updateError) throw updateError;

      setPurchasedItems(prev => new Set([...prev, item.id]));
      
      toast({
        title: "🎉 Purchase Successful!",
        description: `You bought ${item.name} for ${item.price} coins!`,
      });

      onPurchase?.();
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Unable to complete purchase. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-muted-foreground";
      case "rare": return "text-blue-400";
      case "epic": return "text-purple-400";
      case "legendary": return "text-yellow-400";
      default: return "text-muted-foreground";
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common": return <Star className="h-3 w-3" />;
      case "rare": return <Gem className="h-3 w-3" />;
      case "epic": return <Crown className="h-3 w-3" />;
      case "legendary": return <Crown className="h-3 w-3 text-yellow-400" />;
      default: return <Star className="h-3 w-3" />;
    }
  };

  if (loading) {
    return (
      <Card className="achievement-glow">
        <CardContent className="p-6">
          <div className="text-center">Loading shop...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="achievement-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Point Shop
            <div className="flex items-center gap-1 ml-auto text-sm">
              <Coins className="h-4 w-4 text-yellow-400" />
              <span className="font-bold">{userProfile?.coins || 0}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shopItems.map((item) => {
              const isPurchased = purchasedItems.has(item.id);
              const canAfford = (userProfile?.coins || 0) >= item.price;
              const canUnlock = (userProfile?.level || 0) >= item.unlock_level;

              return (
                <Card key={item.id} className="relative">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getRarityColor(item.rarity)}`}
                          >
                            {getRarityIcon(item.rarity)}
                            {item.rarity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Coins className="h-3 w-3 text-yellow-400" />
                          <span className="text-sm font-bold">{item.price}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Lv. {item.unlock_level}
                        </Badge>
                      </div>

                      <Button
                        size="sm"
                        className="w-full"
                        disabled={isPurchased || !canAfford || !canUnlock}
                        onClick={() => handlePurchase(item)}
                      >
                        {isPurchased 
                          ? "Owned" 
                          : !canUnlock 
                            ? `Level ${item.unlock_level} Required`
                            : !canAfford 
                              ? "Can't Afford" 
                              : "Buy"
                        }
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}