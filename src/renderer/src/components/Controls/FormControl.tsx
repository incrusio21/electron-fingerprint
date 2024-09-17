import { DocValue } from "@fyo/core/types";
import { Field } from "@schemas/types";
import { useRef } from "react";
import { Data } from "./Data";

const components: Record<string, React.ElementType> = {
    Data
};

interface FormControlProps {
    df: Field; 
    value?: string | number | boolean | object;
    showLabel?: boolean; 
    required?: boolean | null;
    change: (value: DocValue) => Promise<void>
}

export const FormControl = ({ ...props } : FormControlProps) => {
    const controlRef = useRef<any>(null);
    
    const clear = () => {
        const input = controlRef.current;
        if (input instanceof HTMLInputElement) {
            input.value = '';
        }
    };

    const select = () => {
        controlRef.current?.select();
    };
    
    const focus = () => {
        controlRef.current?.focus();
    };
    
    const getInput = () => {
        return controlRef.current;
    };

    const fieldtype = props.df?.fieldtype;
    const Component = components[fieldtype] || Data;
    
    return (
        <>
            <Component {...props} ref={controlRef} />
        </>
    );
}
