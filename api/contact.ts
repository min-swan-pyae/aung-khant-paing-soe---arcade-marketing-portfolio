import { z } from 'zod';
import { json, methodNotAllowed, readJson } from './_lib/http';
import { getAdminSupabase } from './_lib/supabase';

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(160).optional(),
  budget: z.string().trim().max(80).optional(),
  message: z.string().trim().min(1).max(5000),
  honeypot: z.string().max(0).optional(),
});

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') return methodNotAllowed(['POST']);

  try {
    const payload = contactSchema.safeParse(await readJson(request));
    if (!payload.success) return json({ error: 'invalid_contact_message' }, 400);
    if (payload.data.honeypot) return json({ error: 'invalid_contact_message' }, 400);

    const { error } = await getAdminSupabase().from('contact_messages').insert({
      name: payload.data.name,
      email: payload.data.email,
      company: payload.data.company || null,
      budget: payload.data.budget || null,
      message: payload.data.message,
    });

    if (error) return json({ error: 'contact_write_failed' }, 502);
    return json({ message: 'received' }, 201);
  } catch (error) {
    const code = error instanceof Error ? error.message : 'server_configuration_error';
    return json({ error: code }, 500);
  }
}
