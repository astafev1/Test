import { promises as fs } from 'fs';

export interface Profile { id: string; name: string; protocol: string; endpoint: string; [k: string]: any }

export class ProfileStore {
  constructor(private file: string) {}
  async load(): Promise<Profile[]> {
    try { const raw = await fs.readFile(this.file, 'utf-8'); return JSON.parse(raw); } catch { return []; }
  }
  async save(list: Profile[]) { await fs.writeFile(this.file, JSON.stringify(list, null, 2), 'utf-8'); }
}
