import { FieldType } from "@schemas/types";
import { useRef } from "react";
import { AttachImage } from "./AttachImage";
import { AutoComplete } from "./AutoComplete";
import { Data } from "./Data";
import { Float } from "./Float";
import { Int } from "./Int";

const components: Record<string, React.ElementType> = {
    AttachImage,
    AutoComplete,
    Data,
    Float,
    Int,
};

interface FormControlProps {
    value?: string | number | boolean | object;
    showLabel?: boolean;
    fieldtype: FieldType
    size: string | undefined
}

export const FormControl = ({ fieldtype, ...props } : FormControlProps) => {
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

    const Component = components[fieldtype] || Data;

    return (
        <Component {...props} ref={controlRef} />
    );
}
