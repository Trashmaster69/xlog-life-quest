import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JournalEditor } from "@/components/journal/JournalEditor";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Calendar, Heart } from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string | null;
  xp_earned: number;
  coins_earned: number;
  created_at: string;
}

export function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (mood: string | null) => {
    switch (mood) {
      case "great": return "🤩";
      case "good": return "😊";
      case "neutral": return "😐";
      case "bad": return "😔";
      case "terrible": return "😫";
      default: return "📝";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          Journal
        </h1>
        <p className="text-muted-foreground">
          Reflect on your journey and earn rewards for your thoughts.
        </p>
      </div>

      <JournalEditor onEntryCreated={fetchEntries} />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Recent Entries
        </h2>

        {loading ? (
          <Card>
            <CardContent className="p-6 text-center">
              Loading entries...
            </CardContent>
          </Card>
        ) : entries.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No journal entries yet. Start writing to earn XP and coins!
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                      {entry.title}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(entry.created_at)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {entry.content}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-red-400" />
                      +{entry.xp_earned} XP
                    </span>
                    <span className="flex items-center gap-1">
                      💰 +{entry.coins_earned} Coins
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}