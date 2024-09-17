import { IPC_MESSAGES } from "@utils/message";
import { BrowserWindow, ipcMain } from "electron";

export default function registerWindowListeners(window: BrowserWindow) {
    ipcMain.on(IPC_MESSAGES.MAXIMIZE_WINDOW, () => {
        if (window.isMaximized()) {
            window.unmaximize();
        } else {
            window.maximize();
        }
    });

    ipcMain.on(IPC_MESSAGES.MINIMIZE_WINDOW, () => {
        window.minimize();
    });

    ipcMain.on(IPC_MESSAGES.CLOSE_WINDOW, () => {
        window.close();
    });

    // window.setTitleBarOverlay
}