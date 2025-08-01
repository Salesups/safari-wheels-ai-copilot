import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Vehicle types for type safety
export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  chassis_no: string
  status: 'in_transit' | 'at_port' | 'compliance_pending' | 'ready_for_sale'
  location: string
  days_since_import: number
  compliance_status: string
  estimated_value: number
  customer_id?: string
  urgent_flags: string[]
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  interested_vehicle: string
  stage: 'inquiry' | 'negotiation' | 'financing' | 'hot_lead'
  last_contact: string
  budget: number
  financing_status: string
  financing_bank?: string
  financing_amount?: number
  financing_expiry_days?: number
  notes: string
  priority: 'low' | 'medium' | 'high'
  next_action: string
  created_at: string
  updated_at: string
}

export interface ComplianceTask {
  id: string
  vehicle_id: string
  type: string
  title: string
  description: string
  status: 'critical' | 'pending' | 'in_progress' | 'complete'
  due_date: string
  days_left: number
  requirements: {
    name: string
    status: 'complete' | 'pending' | 'not_started'
  }[]
  estimated_cost: number
  priority: 'low' | 'medium' | 'high'
  created_at: string
  updated_at: string
}