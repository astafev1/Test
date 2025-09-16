export {};
declare global {
  interface Window {
    dsprx: {
      version: string;
      listProfiles(): Promise<any[]>;
      applyProfile(id: string): Promise<void>;
      connect(id?: string): Promise<void>;
      disconnect(): Promise<void>;
      importProfile(): Promise<any | null>;
      exportProfile(id: string): Promise<boolean>;
    };
  }
}
