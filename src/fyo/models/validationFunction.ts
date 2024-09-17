import { DocValue } from "@fyo/core/types";
import { getOptionList } from "@fyo/utils";
import { ValidationError, ValueError } from "@fyo/utils/errors";
import { Field, OptionField } from "@schemas/types";
import { getIsNullOrUndef } from "@utils/index";
import { Doc } from "./doc";

export function validateOptions(field: OptionField, value: string, doc: Doc) {
    const options = getOptionList(field, doc);
    if (!options.length) {
        return;
    }
    
    if (!field.required && !value) {
        return;
    }
  
    const validValues = options.map((o) => o.value);
    if (validValues.includes(value) || field.allowCustom) {
        return;
    }
    
    throw new ValueError(`Invalid value ${value} for ${field.label}`);
}

export function validateRequired(field: Field, value: DocValue, doc: Doc) {
    if (!getIsNullOrUndef(value)) {
        return;
    }
  
    if (field.required) {
        throw new ValidationError(`${field.label} is required`);
    }
  
    const requiredFunction = doc.required[field.fieldname];
    if (requiredFunction && requiredFunction()) {
        throw new ValidationError(`${field.label} is required`);
    }
}