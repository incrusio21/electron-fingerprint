import { Field } from "@schemas/types";

export type UIGroupedFields = Map<string, Map<string, Field[]>>;

export type DropdownItem = {
    label: string;
    value?: string;
    action?: () => unknown;
    group?: string;
    component?: { template: string };
    isGroup?: boolean;
};

export interface withBaseProps {
    df: Field;
    value?: string | number | boolean | object;
    inputType: string
    showLabel?: boolean; 
    required?: boolean | null;
    readOnly?: boolean | null;
}

export type Control = {
    isReadOnly: boolean;
    isRequired: boolean;
    showLabel?: boolean; 
    showMandatory: boolean;
    inputClasses?: string[];
    containerClasses?: string[];
    labelClasess?: string;
    inputPlaceholder: string;
    triggerChange: (value: any) => void
}

export type Input = {
    value?: string | number | boolean | object;
    inputType: string
    onFocus: (target: EventTarget & HTMLInputElement) => void
    onBlur: (target: EventTarget & HTMLInputElement) => void
    onInput: (target: EventTarget & HTMLInputElement) => void
}
