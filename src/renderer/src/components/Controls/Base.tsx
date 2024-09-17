import { DocValue } from "@fyo/core/types";
import { evaluateReadOnly, evaluateRequired } from "@renderer/utils/doc";
import { Field } from "@schemas/types";
import { getIsNullOrUndef } from "@utils/index";
import { forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export interface BaseProps {
    df: Field; 
    value?: string | number | boolean | object;
    inputType: string
    showLabel?: boolean; 
    required?: boolean | null;
    readOnly?: boolean | null;
    change: (value: DocValue) => Promise<void>
}

export const Base = forwardRef<HTMLInputElement, BaseProps>(
    ({ df, value, inputType, showLabel, required, readOnly, change }, ref) => {
    
    const isReadOnly : boolean = useMemo(() => typeof readOnly === 'boolean' ? readOnly : evaluateReadOnly(df), [readOnly, df]);
    const isRequired : boolean = useMemo(() => typeof required === 'boolean' ? required : evaluateRequired(df), [required, df]);

    const showMandatory : boolean = useMemo(() => isEmpty() && isRequired, [isRequired]);

    function isEmpty() {
        if (Array.isArray(value) && !value.length) return true;
        if (typeof value === 'string' && !value) return true;
        if (getIsNullOrUndef(value)) return true;
        return false;
    }
    
    function onBlur(e: React.FocusEvent<HTMLInputElement>) {
        const target = e.target;
        if (!isReadOnly && change) {
            change(target.value);
        }
    }

    function triggerChange(value: unknown) {
        value = parseValue(value);
        if (value === '') value = null;
        // if (onChange) onChange(value);
    }

    function parseValue(value: unknown) {
        return value; // Implement any parsing logic if necessary
    }

    function parseInput(e : React.FormEvent<HTMLInputElement>) {
        console.log(e)
        // return !isReadOnly && onInput && onInput(e)
    }

    const baseInputClasses = "text-base focus:outline-none w-full placeholder-gray-500 px-3 py-2"
    
    const containerReadOnlyClasses = isReadOnly && "focus-within:bg-gray-100"
    const borderClasses = "border border-gray-200 bg-gray-25"

    return (
        <div title={df.label}>
            {showLabel && <div className="text-gray-600 dark:text-inherit text-sm mb-1">{df.label}</div>}
            <div className={showMandatory ? 'show-mandatory' : ''}>
                <input
                    className={twMerge("bg-transparent rounded", baseInputClasses, containerReadOnlyClasses, borderClasses)}
                    ref={ref}
                    spellCheck="false"
                    type={inputType}
                    defaultValue={value !== null && value !== undefined ? String(value) : ''}
                    tabIndex={isReadOnly ? -1 : 0}
                    onBlur={onBlur}
                    onInput={parseInput}
                />
            </div>
        </div>
    )
})