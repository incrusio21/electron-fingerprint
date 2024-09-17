import { Doc } from "@fyo/models/doc";
import { Field, OptionField, SelectOption } from "@schemas/types";
import { getIsNullOrUndef } from "@utils/index";

export function getOptionList(
    field: Field,
    doc: Doc | undefined | null
): SelectOption[] {
    const list = getRawOptionList(field, doc);
    return list.map((option) => {
        if (typeof option === 'string') {
            return {
                label: option,
                value: option,
            };
        }
    
        return option;
    });
}

function getRawOptionList(field: Field, doc: Doc | undefined | null) {
    const options = (field as OptionField).options;
    if (options && options.length > 0) {
        return (field as OptionField).options;
    }

    if (getIsNullOrUndef(doc)) {
        return [];
    }
  
    const Model = doc.fyo.models[doc.schemaName];
    if (Model === undefined) {
        return [];
    }

    const getList = Model.lists[field.fieldname];
    if (getList === undefined) {
        return [];
    }
  
    return getList(doc);
}