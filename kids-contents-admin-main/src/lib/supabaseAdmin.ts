import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const serviceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string;

if (!url || !serviceKey) {
  console.warn(
    "VITE_SUPABASE_SERVICE_ROLE_KEY is not configured. User management will not work."
  );
}

export const supabaseAdmin = createClient(url || "", serviceKey || "", {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
