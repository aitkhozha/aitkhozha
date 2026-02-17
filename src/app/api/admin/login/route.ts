import { serialize } from 'cookie';
import { issueSession, sessionCookieName, validateAdmin } from '@/lib/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const ok = await validateAdmin(email, password);
  if (!ok) return Response.json({ message: 'Invalid credentials' }, { status: 401 });
  const token = issueSession(email);
  return new Response(JSON.stringify({ message: 'ok' }), {
    headers: {
      'content-type': 'application/json',
      'set-cookie': serialize(sessionCookieName, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 12 })
    }
  });
}
