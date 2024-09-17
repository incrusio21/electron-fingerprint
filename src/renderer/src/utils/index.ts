import { Doc } from '@fyo/models/doc';
import { BaseError, DuplicateEntryError, LinkValidationError } from '@fyo/utils/errors';
import { fyo } from '@renderer/initFyo';
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