import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  	throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
	contextBridge.exposeInMainWorld('context', {
		appName: "Erpnext Fingerprint Log",
		isNotMac: process.platform !== 'darwin',
		minimizeWindow: () => ipcRenderer.send('minimize-window'),
		maximizeWindow: () => ipcRenderer.send('maximize-window'),
		closeWindow: () => ipcRenderer.send('close-window'),
		onWindowMaximized: (callback: (event: Electron.IpcRendererEvent, maximized: boolean) => void) => 
			ipcRenderer.on('window-maximized', callback)
	})
  	// contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  	console.error(error)
}

// import { electronAPI } from '@electron-toolkit/preload'

// // Custom APIs for renderer
// const api = {}

// // Use `contextBridge` APIs to expose Electron APIs to
// // renderer only if context isolation is enabled, otherwise
// // just add to the DOM global.
// if (process.contextIsolated) {
//   try {
//     contextBridge.exposeInMainWorld('electron', electronAPI)
//     contextBridge.exposeInMainWorld('api', api)
//   } catch (error) {
//     console.error(error)
//   }
// } else {
//   // @ts-ignore (define in dts)
//   window.electron = electronAPI
//   // @ts-ignore (define in dts)
//   window.api = api
// }
