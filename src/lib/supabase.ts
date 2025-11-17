import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos do banco de dados
export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface ClientProject {
  id: string;
  client_id: string;
  room_type: string;
  style: string;
  colors: string;
  budget: string;
  room_size?: string;
  image_url?: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface QuizResult {
  id: string;
  client_id: string;
  preferences: Record<string, string>;
  result_image_url?: string;
  created_at: string;
}
