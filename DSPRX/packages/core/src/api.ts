export interface Profile { id: string; name: string; protocol: string; endpoint: string; }
export interface CoreAPI {
  connect(profileId: string): Promise<void>;
  disconnect(): Promise<void>;
  listProfiles(): Promise<Profile[]>;
  setFeature(id: string, enabled: boolean): Promise<void>;
}
