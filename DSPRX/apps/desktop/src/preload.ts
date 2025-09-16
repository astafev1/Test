import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('dsprx', {
  version: '0.1.0',
  listProfiles: () => ipcRenderer.invoke('dsprx:listProfiles') as Promise<any[]>,
  applyProfile: (id: string) => ipcRenderer.invoke('dsprx:applyProfile', id) as Promise<void>,
  connect: (id?: string) => ipcRenderer.invoke('dsprx:connect', id) as Promise<void>,
  disconnect: () => ipcRenderer.invoke('dsprx:disconnect') as Promise<void>,
  importProfile: () => ipcRenderer.invoke('dsprx:importProfile') as Promise<any | null>,
  exportProfile: (id: string) => ipcRenderer.invoke('dsprx:exportProfile', id) as Promise<boolean>,
});
