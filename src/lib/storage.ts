import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

export async function saveUpload(filename: string, content: Buffer): Promise<string> {
  const dir = process.env.UPLOAD_LOCAL_DIR ?? 'uploads';
  await mkdir(dir, { recursive: true });
  const full = path.join(dir, `${Date.now()}-${filename}`);
  await writeFile(full, content);
  return full;
}
