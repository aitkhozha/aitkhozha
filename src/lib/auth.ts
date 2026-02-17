import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

const COOKIE_NAME = 'admin_session';

export async function validateAdmin(email: string, password: string): Promise<boolean> {
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) return false;
  return bcrypt.compare(password, user.passwordHash);
}

export function issueSession(email: string): string {
  return jwt.sign({ email }, process.env.SESSION_SECRET ?? 'dev-secret', { expiresIn: '12h' });
}

export function verifySession(token?: string): { email: string } | null {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.SESSION_SECRET ?? 'dev-secret') as { email: string };
  } catch {
    return null;
  }
}

export const sessionCookieName = COOKIE_NAME;
