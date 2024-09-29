import { getConfigFilesWithModified, setAndGetCleanedConfigFiles } from "@main/helpers";
import { Main } from "@main/index";
import { IPC_ACTIONS } from "@utils/message";
import { SelectFileOptions, SelectFileReturn } from "@utils/types";
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

    ipcMain.handle(
        IPC_ACTIONS.SELECT_FILE,
        async (_, options: SelectFileOptions): Promise<SelectFileReturn> => {
            const response: SelectFileReturn = {
                name: '',
                filePath: '',
                success: false,
                data: Buffer.from('', 'utf-8'),
                canceled: false,
            };
            const { filePaths, canceled } = await dialog.showOpenDialog(
                main.mainWindow!,
                { ...options, properties: ['openFile'] }
            );
    
            response.filePath = filePaths?.[0];
            response.canceled = canceled;
        
            if (!response.filePath) {
                return response;
            }
        
            response.success = true;
            if (canceled) {
                return response;
            }
        
            response.name = path.basename(response.filePath);
            response.data = await fs.readFile(response.filePath);
            return response;
        }
    );
}