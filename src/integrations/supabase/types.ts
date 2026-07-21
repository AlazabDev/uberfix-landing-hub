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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      branch_approval_decisions: {
        Row: {
          approval_request_id: string
          approver_email: string
          approver_name: string
          content_hash_at_decision: string
          decided_at: string
          decision: Database["public"]["Enums"]["branch_decision"]
          email_match: Database["public"]["Enums"]["email_match_result"]
          id: string
          ip: string | null
          notes: string | null
          user_agent: string | null
        }
        Insert: {
          approval_request_id: string
          approver_email: string
          approver_name: string
          content_hash_at_decision: string
          decided_at?: string
          decision: Database["public"]["Enums"]["branch_decision"]
          email_match?: Database["public"]["Enums"]["email_match_result"]
          id?: string
          ip?: string | null
          notes?: string | null
          user_agent?: string | null
        }
        Update: {
          approval_request_id?: string
          approver_email?: string
          approver_name?: string
          content_hash_at_decision?: string
          decided_at?: string
          decision?: Database["public"]["Enums"]["branch_decision"]
          email_match?: Database["public"]["Enums"]["email_match_result"]
          id?: string
          ip?: string | null
          notes?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "branch_approval_decisions_approval_request_id_fkey"
            columns: ["approval_request_id"]
            isOneToOne: false
            referencedRelation: "branch_approval_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      branch_approval_requests: {
        Row: {
          created_at: string
          email_delivery_status: Database["public"]["Enums"]["email_delivery_status"]
          email_error: string | null
          email_sent_at: string | null
          expires_at: string
          id: string
          report_id: string
          token_hash: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email_delivery_status?: Database["public"]["Enums"]["email_delivery_status"]
          email_error?: string | null
          email_sent_at?: string | null
          expires_at: string
          id?: string
          report_id: string
          token_hash: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email_delivery_status?: Database["public"]["Enums"]["email_delivery_status"]
          email_error?: string | null
          email_sent_at?: string | null
          expires_at?: string
          id?: string
          report_id?: string
          token_hash?: string
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "branch_approval_requests_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "maintenance_voice_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      branches: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          official_email: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          official_email?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          official_email?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          id: string
          language: string | null
          session_id: string
          started_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          language?: string | null
          session_id: string
          started_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          language?: string | null
          session_id?: string
          started_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          file_name: string | null
          id: string
          message_type: string | null
          role: string
        }
        Insert: {
          content?: string
          conversation_id: string
          created_at?: string
          file_name?: string | null
          id?: string
          message_type?: string | null
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          file_name?: string | null
          id?: string
          message_type?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_audit_events: {
        Row: {
          actor: string | null
          created_at: string
          event_type: string
          id: string
          payload: Json | null
          report_id: string
        }
        Insert: {
          actor?: string | null
          created_at?: string
          event_type: string
          id?: string
          payload?: Json | null
          report_id: string
        }
        Update: {
          actor?: string | null
          created_at?: string
          event_type?: string
          id?: string
          payload?: Json | null
          report_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_audit_events_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "maintenance_voice_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_report_media: {
        Row: {
          created_at: string
          id: string
          kind: Database["public"]["Enums"]["report_media_kind"]
          mime: string | null
          report_id: string
          size_bytes: number | null
          storage_path: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind: Database["public"]["Enums"]["report_media_kind"]
          mime?: string | null
          report_id: string
          size_bytes?: number | null
          storage_path: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["report_media_kind"]
          mime?: string | null
          report_id?: string
          size_bytes?: number | null
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_report_media_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "maintenance_voice_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_voice_reports: {
        Row: {
          audio_duration_sec: number | null
          audio_path: string | null
          branch_id: string | null
          content_hash: string | null
          created_at: string
          id: string
          location_lat: number | null
          location_lng: number | null
          manual_summary: string | null
          request_number: string
          status: Database["public"]["Enums"]["voice_report_status"]
          structured_data: Json | null
          technician_confirmed_at: string | null
          technician_name: string
          technician_phone: string
          transcript_raw: string | null
          updated_at: string
        }
        Insert: {
          audio_duration_sec?: number | null
          audio_path?: string | null
          branch_id?: string | null
          content_hash?: string | null
          created_at?: string
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          manual_summary?: string | null
          request_number: string
          status?: Database["public"]["Enums"]["voice_report_status"]
          structured_data?: Json | null
          technician_confirmed_at?: string | null
          technician_name: string
          technician_phone: string
          transcript_raw?: string | null
          updated_at?: string
        }
        Update: {
          audio_duration_sec?: number | null
          audio_path?: string | null
          branch_id?: string | null
          content_hash?: string | null
          created_at?: string
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          manual_summary?: string | null
          request_number?: string
          status?: Database["public"]["Enums"]["voice_report_status"]
          structured_data?: Json | null
          technician_confirmed_at?: string | null
          technician_name?: string
          technician_phone?: string
          transcript_raw?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_voice_reports_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_chat_conversation: {
        Args: { p_language: string; p_session_id: string }
        Returns: string
      }
      insert_chat_message: {
        Args: {
          p_content: string
          p_conversation_id: string
          p_file_name?: string
          p_message_type?: string
          p_role: string
        }
        Returns: undefined
      }
    }
    Enums: {
      branch_decision: "approved" | "approved_with_notes" | "rejected"
      email_delivery_status:
        | "pending"
        | "sent"
        | "failed"
        | "configuration_required"
      email_match_result: "matched" | "mismatched" | "unknown"
      report_media_kind: "audio" | "before" | "after" | "location"
      voice_report_status:
        | "voice_report_received"
        | "transcription_pending"
        | "transcription_ready"
        | "technician_confirmed"
        | "awaiting_branch_approval"
        | "approved"
        | "approved_with_notes"
        | "rejected"
        | "expired"
        | "superseded"
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
    Enums: {
      branch_decision: ["approved", "approved_with_notes", "rejected"],
      email_delivery_status: [
        "pending",
        "sent",
        "failed",
        "configuration_required",
      ],
      email_match_result: ["matched", "mismatched", "unknown"],
      report_media_kind: ["audio", "before", "after", "location"],
      voice_report_status: [
        "voice_report_received",
        "transcription_pending",
        "transcription_ready",
        "technician_confirmed",
        "awaiting_branch_approval",
        "approved",
        "approved_with_notes",
        "rejected",
        "expired",
        "superseded",
      ],
    },
  },
} as const
