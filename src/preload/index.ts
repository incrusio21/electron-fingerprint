import { contextBridge } from 'electron';
import { context } from './context';

if (!process.contextIsolated) {
  	throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
	contextBridge.exposeInMainWorld('context', context)
} catch (error) {
  	console.error(error)
}
