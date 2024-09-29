import { Doc } from "@fyo/models/doc";
import { RawValue } from "@schemas/types";
import { Money } from "pesa";

export type Attachment = { name: string; type: string; data: string };
export type DocValue =
  | string
  | number
  | boolean
  | Date
  | Money
  | null
  | Attachment
  | undefined;

export type DocValueMap = Record<string, DocValue | Doc[] | DocValueMap[]>;
export type RawValueMap = Record<string, RawValue | RawValueMap[]>;

export type ConfigMap = {
    files: ConfigFile[];
    lastSelectedFilePath: null | string;
    language: string 
    deviceId: string
};
 
export type DatabaseDemuxConstructor = new (
    isElectron?: boolean
) => {}

export type Contex = {
    get: <K extends keyof ConfigMap>(key: K) => ConfigMap[K],
    set: <K extends keyof ConfigMap>(key: K, value: ConfigMap[K]) => void,
    delete: (key: keyof ConfigMap) => void
}

export interface ConfigFile {
    id: string;
    companyName: string;
    dbPath: string;
    openCount: number;
}

export interface FyoConfig {
    DatabaseDemux?: DatabaseDemuxConstructor;
    isElectron?: boolean;
    isTest?: boolean;
}