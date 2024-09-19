import { DocValue } from "@fyo/core/types";
import { isNumeric } from "@renderer/utils";
import { evaluateReadOnly, evaluateRequired } from "@renderer/utils/doc";
import { Field } from "@schemas/types";
import { getIsNullOrUndef } from "@utils/index";
import { forwardRef, Ref, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export interface withBaseProps {
    df: Field; 
    value?: string | number | boolean | object;
    inputType: string
    showLabel?: boolean; 
    required?: boolean | null;
    readOnly?: boolean | null;
    change: (value: DocValue) => Promise<void>
}

export interface BaseProps {
    df: Field; 
    value?: string | number | boolean | object;
    inputType: string
    showLabel?: boolean; 
    required?: boolean | null;
    isReadOnly: boolean;
    change: (value: DocValue) => Promise<void>
    inputClasses?: string[];
    containerClasses?: string[];
}

export const withBase = (WrappedComponent : React.ComponentType<BaseProps & React.RefAttributes<HTMLInputElement>>) => {
    const baseInputClasses = "text-base focus:outline-none w-full placeholder-gray-500"
    const sizeClasses = "px-3 py-2"
    const baseContainerClasses = "rounded"

    const BaseComponent = ({ df, readOnly, ...props } : withBaseProps, ref : Ref<HTMLInputElement>) => {
        const isReadOnly : boolean = useMemo(() => typeof readOnly === 'boolean' ? readOnly : evaluateReadOnly(df), [readOnly, df]);

        const inputReadOnlyClasses = isReadOnly ? "text-gray-800 cursor-default" : "text-gray-900"
        const containerReadOnlyClasses = isReadOnly ? 'focus-within:bg-gray-100' : ''

        // if (!this.border) {
        //     return '';
        //   }
        const borderClasses = ["border border-gray-200", isReadOnly ? 'bg-gray-50' : "bg-gray-25"]

        const inputClasses : string[] = useMemo(() => {
            const classes: string[] = [];

            classes.push(baseInputClasses);
            if (
                // textRight ?? 
                isNumeric(df)) {
                classes.push('text-end');
            }

            classes.push(sizeClasses)
            classes.push(inputReadOnlyClasses);

            return classes
        }, [])

        const containerClasses : string[] = useMemo(() => {
            const classes: string[] = [];

            classes.push(baseContainerClasses)
            classes.push(containerReadOnlyClasses)
            classes.push(...borderClasses)

            return classes
        }, [])

        return (
            <WrappedComponent df={df} isReadOnly={isReadOnly} inputClasses={inputClasses} containerClasses={containerClasses} {...props} ref={ref} />
        )
    };

    return forwardRef(BaseComponent);
};

export const Base = forwardRef<HTMLInputElement, BaseProps>(
    ({ df, value, inputType, showLabel, required, isReadOnly, change, inputClasses, containerClasses }, ref) => {
    
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

    return (
        <div title={df.label}>
            {showLabel && <div className="text-gray-600 dark:text-inherit text-sm mb-1">{df.label}</div>}
            <div className={showMandatory ? 'show-mandatory' : ''}>
                <input
                    className={twMerge(inputClasses, containerClasses)}
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