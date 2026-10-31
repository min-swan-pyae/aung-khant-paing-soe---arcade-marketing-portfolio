import { createClient } from '@supabase/supabase-js';

function getServerEnv(name: 'SUPABASE_URL' | 'SUPABASE_SERVICE_ROLE_KEY'): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name}_missing`);
  }
  return value;
}

export function getAdminSupabase() {
  return createClient(
    getServerEnv('SUPABASE_URL'),
    getServerEnv('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
