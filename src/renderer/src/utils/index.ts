import { Doc } from '@fyo/models/doc';
import { BaseError, DuplicateEntryError, LinkValidationError } from '@fyo/utils/errors';
import { fyo } from '@renderer/initFyo';
import { Field, FieldType, FieldTypeEnum, NumberField } from '@schemas/types';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: ClassValue[]) => {
    return twMerge(clsx(...args))
}

export function getErrorMessage(e: Error, doc?: Doc): string {
    const errorMessage = e.message || `An error occurred.`;
  
    let { schemaName, name } = doc ?? {};
    if (!doc) {
        schemaName = (e as BaseError).more?.schemaName as string | undefined;
        name = (e as BaseError).more?.value as string | undefined;
    }
  
    if (!schemaName || !name) {
        return errorMessage;
    }
  
    const label = fyo.db.schemaMap[schemaName]?.label ?? schemaName;
    if (e instanceof LinkValidationError) {
        return `${label} ${name} is linked with existing records.`;
    } else if (e instanceof DuplicateEntryError) {
        return `${label} ${name} already exists.`;
    }
    
    return errorMessage;
}

export function fuzzyMatch(input: string, target: string) {
    const keywordLetters = [...input];
    const candidateLetters = [...target];
    
    let keywordLetter = keywordLetters.shift();
    let candidateLetter = candidateLetters.shift();

    let isMatch = true;
    let distance = 0;
  
    while (keywordLetter && candidateLetter) {
        
        if (keywordLetter === candidateLetter) {
            keywordLetter = keywordLetters.shift();
        } else if (keywordLetter.toLowerCase() === candidateLetter.toLowerCase()) {
            keywordLetter = keywordLetters.shift();
            distance += 0.5;
        } else {
            distance += 1;
        }
    
        candidateLetter = candidateLetters.shift();
    }
    
    if (keywordLetter !== undefined) {
        distance = Number.MAX_SAFE_INTEGER;
        isMatch = false;
    } else {
        distance += candidateLetters.length;
    }
  
    return { isMatch, distance };
}

export function isNumeric(
        fieldtype: FieldType
    ): fieldtype is NumberField['fieldtype'];
    
export function isNumeric(fieldtype: Field): fieldtype is NumberField;

export function isNumeric(
        fieldtype: Field | FieldType
    ): fieldtype is NumberField | NumberField['fieldtype'] {
    if (typeof fieldtype !== 'string') {
        fieldtype = fieldtype?.fieldtype;
    }

    const numericTypes: FieldType[] = [
        FieldTypeEnum.Int,
        FieldTypeEnum.Float,
        FieldTypeEnum.Currency,
    ];

    return numericTypes.includes(fieldtype);
}