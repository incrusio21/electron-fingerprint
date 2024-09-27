import { DocValue } from "@fyo/core/types";
import { FieldType, FieldTypeEnum } from "@schemas/types";
import { Fyo } from "..";
import { Doc } from "./doc";

export function getPreDefaultValues(
    fieldtype: FieldType,
    _fyo: Fyo
): DocValue | Doc[] {
    switch (fieldtype) {
        case FieldTypeEnum.Table:
            return [] as Doc[];
        case FieldTypeEnum.Currency:
            // return fyo.pesa(0.0);
        case FieldTypeEnum.Int:
        case FieldTypeEnum.Float:
            return 0;
        default:
            return null;
    }
}