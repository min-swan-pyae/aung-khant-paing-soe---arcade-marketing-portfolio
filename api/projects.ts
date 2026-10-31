import { json, methodNotAllowed } from './_lib/http';
import { getAdminSupabase } from './_lib/supabase';

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'GET') return methodNotAllowed(['GET']);

  try {
    const { data, error } = await getAdminSupabase()
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) return json({ error: 'projects_read_failed' }, 502);
    return json({ projects: data ?? [] });
  } catch (error) {
    const code = error instanceof Error ? error.message : 'server_configuration_error';
    return json({ error: code }, 500);
  }
}
