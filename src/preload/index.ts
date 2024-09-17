import { ConfigMap } from '@fyo/core/types';
import config from '@utils/config';
import { IPC_ACTIONS, IPC_MESSAGES } from '@utils/message';
import { ConfigFilesWithModified } from '@utils/types';
import { contextBridge, ipcRenderer, OpenDialogOptions, OpenDialogReturnValue } from 'electron';

if (!process.contextIsolated) {
  	throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

const context = {
	isNotMac: process.platform !== 'darwin',
	minimizeWindow: () => ipcRenderer.send(IPC_MESSAGES.MINIMIZE_WINDOW),
	maximizeWindow: () => ipcRenderer.send(IPC_MESSAGES.MAXIMIZE_WINDOW),
	closeWindow: () => ipcRenderer.send(IPC_MESSAGES.CLOSE_WINDOW),
	getOpenFilePath: async  (options: OpenDialogOptions) => {
		return (await ipcRenderer.invoke(
		  IPC_ACTIONS.GET_OPEN_FILEPATH,
		  options
		)) as OpenDialogReturnValue;
	},
	onWindowMaximized: (callback: (event: Electron.IpcRendererEvent, maximized: boolean) => void) => 
		ipcRenderer.on('window-maximized', callback),
	checkDbAccess: async (filePath: string) => {
		return (await ipcRenderer.invoke(IPC_ACTIONS.CHECK_DB_ACCESS, filePath)) as boolean;
	},
	getDbDefaultPath: async (companyName: string) => {
		return (
			await ipcRenderer.invoke(IPC_ACTIONS.GET_DB_DEFAULT_PATH, companyName)
		) as string;
	},
	getDbList: async () => {
		return (
			await ipcRenderer.invoke(IPC_ACTIONS.GET_DB_LIST)
		) as ConfigFilesWithModified[];
	},
	store: {
		get<K extends keyof ConfigMap>(key: K) {
		  	return config.get(key);
		},
	
		set<K extends keyof ConfigMap>(key: K, value: ConfigMap[K]) {
		  	return config.set(key, value);
		},
	
		delete(key: keyof ConfigMap) {
		  	return config.delete(key);
		},
	}
}

try {
	contextBridge.exposeInMainWorld('context', context)
} catch (error) {
  	console.error(error)
}
