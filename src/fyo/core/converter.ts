import { ValueError } from "@fyo/utils/errors";
import { Field, FieldTypeEnum, RawValue } from "@schemas/types";
import { safeParseFloat } from "@utils/index";
import { Fyo } from "..";
import { DatabaseHandler } from "./dbHandler";
import { DocValue } from "./types";

export class Converter {
    db: DatabaseHandler;
    fyo: Fyo;

    constructor(db: DatabaseHandler, fyo: Fyo) {
        this.db = db;
        this.fyo = fyo;
    }

    static toDocValue(value: RawValue, field: Field, fyo: Fyo): DocValue {
        switch (field.fieldtype) {
        //   case FieldTypeEnum.Currency:
        //     return toDocCurrency(value, field, fyo);
        //   case FieldTypeEnum.Date:
        //     return toDocDate(value, field);
        //   case FieldTypeEnum.Datetime:
        //     return toDocDate(value, field);
        //   case FieldTypeEnum.Int:
        //     return toDocInt(value, field);
            case FieldTypeEnum.Float:
                return toDocFloat(value, field);
        //   case FieldTypeEnum.Check:
        //     return toDocCheck(value, field);
        //   case FieldTypeEnum.Attachment:
        //     return toDocAttachment(value, field);
            default:
                return toDocString(value, field);
        }
    }
}

function toDocString(value: RawValue, field: Field) {
    if (value === null) {
        return null;
    }
  
    if (value === undefined) {
        return null;
    }
  
    if (typeof value === 'string') {
        return value;
    }
  
    throwError(value, field, 'doc');
}

function toDocFloat(value: RawValue, field: Field): number {
    if (value === '') {
        return 0;
    }
  
    if (typeof value === 'boolean') {
        return Number(value);
    }
  
    if (typeof value === 'string') {
        value = safeParseFloat(value);
    }
  
    if (value === null) {
        value = 0;
    }
  
    if (typeof value === 'number' && !Number.isNaN(value)) {
        return value;
    }
  
    throwError(value, field, 'doc');
}

function throwError<T>(value: T, field: Field, type: 'raw' | 'doc'): never {
    throw new ValueError(
        `invalid ${type} conversion '${String(
            value
        )}' of type ${typeof value} found, field: ${JSON.stringify(field)}`
    );
}