export type DSPRXFeatureKind = 'protocol' | 'obfuscation' | 'dns' | 'network' | 'provision' | 'ui' | 'utility';
export interface DSPRXPlugin {
  id: string;
  kind: DSPRXFeatureKind;
  version: string;
  displayName: string;
  enabledByDefault?: boolean;
  enable(): Promise<void>;
  disable(): Promise<void>;
  getCapabilities(): Record<string, unknown>;
}
