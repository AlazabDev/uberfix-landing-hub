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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      asset_details: {
        Row: {
          asset_kind: Database["public"]["Enums"]["asset_kind"]
          criticality: Database["public"]["Enums"]["criticality_level"]
          install_date: string | null
          manufacturer: string | null
          model: string | null
          notes: string | null
          ops_node_id: string
          serial_number: string | null
        }
        Insert: {
          asset_kind: Database["public"]["Enums"]["asset_kind"]
          criticality?: Database["public"]["Enums"]["criticality_level"]
          install_date?: string | null
          manufacturer?: string | null
          model?: string | null
          notes?: string | null
          ops_node_id: string
          serial_number?: string | null
        }
        Update: {
          asset_kind?: Database["public"]["Enums"]["asset_kind"]
          criticality?: Database["public"]["Enums"]["criticality_level"]
          install_date?: string | null
          manufacturer?: string | null
          model?: string | null
          notes?: string | null
          ops_node_id?: string
          serial_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_details_ops_node_id_fkey"
            columns: ["ops_node_id"]
            isOneToOne: true
            referencedRelation: "ops_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      branches: {
        Row: {
          address: string
          branch_code: string
          branch_type: string
          chain_id: string | null
          created_at: string
          icon_url: string | null
          id: string
          is_active: boolean | null
          latitude: number
          longitude: number
          map_link: string | null
          name: string
          name_ar: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          address: string
          branch_code: string
          branch_type?: string
          chain_id?: string | null
          created_at?: string
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          latitude: number
          longitude: number
          map_link?: string | null
          name: string
          name_ar?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string
          branch_code?: string
          branch_type?: string
          chain_id?: string | null
          created_at?: string
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number
          longitude?: number
          map_link?: string | null
          name?: string
          name_ar?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      commercial_common_area_details: {
        Row: {
          area_kind: Database["public"]["Enums"]["com_common_area_kind"]
          notes: string | null
          ops_node_id: string
        }
        Insert: {
          area_kind: Database["public"]["Enums"]["com_common_area_kind"]
          notes?: string | null
          ops_node_id: string
        }
        Update: {
          area_kind?: Database["public"]["Enums"]["com_common_area_kind"]
          notes?: string | null
          ops_node_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "commercial_common_area_details_ops_node_id_fkey"
            columns: ["ops_node_id"]
            isOneToOne: true
            referencedRelation: "ops_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      commercial_unit_details: {
        Row: {
          business_type: string | null
          notes: string | null
          operating_hours: Json
          ops_node_id: string
          tenant_name: string | null
          unit_kind: Database["public"]["Enums"]["com_unit_kind"]
        }
        Insert: {
          business_type?: string | null
          notes?: string | null
          operating_hours?: Json
          ops_node_id: string
          tenant_name?: string | null
          unit_kind: Database["public"]["Enums"]["com_unit_kind"]
        }
        Update: {
          business_type?: string | null
          notes?: string | null
          operating_hours?: Json
          ops_node_id?: string
          tenant_name?: string | null
          unit_kind?: Database["public"]["Enums"]["com_unit_kind"]
        }
        Relationships: [
          {
            foreignKeyName: "commercial_unit_details_ops_node_id_fkey"
            columns: ["ops_node_id"]
            isOneToOne: true
            referencedRelation: "ops_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_scopes: {
        Row: {
          contract_id: string
          id: string
          include_descendants: boolean
          notes: string | null
          ops_node_id: string | null
        }
        Insert: {
          contract_id: string
          id?: string
          include_descendants?: boolean
          notes?: string | null
          ops_node_id?: string | null
        }
        Update: {
          contract_id?: string
          id?: string
          include_descendants?: boolean
          notes?: string | null
          ops_node_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_scopes_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "maintenance_contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_scopes_ops_node_id_fkey"
            columns: ["ops_node_id"]
            isOneToOne: false
            referencedRelation: "ops_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      facilities: {
        Row: {
          address_line: string | null
          city: string | null
          code: string | null
          country: string | null
          created_at: string
          facility_type: Database["public"]["Enums"]["facility_type"]
          id: string
          lat: number | null
          lng: number | null
          metadata: Json
          name: string
          status: Database["public"]["Enums"]["status_type"]
          updated_at: string
        }
        Insert: {
          address_line?: string | null
          city?: string | null
          code?: string | null
          country?: string | null
          created_at?: string
          facility_type: Database["public"]["Enums"]["facility_type"]
          id?: string
          lat?: number | null
          lng?: number | null
          metadata?: Json
          name: string
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string
        }
        Update: {
          address_line?: string | null
          city?: string | null
          code?: string | null
          country?: string | null
          created_at?: string
          facility_type?: Database["public"]["Enums"]["facility_type"]
          id?: string
          lat?: number | null
          lng?: number | null
          metadata?: Json
          name?: string
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string
        }
        Relationships: []
      }
      facility_subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          facility_id: string
          id: string
          plan_name: string
          rules: Json
          sla_id: string | null
          start_date: string
          status: Database["public"]["Enums"]["subscription_status"]
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          facility_id: string
          id?: string
          plan_name: string
          rules?: Json
          sla_id?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["subscription_status"]
        }
        Update: {
          created_at?: string
          end_date?: string | null
          facility_id?: string
          id?: string
          plan_name?: string
          rules?: Json
          sla_id?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["subscription_status"]
        }
        Relationships: [
          {
            foreignKeyName: "facility_subscriptions_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "facility_subscriptions_sla_id_fkey"
            columns: ["sla_id"]
            isOneToOne: false
            referencedRelation: "sla_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      industrial_equipment_details: {
        Row: {
          equipment_type: string
          install_date: string | null
          manufacturer: string | null
          model: string | null
          notes: string | null
          ops_node_id: string
          serial_number: string | null
          warranty_end: string | null
        }
        Insert: {
          equipment_type: string
          install_date?: string | null
          manufacturer?: string | null
          model?: string | null
          notes?: string | null
          ops_node_id: string
          serial_number?: string | null
          warranty_end?: string | null
        }
        Update: {
          equipment_type?: string
          install_date?: string | null
          manufacturer?: string | null
          model?: string | null
          notes?: string | null
          ops_node_id?: string
          serial_number?: string | null
          warranty_end?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "industrial_equipment_details_ops_node_id_fkey"
            columns: ["ops_node_id"]
            isOneToOne: true
            referencedRelation: "ops_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      industrial_line_details: {
        Row: {
          criticality: Database["public"]["Enums"]["criticality_level"]
          line_code: string | null
          notes: string | null
          ops_node_id: string
          shift_pattern: string | null
        }
        Insert: {
          criticality?: Database["public"]["Enums"]["criticality_level"]
          line_code?: string | null
          notes?: string | null
          ops_node_id: string
          shift_pattern?: string | null
        }
        Update: {
          criticality?: Database["public"]["Enums"]["criticality_level"]
          line_code?: string | null
          notes?: string | null
          ops_node_id?: string
          shift_pattern?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "industrial_line_details_ops_node_id_fkey"
            columns: ["ops_node_id"]
            isOneToOne: true
            referencedRelation: "ops_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      industrial_utility_details: {
        Row: {
          notes: string | null
          ops_node_id: string
          utility_kind: Database["public"]["Enums"]["utility_kind"]
        }
        Insert: {
          notes?: string | null
          ops_node_id: string
          utility_kind: Database["public"]["Enums"]["utility_kind"]
        }
        Update: {
          notes?: string | null
          ops_node_id?: string
          utility_kind?: Database["public"]["Enums"]["utility_kind"]
        }
        Relationships: [
          {
            foreignKeyName: "industrial_utility_details_ops_node_id_fkey"
            columns: ["ops_node_id"]
            isOneToOne: true
            referencedRelation: "ops_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_contracts: {
        Row: {
          contract_no: string | null
          created_at: string
          end_date: string | null
          facility_id: string
          id: string
          sla_id: string | null
          start_date: string
          status: Database["public"]["Enums"]["contract_status"]
          terms: Json
          vendor_name: string | null
        }
        Insert: {
          contract_no?: string | null
          created_at?: string
          end_date?: string | null
          facility_id: string
          id?: string
          sla_id?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["contract_status"]
          terms?: Json
          vendor_name?: string | null
        }
        Update: {
          contract_no?: string | null
          created_at?: string
          end_date?: string | null
          facility_id?: string
          id?: string
          sla_id?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["contract_status"]
          terms?: Json
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_contracts_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_contracts_sla_id_fkey"
            columns: ["sla_id"]
            isOneToOne: false
            referencedRelation: "sla_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_requests: {
        Row: {
          closed_at: string | null
          contract_id: string | null
          description: string | null
          due_at: string | null
          facility_id: string
          id: string
          metadata: Json
          opened_at: string
          ops_node_id: string
          priority: Database["public"]["Enums"]["priority_type"]
          sla_id: string | null
          status: Database["public"]["Enums"]["request_status"]
          subscription_id: string | null
          title: string
        }
        Insert: {
          closed_at?: string | null
          contract_id?: string | null
          description?: string | null
          due_at?: string | null
          facility_id: string
          id?: string
          metadata?: Json
          opened_at?: string
          ops_node_id: string
          priority?: Database["public"]["Enums"]["priority_type"]
          sla_id?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          subscription_id?: string | null
          title: string
        }
        Update: {
          closed_at?: string | null
          contract_id?: string | null
          description?: string | null
          due_at?: string | null
          facility_id?: string
          id?: string
          metadata?: Json
          opened_at?: string
          ops_node_id?: string
          priority?: Database["public"]["Enums"]["priority_type"]
          sla_id?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          subscription_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_requests_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "maintenance_contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_ops_node_id_fkey"
            columns: ["ops_node_id"]
            isOneToOne: false
            referencedRelation: "ops_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_sla_id_fkey"
            columns: ["sla_id"]
            isOneToOne: false
            referencedRelation: "sla_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "facility_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      ops_nodes: {
        Row: {
          code: string | null
          created_at: string
          facility_id: string
          id: string
          metadata: Json
          name: string
          node_type: Database["public"]["Enums"]["node_type"]
          parent_id: string | null
          sort_order: number
          status: Database["public"]["Enums"]["status_type"]
        }
        Insert: {
          code?: string | null
          created_at?: string
          facility_id: string
          id?: string
          metadata?: Json
          name: string
          node_type: Database["public"]["Enums"]["node_type"]
          parent_id?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["status_type"]
        }
        Update: {
          code?: string | null
          created_at?: string
          facility_id?: string
          id?: string
          metadata?: Json
          name?: string
          node_type?: Database["public"]["Enums"]["node_type"]
          parent_id?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["status_type"]
        }
        Relationships: [
          {
            foreignKeyName: "ops_nodes_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ops_nodes_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "ops_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      periodic_tasks: {
        Row: {
          checklist: Json
          created_at: string
          facility_id: string
          frequency_unit: Database["public"]["Enums"]["frequency_unit"]
          frequency_value: number
          id: string
          next_due_at: string | null
          ops_node_id: string | null
          status: Database["public"]["Enums"]["status_type"]
          title: string
        }
        Insert: {
          checklist?: Json
          created_at?: string
          facility_id: string
          frequency_unit: Database["public"]["Enums"]["frequency_unit"]
          frequency_value?: number
          id?: string
          next_due_at?: string | null
          ops_node_id?: string | null
          status?: Database["public"]["Enums"]["status_type"]
          title: string
        }
        Update: {
          checklist?: Json
          created_at?: string
          facility_id?: string
          frequency_unit?: Database["public"]["Enums"]["frequency_unit"]
          frequency_value?: number
          id?: string
          next_due_at?: string | null
          ops_node_id?: string | null
          status?: Database["public"]["Enums"]["status_type"]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "periodic_tasks_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "periodic_tasks_ops_node_id_fkey"
            columns: ["ops_node_id"]
            isOneToOne: false
            referencedRelation: "ops_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      residential_unit_details: {
        Row: {
          area_m2: number | null
          bathrooms: number | null
          bedrooms: number | null
          notes: string | null
          occupancy: Database["public"]["Enums"]["occupancy_status"]
          ops_node_id: string
          unit_kind: Database["public"]["Enums"]["res_unit_kind"]
        }
        Insert: {
          area_m2?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          notes?: string | null
          occupancy?: Database["public"]["Enums"]["occupancy_status"]
          ops_node_id: string
          unit_kind: Database["public"]["Enums"]["res_unit_kind"]
        }
        Update: {
          area_m2?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          notes?: string | null
          occupancy?: Database["public"]["Enums"]["occupancy_status"]
          ops_node_id?: string
          unit_kind?: Database["public"]["Enums"]["res_unit_kind"]
        }
        Relationships: [
          {
            foreignKeyName: "residential_unit_details_ops_node_id_fkey"
            columns: ["ops_node_id"]
            isOneToOne: true
            referencedRelation: "ops_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          order_id: string
          rating: number
          reviewer_id: string | null
          technician_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          order_id: string
          rating: number
          reviewer_id?: string | null
          technician_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          order_id?: string
          rating?: number
          reviewer_id?: string | null
          technician_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "service_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_certificates: {
        Row: {
          certificate_no: string | null
          certificate_type: Database["public"]["Enums"]["certificate_type"]
          created_at: string
          facility_id: string
          file_ref: string | null
          id: string
          issue_date: string | null
          issuer: string | null
          metadata: Json
          ops_node_id: string | null
          valid_until: string | null
        }
        Insert: {
          certificate_no?: string | null
          certificate_type: Database["public"]["Enums"]["certificate_type"]
          created_at?: string
          facility_id: string
          file_ref?: string | null
          id?: string
          issue_date?: string | null
          issuer?: string | null
          metadata?: Json
          ops_node_id?: string | null
          valid_until?: string | null
        }
        Update: {
          certificate_no?: string | null
          certificate_type?: Database["public"]["Enums"]["certificate_type"]
          created_at?: string
          facility_id?: string
          file_ref?: string | null
          id?: string
          issue_date?: string | null
          issuer?: string | null
          metadata?: Json
          ops_node_id?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "safety_certificates_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_certificates_ops_node_id_fkey"
            columns: ["ops_node_id"]
            isOneToOne: false
            referencedRelation: "ops_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      service_orders: {
        Row: {
          branch_id: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          estimated_cost: number | null
          final_cost: number | null
          id: string
          images: string[] | null
          notes: string | null
          order_number: string
          priority: string | null
          requested_by: string | null
          scheduled_at: string | null
          service_type: Database["public"]["Enums"]["service_type"]
          started_at: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          technician_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          branch_id?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          estimated_cost?: number | null
          final_cost?: number | null
          id?: string
          images?: string[] | null
          notes?: string | null
          order_number: string
          priority?: string | null
          requested_by?: string | null
          scheduled_at?: string | null
          service_type: Database["public"]["Enums"]["service_type"]
          started_at?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          technician_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          branch_id?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          estimated_cost?: number | null
          final_cost?: number | null
          id?: string
          images?: string[] | null
          notes?: string | null
          order_number?: string
          priority?: string | null
          requested_by?: string | null
          scheduled_at?: string | null
          service_type?: Database["public"]["Enums"]["service_type"]
          started_at?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          technician_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_orders_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_orders_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
        ]
      }
      sla_profiles: {
        Row: {
          created_at: string
          escalation_rule: Json
          id: string
          name: string
          resolution_minutes: number
          response_minutes: number
          working_hours: Json
        }
        Insert: {
          created_at?: string
          escalation_rule?: Json
          id?: string
          name: string
          resolution_minutes: number
          response_minutes: number
          working_hours?: Json
        }
        Update: {
          created_at?: string
          escalation_rule?: Json
          id?: string
          name?: string
          resolution_minutes?: number
          response_minutes?: number
          working_hours?: Json
        }
        Relationships: []
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      spatial_ref_sys_copy: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number | null
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number | null
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number | null
          srtext?: string | null
        }
        Relationships: []
      }
      supcloud_keepalive: {
        Row: {
          id: number
          marker: string
        }
        Insert: {
          id: number
          marker?: string
        }
        Update: {
          id?: number
          marker?: string
        }
        Relationships: []
      }
      technician_locations: {
        Row: {
          id: string
          latitude: number
          longitude: number
          recorded_at: string
          technician_id: string
        }
        Insert: {
          id?: string
          latitude: number
          longitude: number
          recorded_at?: string
          technician_id: string
        }
        Update: {
          id?: string
          latitude?: number
          longitude?: number
          recorded_at?: string
          technician_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "technician_locations_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
        ]
      }
      technicians: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          phone: string
          rating: number | null
          secondary_skills: Database["public"]["Enums"]["service_type"][] | null
          specialty: Database["public"]["Enums"]["service_type"]
          status: Database["public"]["Enums"]["technician_status"] | null
          total_orders: number | null
          total_reviews: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          phone: string
          rating?: number | null
          secondary_skills?:
            | Database["public"]["Enums"]["service_type"][]
            | null
          specialty: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["technician_status"] | null
          total_orders?: number | null
          total_reviews?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone?: string
          rating?: number | null
          secondary_skills?:
            | Database["public"]["Enums"]["service_type"][]
            | null
          specialty?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["technician_status"] | null
          total_orders?: number | null
          total_reviews?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown
          f_table_catalog: unknown
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown
          f_table_catalog: string | null
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: { newname: string; oldname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { col: string; tbl: unknown }
        Returns: unknown
      }
      _postgis_pgsql_version: { Args: never; Returns: string }
      _postgis_scripts_pgsql_version: { Args: never; Returns: string }
      _postgis_selectivity: {
        Args: { att_name: string; geom: unknown; mode?: string; tbl: unknown }
        Returns: number
      }
      _postgis_stats: {
        Args: { ""?: string; att_name: string; tbl: unknown }
        Returns: string
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_intersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_sortablehash: { Args: { geom: unknown }; Returns: number }
      _st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          clip?: unknown
          g1: unknown
          return_polygons?: boolean
          tolerance?: number
        }
        Returns: unknown
      }
      _st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      addauth: { Args: { "": string }; Returns: boolean }
      addgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              column_name: string
              new_dim: number
              new_srid_in: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
      check_request_rate_limit: { Args: { _user_id: string }; Returns: boolean }
      disablelongtransactions: { Args: never; Returns: string }
      dropgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { column_name: string; table_name: string }; Returns: string }
      dropgeometrytable:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { schema_name: string; table_name: string }; Returns: string }
        | { Args: { table_name: string }; Returns: string }
      enablelongtransactions: { Args: never; Returns: string }
      equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      geometry: { Args: { "": string }; Returns: unknown }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geomfromewkt: { Args: { "": string }; Returns: unknown }
      gettransactionid: { Args: never; Returns: unknown }
      longtransactionsenabled: { Args: never; Returns: boolean }
      populate_geometry_columns:
        | { Args: { tbl_oid: unknown; use_typmod?: boolean }; Returns: number }
        | { Args: { use_typmod?: boolean }; Returns: string }
      postgis_constraint_dims: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: string
      }
      postgis_extensions_upgrade: { Args: never; Returns: string }
      postgis_full_version: { Args: never; Returns: string }
      postgis_geos_version: { Args: never; Returns: string }
      postgis_lib_build_date: { Args: never; Returns: string }
      postgis_lib_revision: { Args: never; Returns: string }
      postgis_lib_version: { Args: never; Returns: string }
      postgis_libjson_version: { Args: never; Returns: string }
      postgis_liblwgeom_version: { Args: never; Returns: string }
      postgis_libprotobuf_version: { Args: never; Returns: string }
      postgis_libxml_version: { Args: never; Returns: string }
      postgis_proj_version: { Args: never; Returns: string }
      postgis_scripts_build_date: { Args: never; Returns: string }
      postgis_scripts_installed: { Args: never; Returns: string }
      postgis_scripts_released: { Args: never; Returns: string }
      postgis_svn_version: { Args: never; Returns: string }
      postgis_type_name: {
        Args: {
          coord_dimension: number
          geomname: string
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_version: { Args: never; Returns: string }
      postgis_wagyu_version: { Args: never; Returns: string }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle:
        | { Args: { line1: unknown; line2: unknown }; Returns: number }
        | {
            Args: { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
            Returns: number
          }
      st_area:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkt: { Args: { "": string }; Returns: string }
      st_asgeojson:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: {
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
              r: Record<string, unknown>
            }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_asgml:
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
            }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
      st_askml:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: { Args: { format?: string; geom: unknown }; Returns: string }
      st_asmvtgeom: {
        Args: {
          bounds: unknown
          buffer?: number
          clip_geom?: boolean
          extent?: number
          geom: unknown
        }
        Returns: unknown
      }
      st_assvg:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_astext: { Args: { "": string }; Returns: string }
      st_astwkb:
        | {
            Args: {
              geom: unknown
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: number }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
      st_boundingdiagonal: {
        Args: { fits?: boolean; geom: unknown }
        Returns: unknown
      }
      st_buffer:
        | {
            Args: { geom: unknown; options?: string; radius: number }
            Returns: unknown
          }
        | {
            Args: { geom: unknown; quadsegs: number; radius: number }
            Returns: unknown
          }
      st_centroid: { Args: { "": string }; Returns: unknown }
      st_clipbybox2d: {
        Args: { box: unknown; geom: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collect: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_concavehull: {
        Args: {
          param_allow_holes?: boolean
          param_geom: unknown
          param_pctconvex: number
        }
        Returns: unknown
      }
      st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_coorddim: { Args: { geometry: unknown }; Returns: number }
      st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_crosses: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_curvetoline: {
        Args: { flags?: number; geom: unknown; tol?: number; toltype?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { flags?: number; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_disjoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_distance:
        | {
            Args: { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
            Returns: number
          }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
      st_distancesphere:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
        | {
            Args: { geom1: unknown; geom2: unknown; radius: number }
            Returns: number
          }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_expand:
        | { Args: { box: unknown; dx: number; dy: number }; Returns: unknown }
        | {
            Args: { box: unknown; dx: number; dy: number; dz?: number }
            Returns: unknown
          }
        | {
            Args: {
              dm?: number
              dx: number
              dy: number
              dz?: number
              geom: unknown
            }
            Returns: unknown
          }
      st_force3d: { Args: { geom: unknown; zvalue?: number }; Returns: unknown }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; mvalue?: number; zvalue?: number }
        Returns: unknown
      }
      st_generatepoints:
        | { Args: { area: unknown; npoints: number }; Returns: unknown }
        | {
            Args: { area: unknown; npoints: number; seed: number }
            Returns: unknown
          }
      st_geogfromtext: { Args: { "": string }; Returns: unknown }
      st_geographyfromtext: { Args: { "": string }; Returns: unknown }
      st_geohash:
        | { Args: { geog: unknown; maxchars?: number }; Returns: string }
        | { Args: { geom: unknown; maxchars?: number }; Returns: string }
      st_geomcollfromtext: { Args: { "": string }; Returns: unknown }
      st_geometricmedian: {
        Args: {
          fail_if_not_converged?: boolean
          g: unknown
          max_iter?: number
          tolerance?: number
        }
        Returns: unknown
      }
      st_geometryfromtext: { Args: { "": string }; Returns: unknown }
      st_geomfromewkt: { Args: { "": string }; Returns: unknown }
      st_geomfromgeojson:
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": string }; Returns: unknown }
      st_geomfromgml: { Args: { "": string }; Returns: unknown }
      st_geomfromkml: { Args: { "": string }; Returns: unknown }
      st_geomfrommarc21: { Args: { marc21xml: string }; Returns: unknown }
      st_geomfromtext: { Args: { "": string }; Returns: unknown }
      st_gmltosql: { Args: { "": string }; Returns: unknown }
      st_hasarc: { Args: { geometry: unknown }; Returns: boolean }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_intersection: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_intersects:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_isvaliddetail: {
        Args: { flags?: number; geom: unknown }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
        SetofOptions: {
          from: "*"
          to: "valid_detail"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      st_length:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_letters: { Args: { font?: Json; letters: string }; Returns: unknown }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { nprecision?: number; txtin: string }
        Returns: unknown
      }
      st_linefromtext: { Args: { "": string }; Returns: unknown }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linetocurve: { Args: { geometry: unknown }; Returns: unknown }
      st_locatealong: {
        Args: { geometry: unknown; leftrightoffset?: number; measure: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          frommeasure: number
          geometry: unknown
          leftrightoffset?: number
          tomeasure: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { fromelevation: number; geometry: unknown; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { geom: unknown; params: string }
        Returns: unknown
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_mlinefromtext: { Args: { "": string }; Returns: unknown }
      st_mpointfromtext: { Args: { "": string }; Returns: unknown }
      st_mpolyfromtext: { Args: { "": string }; Returns: unknown }
      st_multilinestringfromtext: { Args: { "": string }; Returns: unknown }
      st_multipointfromtext: { Args: { "": string }; Returns: unknown }
      st_multipolygonfromtext: { Args: { "": string }; Returns: unknown }
      st_node: { Args: { g: unknown }; Returns: unknown }
      st_normalize: { Args: { geom: unknown }; Returns: unknown }
      st_offsetcurve: {
        Args: { distance: number; line: unknown; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_pointfromtext: { Args: { "": string }; Returns: unknown }
      st_pointm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
        }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_polyfromtext: { Args: { "": string }; Returns: unknown }
      st_polygonfromtext: { Args: { "": string }; Returns: unknown }
      st_project: {
        Args: { azimuth: number; distance: number; geog: unknown }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_m?: number
          prec_x: number
          prec_y?: number
          prec_z?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: { Args: { geom1: unknown; geom2: unknown }; Returns: string }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setsrid:
        | { Args: { geog: unknown; srid: number }; Returns: unknown }
        | { Args: { geom: unknown; srid: number }; Returns: unknown }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; is_outer?: boolean; vertex_fraction: number }
        Returns: unknown
      }
      st_split: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_square: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_srid:
        | { Args: { geog: unknown }; Returns: number }
        | { Args: { geom: unknown }; Returns: number }
      st_subdivide: {
        Args: { geom: unknown; gridsize?: number; maxvertices?: number }
        Returns: unknown[]
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          bounds?: unknown
          margin?: number
          x: number
          y: number
          zoom: number
        }
        Returns: unknown
      }
      st_touches: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_transform:
        | {
            Args: { from_proj: string; geom: unknown; to_proj: string }
            Returns: unknown
          }
        | {
            Args: { from_proj: string; geom: unknown; to_srid: number }
            Returns: unknown
          }
        | { Args: { geom: unknown; to_proj: string }; Returns: unknown }
      st_triangulatepolygon: { Args: { g1: unknown }; Returns: unknown }
      st_union:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
        | {
            Args: { geom1: unknown; geom2: unknown; gridsize: number }
            Returns: unknown
          }
      st_voronoilines: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_wkbtosql: { Args: { wkb: string }; Returns: unknown }
      st_wkttosql: { Args: { "": string }; Returns: unknown }
      st_wrapx: {
        Args: { geom: unknown; move: number; wrap: number }
        Returns: unknown
      }
      unlockrows: { Args: { "": string }; Returns: number }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          column_name: string
          new_srid_in: number
          schema_name: string
          table_name: string
        }
        Returns: string
      }
    }
    Enums: {
      asset_kind:
        | "elevator"
        | "water_system"
        | "power_system"
        | "hvac"
        | "fire_system"
        | "generator"
        | "pump"
        | "other"
      certificate_type:
        | "fire_safety"
        | "electrical_safety"
        | "elevator_safety"
        | "gas_safety"
        | "general_safety"
        | "other"
      com_common_area_kind:
        | "hvac"
        | "fire_system"
        | "parking"
        | "corridor"
        | "restroom"
        | "other"
      com_unit_kind: "shop" | "office" | "showroom" | "kiosk"
      contract_status: "draft" | "active" | "paused" | "expired" | "terminated"
      criticality_level: "low" | "medium" | "high" | "critical"
      facility_type: "residential" | "commercial" | "industrial"
      frequency_unit: "day" | "week" | "month" | "quarter" | "year"
      node_type:
        | "res_building"
        | "res_floor"
        | "res_unit"
        | "com_unit"
        | "com_common_area"
        | "ind_plant"
        | "ind_line"
        | "ind_equipment"
        | "ind_utility"
        | "asset"
      occupancy_status: "vacant" | "occupied" | "maintenance" | "unknown"
      order_status:
        | "pending"
        | "accepted"
        | "in_progress"
        | "completed"
        | "cancelled"
      priority_type: "low" | "medium" | "high" | "critical"
      request_status:
        | "open"
        | "assigned"
        | "in_progress"
        | "on_hold"
        | "done"
        | "cancelled"
      res_unit_kind: "apartment" | "villa" | "duplex"
      service_type:
        | "electrical"
        | "plumbing"
        | "ac"
        | "carpentry"
        | "painting"
        | "general"
      status_type: "active" | "inactive" | "archived"
      subscription_status: "active" | "paused" | "cancelled" | "expired"
      technician_status: "available" | "busy" | "offline"
      utility_kind:
        | "power"
        | "gas"
        | "emergency"
        | "compressed_air"
        | "steam"
        | "water"
        | "other"
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown
      }
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
      asset_kind: [
        "elevator",
        "water_system",
        "power_system",
        "hvac",
        "fire_system",
        "generator",
        "pump",
        "other",
      ],
      certificate_type: [
        "fire_safety",
        "electrical_safety",
        "elevator_safety",
        "gas_safety",
        "general_safety",
        "other",
      ],
      com_common_area_kind: [
        "hvac",
        "fire_system",
        "parking",
        "corridor",
        "restroom",
        "other",
      ],
      com_unit_kind: ["shop", "office", "showroom", "kiosk"],
      contract_status: ["draft", "active", "paused", "expired", "terminated"],
      criticality_level: ["low", "medium", "high", "critical"],
      facility_type: ["residential", "commercial", "industrial"],
      frequency_unit: ["day", "week", "month", "quarter", "year"],
      node_type: [
        "res_building",
        "res_floor",
        "res_unit",
        "com_unit",
        "com_common_area",
        "ind_plant",
        "ind_line",
        "ind_equipment",
        "ind_utility",
        "asset",
      ],
      occupancy_status: ["vacant", "occupied", "maintenance", "unknown"],
      order_status: [
        "pending",
        "accepted",
        "in_progress",
        "completed",
        "cancelled",
      ],
      priority_type: ["low", "medium", "high", "critical"],
      request_status: [
        "open",
        "assigned",
        "in_progress",
        "on_hold",
        "done",
        "cancelled",
      ],
      res_unit_kind: ["apartment", "villa", "duplex"],
      service_type: [
        "electrical",
        "plumbing",
        "ac",
        "carpentry",
        "painting",
        "general",
      ],
      status_type: ["active", "inactive", "archived"],
      subscription_status: ["active", "paused", "cancelled", "expired"],
      technician_status: ["available", "busy", "offline"],
      utility_kind: [
        "power",
        "gas",
        "emergency",
        "compressed_air",
        "steam",
        "water",
        "other",
      ],
    },
  },
} as const
