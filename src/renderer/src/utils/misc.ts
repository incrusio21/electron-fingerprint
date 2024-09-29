import { SetupWizard } from '@models/baseModels/SetupWizard/SetupWizard';
import { fyo } from '@renderer/initFyo';
import SetupWizardSchema from '@schemas/app/SetupWizard.json';
import { Schema } from '@schemas/types';
import { LanguageMap } from "@utils/types";
import { cloneDeep } from 'lodash';

export function getSetupWizardDoc(languageMap?: LanguageMap) {
    /**
   * This is used cause when setup wizard is running
   * the database isn't yet initialized.
   */
    const schema = cloneDeep(SetupWizardSchema);
    if (languageMap) {
        // translateSchema(schema, languageMap, schemaTranslateables);
    }
    
    return fyo.doc.getNewDoc(
        'SetupWizard',
        {},
        false,
        schema as Schema,
        SetupWizard
    );
}

export async function getDataURL(type: string, data: Uint8Array) {
    const blob = new Blob([data], { type });
  
    return new Promise<string>((resolve) => {
        const fr = new FileReader();
        fr.addEventListener('loadend', () => {
            resolve(fr.result as string);
        });
    
        fr.readAsDataURL(blob);
    });
}