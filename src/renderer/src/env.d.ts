/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APPNAME: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}