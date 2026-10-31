
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Your Supabase project URL
const SUPABASE_URL = "https://fosmwfhrpcuftnyyjpaj.supabase.co";

// Paste your saved sb_publishable_ key below
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_A8q6nI0Rx00xGE9VuwmU4Q_CItF3NEf";

// Create one reusable Supabase client
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    db: {
      schema: "public"
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);
