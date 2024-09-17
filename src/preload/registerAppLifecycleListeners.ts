import { electronApp, optimizer } from "@electron-toolkit/utils";
import { emitMainProcessError } from "@main/helpers";
import { Main } from "@main/index";
import { app, BrowserWindow, ipcMain } from "electron";

export default function registerAppLifecycleListeners(main: Main) {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.whenReady().then(() => {
        // Set app user model id for windows
        electronApp.setAppUserModelId('com.electron')
        
        // Cek apakah argumen `--task-scheduler` ada di dalam process.argv
        // const isTaskScheduler = process.argv.includes('--task-scheduler');

        // if (isTaskScheduler) {
        //     // Jalankan tugas latar belakang
        //     performBackgroundTask();
        //     return
        // }

        // Default open or close DevTools by F12 in development
        // and ignore CommandOrControl + R in production.
        // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
        app.on('browser-window-created', (_, window) => {
            optimizer.watchWindowShortcuts(window)
        })

        // IPC test
        ipcMain.on('ping', () => console.log('pong'))
        
        main.createWindow().catch((err) => emitMainProcessError(err))

        app.on('activate', function () {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (BrowserWindow.getAllWindows().length === 0) main.createWindow().catch((err) => emitMainProcessError(err))
        })
    })
    
    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
          app.quit();
        }
    });
}