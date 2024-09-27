import { useContolValue, useDfValue } from "@/hooks/useControl";
import { initialControlScope } from "@/store";
import { isNumeric } from "@/utils";
import { evaluateReadOnly, evaluateRequired } from "@/utils/doc";
import { getIsNullOrUndef } from "@utils/index";
import { ScopeProvider } from 'bunshi/react';
import { forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export interface BaseProps {
    value?: string | number | boolean | object;
    inputType: string
    showLabel?: boolean;
}

export const withBase = (WrappedComponent : React.ComponentType<BaseProps & React.RefAttributes<HTMLInputElement>>) => {
    const baseInputClasses = "text-base focus:outline-none w-full placeholder-gray-500"
    const sizeClasses = "px-3 py-2"
    const baseContainerClasses = "rounded"
    const labelClasess = "text-gray-600 dark:text-inherit text-sm mb-1"

    const BaseComponent = forwardRef<HTMLInputElement, BaseProps>(
        ({ value, showLabel, ...props }, ref) => {
        const df = useDfValue()
        const { readOnly, required, placeholder, label, change } = df

        const isReadOnly : boolean = useMemo(() => typeof readOnly === 'boolean' ? readOnly : evaluateReadOnly(df), [readOnly]);
        const isRequired : boolean = useMemo(() => typeof required === 'boolean' ? required : evaluateRequired(df), [required]);
        const showMandatory : boolean = useMemo(() => isEmpty() && isRequired, [isRequired]);
        const inputPlaceholder : string = useMemo(() => placeholder || label, [placeholder, label]);

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
            <ScopeProvider scope={initialControlScope} value={{
                isReadOnly, isRequired, showLabel, showMandatory, 
                inputClasses, containerClasses, labelClasess, inputPlaceholder,
                triggerChange
            }}>
                <WrappedComponent 
                    value={value}
                    {...props} ref={ref} />
            </ScopeProvider>
        )
    });

    return BaseComponent;
};

export const Base = forwardRef<HTMLInputElement, BaseProps>(
    ({ value, inputType }, ref) => {
    const df = useDfValue()
    const {
        isReadOnly, showLabel, showMandatory, 
        inputClasses, containerClasses, labelClasess,
        inputPlaceholder, triggerChange
    } = useContolValue()
    

    function onBlur(e: React.FocusEvent<HTMLInputElement>) {
        const target = e.target;
        if (!isReadOnly && triggerChange) {
            triggerChange(target.value);
        }
    }

    function parseInput(e : React.FormEvent<HTMLInputElement>) {
        // console.log(e)
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