import { ConfigFile } from "@fyo/core/types";
import config from "@utils/config";
import { CUSTOM_EVENTS } from "@utils/message";
import { ConfigFilesWithModified } from "@utils/types";
import { constants } from 'fs';
import fs from 'fs/promises';

export async function setAndGetCleanedConfigFiles() {
    const files = config.get('files', []);

    const cleanedFileMap: Map<string, ConfigFile> = new Map();
    for (const file of files) {
        const exists = await fs
            .access(file.dbPath, constants.W_OK)
            .then(() => true)
            .catch(() => false);

        if (!file.companyName) {
            continue;
        }

        const key = `${file.companyName}-${file.dbPath}`;
        if (!exists || cleanedFileMap.has(key)) {
            continue;
        }

        cleanedFileMap.set(key, file);
    }

    const cleanedFiles = Array.from(cleanedFileMap.values());
    config.set('files', cleanedFiles);
    return cleanedFiles;
}

export async function getConfigFilesWithModified(files: ConfigFile[]) {
    const filesWithModified: ConfigFilesWithModified[] = [];
    for (const { dbPath, id, companyName, openCount } of files) {
        const { mtime } = await fs.stat(dbPath);
        filesWithModified.push({
            id,
            dbPath,
            companyName,
            modified: mtime.toISOString(),
            openCount,
        });
    }
  
    return filesWithModified;
}

export function emitMainProcessError(
    error: unknown,
    more?: Record<string, unknown>
  ) {
    (
      process.emit as (
        event: string,
        error: unknown,
        more?: Record<string, unknown>
      ) => void
    )(CUSTOM_EVENTS.MAIN_PROCESS_ERROR, error, more);
}