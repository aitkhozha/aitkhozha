import { randomUUID } from 'node:crypto';

export async function POST() {
  return Response.json({ resumeToken: randomUUID() });
}
