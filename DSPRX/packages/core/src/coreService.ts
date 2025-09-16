import { promises as fs } from 'fs';
import { ProfileStore, type Profile } from './store';

export class CoreService {
  private store: ProfileStore;
  private profiles: Profile[] = [];
  private activeProfileId: string | null = null;
  private connected = false;

  constructor(opts: { storageFile: string }) {
    this.store = new ProfileStore(opts.storageFile);
  }

  async init() { this.profiles = await this.store.load(); }

  // --- API ---
  async listProfiles(): Promise<Profile[]> { return this.profiles; }
  async applyProfile(profileId: string) { this.activeProfileId = profileId; }

  async connect(profileId?: string) {
    if (profileId) this.activeProfileId = profileId;
    if (!this.activeProfileId) throw new Error('No profile selected');
    // TODO: вызвать адаптер протокола; сейчас — имитация
    this.connected = true;
  }
  async disconnect() { this.connected = false; }

  async importProfileFromFile(filePath: string): Promise<Profile> {
    const raw = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(raw);
    const prof: Profile = {
      id: data.id || `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      name: data.name || 'Imported profile',
      protocol: data.protocol || 'wireguard',
      endpoint: data.endpoint || '',
      ...data,
    };
    const idx = this.profiles.findIndex(p => p.id === prof.id);
    if (idx >= 0) this.profiles[idx] = prof; else this.profiles.push(prof);
    await this.store.save(this.profiles);
    return prof;
  }

  async exportProfileToFile(profileId: string, filePath: string): Promise<void> {
    const prof = this.profiles.find(p => p.id == profileId);
    if (!prof) throw new Error('Profile not found');
    await fs.writeFile(filePath, JSON.stringify(prof, null, 2), 'utf-8');
  }
}
