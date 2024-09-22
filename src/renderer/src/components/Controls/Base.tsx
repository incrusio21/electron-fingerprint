import { DocValue } from "@fyo/core/types";
import { Doc } from "@fyo/models/doc";
import { isNumeric } from "@renderer/utils";
import { evaluateReadOnly, evaluateRequired } from "@renderer/utils/doc";
import { Field } from "@schemas/types";
import { getIsNullOrUndef } from "@utils/index";
import { forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export interface withBaseProps {
    df: Field;
    doc: Doc;
    value?: string | number | boolean | object;
    inputType: string
    showLabel?: boolean; 
    required?: boolean | null;
    readOnly?: boolean | null;
    change?: (value: DocValue) => Promise<void>
}

export type BaseProps = {
    isReadOnly: boolean;
    isRequired: boolean;
    showMandatory: boolean;
    inputPlaceholder: string;
    triggerChange: (value: any) => void
    inputClasses?: string[];
    containerClasses?: string[];
    labelClasess?: string;
} & withBaseProps

export const withBase = (WrappedComponent : React.ComponentType<BaseProps & React.RefAttributes<HTMLInputElement>>) => {
    const baseInputClasses = "text-base focus:outline-none w-full placeholder-gray-500"
    const sizeClasses = "px-3 py-2"
    const baseContainerClasses = "rounded"
    const labelClasess = "text-gray-600 dark:text-inherit text-sm mb-1"

    const BaseComponent = forwardRef<HTMLInputElement, withBaseProps>(
        ({ df, value, readOnly, required, change, ...props }, ref) => {
        const isReadOnly : boolean = useMemo(() => typeof readOnly === 'boolean' ? readOnly : evaluateReadOnly(df), [readOnly, df]);
        const isRequired : boolean = useMemo(() => typeof required === 'boolean' ? required : evaluateRequired(df), [required, df]);
        const showMandatory : boolean = useMemo(() => isEmpty() && isRequired, [isRequired]);
        const inputPlaceholder : string = useMemo(() => df.placeholder || df.label, [df]);

        function isEmpty() {
            if (Array.isArray(value) && !value.length) return true;
            if (typeof value === 'string' && !value) return true;
            if (getIsNullOrUndef(value)) return true;
            return false;
        }

        const inputReadOnlyClasses = isReadOnly ? "text-gray-800 cursor-default" : "text-gray-900"
        const containerReadOnlyClasses = isReadOnly ? 'focus-within:bg-gray-100' : ''

        // if (!this.border) {
        //     return '';
        //   }
        const borderClasses = ["border border-gray-200", isReadOnly ? 'bg-gray-100' : "bg-gray-50"]

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

        function triggerChange(value: any) {
            value = parseValue(value);
            if (value === '') value = null;
            if (change) change(value);
        }

        function parseValue(value: any) {
            return value; // Implement any parsing logic if necessary
        }

        return (
            <WrappedComponent 
                df={df} 
                value={value}
                isReadOnly={isReadOnly}
                isRequired={isRequired}
                showMandatory={showMandatory} 
                inputPlaceholder={inputPlaceholder}
                inputClasses={inputClasses} containerClasses={containerClasses} 
                labelClasess={labelClasess}
                triggerChange={triggerChange}
                {...props} ref={ref} />
        )
    });

    return BaseComponent;
};

export const Base = forwardRef<HTMLInputElement, BaseProps>(
    ({ df, value, inputType, showLabel, showMandatory, isReadOnly, inputPlaceholder, triggerChange, 
        inputClasses, containerClasses, labelClasess }, ref) => {
    
    function onBlur(e: React.FocusEvent<HTMLInputElement>) {
        const target = e.target;
        if (!isReadOnly && triggerChange) {
            triggerChange(target.value);
        }
    }

    function parseInput(e : React.FormEvent<HTMLInputElement>) {
        console.log(e)
        // return !isReadOnly && onInput && onInput(e)
    }
    
    return (
        <div title={df.label}>
            {showLabel && <div className={labelClasess}>{df.label}</div>}
            <div className={showMandatory ? 'show-mandatory' : ''}>
                <input
                    className={twMerge(inputClasses, containerClasses)}
                    ref={ref}
                    spellCheck="false"
                    type={inputType}
                    readOnly={isReadOnly}
                    placeholder={inputPlaceholder}
                    defaultValue={value !== null && value !== undefined ? String(value) : ''}
                    tabIndex={isReadOnly ? -1 : 0}
                    onBlur={onBlur}
                    onInput={parseInput}
                    max={isNumeric(df) ? df.maxvalue : undefined}
                    min={isNumeric(df) ? df.minvalue : undefined}
                />
            </div>
        </div>
    )
})