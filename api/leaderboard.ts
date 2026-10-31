import { z } from 'zod';
import { json, methodNotAllowed, readJson } from './_lib/http';
import { getAdminSupabase } from './_lib/supabase';

const entrySchema = z.object({
  initials: z.string().trim().toUpperCase().regex(/^[A-Z0-9]{1,3}$/),
  score: z.number().int().min(0).max(1_000_000),
  coins: z.number().int().min(0).max(100_000),
  distanceMeters: z.number().int().min(0).max(1_000_000),
  character: z.enum(['kart', 'fighter']),
  timeFormatted: z.string().trim().min(1).max(16),
});

async function getEntries() {
  const { data, error } = await getAdminSupabase()
    .from('leaderboard_entries')
    .select('*')
    .order('score', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(10);
  if (error) throw new Error('leaderboard_read_failed');
  return data ?? [];
}

export default async function handler(request: Request): Promise<Response> {
  if (!['GET', 'POST'].includes(request.method)) {
    return methodNotAllowed(['GET', 'POST']);
  }

  try {
    if (request.method === 'GET') return json({ entries: await getEntries() });

    const payload = entrySchema.safeParse(await readJson(request));
    if (!payload.success) return json({ error: 'invalid_leaderboard_entry' }, 400);

    const { data, error } = await getAdminSupabase()
      .from('leaderboard_entries')
      .insert({
        initials: payload.data.initials,
        score: payload.data.score,
        coins: payload.data.coins,
        distance_meters: payload.data.distanceMeters,
        character: payload.data.character,
        time_formatted: payload.data.timeFormatted,
      })
      .select('*')
      .single();

    if (error) return json({ error: 'leaderboard_write_failed' }, 502);
    return json({ entry: data, entries: await getEntries() }, 201);
  } catch (error) {
    const code = error instanceof Error ? error.message : 'server_configuration_error';
    return json({ error: code }, 500);
  }
}
