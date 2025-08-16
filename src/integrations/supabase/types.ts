export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      habit_completions: {
        Row: {
          coins_earned: number
          completed_at: string
          habit_id: string
          id: string
          streak_at_completion: number
          user_id: string
          xp_earned: number
        }
        Insert: {
          coins_earned: number
          completed_at?: string
          habit_id: string
          id?: string
          streak_at_completion: number
          user_id: string
          xp_earned: number
        }
        Update: {
          coins_earned?: number
          completed_at?: string
          habit_id?: string
          id?: string
          streak_at_completion?: number
          user_id?: string
          xp_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "habit_completions_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      habits: {
        Row: {
          best_streak: number
          category: string
          coin_reward: number
          created_at: string
          description: string | null
          difficulty: string
          id: string
          is_active: boolean
          name: string
          streak: number
          updated_at: string
          user_id: string
          xp_reward: number
        }
        Insert: {
          best_streak?: number
          category?: string
          coin_reward?: number
          created_at?: string
          description?: string | null
          difficulty?: string
          id?: string
          is_active?: boolean
          name: string
          streak?: number
          updated_at?: string
          user_id: string
          xp_reward?: number
        }
        Update: {
          best_streak?: number
          category?: string
          coin_reward?: number
          created_at?: string
          description?: string | null
          difficulty?: string
          id?: string
          is_active?: boolean
          name?: string
          streak?: number
          updated_at?: string
          user_id?: string
          xp_reward?: number
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          coins_earned: number
          content: string
          created_at: string
          id: string
          mood: string | null
          title: string
          updated_at: string
          user_id: string
          xp_earned: number
        }
        Insert: {
          coins_earned?: number
          content: string
          created_at?: string
          id?: string
          mood?: string | null
          title: string
          updated_at?: string
          user_id: string
          xp_earned?: number
        }
        Update: {
          coins_earned?: number
          content?: string
          created_at?: string
          id?: string
          mood?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          xp_earned?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_config: Json | null
          coins: number
          created_at: string
          current_level_xp: number
          display_name: string | null
          id: string
          level: number
          total_xp: number
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          avatar_config?: Json | null
          coins?: number
          created_at?: string
          current_level_xp?: number
          display_name?: string | null
          id?: string
          level?: number
          total_xp?: number
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          avatar_config?: Json | null
          coins?: number
          created_at?: string
          current_level_xp?: number
          display_name?: string | null
          id?: string
          level?: number
          total_xp?: number
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      shop_items: {
        Row: {
          asset_url: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          is_available: boolean
          name: string
          preview_url: string | null
          price: number
          rarity: string
          unlock_level: number
        }
        Insert: {
          asset_url?: string | null
          category: string
          created_at?: string
          description?: string | null
          id?: string
          is_available?: boolean
          name: string
          preview_url?: string | null
          price: number
          rarity?: string
          unlock_level?: number
        }
        Update: {
          asset_url?: string | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_available?: boolean
          name?: string
          preview_url?: string | null
          price?: number
          rarity?: string
          unlock_level?: number
        }
        Relationships: []
      }
      user_purchases: {
        Row: {
          id: string
          purchased_at: string
          shop_item_id: string
          user_id: string
        }
        Insert: {
          id?: string
          purchased_at?: string
          shop_item_id: string
          user_id: string
        }
        Update: {
          id?: string
          purchased_at?: string
          shop_item_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_purchases_shop_item_id_fkey"
            columns: ["shop_item_id"]
            isOneToOne: false
            referencedRelation: "shop_items"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
