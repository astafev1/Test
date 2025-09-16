import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { CoreService } from '@dsprx/core';

let win: BrowserWindow | null = null;
let core: CoreService;

const create = async () => {
  const storageFile = path.join(app.getPath('userData'), 'profiles.json');
  core = new CoreService({ storageFile });
  await core.init();

  win = new BrowserWindow({ width: 1040, height: 700, webPreferences: { preload: path.join(__dirname, 'preload.js') } });
  const url = `file://${path.join(__dirname, 'renderer/index.html')}`;
  await win.loadURL(url);
};

app.whenReady().then(create);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) create(); });

ipcMain.handle('dsprx:listProfiles', () => core.listProfiles());
ipcMain.handle('dsprx:applyProfile', (_e, id: string) => core.applyProfile(id));
ipcMain.handle('dsprx:connect', (_e, id?: string) => core.connect(id));
ipcMain.handle('dsprx:disconnect', () => core.disconnect());

ipcMain.handle('dsprx:importProfile', async () => {
  const res = await dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'DSPRX Profile', extensions: ['json'] }] });
  if (res.canceled || !res.filePaths[0]) return null;
  const prof = await core.importProfileFromFile(res.filePaths[0]);
  return prof;
});

ipcMain.handle('dsprx:exportProfile', async (_e, id: string) => {
  const res = await dialog.showSaveDialog({ defaultPath: 'profile.dsprx.json', filters: [{ name: 'DSPRX Profile', extensions: ['json'] }] });
  if (res.canceled || !res.filePath) return false;
  await core.exportProfileToFile(id, res.filePath);
  return true;
});
