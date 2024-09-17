import { getConfigFilesWithModified, setAndGetCleanedConfigFiles } from "@main/helpers";
import { Main } from "@main/index";
import { IPC_ACTIONS } from "@utils/message";
import { app, dialog, ipcMain, OpenDialogOptions } from "electron";
import { constants } from 'fs';
import fs from 'fs-extra';
import path from "path";

export default function registerIpcMainActionListeners(main: Main) {
    ipcMain.handle(IPC_ACTIONS.CHECK_DB_ACCESS, async (_, filePath: string) => {
        try {
            await fs.access(filePath, constants.W_OK | constants.R_OK);
        } catch (err) {
            return false;
        }
    
        return true;
    });

    ipcMain.handle(
        IPC_ACTIONS.GET_DB_DEFAULT_PATH,
        async (_, siteName: string) => {
            let root: string;
            try {
                root = app.getPath('documents');
            } catch {
                root = app.getPath('userData');
            }
        
            if (main.isDevelopment) {
                root = 'dbs';
            }
        
            const dbsPath = path.join(root, '');
            const backupPath = path.join(dbsPath, 'backups');
            await fs.ensureDir(backupPath);
        
            return path.join(dbsPath, `${siteName}.books.db`);
        }
    );

    ipcMain.handle(
        IPC_ACTIONS.GET_OPEN_FILEPATH,
        async (_, options: OpenDialogOptions) => {
            return await dialog.showOpenDialog(main.mainWindow!, options);
        }
    );
    
    ipcMain.handle(IPC_ACTIONS.GET_DB_LIST, async () => {
        const files = await setAndGetCleanedConfigFiles();
        return await getConfigFilesWithModified(files);
    })
}