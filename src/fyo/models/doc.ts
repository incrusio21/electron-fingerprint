import { Converter } from "@fyo/core/converter";
import { DocValue, DocValueMap } from "@fyo/core/types";
import { Fyo } from "@fyo/index";
import Observable from "@fyo/utils/observable";
import { Field, FieldTypeEnum, RawValue, Schema } from "@schemas/types";
import { getIsNullOrUndef, getMapFromList } from "@utils/index";
import { getPreDefaultValues } from "./helpers";
import { EmptyMessageMap, ListsMap, RequiredMap, ValidationMap } from "./types";
import { validateOptions, validateRequired } from "./validationFunction";

export class Doc extends Observable<DocValue | Doc[]> {
    /* eslint-disable @typescript-eslint/no-floating-promises */
    name?: string;
    schema: Readonly<Schema>;
    fyo: Fyo;
    fieldMap: Record<string, Field>;
    
    /**
     * Fields below are used by child docs to maintain
     * reference w.r.t their parent doc.
     */
    idx?: number;
    parentdoc?: Doc;

    _notInserted = true;

    constructor(
        schema: Schema,
        data: DocValueMap,
        fyo: Fyo,
        convertToDocValue = true
    ) {
        super();
        this.fyo = fyo;
        this.schema = schema;
        this.fieldMap = getMapFromList(schema.fields, 'fieldname');
        
        this._setDefaults();
        this._setValuesWithoutChecks(data, convertToDocValue);
        
        return this as Doc;
    }

    get schemaName(): string {
        return this.schema.name;
    }
    
    get notInserted(): boolean {
        return this._notInserted;
    }

    get inserted(): boolean {
        return !this._notInserted;
    }

    get isSubmitted() {
        return !!this.submitted && !this.cancelled;
    }
    
    get isCancelled() {
        return !!this.submitted && !!this.cancelled;
    }
    
    _setValuesWithoutChecks(data: DocValueMap, convertToDocValue: boolean) {
        for (const field of this.schema.fields) {
            const { fieldname, fieldtype } = field;
            const value = data[field.fieldname];


            if (Array.isArray(value)) {
                // for (const row of value) {
                //     this.push(fieldname, row, convertToDocValue);
                // }
            } else if (
                fieldtype === FieldTypeEnum.Currency &&
                typeof value === 'number'
            ) {
                this[fieldname] = value // this.fyo.pesa(value);
            } else if (value !== undefined && !convertToDocValue) {
                this[fieldname] = value;
            } else if (value !== undefined) {
                this[fieldname] = Converter.toDocValue(
                    value as RawValue,
                    field,
                    this.fyo
                );
            } else {
                this[fieldname] = this[fieldname] ?? null;
            }
      
            if (field.fieldtype === FieldTypeEnum.Table && !this[fieldname]) {
                this[fieldname] = [];
            }
        }
    }

    _setDirty(value: boolean) {
        this._dirty = value;
        if (this.schema.isChild && this.parentdoc) {
            this.parentdoc._dirty = value;
        }
    }

    _setDefaults() {
        for (const field of this.schema.fields) {
            let defaultValue: DocValue | Doc[] = getPreDefaultValues(
                field.fieldtype,
                this.fyo
            );
            
            this[field.fieldname] = defaultValue;
        }
    }

    // set value and trigger change
    async set(
        fieldname: string | DocValueMap,
        value?: DocValue | Doc[] | DocValueMap[],
        retriggerChildDocApplyChange = false
    ): Promise<boolean> {
        if (typeof fieldname === 'object') {
            return await this.setMultiple(fieldname);
        }

        // if (!this._canSet(fieldname, value)) {
        //     return false;
        // }

        this._setDirty(true);
        if (typeof value === 'string') {
            value = value.trim();
        }

        if (Array.isArray(value)) {
            // for (const row of value) {
            //   this.push(fieldname, row);
            // }
        } else {
            const field = this.fieldMap[fieldname];
            await this._validateField(field, value);
            this[fieldname] = value;
        }

        // always run applyChange from the parentdoc
        if (this.schema.isChild && this.parentdoc) {
            // await this._applyChange(fieldname);
            // await this.parentdoc._applyChange(this.parentFieldname as string);
        } else {
            await this._applyChange(fieldname, retriggerChildDocApplyChange);
        }

        return true;
    }

    async setMultiple(docValueMap: DocValueMap): Promise<boolean> {
        let hasSet = false;
        for (const fieldname in docValueMap) {
            const isSet = await this.set(
                fieldname,
                docValueMap[fieldname] as DocValue | Doc[]
            );
            hasSet ||= isSet;
        }
    
        return hasSet;
    }

    async _applyChange(
        changedFieldname: string,
        _retriggerChildDocApplyChange?: boolean
    ): Promise<boolean> {
        // await this._applyFormula(changedFieldname, retriggerChildDocApplyChange);
        await this.trigger('change', {
            doc: this,
            changed: changedFieldname,
        });
    
        return true;
    }
    async _validateField(field: Field, value: DocValue) {
        if (
            field.fieldtype === FieldTypeEnum.Select ||
            field.fieldtype === FieldTypeEnum.AutoComplete
        ) {
            validateOptions(field, value as string, this);
        }

        validateRequired(field, value, this);
        if (getIsNullOrUndef(value)) {
            return;
        }
    
        const validator = this.validations[field.fieldname];
        if (validator === undefined) {
            return;
        }
    
        await validator(value);
    }

    async trigger(event: string, params?: unknown) {
        if (this[event]) {
            await (this[event] as (args: unknown) => Promise<void>)(params);
        }
    
        await super.trigger(event, params);
    }

    validations: ValidationMap = {};
    required: RequiredMap = {};
    
    static lists: ListsMap = {};
    static emptyMessages: EmptyMessageMap = {};
}