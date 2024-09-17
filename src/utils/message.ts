// ipcRenderer.send(...)
export enum IPC_MESSAGES {
    MINIMIZE_WINDOW = 'minimize-window',
    MAXIMIZE_WINDOW = 'maximize-window',
    CLOSE_WINDOW = 'close-window',
    UPDATE_TITLEBAR = 'update-titlebar',
}
// ipcRenderer.invoke(...)
export enum IPC_ACTIONS {
    GET_OPEN_FILEPATH = 'open-dialog',
    CHECK_DB_ACCESS = 'check-db-access',
    GET_DB_DEFAULT_PATH = 'get-db-default-path',
    GET_DB_LIST = 'get-db-list',
}

// events
export enum CUSTOM_EVENTS {
    MAIN_PROCESS_ERROR = 'main-process-error',
    LOG_UNEXPECTED = 'log-unexpected',
}