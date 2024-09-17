import { is } from '@electron-toolkit/utils'
import registerAppLifecycleListeners from '@preload/registerAppLifecycleListeners'
import registerIpcMainActionListeners from '@preload/registerIpcMainActionListeners'
import registerWindowListeners from '@preload/registerWindowListeners'
import { app, BrowserWindow, BrowserWindowConstructorOptions, shell } from 'electron'
import path from 'path'

export class Main {
    title = import.meta.env.VITE_APPNAME;
    icon: string;

    mainWindow: BrowserWindow | null = null;

    WIDTH = 1200;
    HEIGHT = process.platform === 'win32' ? 826 : 1000;
    
    constructor() {
        this.icon = this.isDevelopment
        ? path.resolve('./build/icon.png')
        : path.join(__dirname, 'icons', '512x512.png');


        this.registerListeners();
        if (this.isMac && this.isDevelopment) {
            app.dock.setIcon(this.icon);
        }
    }

    get isDevelopment() {
        return process.env.NODE_ENV === 'development';
    }

    get isMac() {
        return process.platform === 'darwin';
    }

    get isLinux() {
        return process.platform === 'linux';
    }

    registerListeners() {
        // registerIpcMainMessageListeners(this);
        registerIpcMainActionListeners(this);
        // registerAutoUpdaterListeners(this);
        registerAppLifecycleListeners(this);
        // registerProcessListeners(this);
    }

    getOptions(): BrowserWindowConstructorOptions {
        const preload = path.join(__dirname, '../preload', 'index.js');
        const options: BrowserWindowConstructorOptions = {
            width: this.WIDTH,
            height: this.HEIGHT,
            title: this.title,
            titleBarStyle: 'hidden',
            trafficLightPosition: { x: 16, y: 16 },
            webPreferences: {
                contextIsolation: true,
                nodeIntegration: false,
                sandbox: false,
                preload,
            },
            autoHideMenuBar: true,
            frame: !this.isMac,
            resizable: true,
        };
      
        if (!this.isMac) {
            options.titleBarOverlay = {
                color: '#252526',
                symbolColor: "#d4d4d4",
                height: 30,
            };
        }
    
        if (this.isDevelopment || this.isLinux) {
            Object.assign(options, { icon: this.icon });
        }
    
        if (this.isLinux) {
            Object.assign(options, {
                icon: path.join(__dirname, '/icons/512x512.png'),
            });
        }
        
        return options;
    }
    
    async createWindow() {
        const me = this
        const options = this.getOptions();
        this.mainWindow = new BrowserWindow(options);

        this.mainWindow.on('ready-to-show', () => {
            me.mainWindow?.show()
        })

        this.mainWindow.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url)
            return { action: 'deny' }
        })

        this.mainWindow.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url)
            return { action: 'deny' }
        })

        // HMR for renderer base on electron-vite cli.
        // Load the remote URL for development or the local html file for production.
        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            this.mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
        } else {
            this.mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
        }

        this.setMainWindowListeners(this.mainWindow)
    }

    setMainWindowListeners(window : BrowserWindow) {
        if (window === null) return;
    
        window.on('closed', () => {
            this.mainWindow = null;
        });

        registerWindowListeners(window)
    }
}

new Main()
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.