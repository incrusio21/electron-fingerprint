import { ConfigMap } from '@fyo/core/types';
import config from '@utils/config';
import { IPC_ACTIONS } from '@utils/message';
import { ConfigFilesWithModified, SelectFileOptions, SelectFileReturn } from '@utils/types';
import { ipcRenderer, OpenDialogOptions, OpenDialogReturnValue } from 'electron';

export const context = {
	isNotMac: process.platform !== 'darwin',
	getOpenFilePath: async  (options: OpenDialogOptions) => {
		return (await ipcRenderer.invoke(
		  IPC_ACTIONS.GET_OPEN_FILEPATH,
		  options
		)) as OpenDialogReturnValue;
	},
	selectFile: async (options: SelectFileOptions) => {
		return (await ipcRenderer.invoke(
			IPC_ACTIONS.SELECT_FILE,
			options
		)) as SelectFileReturn;
	},
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

export type IPC = typeof context;