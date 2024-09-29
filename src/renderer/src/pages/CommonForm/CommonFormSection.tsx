import { FormControl, Icon } from "@/components";
import { docAtom, initialDfScope } from "@/store";
import { DocValue } from "@fyo/core/types";
import { Field } from "@schemas/types";
import { ScopeProvider } from "bunshi/react";
import { useAtomValue } from "jotai";
import { ComponentProps, MouseEventHandler, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";


type SectionTitleProps = {
    title: string;
    collapsible?: boolean;
}

type CollapsedProps = { 
    collapsed: boolean;
    toggleCollapsed: MouseEventHandler<HTMLDivElement>; 
}

type SectionControlProps = {
    fields: Field[];
    onValueChange: (field: Field, value: DocValue) => Promise<void>
    errors: Record<string, string>
}

type Props = {
    showTitle: boolean;
} & SectionTitleProps & SectionControlProps& ComponentProps<'div'>

const SectionTitle = ({ title, collapsible, collapsed, toggleCollapsed } : CollapsedProps & SectionTitleProps) => {
    
    return (
        <div 
            className={twMerge("flex justify-between items-center select-none", !collapsed && 'mb-4', collapsible && 'cursor-pointer')}
            onClick={toggleCollapsed}
        >
            <h2 className="text-base text-gray-900 dark:text-[#d4d4d4] font-semibold">{title}</h2>
            {collapsible && (
                <Icon name={collapsed ? FaChevronUp : FaChevronDown} className="w-4 h-4 text-gray-600 dark:text-[#d4d4d4]" />
            )}
        </div>
    )
}

const SectionControl = ({ fields, errors, onValueChange }: SectionControlProps) => {
    const doc = useAtomValue(docAtom) 
    
    return (
        <div className="grid gap-4 gap-x-8 grid-cols-2">
            {fields.map((field, _) => (
                <div key={field.fieldname} className={twMerge(field.fieldtype === "AttachImage" && 'row-span-2', field.fieldtype === 'Check' ? 'mt-auto' : 'mb-auto')}>
                    {field.fieldtype !== 'Table' && 
                    <ScopeProvider scope={initialDfScope} value={{
                        ...field, 
                        change: (value) => onValueChange(field, value)
                    }}>
                        <FormControl 
                            fieldtype={field?.fieldtype}
                            showLabel={true} value={doc![field.fieldname] ?? ""}
                            size={field.fieldtype === 'AttachImage' ? 'form' : undefined}
                        />
                    </ScopeProvider>}
                    {errors?.[field.fieldname] && <div className="text-sm text-red-600 mt-1">
                       {errors[field.fieldname]}
                    </div>}
                </div>
            ))}
        </div>
    )
}

export const CommonFormSection = ({ className, fields, showTitle, title, collapsible, errors, onValueChange, ...props }: Props ) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        if (collapsible) setCollapsed(!collapsed);
    };

    return (
        <div className={className} {...props}>
        {fields.length > 0 && (
        <>
            {showTitle && title && 
            <SectionTitle 
                title={title} 
                collapsed={collapsed} 
                toggleCollapsed={toggleCollapsed} 
                collapsible={collapsible} 
            />}
            {!collapsed && 
            <SectionControl
                fields={fields}
                errors={errors}
                onValueChange={onValueChange}
            />}
        </>)}
        </div>
    )
}