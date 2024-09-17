import { ConfigFile } from "@fyo/core/types";

export type Translation = { translation: string; context?: string };
export type LanguageMap = Record<string, Translation>;

export type CountryInfoMap = Record<string, CountryInfo | undefined>;
export interface CountryInfo {
    code: string;
    currency: string;
    currency_fraction?: string;
    currency_fraction_units?: number;
    smallest_currency_fraction_value?: number;
    currency_symbol?: string;
    timezones?: string[];
    fiscal_year_start: string;
    fiscal_year_end: string;
    locale: string;
}

export interface ConfigFilesWithModified extends ConfigFile {
    modified: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropertyEnum<T extends Record<string, any>> = {
    [key in keyof Required<T>]: key;
};
