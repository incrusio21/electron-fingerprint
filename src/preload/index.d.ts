
export declare global {
  interface Window {
    context: {
      appName: string
      isNotMac: boolean
      minimizeWindow: () => void;
      maximizeWindow: () => void;
      closeWindow: () => void;
      onWindowMaximized: (callback: (event: Electron.IpcRendererEvent, maximized: boolean) => void) => void;
    }
  }
}
