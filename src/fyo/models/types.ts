import { DocValue } from "@fyo/core/types";
import { SelectOption } from "@schemas/types";
import { Doc } from "./doc";

export type Validation = (value: DocValue) => Promise<void> | void;
export type Required = () => boolean;

export type ValidationMap = Record<string, Validation | undefined>;
export type RequiredMap = Record<string, Required | undefined>;

export type ListFunction = (doc?: Doc) => string[] | SelectOption[];
export type ListsMap = Record<string, ListFunction | undefined>;

