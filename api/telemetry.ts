import { z } from 'zod';
import { json, methodNotAllowed, readJson } from './_lib/http';
import { getAdminSupabase } from './_lib/supabase';

const telemetrySchema = z.object({
  eventName: z.enum(['page_view', 'jump', 'simulation_run', 'contact_click']),
  sessionId: z.string().uuid().optional(),
  metadata: z.record(z.string(), z.string().max(120)).optional(),
});

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') return methodNotAllowed(['POST']);

  try {
    const payload = telemetrySchema.safeParse(await readJson(request));
    if (!payload.success) return json({ error: 'invalid_telemetry_event' }, 400);

    const { error } = await getAdminSupabase().from('telemetry_events').insert({
      event_name: payload.data.eventName,
      session_id: payload.data.sessionId || null,
      metadata: payload.data.metadata || {},
    });

    if (error) return json({ error: 'telemetry_write_failed' }, 502);
    return json({ accepted: true }, 202);
  } catch (error) {
    const code = error instanceof Error ? error.message : 'server_configuration_error';
    return json({ error: code }, 500);
  }
}
