import type { DSPRXPlugin } from './plugin';
export class PluginRegistry {
  private plugins = new Map<string, DSPRXPlugin>();
  register(p: DSPRXPlugin) { if (this.plugins.has(p.id)) throw new Error(`Plugin exists: ${p.id}`); this.plugins.set(p.id, p); }
  get(id: string) { return this.plugins.get(id); }
  list(kind?: string) { return [...this.plugins.values()].filter(p => !kind || p.kind === kind); }
  async enableAll() { for (const p of this.plugins.values()) await p.enable(); }
  async disableAll() { for (const p of this.plugins.values()) await p.disable(); }
}
