import { Contex } from '@fyo/core/types';

export declare global {
  interface Window {
    context: {
      isNotMac: boolean
      minimizeWindow: () => void;
      maximizeWindow: () => void;
      closeWindow: () => void;
      getOpenFilePath: (options: OpenDialogOptions) => OpenDialogReturnValue;
      onWindowMaximized: (callback: (event: Electron.IpcRendererEvent, maximized: boolean) => void) => void;
      checkDbAccess: (filePath: string) => boolean;
      store: Contex
    }
  }
}
