import { Doc } from "@fyo/models/doc";

/**
 * Should add this for hidden too
 */
export type ModelMap = Record<string, typeof Doc | undefined>;
export type DocMap = Record<string, Doc | undefined>;

export interface SinglesMap {
    // SystemSettings?: SystemSettings;
    // AccountingSettings?: AccountingSettings;
    // InventorySettings?: InventorySettings;
    // POSSettings?: POSSettings;
    // POSShift?: POSShift;
    // PrintSettings?: PrintSettings;
    // Defaults?: Defaults;
    // Misc?: Misc;
    [key: string]: Doc | undefined;
}